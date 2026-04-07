import { Suspense } from "react";

import LoadingState from "@/components/dashboard/LoadingState";
import ProjectDiaryPageClient from "@/components/dashboard/project-diary/components/ProjectDiaryPageClient";

export const metadata = {
  title: "Project Diary | Dashboard",
  description: "Capture ideas, scope, and product thinking in one diary workspace.",
};

export default function DashboardProjectDiaryPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f9fbff_0%,_#f3f6ff_42%,_#f8fafc_100%)] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Suspense fallback={<LoadingState name="project diary" />}>
          <ProjectDiaryPageClient />
        </Suspense>
      </div>
    </div>
  );
}
