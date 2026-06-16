import { anthropic } from '@/lib/anthropic';
import { NextResponse } from 'next/server';
import { updateUserStats } from '@/lib/user-stats';

const SCAN_SYSTEM_PROMPT = `You are a metabolic health expert. Analyze the provided food photo. Identify the food items and estimate their metabolic impact.
Return a JSON response matching this structure:
{
  "verdict": "GREEN | YELLOW | RED",
  "score": 0-100,
  "title": "short verdict phrase",
  "subtitle": "one sentence summary",
  "ingredients": [
    { "name": "ingredient", "status": "✅|⚠️|🚫", "note": "brief reason", "flag": "green|yellow|red" }
  ],
  "swaps": [
    { "avoid": "problematic item", "upgrade": "whole food swap", "why": "one line reason" }
  ],
  "recommendation": "2-3 sentences of practical advice"
}

Scoring rules:
Starts at 100
-8 per yellow ingredient
-20 per red ingredient
GREEN >= 75 | YELLOW 45–74 | RED < 45

Red flag ingredients (always flag): Soybean oil, canola oil, sunflower oil, cottonseed oil, artificial sweeteners (aspartame, sucralose, acesulfame-K), high fructose corn syrup, carrageenan, polysorbate 80, artificial colors/dyes, sodium benzoate, BHA, BHT, MSG, trans fats, partially hydrogenated oils`;

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 2000,
      system: SCAN_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: 'Analyze this food photo.',
            },
          ],
        },
      ],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    const data = JSON.parse(content);

    // Update user stats with the score
    await updateUserStats(data.score);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Scan Food Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
