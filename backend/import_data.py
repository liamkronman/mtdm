#!/usr/bin/env python3
"""
Import CSV data into PostgreSQL database
"""

import csv
import json
import os
import sys
from pathlib import Path
from datetime import datetime
from sqlalchemy.orm import Session

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.append(str(backend_dir))

from database import SessionLocal, Prompt, PromptMetric, User, engine
from sqlalchemy import text

def parse_json_field(json_str):
    """Parse JSON field from CSV, handling both string and dict formats"""
    if not json_str or json_str.strip() == '':
        return {}
    
    try:
        # Try to parse as JSON
        return json.loads(json_str)
    except json.JSONDecodeError:
        # If it's not valid JSON, return as empty dict
        return {}

def parse_tags(tags_str):
    """Parse tags from string format"""
    if not tags_str or tags_str.strip() == '':
        return []
    
    try:
        # Try to parse as JSON array
        tags = json.loads(tags_str)
        if isinstance(tags, list):
            return tags
    except json.JSONDecodeError:
        pass
    
    # If not JSON, split by comma
    return [tag.strip() for tag in tags_str.split(',') if tag.strip()]

def parse_metrics(metrics_text):
    """Parse metrics from text like '14k likes, 8026 comments'"""
    if not metrics_text:
        return {}
    
    metrics = {}
    
    # Extract numbers from text
    if 'likes' in metrics_text:
        likes_match = metrics_text.split('likes')[0].strip()
        if likes_match.endswith('k'):
            metrics['likes'] = int(float(likes_match[:-1]) * 1000)
        else:
            try:
                metrics['likes'] = int(likes_match)
            except ValueError:
                metrics['likes'] = 0
    
    if 'comments' in metrics_text:
        comments_match = metrics_text.split('comments')[0].split(',')[-1].strip()
        try:
            metrics['comments'] = int(comments_match)
        except ValueError:
            metrics['comments'] = 0
    
    return metrics

def import_csv_data():
    """Import data from CSV file into database"""
    csv_path = backend_dir / "data" / "pronto_prompts_metrics.csv"
    
    if not csv_path.exists():
        print(f"❌ CSV file not found: {csv_path}")
        return
    
    db = SessionLocal()
    
    try:
        print("📊 Importing CSV data into database...")
        
        with open(csv_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            for row in reader:
                # Parse the prompt text (JSON structure)
                prompt_data = parse_json_field(row['prompt_text'])
                
                # Extract description from JSON or use title as fallback
                description = prompt_data.get('description', row['title'])
                
                # Parse tags
                tags = parse_tags(row['tags'])
                
                # Parse metrics
                metrics = parse_metrics(row['latest_metrics_text'])
                
                # Create prompt record
                prompt = Prompt(
                    id=row['id'],
                    title=row['title'],
                    prompt_text=row['prompt_text'],  # Keep full JSON
                    model=row['model'],
                    output_type=row['output_type'],
                    tags=tags,
                    source_url=row['source_url'],
                    attribution=row['attribution'],
                    image_url=row['image_url'] if row['image_url'] else None,
                    submitted_by=None,  # Admin uploaded, no user
                    created_at=datetime.fromisoformat(row['created_at'].replace('Z', '+00:00'))
                )
                
                # Add to database
                db.add(prompt)
                
                # Add metrics if available
                if metrics:
                    metric = PromptMetric(
                        prompt_id=row['id'],
                        provider='instagram',  # Default from attribution
                        metric_date=datetime.now().date(),
                        views=int(row['latest_views']) if row['latest_views'] else 0,
                        likes=metrics.get('likes', 0),
                        shares=0,  # Not in CSV
                        comments=metrics.get('comments', 0)
                    )
                    db.add(metric)
                
                print(f"✅ Imported: {row['title']} ({row['model']})")
            
            # Commit all changes
            db.commit()
            print(f"🎉 Successfully imported {reader.line_num - 1} prompts!")
            
    except Exception as e:
        db.rollback()
        print(f"❌ Error importing data: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    import_csv_data()
