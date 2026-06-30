import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!query) {
      return NextResponse.json([]);
    }

    // Search for users by username or full_name
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, bio, current_streak')
      .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
      .neq('id', user.id) // Don't include the current user in search results
      .range(offset, offset + limit - 1)
      .order('current_streak', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('User Search Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
