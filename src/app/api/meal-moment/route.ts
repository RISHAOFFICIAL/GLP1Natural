import { anthropic } from '@/lib/anthropic';
import { NextResponse } from 'next/server';
import { updateUserStats } from '@/lib/user-stats';

export async function POST(req: Request) {
  try {
    const { messages, userMessage } = await req.json();

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      system: `You are a warm, direct metabolic health coach specializing in natural GLP-1 stimulation and anti-inflammatory eating. Someone is asking about food they just ate, saw, or are considering.
Give an instant, honest, friendly verdict like a knowledgeable friend texting back. No lectures. No moralizing.

Always structure your response as JSON:
{
  "verdict": "[GREEN] | [YELLOW] | [RED]",
  "feedback": "2-4 sentences of warm, specific feedback",
  "upgradeTip": "One quick upgrade tip starting with 💡 (only if YELLOW or RED, else null)",
  "buyIngredients": ["Ingredient 1", "Ingredient 2"] (List 1-2 key healthy ingredients mentioned or related whole-food swaps)
}

Rules:
- GREEN: whole foods, fiber-rich, anti-inflammatory, probiotic, prebiotic, quality proteins/fats
- YELLOW: mostly okay, one or two things to watch
- RED: seed oils, artificial sweeteners, ultra-processed, HFCS, refined carbs as main component
- Be specific about WHY something affects GLP-1 and inflammation
- Keep feedback under 100 words. Sound human, not clinical.`,
      messages: [
        ...messages,
        { role: 'user', content: userMessage }
      ],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    const data = JSON.parse(content);

    // Update user stats (no score for chat, just a log)
    await updateUserStats();

    return NextResponse.json({ 
      verdict: data.verdict.replace('[', '').replace(']', ''), 
      text: data.feedback + (data.upgradeTip ? '\n\n' + data.upgradeTip : ''),
      buyIngredients: data.buyIngredients || []
    });
  } catch (error) {
    console.error('Meal Moment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
