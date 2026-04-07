"use client";

import { useParams, useSearchParams } from "next/navigation";

import ProjectDiaryDetail from "@/components/dashboard/project-diary/components/ProjectDiaryDetail";

export default function DashboardProjectDiaryDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const diaryId = params?.diaryId;
  const projectId = searchParams.get("projectId");
  const basePath = projectId
    ? `/dashboard/project-diary?projectId=${projectId}`
    : "/dashboard/project-diary";

  return <ProjectDiaryDetail diaryId={diaryId} basePath={basePath} />;
}
