"use client";

import React from "react";
import {
  CheckCircle2,
  FolderOpen,
  Layers3,
  TimerReset,
} from "lucide-react";

const DashboardStats = ({ projects }) => {
  const stats = [
    {
      label: "All Projects",
      value: projects.length,
      helper: "Everything in your workspace",
      icon: FolderOpen,
      panel: "border-slate-200 bg-white",
      iconWrap: "bg-slate-100 text-slate-700",
    },
    {
      label: "Draft",
      value: projects.filter((p) => p.status === "draft").length,
      helper: "Created quickly, still waiting for detail",
      icon: TimerReset,
      panel: "border-amber-200 bg-amber-50",
      iconWrap: "bg-white text-amber-700",
    },
    {
      label: "Completed",
      value: projects.filter((p) => p.status === "completed").length,
      helper: "Successfully delivered and finalized",
      icon: CheckCircle2,
      panel: "border-emerald-200 bg-emerald-50",
      iconWrap: "bg-white text-emerald-700",
    },
    {
      label: "Active",
      value: projects.filter((p) => p.status === "active").length,
      helper: "Currently in progress",
      icon: Layers3,
      panel: "border-sky-200 bg-sky-50",
      iconWrap: "bg-white text-sky-700",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className={`rounded-[26px] border p-5 shadow-sm ${stat.panel}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className={`rounded-2xl p-3 shadow-sm ${stat.iconWrap}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-sm font-semibold text-slate-900">{stat.label}</p>
              <p className="text-xs leading-5 text-slate-600">{stat.helper}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
