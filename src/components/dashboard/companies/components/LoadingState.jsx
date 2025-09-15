// app/dashboard/companies/components/LoadingState.jsx
import React from 'react';

const LoadingState = () => (
  <div className="flex justify-center items-center py-12">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <span className="text-gray-600 text-lg">Loading companies...</span>
    </div>
  </div>
);

export default LoadingState;
