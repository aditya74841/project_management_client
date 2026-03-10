"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProjectDiaryDetail from "@/components/dashboard/project-diary/components/ProjectDiaryDetail";

const ProjectDiaryDetailPage = () => {
    const params = useParams();
    const diaryId = params.diaryId;

    return <ProjectDiaryDetail diaryId={diaryId} />;
};

export default ProjectDiaryDetailPage;
