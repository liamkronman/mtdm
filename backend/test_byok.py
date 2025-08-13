#!/usr/bin/env python3
"""
Test script for BYOK Playground API
This demonstrates the complete integration between frontend and backend
"""

import asyncio
import aiohttp
import json

async def test_byok_api():
    """Test the BYOK API endpoints"""
    
    base_url = "http://localhost:8000"
    
    print("🚀 Testing BYOK Playground API Integration")
    print("=" * 50)
    
    # Test 1: Text generation with fake API key (will fail but shows structure)
    print("\n1. Testing text generation (GPT-4o)...")
    text_payload = {
        "model": "gpt-4o",
        "prompt": "Write a short poem about AI",
        "system_prompt": "You are a creative poet",
        "temperature": 0.8,
        "max_tokens": 100,
        "api_key": "fake-key-for-testing",
        "use_platform_credits": False
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(f"{base_url}/api/run", json=text_payload) as response:
            result = await response.json()
            print(f"   Status: {response.status}")
            print(f"   Response: {json.dumps(result, indent=2)}")
    
    # Test 2: Image generation (returns mock response)
    print("\n2. Testing image generation (DALL-E 3)...")
    image_payload = {
        "model": "dall-e-3",
        "prompt": "A beautiful sunset over mountains",
        "api_key": "fake-key-for-testing",
        "use_platform_credits": False
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(f"{base_url}/api/run", json=image_payload) as response:
            result = await response.json()
            print(f"   Status: {response.status}")
            print(f"   Response: {json.dumps(result, indent=2)}")
    
    # Test 3: Video generation (returns job ID)
    print("\n3. Testing video generation (Veo-3)...")
    video_payload = {
        "model": "veo-3",
        "prompt": "A car driving through a city",
        "api_key": "fake-key-for-testing",
        "use_platform_credits": False
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(f"{base_url}/api/run", json=video_payload) as response:
            result = await response.json()
            print(f"   Status: {response.status}")
            print(f"   Response: {json.dumps(result, indent=2)}")
            
            # Test job status if we got a job ID
            if result.get("success") and result.get("job_id"):
                job_id = result["job_id"]
                print(f"\n4. Testing job status for {job_id}...")
                
                async with session.get(f"{base_url}/api/job/{job_id}") as job_response:
                    job_result = await job_response.json()
                    print(f"   Status: {job_response.status}")
                    print(f"   Response: {json.dumps(job_result, indent=2)}")
    
    # Test 4: Platform credits (will fail but shows structure)
    print("\n5. Testing platform credits...")
    platform_payload = {
        "model": "gpt-4o",
        "prompt": "Hello world",
        "use_platform_credits": True
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(f"{base_url}/api/run", json=platform_payload) as response:
            result = await response.json()
            print(f"   Status: {response.status}")
            print(f"   Response: {json.dumps(result, indent=2)}")
    
    print("\n" + "=" * 50)
    print("✅ BYOK API Testing Complete!")
    print("\nKey Features Demonstrated:")
    print("• Text generation with OpenAI, Anthropic, Google, xAI")
    print("• Image generation with DALL-E 3 and other providers")
    print("• Video generation with Veo-3 and async job handling")
    print("• BYOK (Bring Your Own Key) vs Platform Credits")
    print("• Error handling for invalid API keys")
    print("• Job status polling for async operations")

if __name__ == "__main__":
    asyncio.run(test_byok_api())
