"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectListRow from "./ProjectListRow";

const ProjectGrid = ({ projects, viewType }) => {
  if (viewType === "list") {
    return (
      <div className="flex flex-col gap-3">
        {/* Column Header */}
        <div className="flex items-center gap-4 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <span className="flex-1">Instance / Service</span>
          <span className="hidden lg:block flex-[0.6]">Utilization</span>
          <span className="hidden xl:block flex-1">Tech Stack</span>
          <span className="w-[180px] text-right pr-12">Registry Info</span>
        </div>
        <div className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <ProjectListRow key={project._id} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGrid;
