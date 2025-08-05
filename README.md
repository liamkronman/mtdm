# 🪄 Pronto

**Pronto** is the fastest way to discover, share, and run AI prompts—from viral fanfics and scifi scripts to Instagram reels and AI companions. Browse curated or scraped prompts, try them instantly on models like GPT-4o and Claude, and remix or contribute your own.

---

## 🏗️ Architecture Overview

Pronto is a full-stack platform built to scale with a community of prompt explorers, remixers, and creators.

### 🔋 Stack

- **Frontend**: Next.js + Tailwind CSS  
- **Backend**: FastAPI (Python)  
- **Database**: PostgreSQL + SQLAlchemy  
- **Scraping**: Reddit API + Puppeteer/X scraping  
- **API Proxy**: OpenAI, Anthropic, Google Gemini, etc.  
- **Hosting**: Vercel (Frontend), Railway/Fly.io (Backend), Supabase/Render (DB)  
- **Auth**: JWT-based login/signup  
- **Monorepo Management**: (optional) TurboRepo or Nx  

---

## 🗃️ Database Schema

### `users`

| Column                  | Type      | Description                      |
|------------------------|-----------|----------------------------------|
| id                     | INT       | Primary Key                      |
| username               | TEXT      | Unique                           |
| email                  | TEXT      | Optional                         |
| password_hash          | TEXT      | Hashed password                  |
| account_type           | TEXT      | free / premium / curator         |
| model_credits_remaining| INT       | Daily/weekly usage quota         |
| created_at             | TIMESTAMP | Default now                      |

### `prompts`

| Column         | Type      |
|----------------|-----------|
| id             | INT       |
| title          | TEXT      |
| prompt_text    | TEXT      |
| output_type    | TEXT      |
| model_type     | TEXT[]    |
| tags           | TEXT[]    |
| source_url     | TEXT      |
| submitted_by   | INT (FK)  |
| created_at     | TIMESTAMP |

### `interactions`

| Column           | Type      |
|------------------|-----------|
| id               | INT       |
| user_id          | INT (FK)  |
| prompt_id        | INT (FK)  |
| model_used       | TEXT      |
| output_generated | TEXT      |
| timestamp        | TIMESTAMP |

---

## 🧱 Project Structure

pronto/
├── frontend/ # Next.js + Tailwind app
├── backend/ # FastAPI app (routes, LLM API proxy, auth)
├── scraper/ # Reddit + X scraping and cleaning
├── database/
│ ├── schema.sql # SQL schema
│ └── migrations/
├── .env.example # API keys and config
└── README.md

---

## 🚀 Core Features

- 🔍 Explore prompts by type (fanfic, video, AI companion, etc.)
- 🧠 Filter by model: GPT-4o, Claude, Veo, Gemini, etc.
- ⚡ Try prompts instantly with rate-limited API calls
- ✍️ Submit your own prompts or fork existing ones
- 💬 Comment on and upvote prompts
- 🤖 Attribution for scraped content from Reddit/X
- 💸 Light monetization: credits system with referral and upgrade path

---

## ⚙️ Development Setup

### 1. Clone + Install

```bash
git clone https://github.com/your-org/pronto.git
cd pronto
```

### 2. Backend (FastAPI)
```cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend (Next.js)
```cd frontend
npm install
npm run dev
```

### 4. Database (PostgreSQL)
```# Set up DB and run schema.sql
psql -U postgres -f database/schema.sql
```

### 5. Environment Variables

Create .env files in both frontend/ and backend/, based on .env.example. Include:

```OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
DATABASE_URL=...
JWT_SECRET=...
```