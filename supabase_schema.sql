-- SQL Database Schema for AutoEscola Smart

-- 1. Create Public Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Primeira Habilitação (A+B)',
  level INTEGER NOT NULL DEFAULT 1,
  xp INTEGER NOT NULL DEFAULT 0,
  xp_needed_for_next_level INTEGER NOT NULL DEFAULT 600,
  total_exams_completed INTEGER NOT NULL DEFAULT 0,
  high_score_game INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to allow safe re-runs)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Create Exam History Table
CREATE TABLE IF NOT EXISTS public.exam_history (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  date TEXT NOT NULL,
  correct_count INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  score_percentage INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for exam history
ALTER TABLE public.exam_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own exam history" ON public.exam_history;
DROP POLICY IF EXISTS "Users can insert their own exam history" ON public.exam_history;
DROP POLICY IF EXISTS "Users can update/delete their own exam history" ON public.exam_history;

CREATE POLICY "Users can view their own exam history" ON public.exam_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exam history" ON public.exam_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update/delete their own exam history" ON public.exam_history
  FOR ALL USING (auth.uid() = user_id);

-- 3. Create Unlocked Achievements Table
CREATE TABLE IF NOT EXISTS public.unlocked_achievements (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TEXT NOT NULL,
  PRIMARY KEY (user_id, achievement_id)
);

-- Enable RLS for achievements
ALTER TABLE public.unlocked_achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own achievements" ON public.unlocked_achievements;
DROP POLICY IF EXISTS "Users can insert their own achievements" ON public.unlocked_achievements;

CREATE POLICY "Users can view their own achievements" ON public.unlocked_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" ON public.unlocked_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Setup trigger to automatically create profiles for new auth users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, category, level, xp, xp_needed_for_next_level, total_exams_completed, high_score_game)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', 'Aluno Provisório'),
    COALESCE(new.raw_user_meta_data->>'category', 'Primeira Habilitação (A+B)'),
    1,
    0,
    600,
    0,
    0
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
