'use client';

import { useState } from 'react';

interface ExportButtonProps {
  insights: string;
  entries: string[];
  entryCount: number;
}

export default function ExportButton({ insights, entries, entryCount }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const exportAsMarkdown = () => {
    const date = new Date().toLocaleDateString();
    const markdown = `# Diary Insights Analysis
**Generated:** ${date}
**Entries Analyzed:** ${entryCount}

---

${insights}

---

## Original Entries

${entries.map((entry, i) => `### Entry ${i + 1}\n\n${entry}\n`).join('\n')}
`;

    downloadFile(markdown, `diary-insights-${Date.now()}.md`, 'text/markdown');
    setIsOpen(false);
  };

  const exportAsJSON = () => {
    const data = {
      generated: new Date().toISOString(),
      entryCount,
      insights,
      entries,
    };

    downloadFile(
      JSON.stringify(data, null, 2),
      `diary-insights-${Date.now()}.json`,
      'application/json'
    );
    setIsOpen(false);
  };

  const exportAsText = () => {
    const date = new Date().toLocaleDateString();
    const text = `DIARY INSIGHTS ANALYSIS
Generated: ${date}
Entries Analyzed: ${entryCount}

${'='.repeat(60)}

${insights}

${'='.repeat(60)}

ORIGINAL ENTRIES

${entries.map((entry, i) => `Entry ${i + 1}:\n${entry}\n\n${'---'}\n`).join('\n')}
`;

    downloadFile(text, `diary-insights-${Date.now()}.txt`, 'text/plain');
    setIsOpen(false);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(insights);
      alert('Insights copied to clipboard!');
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
        aria-label="Export insights"
        aria-expanded={isOpen}
      >
        <span>📥</span>
        <span>Export</span>
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20">
            <button
              onClick={copyToClipboard}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 text-gray-700 font-medium"
            >
              <span>📋</span>
              <span>Copy to Clipboard</span>
            </button>
            <button
              onClick={exportAsMarkdown}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 text-gray-700 font-medium"
            >
              <span>📝</span>
              <span>Download as Markdown</span>
            </button>
            <button
              onClick={exportAsText}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 text-gray-700 font-medium"
            >
              <span>📄</span>
              <span>Download as Text</span>
            </button>
            <button
              onClick={exportAsJSON}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 text-gray-700 font-medium"
            >
              <span>💾</span>
              <span>Download as JSON</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
