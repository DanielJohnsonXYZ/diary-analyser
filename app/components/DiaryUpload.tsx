'use client';

import { useState } from 'react';

interface DiaryUploadProps {
  onEntriesSubmit: (entries: string[]) => void;
}

export default function DiaryUpload({ onEntriesSubmit }: DiaryUploadProps) {
  const [textInput, setTextInput] = useState('');
  const [entries, setEntries] = useState<string[]>([]);
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Diary Entries</h2>

      <div className="mb-6">
        <div className="flex gap-3 mb-4 flex-wrap">
          <button
            onClick={() => setInputMode('paste')}
            className={inputMode === 'paste' ? 'px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium' : 'px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300'}
          >
            Paste Text
          </button>
          <button
            onClick={() => setInputMode('type')}
            className={inputMode === 'type' ? 'px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium' : 'px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300'}
          >
            Type Entry
          </button>
          <label className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 cursor-pointer">
            Upload Files
            <input
              type="file"
              multiple
              accept=".txt,.md"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {inputMode === 'paste' && (
          <div className="space-y-3">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste your diary entries here. Separate multiple entries with '---' on a new line."
              className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleParseBulkEntries}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
              >
                Parse Multiple Entries
              </button>
              <button
                onClick={handleAddEntry}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
              >
                Add Single Entry
              </button>
            </div>
          </div>
        )}

        {inputMode === 'type' && (
          <div className="space-y-3">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your diary entry here..."
              className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
            <button
              onClick={handleAddEntry}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              Add Entry
            </button>
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Entries Added: {entries.length}
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className="font-semibold text-gray-600 min-w-[60px]">
                  Entry {index + 1}:
                </span>
                <p className="flex-1 text-gray-700 text-sm line-clamp-2">
                  {entry}
                </p>
                <button
                  onClick={() => handleRemoveEntry(index)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={entries.length === 0}
        className={entries.length === 0 ? 'w-full py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed' : 'w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700'}
      >
        {entries.length === 0 ? 'Add entries to begin analysis' : `Analyze ${entries.length} ${entries.length === 1 ? 'Entry' : 'Entries'}`}
      </button>
    </div>
  );
}
