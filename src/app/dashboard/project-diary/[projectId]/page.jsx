"use client";

import { useParams } from "next/navigation";
import ProjectDiaryPageClient from "@/components/dashboard/project-diary/components/ProjectDiaryPageClient";

export default function DashboardProjectDiaryDetailPage() {
  const params = useParams();
  const projectId = params?.projectId;

  return <ProjectDiaryPageClient projectId={projectId} />;
}
