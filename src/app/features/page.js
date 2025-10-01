
import { Suspense } from 'react';
// import FeaturePageClient from './components/FeaturePageClient';
import LoadingState from '@/components/dashboard/LoadingState';
import FeaturePageClient from '@/components/dashboard/features/components/FeaturePageClient';

async function getInitialFeatures() {
  try {
    return null; // Let client handle data fetching
  } catch (error) {
    console.error('Server-side features fetch error:', error);
    return null;
  }
}

export default async function FeaturesPage() {
  const initialData = await getInitialFeatures();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Feature Management</h1>
        <p className="text-gray-600 mt-2">Manage your project features and track progress</p>
      </div>
      
      <Suspense fallback={<LoadingState />}>
        <FeaturePageClient initialData={initialData} />
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: 'Features | Your App',
  description: 'Manage your project features and track progress',
};