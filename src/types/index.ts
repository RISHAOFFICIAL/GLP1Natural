export type Verdict = 'GREEN' | 'YELLOW' | 'RED';

export interface ScanResult {
  verdict: Verdict;
  score: number;
  title: string;
  subtitle: string;
  ingredients: {
    name: string;
    status: string; // emoji
    note: string;
    flag: 'green' | 'yellow' | 'red';
  }[];
  swaps: {
    avoid: string;
    upgrade: string;
    why: string;
  }[];
  recommendation: string;
  newAchievements?: Achievement[];
}

export interface MealMomentResponse {
  verdict: Verdict;
  text: string;
  buyIngredients: string[];
  newAchievements?: Achievement[];
}

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  total_logs: number;
  current_streak: number;
  best_streak: number;
  best_glp1_score: number;
  last_log_date: string | null;
  created_at: string;
  updated_at: string;
  achievements?: UserAchievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon_url: string | null;
  criteria_type: string;
  criteria_value: number;
}

export interface UserAchievement extends Achievement {
  earned_at: string;
}
