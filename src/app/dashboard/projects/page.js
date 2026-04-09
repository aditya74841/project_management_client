import LoadingState from "@/components/dashboard/LoadingState";
import ProjectPageClient from "@/components/dashboard/projects/components/ProjectPageClient";
import { Suspense } from "react";

const getInitialProjects = async () => null;

export default async function ProjectsPage() {
  const initialData = await getInitialProjects();
  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={<LoadingState />}>
        <ProjectPageClient initialData={initialData} />
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: "Dashboard | Projects",
  description: "Manage your projects and track progress",
};

