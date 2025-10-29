# Diary Insights

An AI-powered web application that analyzes your diary entries to discover hidden patterns, themes, and insights using Claude AI.

## Features

- 📝 **Multiple Input Methods**: Paste text, type entries, or upload text files
- 🤖 **AI-Powered Analysis**: Uses Claude 3.5 Sonnet to analyze your entries
- 🎯 **Deep Insights**: Discovers emotional patterns, recurring themes, personal growth, and more
- 🎨 **Beautiful UI**: Clean, modern interface built with Tailwind CSS
- 🔒 **Private**: Your entries are only sent to Claude API for analysis

## What Insights You'll Get

1. **Emotional Patterns** - Recurring emotions and triggers
2. **Themes** - Topics and concerns that come up repeatedly
3. **Personal Growth** - Changes and evolution over time
4. **Behavioral Patterns** - Habits and routines
5. **Relationships** - How you relate to others
6. **Values & Priorities** - What matters most to you
7. **Hidden Insights** - Patterns you might not be aware of
8. **Suggestions** - Constructive advice based on your patterns

## Setup

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Get Your Claude API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key

### 3. Configure Environment Variables

Edit the \`.env.local\` file and add your API key:

\`\`\`
ANTHROPIC_API_KEY=your_actual_api_key_here
\`\`\`

### 4. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Add Entries**: Choose your preferred input method:
   - **Paste Text**: Copy multiple entries separated by \`---\`
   - **Type Entry**: Write one entry at a time
   - **Upload Files**: Select .txt or .md files

2. **Review Entries**: Check that all your entries are added correctly

3. **Analyze**: Click "Analyze" and wait for Claude to process your entries

4. **Read Insights**: Review the comprehensive analysis and insights

## Tips for Best Results

- Add at least 5-10 entries for meaningful patterns
- Include entries from different time periods
- Be authentic in your writing
- Mix different types of entries (good days, bad days, reflections, etc.)

## Technology Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: Claude 3.5 Sonnet via Anthropic API
- **Runtime**: Node.js

## Privacy & Security

- Your diary entries are only sent to the Anthropic API for analysis
- No entries are stored on our servers
- All analysis happens in real-time
- Consider your API key as sensitive and never commit it to version control

## Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## License

MIT

## Support

If you encounter any issues, please check:
1. Your API key is correctly set in \`.env.local\`
2. You have an active internet connection
3. Your Anthropic account has available credits

---

Built with ❤️ using Claude AI
