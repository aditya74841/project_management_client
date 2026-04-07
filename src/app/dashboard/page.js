import { Suspense } from "react";

import DashboardHomeClient from "@/components/dashboard/DashboardHomeClient";
import LoadingState from "@/components/dashboard/LoadingState";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_36%,_#f8fafc_100%)] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Suspense fallback={<LoadingState name="dashboard" />}>
          <DashboardHomeClient />
        </Suspense>
      </div>
    </div>
  );
}
