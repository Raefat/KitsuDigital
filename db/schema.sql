-- Blog storage. Run once against your DATABASE_URL:
--   psql "$DATABASE_URL" -f db/schema.sql
-- or paste into the Neon/Supabase SQL editor.

CREATE TABLE IF NOT EXISTS posts (
  id          BIGSERIAL PRIMARY KEY,
  slug        TEXT        NOT NULL UNIQUE,
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL DEFAULT '',
  body        TEXT        NOT NULL DEFAULT '',
  author      TEXT        NOT NULL DEFAULT 'Kitsu Digital',
  tags        TEXT[]      NOT NULL DEFAULT '{}',
  featured    BOOLEAN     NOT NULL DEFAULT FALSE,
  published   BOOLEAN     NOT NULL DEFAULT FALSE,
  -- The date shown to readers and emitted in structured data. Separate from
  -- created_at so a post can be backdated or its publish date corrected.
  published_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- The public blog lists published posts newest-first; this is the only hot read.
CREATE INDEX IF NOT EXISTS posts_published_idx
  ON posts (published, published_at DESC);
