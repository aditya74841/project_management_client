"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  Calendar, 
  MoreVertical, 
  Users, 
  Clock, 
  Target,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showMessage } from "@/app/utils/showMessage";

const statusColors = {
  active: "from-emerald-400 to-cyan-500",
  completed: "from-blue-500 to-indigo-600",
  draft: "from-amber-400 to-orange-500",
  archived: "from-slate-400 to-slate-600",
};

const ProjectCard = ({ project, onEdit, onDelete, onToggle }) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const initials = project.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const statusColor = statusColors[project.status] || statusColors.active;

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-white/40 bg-white/60 p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 backdrop-blur-xl"
    >
      {/* Top Section */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${statusColor} text-xl font-bold text-white shadow-lg shadow-black/5`}>
            {initials}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-100/50">
                <MoreVertical size={20} className="text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-2xl p-2 shadow-xl backdrop-blur-lg">
              <DropdownMenuItem onClick={() => onEdit(project)} className="rounded-xl p-3">
                <Edit3 className="mr-3 h-4 w-4" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggle(project._id)} className="rounded-xl p-3">
                {project.isShown ? <EyeOff className="mr-3 h-4 w-4" /> : <Eye className="mr-3 h-4 w-4" />}
                {project.isShown ? "Hide Project" : "Show Project"}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(project._id)} 
                className="rounded-xl p-3 text-red-600 focus:bg-red-50 focus:text-red-700"
              >
                <Trash2 className="mr-3 h-4 w-4" /> Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
              {project.category || "Uncategorized"}
            </span>
            <div className="h-1 w-1 rounded-full bg-slate-300" />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${project.status === "active" ? "text-emerald-500" : "text-slate-500"}`}>
              {project.status}
            </span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-800">
            {project.name}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
            {project.description}
          </p>
        </div>
      </div>

      {/* Stats & Avatars */}
      <div className="mt-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Project Progress</span>
            <span className="text-slate-800">{project.progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div 
              className={`h-full bg-gradient-to-r ${statusColor} transition-all duration-1000 ease-out`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-3 overflow-hidden">
            {project.members?.map((member, i) => (
              <div 
                key={i} 
                title={member.name}
                className="inline-block h-8 w-8 rounded-full border-2 border-white ring-2 ring-transparent transition-all hover:scale-110 hover:ring-indigo-200"
              >
                <img src={member.avatar} alt={member.name} className="h-full w-full rounded-full bg-slate-100" />
              </div>
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-50 text-[10px] font-bold text-slate-400">
              +4
            </div>
          </div>
          
          <Button 
            onClick={() => router.push(`/dashboard/project-diary/${project._id}`)}
            className={`h-10 rounded-xl px-5 text-xs font-bold transition-all ${hovered ? "bg-slate-900 text-white" : "bg-white text-slate-900 border border-slate-200"}`}
          >
            Manage Diary
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProjectListRow = ({ project, onEdit, onDelete }) => {
  const router = useRouter();
  const initials = project.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const statusColor = statusColors[project.status] || statusColors.active;

  return (
    <div className="group flex items-center justify-between rounded-3xl border border-white/20 bg-white/40 p-4 backdrop-blur-lg transition-all hover:bg-white/60 hover:shadow-lg">
      <div className="flex items-center gap-5">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${statusColor} text-sm font-bold text-white`}>
          {initials}
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{project.name}</h4>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Target size={12} /> {project.category}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-10">
        <div className="hidden w-48 space-y-2 md:block">
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>PROGRESS</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-1 w-full rounded-full bg-slate-100">
            <div className={`h-full rounded-full bg-gradient-to-r ${statusColor}`} style={{ width: `${project.progress}%` }} />
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.push(`/dashboard/projects/${project._id}`)}
          className="rounded-full text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

const ProjectGrid = ({ projects, viewType, onEdit, onDelete, onToggle }) => {
  if (viewType === "list") {
    return (
      <div className="space-y-4">
        {projects.map(project => (
          <ProjectListRow 
            key={project._id} 
            project={project} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      {projects.map(project => (
        <ProjectCard 
          key={project._id} 
          project={project} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
