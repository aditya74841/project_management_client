"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import ProjectDiaryDetail from "@/components/dashboard/project-diary/components/ProjectDiaryDetail";

export default function DiaryViewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const diaryId = params?.diaryId;
  const projectId = searchParams.get("projectId");

  return <ProjectDiaryDetail diaryId={diaryId} projectId={projectId} basePath="/dashboard/project-diary" />;
}
