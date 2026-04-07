"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  LayoutGrid, 
  List, 
  Search, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Layers 
} from "lucide-react";
import ProjectGrid from "./ProjectGrid";
import ProjectSheet from "./ProjectSheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { staticProjects, dashboardStats } from "../utils/staticData";
import { selectCurrentUser } from "../../../../redux/slices/userClientSlice";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="group relative overflow-hidden rounded-[24px] border border-white/20 bg-white/40 p-6 backdrop-blur-xl transition-all hover:shadow-lg">
    <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-${color}-500/10 blur-2xl transition-all group-hover:bg-${color}-500/20`} />
    <div className="relative flex items-center gap-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${color}-50 border border-${color}-100 text-${color}-600`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
    </div>
  </div>
);

const ProjectPageClient = () => {
  const user = useSelector(selectCurrentUser);
  const [viewType, setViewType] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  // Greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const filteredProjects = staticProjects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen space-y-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-50 via-white to-blue-50/30 px-6 py-10">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            {greeting}, {user?.name?.split(" ")[0] || "Product Manager"} ⚡️
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Project Overview
          </h1>
          <p className="max-w-md text-slate-500">
            Manage your product lifecycle with precision. Track ideas from inception to completion.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button 
              onClick={() => setViewType("grid")}
              className={`rounded-lg p-2 transition-all ${viewType === "grid" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewType("list")}
              className={`rounded-lg p-2 transition-all ${viewType === "list" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <List size={20} />
            </button>
          </div>
          <Button 
            onClick={() => setSheetOpen(true)}
            className="h-11 rounded-xl bg-slate-900 px-6 text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-indigo-500/25"
          >
            <Plus className="mr-2 h-5 w-5" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Layers} label="Total Projects" value={dashboardStats.totalProjects} color="indigo" />
        <StatCard icon={TrendingUp} label="Avg. Progress" value={`${dashboardStats.avgProgress}%`} color="emerald" />
        <StatCard icon={CheckCircle2} label="Completed" value={dashboardStats.completedProjects} color="sky" />
        <StatCard icon={Clock} label="In Pipeline" value={dashboardStats.activeProjects} color="amber" />
      </div>

      {/* Filter Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <Search size={18} />
        </div>
        <Input 
          type="text"
          placeholder="Search projects by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 rounded-2xl border-white/40 bg-white/60 pl-12 text-lg shadow-sm backdrop-blur-md transition-all focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
        />
      </div>

      {/* Project Grid */}
      <div className="pb-10">
        <ProjectGrid 
          projects={filteredProjects} 
          viewType={viewType}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </div>

      <ProjectSheet 
        open={sheetOpen} 
        onOpenChange={setSheetOpen}
        formData={{}}
        onSubmit={() => setSheetOpen(false)}
        onCancel={() => setSheetOpen(false)}
      />
    </div>
  );
};

export default ProjectPageClient;
