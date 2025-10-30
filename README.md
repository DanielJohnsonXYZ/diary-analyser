# 📔 Diary Insights

> Transform your diary entries into meaningful insights using AI-powered analysis

An elegant web application that analyzes your personal diary entries to uncover emotional patterns, recurring themes, and hidden insights using Claude AI.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Claude AI](https://img.shields.io/badge/Claude-3.5%20Sonnet-8b5cf6?style=flat-square)](https://www.anthropic.com/)

## ✨ Features

### 🎯 Core Functionality
- **Multiple Input Methods**: Paste bulk text, type individual entries, or upload text/markdown files
- **AI-Powered Analysis**: Leverages Claude 3.5 Sonnet for deep psychological insights
- **Smart Entry Parsing**: Automatically separates multiple entries using common delimiters
- **Real-time Processing**: Get comprehensive analysis within seconds

### 💡 Insight Categories
The AI analyzes your entries across 8 dimensions:

1. **Emotional Patterns** - Recurring emotions, triggers, and mood cycles
2. **Recurring Themes** - Topics and concerns that appear frequently
3. **Personal Growth** - Evolution, progress, and development over time
4. **Behavioral Patterns** - Habits, routines, and behavioral tendencies
5. **Relationships** - How you interact with and relate to others
6. **Values & Priorities** - What matters most based on your writing
7. **Hidden Insights** - Unconscious patterns you might not notice
8. **Actionable Suggestions** - Constructive advice based on your patterns

### 🚀 Enhanced User Experience
- **Export Options**: Download insights as Markdown, JSON, or plain text
- **Auto-Save Drafts**: Entries automatically saved to local storage
- **Demo Mode**: Try the app with realistic sample entries
- **Character Counter**: Real-time feedback on entry length
- **Accessibility**: Full ARIA labels and keyboard navigation support
- **Error Boundaries**: Graceful error handling and recovery
- **Beautiful UI**: Modern gradient design with smooth animations
- **Mobile Responsive**: Works seamlessly on all device sizes

## 🎨 Screenshots

> Note: Add screenshots here showing the main interface, analysis results, and export options

## 🚦 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Anthropic API Key** ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DanielJohnsonXYZ/diary-analyser.git
   cd diary-analyser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your API key:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Adding Entries

#### Method 1: Paste Multiple Entries
1. Click **"Paste Text"**
2. Paste your entries separated by `---` on a new line
3. Click **"Parse Multiple Entries"**

Example format:
```
Today was a great day. I finally finished my project.
---
Feeling stressed about upcoming deadlines.
---
Had an insightful conversation with a friend.
```

#### Method 2: Type Individual Entries
1. Click **"Type Entry"**
2. Write your diary entry
3. Click **"Add Entry"**
4. Repeat for more entries

#### Method 3: Upload Files
1. Click **"Upload Files"**
2. Select one or more `.txt` or `.md` files
3. Files are automatically added to your entries

### Try Demo Mode
Click **"Try Demo"** to load 10 realistic sample entries and see how the analysis works.

### Analyzing Entries
1. Add at least 1 entry (5-10 recommended for best results)
2. Review your entries in the list
3. Click **"Analyze X Entries"**
4. Wait for Claude AI to process (usually 10-30 seconds)

### Exporting Results
Once analysis is complete:
1. Click the **"Export"** button
2. Choose your format:
   - **Copy to Clipboard**: Quick copy for pasting elsewhere
   - **Markdown**: Formatted text with headers
   - **Text**: Plain text format
   - **JSON**: Structured data format

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Claude 3.5 Sonnet** | AI analysis via Anthropic API |
| **Local Storage API** | Client-side draft persistence |

## 🔒 Privacy & Security

- **No Server Storage**: Your diary entries are never stored on any server
- **Direct API Communication**: Entries sent only to Anthropic's API for analysis
- **Local Drafts**: Draft entries saved only in your browser's local storage
- **No Tracking**: No analytics or third-party tracking scripts
- **API Key Security**: Your API key stays in your environment variables

> **Important**: Never commit your `.env.local` file to version control. The file is already in `.gitignore`.

## 💡 Tips for Best Results

### Writing Quality
- **Be Authentic**: Write naturally without filtering your thoughts
- **Add Context**: Include dates, events, and circumstances
- **Vary Content**: Mix different types of entries (good days, bad days, reflections)

### Entry Quantity
- **Minimum**: 1 entry (will provide basic insights)
- **Recommended**: 5-10 entries for meaningful patterns
- **Optimal**: 10+ entries from different time periods

### Entry Length
- **Short entries**: 50-200 words are fine
- **Medium entries**: 200-500 words ideal for detail
- **Long entries**: Up to 10,000 characters per entry supported

## 📦 Building for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

For deployment, consider:
- [Vercel](https://vercel.com/) (Recommended for Next.js)
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- Self-hosted with Docker

### Environment Variables in Production
Make sure to set `ANTHROPIC_API_KEY` in your deployment platform's environment variables.

## 🐛 Troubleshooting

### "Failed to analyze entries"
- ✅ Verify your API key is correctly set in `.env.local`
- ✅ Check you have internet connectivity
- ✅ Ensure your Anthropic account has available credits
- ✅ Check browser console for detailed error messages

### Entries not saving
- ✅ Check if local storage is enabled in your browser
- ✅ Ensure you're not in private/incognito mode
- ✅ Clear browser cache and try again

### Build errors
- ✅ Delete `node_modules` and `.next` folders
- ✅ Run `npm install` again
- ✅ Ensure you're using Node.js 18 or higher

### API rate limits
- ✅ Anthropic has rate limits based on your plan tier
- ✅ Wait a few minutes before retrying
- ✅ Consider upgrading your API plan for higher limits

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Commit with descriptive messages** (`git commit -m 'Add amazing feature'`)
5. **Push to your fork** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Ideas for Contributions
- [ ] Add data visualization (charts for emotions, themes over time)
- [ ] Export to PDF with styling
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Sentiment analysis graphs
- [ ] Entry tagging and filtering
- [ ] Compare analyses from different time periods
- [ ] Integration with journal apps

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [Claude AI](https://www.anthropic.com/) by Anthropic
- UI inspired by modern design principles
- Sample entries created for demonstration purposes

## 📞 Support & Feedback

- **Issues**: [GitHub Issues](https://github.com/DanielJohnsonXYZ/diary-analyser/issues)
- **Discussions**: [GitHub Discussions](https://github.com/DanielJohnsonXYZ/diary-analyser/discussions)

---

<div align="center">

**Built with ❤️ using Claude AI**

[⭐ Star this repo](https://github.com/DanielJohnsonXYZ/diary-analyser) • [🐛 Report Bug](https://github.com/DanielJohnsonXYZ/diary-analyser/issues) • [✨ Request Feature](https://github.com/DanielJohnsonXYZ/diary-analyser/issues)

</div>
