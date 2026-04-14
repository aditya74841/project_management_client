"use client";
import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button, Card } from "./ui-core";

/**
 * Global Error Boundary
 * Protective wrapper that catches runtime React crashes, 
 * preventing the entire application from going white.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an analytics service in production
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRestart = () => {
    this.setState({ hasError: false });
    window.location.href = "/dashboard";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
          <Card className="max-w-md w-full p-8 text-center space-y-6 border-destructive/20 shadow-2xl shadow-destructive/5">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-destructive/10 text-destructive ring-8 ring-destructive/5">
                <AlertTriangle className="w-12 h-12" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900">Application Error</h1>
              <p className="text-slate-500 text-sm">
                We've encountered an unexpected problem. The application has been protected
                from crashing and you can safely attempt to restart.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && (
                <div className="text-left bg-slate-900 text-slate-100 p-4 rounded-xl text-[10px] font-mono overflow-auto max-h-32 opacity-80 border border-white/10">
                    {this.state.error?.toString()}
                </div>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <Button 
                variant="primary" 
                className="w-full h-12 gap-2"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={this.handleRestart}
              >
                <Home className="w-4 h-4" />
                Go to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
