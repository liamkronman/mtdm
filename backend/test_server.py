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

# Mock data for testing - based on actual CSV content
MOCK_PROMPTS = [
    # Veo-3 Prompts (8 total)
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
        "metrics": {"views": 14000, "likes": 14000, "shares": 0, "comments": 8026}
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
        "metrics": {"views": 14000, "likes": 14000, "shares": 0, "comments": 8026}
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
        "metrics": {"views": 14000, "likes": 14000, "shares": 0, "comments": 8026}
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
        "metrics": {"views": 14000, "likes": 14000, "shares": 0, "comments": 8026}
    },
    {
        "id": "corona-ad",
        "title": "Corona ad",
        "model": "Veo-3",
        "output_type": "video",
        "tags": ["Corona", "beach party", "bottle transforms", "rave build"],
        "source_url": "https://www.instagram.com/p/DMfe4qnt_kw/?img_index=1",
        "attribution": "Instagram (@evolving.ai)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {"views": 14000, "likes": 14000, "shares": 0, "comments": 8026}
    },
    {
        "id": "beautiful-transition",
        "title": "Beautiful transition",
        "model": "Veo-3",
        "output_type": "video",
        "tags": ["sci-fi to minimalism", "futuristic assembly", "cinematic transition"],
        "source_url": "https://www.instagram.com/p/DMfe4qnt_kw/?img_index=1",
        "attribution": "Instagram (@evolving.ai)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {"views": 14000, "likes": 14000, "shares": 0, "comments": 8026}
    },
    {
        "id": "starbucks-ad",
        "title": "Starbucks ad",
        "model": "Veo-3",
        "output_type": "video",
        "tags": ["Starbucks", "coffee ritual", "warm aesthetic", "dynamic assembly"],
        "source_url": "https://www.instagram.com/p/DMfe4qnt_kw/?img_index=1",
        "attribution": "Instagram (@evolving.ai)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {"views": 14000, "likes": 14000, "shares": 0, "comments": 8026}
    },
    {
        "id": "apple-ad",
        "title": "Apple ad",
        "model": "Veo-3",
        "output_type": "video",
        "tags": ["Apple", "iPhone", "minimalistic", "premium aesthetic"],
        "source_url": "https://www.instagram.com/p/DMfe4qnt_kw/?img_index=1",
        "attribution": "Instagram (@evolving.ai)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {"views": 14000, "likes": 14000, "shares": 0, "comments": 8026}
    },
    
    # Seedream Prompts (1 total)
    {
        "id": "an-oversized-hand-moves-white-mercedes-g",
        "title": "An oversized hand moves white Mercedes G through an African savanna",
        "model": "Seedream",
        "output_type": "image",
        "tags": ["tilt-shift", "miniature", "forced perspective", "surreal"],
        "source_url": "https://www.instagram.com/p/DMp5nVoN33G/",
        "attribution": "Instagram (@evolving.ai)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {"views": 5994, "likes": 5994, "shares": 0, "comments": 184}
    },
    
    # Grok Imagine Prompts (2 total)
    {
        "id": "anthropomorphic-gray-tabby-cat-riding-a",
        "title": "Anthropomorphic gray tabby cat riding a vintage brown bicycle",
        "model": "Grok Imagine",
        "output_type": "image",
        "tags": ["steampunk", "anthropomorphic", "vintage", "detailed"],
        "source_url": "https://x.com/elonmusk/status/1953588888666300629",
        "attribution": "Elon Musk (X.com)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {"views": 9600000, "likes": 62000, "shares": 13000, "comments": 10000}
    },
    {
        "id": "ornate-mandalorian-style-armor-crafted-f",
        "title": "Ornate Mandalorian-style armor crafted from white porcelain",
        "model": "Grok Imagine",
        "output_type": "image",
        "tags": ["mandalorian", "porcelain", "ceramic", "intricate"],
        "source_url": "https://x.com/elonmusk/status/1954062643330691498",
        "attribution": "Elon Musk (X.com)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {"views": 30100000, "likes": 141000, "shares": 15000, "comments": 12000}
    },
    
    # GPT-4o Prompts (1 total)
    {
        "id": "you-are-now-a-180-iq-strategic-analyst-w",
        "title": "180 IQ Strategic Analyst",
        "model": "GPT-4o",
        "output_type": "text",
        "tags": ["strategic", "analyst", "psychology", "optimization"],
        "source_url": "https://x.com/apollonator3000/status/1935779807683658158",
        "attribution": "X.com",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {"views": 417000, "likes": 4000, "shares": 334, "comments": 64}
    },
    
    # Higgsfield AI Prompts (2 total)
    {
        "id": "a-playful-relaxed-wide-angle-iphone-se",
        "title": "Playful relaxed wide-angle iPhone selfie",
        "model": "Higgsfield AI",
        "output_type": "image",
        "tags": ["selfie", "iphone", "wide-angle", "gen-z"],
        "source_url": "https://x.com/_mattwelter/status/1942991239261098229",
        "attribution": "Matt Welter (X.com)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {"views": 13100, "likes": 38, "shares": 1, "comments": 3}
    },
    {
        "id": "a-softly-illuminated-indoor-bedroom-sce",
        "title": "Softly illuminated indoor bedroom scene",
        "model": "Higgsfield AI",
        "output_type": "image",
        "tags": ["selfie", "bedroom", "indoor", "cozy"],
        "source_url": "https://x.com/_mattwelter/status/1942991255065235489",
        "attribution": "Matt Welter (X.com)",
        "image_url": None,
        "created_at": "2025-01-12T04:02:02.822451Z",
        "author": "Admin",
        "metrics": {"views": 10600, "likes": 22, "shares": 1, "comments": 1}
    }
]

MOCK_MODELS = ["Veo-3", "Seedream", "Grok Imagine", "GPT-4o", "Higgsfield AI"]

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
