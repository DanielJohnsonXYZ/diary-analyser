import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { entries } = await request.json();

    if (!entries || !Array.isArray(entries) || entries.length === 0) {
      return NextResponse.json(
        { error: 'No diary entries provided' },
        { status: 400 }
      );
    }

    // Combine all entries with dates/markers
    const combinedEntries = entries.map((entry, index) => {
      return `Entry ${index + 1}:\n${entry}\n`;
    }).join('\n---\n\n');

    // Create the analysis prompt
    const prompt = `You are an insightful journal analyst. I'm going to share ${entries.length} diary entries with you. Please analyze them deeply and provide comprehensive insights about:

1. **Emotional Patterns**: What emotions appear most frequently? Are there emotional cycles or triggers?

2. **Recurring Themes**: What topics, concerns, or interests come up repeatedly?

3. **Personal Growth**: What changes or evolution do you notice over time? What progress or setbacks?

4. **Behavioral Patterns**: Are there habits, routines, or behaviors that emerge?

5. **Relationships**: What patterns emerge in how the person relates to others?

6. **Values & Priorities**: What seems to matter most to this person based on what they write about?

7. **Hidden Insights**: What patterns might the writer not be consciously aware of?

8. **Suggestions**: Based on the patterns, what constructive suggestions would you offer?

Here are the diary entries:

${combinedEntries}

Please provide a thorough, compassionate analysis that helps the writer understand themselves better. Be specific and reference patterns you notice. Format your response in a clear, organized way with headers for each section.`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract the text content
    const insights = message.content[0].type === 'text' 
      ? message.content[0].text 
      : 'Unable to generate insights';

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Error analyzing diary entries:', error);
    return NextResponse.json(
      { error: 'Failed to analyze diary entries' },
      { status: 500 }
    );
  }
}
