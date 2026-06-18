import { createClient } from './supabase-server';

export async function getUserStreak(userId: string): Promise<number> {
  const supabase = await createClient();
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('current_streak, last_log_date')
    .eq('id', userId)
    .single();

  if (error || !profile) return 0;

  const lastLogDate = profile.last_log_date;
  if (!lastLogDate) return 0;

  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // If the last log was today or yesterday, the streak is still active
  if (lastLogDate === today || lastLogDate === yesterdayStr) {
    return profile.current_streak || 0;
  }

  // Otherwise, the streak has broken
  return 0;
}

export async function updateUserStats(score?: number, type: string = 'scan-food') {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: 'Unauthorized' };
  }

  // Create activity log
  await supabase.from('user_logs').insert({
    user_id: user.id,
    log_type: type,
    score: score || null
  });

  // Get current profile or create it if missing
  let { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError && profileError.code === 'PGRST116') {
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, username: user.email?.split('@')[0] }])
      .select()
      .single();
    
    if (createError) {
      console.error('Error creating profile:', createError);
      return { error: 'Failed to create profile' };
    }
    profile = newProfile;
  } else if (profileError) {
    console.error('Error fetching profile:', profileError);
    return { error: 'Profile not found' };
  }

  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const lastLogDate = profile.last_log_date;
  
  let newStreak = profile.current_streak || 0;
  let newTotalLogs = (profile.total_logs || 0) + 1;
  let newBestGLP1Score = profile.best_glp1_score || 0;

  if (score && score > newBestGLP1Score) {
    newBestGLP1Score = score;
  }

  if (!lastLogDate) {
    newStreak = 1;
  } else if (lastLogDate === today) {
    // Already logged today, streak remains the same
  } else if (lastLogDate === yesterdayStr) {
    newStreak += 1;
  } else {
    // Gap in logging
    newStreak = 1;
  }

  const newBestStreak = Math.max(newStreak, profile.best_streak || 0);

  // Update profile
  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      total_logs: newTotalLogs,
      current_streak: newStreak,
      best_streak: newBestStreak,
      best_glp1_score: newBestGLP1Score,
      last_log_date: today,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id);

  if (updateError) {
    console.error('Error updating profile:', updateError);
    return { error: 'Failed to update stats' };
  }

  // Check achievements
  const newAchievements = await checkAchievements(user.id, {
    total_logs: newTotalLogs,
    streak: newStreak,
    best_glp1_score: newBestGLP1Score
  });

  return { 
    success: true, 
    stats: { total_logs: newTotalLogs, streak: newStreak, best_score: newBestGLP1Score },
    newAchievements
  };
}

async function checkAchievements(userId: string, stats: { total_logs: number, streak: number, best_glp1_score: number }) {
  const supabase = await createClient();
  const newlyEarned = [];

  // Get all achievements
  const { data: achievements, error: achError } = await supabase
    .from('achievements')
    .select('*');

  if (achError || !achievements) return [];

  // Get user's current achievements
  const { data: userAchievements, error: userAchError } = await supabase
    .from('user_achievements')
    .select('achievement_id')
    .eq('user_id', userId);

  if (userAchError) return [];

  const earnedIds = new Set(userAchievements.map(ua => ua.achievement_id));

  for (const ach of achievements) {
    if (earnedIds.has(ach.id)) continue;

    let earned = false;
    if (ach.criteria_type === 'total_logs' && stats.total_logs >= ach.criteria_value) {
      earned = true;
    } else if (ach.criteria_type === 'streak' && stats.streak >= ach.criteria_value) {
      earned = true;
    } else if (ach.criteria_type === 'best_glp1_score' && stats.best_glp1_score >= ach.criteria_value) {
      earned = true;
    }

    if (earned) {
      const { error: insertError } = await supabase.from('user_achievements').insert({
        user_id: userId,
        achievement_id: ach.id
      });
      
      if (!insertError) {
        newlyEarned.push(ach);
      }
    }
  }

  return newlyEarned;
}
