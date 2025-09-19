import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList } from "lucide-react";

const ProjectHeader = ({ onAddProject }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 rounded-lg">
        <ClipboardList className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <p className="text-gray-600">Manage projects and tasks</p>
      </div>
    </div>

    <Button
      onClick={onAddProject}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2"
    >
      <Plus className="w-4 h-4" />
      Add Project
    </Button>
  </div>
);

export default ProjectHeader;
