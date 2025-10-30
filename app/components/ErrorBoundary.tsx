'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full border border-red-200">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">⚠️</span>
              <div>
                <h1 className="text-3xl font-bold text-red-600 mb-2">Something went wrong</h1>
                <p className="text-gray-600">We encountered an unexpected error.</p>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
              <p className="font-mono text-sm text-red-800 break-words">
                {this.state.error?.message || 'Unknown error'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Reload Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Try Again
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>💡 Tip:</strong> If this problem persists, try:
              </p>
              <ul className="mt-2 ml-4 text-sm text-gray-600 space-y-1">
                <li>• Clearing your browser cache</li>
                <li>• Checking your internet connection</li>
                <li>• Verifying your API key is correctly set</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
