#!/usr/bin/env python3
"""
Database setup script for Pronto PostgreSQL database
"""

import os
import sys
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.append(str(backend_dir))

from database import create_tables, engine
from sqlalchemy import text

def setup_database():
    """Initialize the database with the schema"""
    print("Setting up Pronto PostgreSQL database...")
    
    try:
        # Create tables
        create_tables()
        print("✅ Tables created successfully")
        
        # Verify connection and basic functionality
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.fetchone()[0]
            print(f"✅ Connected to PostgreSQL: {version}")
            
            # Check if tables exist
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name IN ('users', 'prompts', 'prompt_metrics')
                ORDER BY table_name
            """))
            tables = [row[0] for row in result.fetchall()]
            print(f"✅ Found tables: {', '.join(tables)}")
            
    except Exception as e:
        print(f"❌ Error setting up database: {e}")
        print("\nMake sure:")
        print("1. PostgreSQL is running")
        print("2. DATABASE_URL environment variable is set correctly")
        print("3. The database exists and is accessible")
        sys.exit(1)

if __name__ == "__main__":
    setup_database()
