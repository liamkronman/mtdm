from sqlalchemy import create_engine, Column, String, Text, DateTime, BigInteger, Date, ARRAY, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/pronto")

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
Base = declarative_base()

# Define models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True)
    password_hash = Column(Text)
    account_type = Column(String, default='free')
    model_credits_remaining = Column(Integer, default=20)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship to prompts
    prompts = relationship("Prompt", back_populates="user")

class Prompt(Base):
    __tablename__ = "prompts"
    
    id = Column(String, primary_key=True)  # slug (stable ID)
    title = Column(Text)
    prompt_text = Column(Text, nullable=False)
    model = Column(String, nullable=False)
    output_type = Column(String)  # 'video' | 'image' | 'text' | 'music'
    tags = Column(ARRAY(String), default=[])
    source_url = Column(Text)
    attribution = Column(Text)
    image_url = Column(Text)
    submitted_by = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship to user
    user = relationship("User", back_populates="prompts")

class PromptMetric(Base):
    __tablename__ = "prompt_metrics"
    
    prompt_id = Column(String, primary_key=True)
    provider = Column(String, primary_key=True)  # 'instagram', 'x', 'tiktok', etc
    metric_date = Column(Date, primary_key=True)
    views = Column(BigInteger)
    likes = Column(BigInteger)
    shares = Column(BigInteger)
    comments = Column(BigInteger)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create all tables
def create_tables():
    Base.metadata.create_all(bind=engine)
