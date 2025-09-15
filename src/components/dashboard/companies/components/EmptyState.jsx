// app/dashboard/companies/components/EmptyState.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Plus } from 'lucide-react';

const EmptyState = ({ onAddCompany }) => (
  <div className="text-center py-12 bg-white rounded-lg shadow">
    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Building2 className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
    <p className="text-gray-500 mb-6">Get started by creating your first company</p>
    <Button onClick={onAddCompany} className="bg-blue-600 hover:bg-blue-700">
      <Plus className="w-4 h-4 mr-2" />
      Add Your First Company
    </Button>
  </div>
);

export default EmptyState;
