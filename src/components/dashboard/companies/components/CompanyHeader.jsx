// app/dashboard/companies/components/CompanyHeader.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Building2 } from 'lucide-react';

const CompanyHeader = ({ onAddCompany }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Building2 className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Companies</h2>
          <p className="text-gray-600">Manage your company information</p>
        </div>
      </div>
      
      <Button
        onClick={onAddCompany}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Company
      </Button>
    </div>
  );
};

export default CompanyHeader;
