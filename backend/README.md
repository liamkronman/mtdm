# Pronto Backend

FastAPI backend with PostgreSQL database for the Pronto prompt sharing platform.

## Database Setup

### 1. Install PostgreSQL

Make sure PostgreSQL is installed and running on your system.

### 2. Create Database

```sql
CREATE DATABASE pronto;
```

### 3. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/pronto

# Example DATABASE_URL formats:
# Local development: postgresql://user:password@localhost:5432/pronto
# With SSL: postgresql://user:password@localhost:5432/pronto?sslmode=require
# Cloud database: postgresql://user:password@host:5432/database?sslmode=require

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=true
```

### 5. Initialize Database

```bash
python setup_db.py
```

### 6. Run the Server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Database Schema

The database includes two main tables:

### `prompts` table
- `id` (TEXT, PRIMARY KEY): Stable slug identifier
- `title` (TEXT): Prompt title
- `prompt_text` (TEXT, NOT NULL): Full prompt content
- `model` (TEXT, NOT NULL): AI model used (e.g., 'Veo-3', 'GPT-4o')
- `output_type` (TEXT): Type of output ('video', 'image', 'text', 'music')
- `tags` (TEXT[]): Array of tags
- `source_url` (TEXT): Link to original post
- `attribution` (TEXT): Attribution info (e.g., "Instagram (@evolving.ai)")
- `image_url` (TEXT): Preview image URL
- `created_at` (TIMESTAMPTZ): Creation timestamp

### `prompt_metrics` table
- `prompt_id` (TEXT): References prompts.id
- `provider` (TEXT): Platform ('instagram', 'x', 'tiktok', etc.)
- `metric_date` (DATE): Date of metrics
- `views` (BIGINT): View count
- `likes` (BIGINT): Like count
- `shares` (BIGINT): Share count
- `comments` (BIGINT): Comment count

## API Endpoints

- `GET /`: Health check
- More endpoints to be added for CRUD operations on prompts and metrics
