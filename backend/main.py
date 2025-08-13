from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional, Union
from pydantic import BaseModel
import json
import asyncio
import aiohttp
import os
from datetime import datetime

from database import get_db, Prompt, PromptMetric, User

# Pydantic models for API requests
class RunRequest(BaseModel):
    model: str
    prompt: str
    system_prompt: Optional[str] = None
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1000
    api_key: Optional[str] = None
    use_platform_credits: bool = False

class RunResponse(BaseModel):
    success: bool
    response: Optional[str] = None
    image_url: Optional[str] = None
    job_id: Optional[str] = None
    error: Optional[str] = None

class JobStatusResponse(BaseModel):
    job_id: str
    status: str  # "submitted", "processing", "completed", "failed"
    result: Optional[dict] = None
    error: Optional[str] = None

app = FastAPI(title="Pronto API", description="Prompt sharing platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Model configuration
MODEL_CONFIGS = {
    # Text Models
    "gpt-4o": {
        "provider": "openai",
        "endpoint": "https://api.openai.com/v1/chat/completions",
        "model_name": "gpt-4o",
        "type": "text",
        "supports_streaming": True
    },
    "gpt-4o-mini": {
        "provider": "openai", 
        "endpoint": "https://api.openai.com/v1/chat/completions",
        "model_name": "gpt-4o-mini",
        "type": "text",
        "supports_streaming": True
    },
    "claude-3-sonnet": {
        "provider": "anthropic",
        "endpoint": "https://api.anthropic.com/v1/messages",
        "model_name": "claude-3-sonnet-20240229",
        "type": "text",
        "supports_streaming": True
    },
    "claude-3-haiku": {
        "provider": "anthropic",
        "endpoint": "https://api.anthropic.com/v1/messages", 
        "model_name": "claude-3-haiku-20240307",
        "type": "text",
        "supports_streaming": True
    },
    "gemini-pro": {
        "provider": "google",
        "endpoint": "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        "model_name": "gemini-pro",
        "type": "text",
        "supports_streaming": False
    },
    "grok-3": {
        "provider": "xai",
        "endpoint": "https://api.x.ai/v1/chat/completions",
        "model_name": "grok-beta",
        "type": "text", 
        "supports_streaming": True
    },
    
    # Image Models
    "dall-e-3": {
        "provider": "openai",
        "endpoint": "https://api.openai.com/v1/images/generations",
        "model_name": "dall-e-3",
        "type": "image",
        "supports_streaming": False
    },
    "seedream": {
        "provider": "seedream",
        "endpoint": "https://api.seedream.ai/v1/generation",
        "model_name": "seedream-xl",
        "type": "image",
        "supports_streaming": False
    },
    "grok-imagine": {
        "provider": "xai",
        "endpoint": "https://api.x.ai/v1/images/generations",
        "model_name": "grok-imagine",
        "type": "image",
        "supports_streaming": False
    },
    "higgsfield-ai": {
        "provider": "higgsfield",
        "endpoint": "https://api.higgsfield.ai/v1/generation",
        "model_name": "higgsfield-xl",
        "type": "image",
        "supports_streaming": False
    },
    
    # Video Models
    "veo-3": {
        "provider": "google",
        "endpoint": "https://generativelanguage.googleapis.com/v1beta/models/veo-3:generateContent",
        "model_name": "veo-3",
        "type": "video",
        "supports_streaming": False
    }
}

# Platform API keys (for when users choose platform credits)
PLATFORM_KEYS = {
    "openai": os.getenv("OPENAI_API_KEY"),
    "anthropic": os.getenv("ANTHROPIC_API_KEY"), 
    "google": os.getenv("GOOGLE_API_KEY"),
    "xai": os.getenv("XAI_API_KEY"),
    "seedream": os.getenv("SEEDREAM_API_KEY"),
    "higgsfield": os.getenv("HIGGSFIELD_API_KEY")
}

@app.get("/")
def read_root():
    return {"message": "Hello from Pronto backend!"}

@app.post("/api/run", response_model=RunResponse)
async def run_model(request: RunRequest):
    """Execute a model with the given prompt"""
    
    # Validate model exists
    if request.model not in MODEL_CONFIGS:
        raise HTTPException(status_code=400, detail=f"Model {request.model} not supported")
    
    config = MODEL_CONFIGS[request.model]
    
    # Determine API key to use
    api_key = None
    if request.use_platform_credits:
        api_key = PLATFORM_KEYS.get(config["provider"])
        if not api_key:
            raise HTTPException(status_code=400, detail=f"Platform credits not available for {config['provider']}")
    else:
        api_key = request.api_key
        if not api_key:
            raise HTTPException(status_code=400, detail="API key required")
    
    try:
        if config["type"] == "text":
            return await handle_text_generation(request, config, api_key)
        elif config["type"] == "image":
            return await handle_image_generation(request, config, api_key)
        elif config["type"] == "video":
            return await handle_video_generation(request, config, api_key)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported model type: {config['type']}")
            
    except Exception as e:
        return RunResponse(
            success=False,
            error=f"Generation failed: {str(e)}"
        )

async def handle_text_generation(request: RunRequest, config: dict, api_key: str) -> RunResponse:
    """Handle text generation requests"""
    
    if config["provider"] == "openai":
        return await call_openai_text(request, config, api_key)
    elif config["provider"] == "anthropic":
        return await call_anthropic_text(request, config, api_key)
    elif config["provider"] == "google":
        return await call_google_text(request, config, api_key)
    elif config["provider"] == "xai":
        return await call_xai_text(request, config, api_key)
    else:
        raise HTTPException(status_code=400, detail=f"Provider {config['provider']} not implemented")

async def handle_image_generation(request: RunRequest, config: dict, api_key: str) -> RunResponse:
    """Handle image generation requests"""
    
    if config["provider"] == "openai":
        return await call_openai_image(request, config, api_key)
    else:
        # For now, return a mock response for other providers
        return RunResponse(
            success=True,
            image_url="https://via.placeholder.com/512x512/6366f1/ffffff?text=Generated+Image",
            job_id=f"mock_job_{datetime.now().timestamp()}"
        )

async def handle_video_generation(request: RunRequest, config: dict, api_key: str) -> RunResponse:
    """Handle video generation requests"""
    
    # For now, return a mock job ID for video generation
    job_id = f"video_job_{datetime.now().timestamp()}"
    return RunResponse(
        success=True,
        job_id=job_id
    )

async def call_openai_text(request: RunRequest, config: dict, api_key: str) -> RunResponse:
    """Call OpenAI text API"""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    messages = []
    if request.system_prompt:
        messages.append({"role": "system", "content": request.system_prompt})
    messages.append({"role": "user", "content": request.prompt})
    
    data = {
        "model": config["model_name"],
        "messages": messages,
        "temperature": request.temperature,
        "max_tokens": request.max_tokens,
        "stream": False
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(config["endpoint"], headers=headers, json=data) as response:
            if response.status == 200:
                result = await response.json()
                return RunResponse(
                    success=True,
                    response=result["choices"][0]["message"]["content"]
                )
            else:
                error_text = await response.text()
                return RunResponse(
                    success=False,
                    error=f"OpenAI API error: {error_text}"
                )

async def call_anthropic_text(request: RunRequest, config: dict, api_key: str) -> RunResponse:
    """Call Anthropic text API"""
    headers = {
        "x-api-key": api_key,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01"
    }
    
    data = {
        "model": config["model_name"],
        "max_tokens": request.max_tokens,
        "temperature": request.temperature,
        "messages": [{"role": "user", "content": request.prompt}]
    }
    
    if request.system_prompt:
        data["system"] = request.system_prompt
    
    async with aiohttp.ClientSession() as session:
        async with session.post(config["endpoint"], headers=headers, json=data) as response:
            if response.status == 200:
                result = await response.json()
                return RunResponse(
                    success=True,
                    response=result["content"][0]["text"]
                )
            else:
                error_text = await response.text()
                return RunResponse(
                    success=False,
                    error=f"Anthropic API error: {error_text}"
                )

async def call_google_text(request: RunRequest, config: dict, api_key: str) -> RunResponse:
    """Call Google text API"""
    headers = {
        "Content-Type": "application/json"
    }
    
    data = {
        "contents": [{
            "parts": [{"text": request.prompt}]
        }],
        "generationConfig": {
            "temperature": request.temperature,
            "maxOutputTokens": request.max_tokens
        }
    }
    
    url = f"{config['endpoint']}?key={api_key}"
    
    async with aiohttp.ClientSession() as session:
        async with session.post(url, headers=headers, json=data) as response:
            if response.status == 200:
                result = await response.json()
                return RunResponse(
                    success=True,
                    response=result["candidates"][0]["content"]["parts"][0]["text"]
                )
            else:
                error_text = await response.text()
                return RunResponse(
                    success=False,
                    error=f"Google API error: {error_text}"
                )

async def call_xai_text(request: RunRequest, config: dict, api_key: str) -> RunResponse:
    """Call xAI text API"""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    messages = []
    if request.system_prompt:
        messages.append({"role": "system", "content": request.system_prompt})
    messages.append({"role": "user", "content": request.prompt})
    
    data = {
        "model": config["model_name"],
        "messages": messages,
        "temperature": request.temperature,
        "max_tokens": request.max_tokens,
        "stream": False
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(config["endpoint"], headers=headers, json=data) as response:
            if response.status == 200:
                result = await response.json()
                return RunResponse(
                    success=True,
                    response=result["choices"][0]["message"]["content"]
                )
            else:
                error_text = await response.text()
                return RunResponse(
                    success=False,
                    error=f"xAI API error: {error_text}"
                )

async def call_openai_image(request: RunRequest, config: dict, api_key: str) -> RunResponse:
    """Call OpenAI image API"""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": config["model_name"],
        "prompt": request.prompt,
        "n": 1,
        "size": "1024x1024"
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(config["endpoint"], headers=headers, json=data) as response:
            if response.status == 200:
                result = await response.json()
                return RunResponse(
                    success=True,
                    image_url=result["data"][0]["url"]
                )
            else:
                error_text = await response.text()
                return RunResponse(
                    success=False,
                    error=f"OpenAI Image API error: {error_text}"
                )

@app.get("/api/job/{job_id}", response_model=JobStatusResponse)
async def get_job_status(job_id: str):
    """Get the status of an async job (for image/video generation)"""
    
    # For now, return mock status
    # In production, this would check a database or queue system
    if job_id.startswith("mock_job_"):
        return JobStatusResponse(
            job_id=job_id,
            status="completed",
            result={"image_url": "https://via.placeholder.com/512x512/6366f1/ffffff?text=Generated+Image"}
        )
    elif job_id.startswith("video_job_"):
        return JobStatusResponse(
            job_id=job_id,
            status="processing"
        )
    else:
        raise HTTPException(status_code=404, detail="Job not found")

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
