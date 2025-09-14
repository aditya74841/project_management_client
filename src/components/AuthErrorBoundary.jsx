// components/AuthErrorBoundary.jsx
"use client";

import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const AuthErrorHandler = ({ children }) => {
  const { error, isLoggedIn, tokenRefreshing } = useSelector((state) => state.auth);
  const { handleRetryProfile } = useAuth();

  if (error && isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't load your profile data. This might be a temporary network issue.
          </p>
          <div className="space-y-3">
            <Button
              onClick={handleRetryProfile}
              disabled={tokenRefreshing}
              className="w-full"
            >
              {tokenRefreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Retrying...
                </>
              ) : (
                'Try Again'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
