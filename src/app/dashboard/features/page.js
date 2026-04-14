import { Suspense } from 'react';
import LoadingState from '@/components/dashboard/LoadingState';
import FeaturePageClient from '@/features/features/components/FeaturePageClient';

/**
 * Features Execution Hub
 * The centralized route for high-fidelity feature management and Kanban execution.
 */
export default async function FeaturesPage() {
  return (
    <div className="px-4 py-6 sm:px-6">
      <Suspense fallback={<LoadingState />}>
        <FeaturePageClient />
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: 'Execution Board | Mission Control',
  description: 'Manage tactical development phases and synchronize engineering output across your project registry.',
};
