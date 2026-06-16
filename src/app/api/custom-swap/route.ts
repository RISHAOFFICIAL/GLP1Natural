import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { craving } = await req.json();

    if (!craving) {
      return NextResponse.json({ error: 'Craving is required' }, { status: 400 });
    }

    const prompt = `You are the GLP-1 Natural Metabolic Guide. A user is craving: "${craving}".
    
    1. Explain the NEUROSCIENCE behind this craving in 1-2 sentences. (e.g., dopamine reward, blood sugar crash, mineral deficiency).
    2. Provide 1-2 specific WHOLE-FOOD SWAPS that naturally stimulate GLP-1 and satisfy the same sensory profile (crunchy, salty, sweet, etc.).
    3. Explain WHY these swaps work metabolically.
    
    Keep the tone science-backed, encouraging, and clear.
    Return the response in a clean JSON format:
    {
      "neuroscience": "...",
      "swaps": [
        { "name": "...", "why": "..." }
      ]
    }`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    const data = JSON.parse(content);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Custom Swap Error:', error);
    return NextResponse.json({ error: 'Failed to generate swap' }, { status: 500 });
  }
}
