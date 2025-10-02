"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DashboardHeader = ({ onAddProject, projectCount }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left side - Title and count */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Your Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {projectCount} {projectCount === 1 ? "project" : "projects"} total
          </p>
        </div>

        {/* Right side - Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-600 shadow-sm text-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white dark:bg-gray-600 shadow-sm text-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              title="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Add Project Button */}
          <Button
            onClick={onAddProject}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;



// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Plus, ClipboardList } from "lucide-react";

// const ProjectHeader = ({ onAddProject }) => (
//   <div className="flex justify-between items-center">
//     <div className="flex items-center gap-3">
//       <div className="p-2 bg-blue-100 rounded-lg">
//         <ClipboardList className="w-6 h-6 text-blue-600" />
//       </div>
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
//         <p className="text-gray-600">Manage projects and tasks</p>
//       </div>
//     </div>

//     <Button
//       onClick={onAddProject}
//       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2"
//     >
//       <Plus className="w-4 h-4" />
//       Add Project
//     </Button>
//   </div>
// );

// export default ProjectHeader;
