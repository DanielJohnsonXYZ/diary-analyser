'use client';

import { useState, useEffect } from 'react';
import { sampleEntries } from '../utils/sampleEntries';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DiaryUploadProps {
  onEntriesSubmit: (entries: string[]) => void;
}

export default function DiaryUpload({ onEntriesSubmit }: DiaryUploadProps) {
  const [textInput, setTextInput] = useState('');
  const [entries, setEntries, isLoaded] = useLocalStorage<string[]>('diary-entries', []);
  const [inputMode, setInputMode] = useState<'paste' | 'type'>('paste');

  const handleAddEntry = () => {
    if (textInput.trim()) {
      const newEntries = [...entries, textInput.trim()];
      setEntries(newEntries);
      setTextInput('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newEntries: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const text = await file.text();
      newEntries.push(text);
    }

    setEntries([...entries, ...newEntries]);
  };

  const handleParseBulkEntries = () => {
    if (!textInput.trim()) return;

    const separators = ['\n\n---\n\n', '\n---\n', '\n\n\n', '===='];
    let parsedEntries: string[] = [textInput];

    for (const separator of separators) {
      if (textInput.includes(separator)) {
        parsedEntries = textInput
          .split(separator)
          .map(e => e.trim())
          .filter(e => e.length > 0);
        break;
      }
    }

    setEntries([...entries, ...parsedEntries]);
    setTextInput('');
  };

  const handleRemoveEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    if (entries.length > 0) {
      onEntriesSubmit(entries);
    }
  };

  const handleLoadSamples = () => {
    if (window.confirm('Load sample entries? This will replace your current entries.')) {
      setEntries(sampleEntries);
      setTextInput('');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all entries? This cannot be undone.')) {
      setEntries([]);
      setTextInput('');
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100" aria-labelledby="diary-entries-heading">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl" aria-hidden="true">📝</div>
          <h2 id="diary-entries-heading" className="text-2xl font-bold text-gray-900">Your Diary Entries</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLoadSamples}
            className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-all duration-200 text-sm"
            title="Load sample entries to try the app"
            aria-label="Load sample diary entries for demo"
          >
            <span aria-hidden="true">✨</span> Try Demo
          </button>
          {entries.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all duration-200 text-sm"
              title="Clear all entries"
              aria-label="Clear all diary entries"
            >
              <span aria-hidden="true">🗑️</span> Clear All
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-3 mb-6 flex-wrap" role="group" aria-label="Input methods">
          <button
            onClick={() => setInputMode('paste')}
            className={
              inputMode === 'paste'
                ? 'px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200'
                : 'px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-200'
            }
            aria-pressed={inputMode === 'paste'}
            aria-label="Paste multiple entries as text"
          >
            <span aria-hidden="true">📋</span> Paste Text
          </button>
          <button
            onClick={() => setInputMode('type')}
            className={
              inputMode === 'type'
                ? 'px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200'
                : 'px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-200'
            }
            aria-pressed={inputMode === 'type'}
            aria-label="Type a single entry"
          >
            <span aria-hidden="true">✏️</span> Type Entry
          </button>
          <label className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 cursor-pointer transition-all duration-200">
            <span aria-hidden="true">📁</span> Upload Files
            <input
              type="file"
              multiple
              accept=".txt,.md"
              onChange={handleFileUpload}
              className="hidden"
              aria-label="Upload diary entry files (.txt or .md)"
            />
          </label>
        </div>

        {inputMode === 'paste' && (
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="paste-textarea" className="sr-only">
                Paste diary entries
              </label>
              <textarea
                id="paste-textarea"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste your diary entries here...

Separate multiple entries with '---' on a new line for automatic parsing."
                className="w-full h-56 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none"
                maxLength={50000}
                aria-describedby="paste-char-count"
              />
              <div id="paste-char-count" className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded" aria-live="polite">
                {textInput.length.toLocaleString()} / 50,000 characters
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleParseBulkEntries}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                ✨ Parse Multiple Entries
              </button>
              <button
                onClick={handleAddEntry}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                ➕ Add Single Entry
              </button>
            </div>
          </div>
        )}

        {inputMode === 'type' && (
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="type-textarea" className="sr-only">
                Type diary entry
              </label>
              <textarea
                id="type-textarea"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your diary entry here...

Express your thoughts and feelings freely."
                className="w-full h-56 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none"
                maxLength={10000}
                aria-describedby="type-char-count"
              />
              <div id="type-char-count" className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded" aria-live="polite">
                {textInput.length.toLocaleString()} / 10,000 characters
              </div>
            </div>
            <button
              onClick={handleAddEntry}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              ➕ Add Entry
            </button>
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📚</span>
              <h3 className="text-lg font-bold text-gray-800">
                Entries Added: <span className="text-indigo-600">{entries.length}</span>
              </h3>
            </div>
            {isLoaded && (
              <span className="text-xs text-green-600 flex items-center gap-1" title="Your entries are automatically saved">
                <span>💾</span>
                <span>Auto-saved</span>
              </span>
            )}
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="group flex items-start gap-3 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                  {index + 1}
                </div>
                <p className="flex-1 text-gray-700 text-sm leading-relaxed line-clamp-3">
                  {entry}
                </p>
                <button
                  onClick={() => handleRemoveEntry(index)}
                  className="flex-shrink-0 text-red-500 hover:text-red-700 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={entries.length === 0}
        className={
          entries.length === 0
            ? 'w-full py-4 bg-gray-200 text-gray-400 rounded-xl font-bold text-lg cursor-not-allowed'
            : 'w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200'
        }
      >
        {entries.length === 0 ? (
          <>🔒 Add entries to begin analysis</>
        ) : (
          <>✨ Analyze {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}</>
        )}
      </button>
    </section>
  );
}
