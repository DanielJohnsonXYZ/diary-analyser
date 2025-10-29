'use client';

import { useState } from 'react';
import DiaryUpload from './components/DiaryUpload';
import InsightsDisplay from './components/InsightsDisplay';

export default function Home() {
  const [entries, setEntries] = useState<string[]>([]);
  const [insights, setInsights] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleEntriesSubmit = async (newEntries: string[]) => {
    setEntries(newEntries);
    setIsAnalyzing(true);
    setInsights(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entries: newEntries }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze entries');
      }

      const data = await response.json();
      setInsights(data.insights);
    } catch (error) {
      console.error('Error analyzing entries:', error);
      setInsights('Error: Failed to analyze your diary entries. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Diary Insights
            </h1>
            <p className="text-xl text-gray-600">
              Upload your diary entries and discover hidden patterns using AI
            </p>
          </header>

          <div className="space-y-6">
            <DiaryUpload onEntriesSubmit={handleEntriesSubmit} />
            
            {isAnalyzing && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Analyzing Your Entries...
                </h3>
                <p className="text-gray-600">
                  Claude AI is discovering patterns and insights
                </p>
              </div>
            )}

            {insights && !isAnalyzing && (
              <InsightsDisplay 
                insights={insights} 
                entryCount={entries.length}
              />
            )}
          </div>

          <footer className="mt-12 text-center text-gray-600 text-sm">
            <p>Powered by Claude AI</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
