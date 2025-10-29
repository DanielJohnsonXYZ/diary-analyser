# Deployment Guide

## Deploy to Vercel

### Option 1: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `DanielJohnsonXYZ/diary-analyser`
4. Configure the project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key from https://console.anthropic.com/
6. Click "Deploy"

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy
vercel --prod

# When prompted, add your environment variable:
# ANTHROPIC_API_KEY=your_api_key_here
```

## Environment Variables Required

- `ANTHROPIC_API_KEY`: Your Claude API key from Anthropic

## Post-Deployment

1. Test the deployed app
2. Upload some diary entries
3. Verify the Claude AI analysis works correctly

## Repository

https://github.com/DanielJohnsonXYZ/diary-analyser
