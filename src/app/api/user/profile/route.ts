import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { getUserStreak } from '@/lib/user-stats';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      // If profile doesn't exist, create one
      if (profileError.code === 'PGRST116') {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, username: user.email?.split('@')[0] }])
          .select()
          .single();
        
        if (createError) throw createError;
        return NextResponse.json(newProfile);
      }
      throw profileError;
    }

    // Ensure streak is accurate
    const activeStreak = await getUserStreak(user.id);
    profile.current_streak = activeStreak;

    // Fetch achievements
    const { data: achievements } = await supabase
      .from('user_achievements')
      .select('*, achievement:achievements(*)')
      .eq('user_id', user.id);

    const formattedAchievements = achievements?.map(ua => ({
      ...ua.achievement,
      earned_at: ua.earned_at
    })) || [];

    return NextResponse.json({ ...profile, achievements: formattedAchievements });
  } catch (error) {
    console.error('Profile GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await req.json();
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Profile PATCH Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
