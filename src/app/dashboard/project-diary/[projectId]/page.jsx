"use client";

import { useParams, useSearchParams } from "next/navigation";

import ProjectDiaryDetail from "@/components/dashboard/project-diary/components/ProjectDiaryDetail";

export default function DashboardProjectDiaryDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = params?.projectId;


  const basePath = projectId
    ? `/dashboard/projects`
    : "/dashboard/projects";

  return <ProjectDiaryDetail projectId={projectId} basePath={basePath} />;
}
