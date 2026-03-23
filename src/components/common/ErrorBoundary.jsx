import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Something went wrong.</h1>
            <p className="text-slate-600 mb-8">We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-brand-dark text-white rounded-xl font-bold hover:bg-brand-accent transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
