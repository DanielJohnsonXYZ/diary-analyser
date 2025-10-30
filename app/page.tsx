'use client';

import { useState } from 'react';
import DiaryUpload from './components/DiaryUpload';
import InsightsDisplay from './components/InsightsDisplay';
import { ErrorBoundary } from './components/ErrorBoundary';

function HomeContent() {
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="inline-block mb-6 text-7xl animate-pulse">
              📔
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
              Diary Insights
            </h1>
            <p className="text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Upload your diary entries and discover{' '}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                hidden patterns
              </span>{' '}
              using AI
            </p>
          </header>

          {/* Main content */}
          <div className="space-y-8">
            <DiaryUpload onEntriesSubmit={handleEntriesSubmit} />
            
            {isAnalyzing && (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-purple-600 rounded-full border-t-transparent absolute top-0 left-0 animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Analyzing Your Entries...
                </h3>
                <p className="text-gray-600 text-lg">
                  Claude AI is discovering patterns and insights ✨
                </p>
              </div>
            )}

            {insights && !isAnalyzing && (
              <InsightsDisplay
                insights={insights}
                entryCount={entries.length}
                entries={entries}
              />
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center">
            <p className="text-gray-600">
              Powered by{' '}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Claude AI
              </span>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <ErrorBoundary>
      <HomeContent />
    </ErrorBoundary>
  );
}
