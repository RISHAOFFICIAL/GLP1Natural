import { anthropic } from '@/lib/anthropic';
import { NextResponse } from 'next/server';
import { updateUserStats } from '@/lib/user-stats';

export async function POST(req: Request) {
  try {
    const { fiber, protein, prebiotic, probiotic } = await req.json();

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      system: `You are a warm, expert GLP-1 nutrition coach specializing in nutrient sequencing.
A user has selected ingredients for a meal. Generate a concise, encouraging "Metabolic Roadmap".
Always structure your response with these sections:
1. 🧬 THE SEQUENCE: Explain the order (Fiber -> Protein -> Starch) for these specific items and WHY it blunts glucose and triggers GLP-1.
2. ✨ METABOLIC WIN: Highlight the best synergy in their picks (e.g., "Kimchi + Fiber").
3. 💡 PRO TIP: A quick prep or lifestyle tip (e.g., "Walk 10 mins after this meal").

Rules:
- Be specific to the ingredients provided.
- Keep it under 150 words.
- Sound human and supportive, not like a textbook.`,
      messages: [
        {
          role: 'user',
          content: `Here are my picks:
- Fiber: ${fiber.join(', ') || 'None selected'}
- Protein: ${protein.join(', ') || 'None selected'}
- Pre/Probiotic: ${prebiotic.join(', ') || 'None selected'}`
        }
      ],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';

    // Update user stats (just a log)
    const { newAchievements } = await updateUserStats(undefined, 'meal-plan');

    return NextResponse.json({ plan: content, newAchievements });
  } catch (error) {
    console.error('Meal Plan Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
