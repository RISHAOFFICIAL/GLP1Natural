-- Table for tracking daily user activity logs
CREATE TABLE public.user_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  log_type TEXT NOT NULL, -- 'scan-food', 'scan-label', 'scan-text', 'meal-moment', 'meal-plan'
  score INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for faster streak calculation and history lookup
CREATE INDEX idx_user_logs_user_id_created_at ON public.user_logs(user_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.user_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own logs" ON public.user_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own logs" ON public.user_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add more achievements
INSERT INTO public.achievements (title, description, criteria_type, criteria_value) VALUES
('Swap Star', 'Use the Custom Swap tool 5 times.', 'total_logs', 5),
('Metabolic Voyager', 'Log 50 metabolic moments.', 'total_logs', 50),
('Century Club', 'Log 100 meals or scans.', 'total_logs', 100);
