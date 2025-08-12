-- users table (existing)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    password_hash TEXT,
    account_type TEXT DEFAULT 'free',
    model_credits_remaining INT DEFAULT 20,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- core prompts
CREATE TABLE prompts (
  id TEXT PRIMARY KEY,                     -- slug (stable ID)
  title TEXT,
  prompt_text TEXT NOT NULL,               -- full prompt
  model TEXT NOT NULL,                     -- e.g. 'Veo-3', 'GPT-4o', 'Higgsfield AI'
  output_type TEXT,                        -- 'video' | 'image' | 'text' | 'music'
  tags TEXT[] DEFAULT '{}',
  source_url TEXT,                         -- link to post
  attribution TEXT,                        -- "Instagram (@evolving.ai)"
  image_url TEXT,
  submitted_by INT REFERENCES users(id),   -- link to user who submitted
  created_at TIMESTAMPTZ DEFAULT now()
);

-- soft analytics you can update in real time
CREATE TABLE prompt_metrics (
  prompt_id TEXT REFERENCES prompts(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,                  -- 'instagram', 'x', 'tiktok', etc
  metric_date DATE NOT NULL,
  views BIGINT,
  likes BIGINT,
  shares BIGINT,
  comments BIGINT,
  PRIMARY KEY (prompt_id, provider, metric_date)
);

-- helpful indexes
CREATE INDEX idx_prompts_model ON prompts(model);
CREATE INDEX idx_prompts_output_type ON prompts(output_type);
CREATE INDEX idx_prompts_submitted_by ON prompts(submitted_by);
CREATE INDEX idx_metrics_prompt ON prompt_metrics(prompt_id);
