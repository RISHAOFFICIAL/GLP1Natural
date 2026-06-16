import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all achievements and user earned achievements
    const [achievementsRes, userAchievementsRes] = await Promise.all([
      supabase.from('achievements').select('*'),
      supabase.from('user_achievements').select('*, achievements(*)').eq('user_id', user.id)
    ]);

    if (achievementsRes.error) throw achievementsRes.error;
    if (userAchievementsRes.error) throw userAchievementsRes.error;

    return NextResponse.json({
      all: achievementsRes.data,
      earned: userAchievementsRes.data.map(ua => ({
        ...ua.achievements,
        earned_at: ua.earned_at
      }))
    });
  } catch (error) {
    console.error('Achievements GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
