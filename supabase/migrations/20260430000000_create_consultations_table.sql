CREATE TABLE IF NOT EXISTS public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 사용자 정보
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT,
  company_size TEXT,
  message TEXT,

  -- 신청 설정
  want_consultation BOOLEAN DEFAULT FALSE,
  want_newsletter BOOLEAN DEFAULT FALSE,

  -- 진단 데이터
  industry TEXT NOT NULL DEFAULT 'direct',
  total_score INTEGER NOT NULL DEFAULT 0,
  level TEXT NOT NULL DEFAULT '',
  category_scores JSONB NOT NULL DEFAULT '{}',
  ai_report JSONB NOT NULL DEFAULT '{}',
  answers JSONB NOT NULL DEFAULT '[]',

  -- 메타
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_consultations_created ON public.consultations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON public.consultations (status);

-- RLS: Edge function uses service role key, no client access needed
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
