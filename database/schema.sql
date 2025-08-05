CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    password_hash TEXT,
    account_type TEXT DEFAULT 'free',
    model_credits_remaining INT DEFAULT 20,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    prompt_text TEXT NOT NULL,
    output_type TEXT,
    model_type TEXT[],
    tags TEXT[],
    source_url TEXT,
    submitted_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
