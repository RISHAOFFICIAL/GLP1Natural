-- Initial Schema for GLP-1 Natural Gamification & Social

-- Profiles Table (Extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  
  -- Statistics
  total_logs INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  best_glp1_score INTEGER DEFAULT 0,
  last_log_date DATE,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Achievements Table (Master List)
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  criteria_type TEXT NOT NULL, -- 'streak', 'total_logs', 'scan_count', etc.
  criteria_value INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User Achievements (Earned)
CREATE TABLE public.user_achievements (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, achievement_id)
);

-- Follows (Social)
CREATE TABLE public.follows (
  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (follower_id, following_id),
  CONSTRAINT cannot_follow_self CHECK (follower_id <> following_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Everyone can see, only owner can update
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Achievements: Everyone can see
CREATE POLICY "Achievements are viewable by everyone" ON public.achievements FOR SELECT USING (true);

-- User Achievements: Everyone can see, only system/owner can earn (simplified for now)
CREATE POLICY "User achievements are viewable by everyone" ON public.user_achievements FOR SELECT USING (true);

-- Follows: Everyone can see, only owner can follow/unfollow
CREATE POLICY "Follows are viewable by everyone" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Users can follow others" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow others" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- Insert some initial achievements
INSERT INTO public.achievements (title, description, criteria_type, criteria_value) VALUES
('First Log', 'Log your first meal to start your journey.', 'total_logs', 1),
('Fiber First', 'Log 10 meals with fiber vegetables.', 'total_logs', 10),
('Consistency King', 'Maintain a 7-day log streak.', 'streak', 7),
('Metabolic Master', 'Maintain a 30-day log streak.', 'streak', 30),
('Perfect Score', 'Achieve a GLP-1 score of 100.', 'best_glp1_score', 100);
