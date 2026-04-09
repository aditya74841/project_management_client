"use client";

import React from "react";
import ProjectDiaryCard from "./ProjectDiaryCard";

const ProjectDiaryGrid = ({ diaries, onEdit, onDelete, loading }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {diaries.map((diary) => (
                <ProjectDiaryCard
                    key={diary._id}
                    diary={diary}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ProjectDiaryGrid;
