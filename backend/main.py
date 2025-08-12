from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import json

from database import get_db, Prompt, PromptMetric, User

app = FastAPI(title="Pronto API", description="Prompt sharing platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"message": "Hello from Pronto backend!"}

@app.get("/api/prompts")
def get_prompts(
    model: Optional[str] = None,
    output_type: Optional[str] = None,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Get prompts with optional filtering by model and output type"""
    query = db.query(Prompt)
    
    if model:
        query = query.filter(Prompt.model == model)
    
    if output_type:
        query = query.filter(Prompt.output_type == output_type)
    
    prompts = query.order_by(Prompt.created_at.desc()).limit(limit).all()
    
    return [
        {
            "id": prompt.id,
            "title": prompt.title,
            "model": prompt.model,
            "output_type": prompt.output_type,
            "tags": prompt.tags,
            "source_url": prompt.source_url,
            "attribution": prompt.attribution,
            "image_url": prompt.image_url,
            "created_at": prompt.created_at.isoformat(),
            "author": prompt.user.username if prompt.user else "Admin",
            "metrics": get_prompt_metrics(prompt.id, db)
        }
        for prompt in prompts
    ]

@app.get("/api/prompts/{prompt_id}")
def get_prompt(prompt_id: str, db: Session = Depends(get_db)):
    """Get a specific prompt by ID"""
    prompt = db.query(Prompt).filter(Prompt.id == prompt_id).first()
    
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    
    return {
        "id": prompt.id,
        "title": prompt.title,
        "prompt_text": prompt.prompt_text,
        "model": prompt.model,
        "output_type": prompt.output_type,
        "tags": prompt.tags,
        "source_url": prompt.source_url,
        "attribution": prompt.attribution,
        "image_url": prompt.image_url,
        "created_at": prompt.created_at.isoformat(),
        "author": prompt.user.username if prompt.user else "Admin",
        "metrics": get_prompt_metrics(prompt.id, db)
    }

@app.get("/api/models")
def get_models(db: Session = Depends(get_db)):
    """Get all available models"""
    models = db.query(Prompt.model).distinct().all()
    return [model[0] for model in models]

@app.get("/api/prompts/by-model/{model}")
def get_prompts_by_model(
    model: str,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get prompts for a specific model (for homepage carousel)"""
    prompts = db.query(Prompt).filter(
        Prompt.model == model
    ).order_by(Prompt.created_at.desc()).limit(limit).all()
    
    return [
        {
            "id": prompt.id,
            "title": prompt.title,
            "model": prompt.model,
            "output_type": prompt.output_type,
            "tags": prompt.tags,
            "source_url": prompt.source_url,
            "attribution": prompt.attribution,
            "image_url": prompt.image_url,
            "created_at": prompt.created_at.isoformat(),
            "author": prompt.user.username if prompt.user else "Admin",
            "metrics": get_prompt_metrics(prompt.id, db)
        }
        for prompt in prompts
    ]

def get_prompt_metrics(prompt_id: str, db: Session) -> dict:
    """Get aggregated metrics for a prompt"""
    metrics = db.query(PromptMetric).filter(
        PromptMetric.prompt_id == prompt_id
    ).all()
    
    if not metrics:
        return {"views": 0, "likes": 0, "shares": 0, "comments": 0}
    
    # Aggregate metrics across all providers
    total_views = sum(m.views or 0 for m in metrics)
    total_likes = sum(m.likes or 0 for m in metrics)
    total_shares = sum(m.shares or 0 for m in metrics)
    total_comments = sum(m.comments or 0 for m in metrics)
    
    return {
        "views": total_views,
        "likes": total_likes,
        "shares": total_shares,
        "comments": total_comments
    }
