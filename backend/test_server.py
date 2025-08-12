#!/usr/bin/env python3
"""
Simple test server for frontend-backend interaction testing
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import json

app = FastAPI(title="Pronto Test API", description="Test API for frontend development")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Mock data for testing
MOCK_PROMPTS = [
    {
        "id": "tesla-reveal-ad",
        "title": "Tesla reveal ad",
        "model": "Veo-3",
        "output_type": "video",
        "tags": ["Tesla", "magic assembly", "showroom", "innovation", "futuristic"],
        "source_url": "https://www.instagram.com/p/DMfe4qnt_kw/?img_index=1",
        "attribution": "Instagram (@evolving.ai)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {
            "views": 14000,
            "likes": 14000,
            "shares": 0,
            "comments": 8026
        }
    },
    {
        "id": "pepsi-ad",
        "title": "Pepsi ad",
        "model": "Veo-3",
        "output_type": "video",
        "tags": ["Pepsi", "urban festival", "futuristic party", "city transforms"],
        "source_url": "https://www.instagram.com/p/DMfe4qnt_kw/?img_index=1",
        "attribution": "Instagram (@evolving.ai)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {
            "views": 14000,
            "likes": 14000,
            "shares": 0,
            "comments": 8026
        }
    },
    {
        "id": "apple-watch-ad",
        "title": "Apple watch ad",
        "model": "Veo-3",
        "output_type": "video",
        "tags": ["Apple", "minimalism", "premium", "animation"],
        "source_url": "https://www.instagram.com/p/DMfe4qnt_kw/?img_index=1",
        "attribution": "Instagram (@evolving.ai)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {
            "views": 14000,
            "likes": 14000,
            "shares": 0,
            "comments": 8026
        }
    },
    {
        "id": "dior-perfume-ad",
        "title": "Dior perfume ad",
        "model": "Veo-3",
        "output_type": "video",
        "tags": ["Dior", "perfume transformation", "ethereal elegance", "luxury fashion"],
        "source_url": "https://www.instagram.com/p/DMfe4qnt_kw/?img_index=1",
        "attribution": "Instagram (@evolving.ai)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {
            "views": 14000,
            "likes": 14000,
            "shares": 0,
            "comments": 8026
        }
    },
    {
        "id": "gpt4o-story",
        "title": "Interactive Story Generator",
        "model": "GPT-4o",
        "output_type": "text",
        "tags": ["story", "interactive", "creative", "narrative"],
        "source_url": "https://example.com",
        "attribution": "Community",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {
            "views": 8500,
            "likes": 3200,
            "shares": 150,
            "comments": 450
        }
    },
    {
        "id": "gpt4o-code",
        "title": "Code Review Assistant",
        "model": "GPT-4o",
        "output_type": "text",
        "tags": ["code", "review", "programming", "assistant"],
        "source_url": "https://example.com",
        "attribution": "Community",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {
            "views": 12000,
            "likes": 5600,
            "shares": 320,
            "comments": 890
        }
    },
    {
        "id": "higgsfield-image",
        "title": "Portrait Photography",
        "model": "Higgsfield AI",
        "output_type": "image",
        "tags": ["portrait", "photography", "professional", "studio"],
        "source_url": "https://example.com",
        "attribution": "Community",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {
            "views": 6800,
            "likes": 4100,
            "shares": 180,
            "comments": 320
        }
    }
]

MOCK_MODELS = ["Veo-3", "GPT-4o", "Higgsfield AI"]

@app.get("/")
def read_root():
    return {"message": "Hello from Pronto test backend!"}

@app.get("/api/models")
def get_models():
    """Get all available models"""
    return MOCK_MODELS

@app.get("/api/prompts")
def get_prompts(
    model: Optional[str] = None,
    output_type: Optional[str] = None,
    limit: int = 20
):
    """Get prompts with optional filtering by model and output type"""
    filtered_prompts = MOCK_PROMPTS
    
    if model:
        filtered_prompts = [p for p in filtered_prompts if p["model"] == model]
    
    if output_type:
        filtered_prompts = [p for p in filtered_prompts if p["output_type"] == output_type]
    
    return filtered_prompts[:limit]

@app.get("/api/prompts/{prompt_id}")
def get_prompt(prompt_id: str):
    """Get a specific prompt by ID"""
    for prompt in MOCK_PROMPTS:
        if prompt["id"] == prompt_id:
            return prompt
    
    return {"error": "Prompt not found"}, 404

@app.get("/api/prompts/by-model/{model}")
def get_prompts_by_model(model: str, limit: int = 10):
    """Get prompts for a specific model (for homepage carousel)"""
    model_prompts = [p for p in MOCK_PROMPTS if p["model"] == model]
    return model_prompts[:limit]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
