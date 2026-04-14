"use client";

import React from "react";
import { Lightbulb, Target, Zap, CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Project Diary Stats (Zen Prism Edition)
 * High-fidelity metrics bar for registry consumption and status overview.
 */
const MetricItem = ({ icon: Icon, label, value, colorClass }) => (
  <div className="flex items-center gap-4 px-6 py-4 border-r border-slate-100 last:border-0 min-w-[180px]">
    <div className={cn("p-3 rounded-2xl shadow-sm transition-transform hover:scale-110 duration-300", colorClass)}>
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
        {label}
      </span>
      <span className="text-xl font-black text-slate-900 tracking-tight">{value}</span>
    </div>
  </div>
);

const ProjectDiaryStats = ({ diaries }) => {
    const stats = {
        total: diaries.length,
        idea: diaries.filter((d) => d.status === "idea").length,
        inProgress: diaries.filter((d) => d.status === "in-progress" || d.status === "scoping").length,
        completed: diaries.filter((d) => d.status === "completed").length,
    };

    const statCards = [
        {
            label: "Total Entries",
            value: stats.total,
            icon: TrendingUp,
            colorClass: "bg-indigo-50 text-indigo-600",
        },
        {
            label: "Perspectives",
            value: stats.idea,
            icon: Lightbulb,
            colorClass: "bg-purple-50 text-purple-600",
        },
        {
            label: "In Execution",
            value: stats.inProgress,
            icon: Zap,
            colorClass: "bg-amber-50 text-amber-600",
        },
        {
            label: "Archived/Done",
            value: stats.completed,
            icon: CheckCircle2,
            colorClass: "bg-emerald-50 text-emerald-600",
        },
    ];

    return (
        <div className="flex items-center overflow-x-auto no-scrollbar bg-white border border-slate-100 rounded-[2rem] shadow-sm mb-4">
            {statCards.map((m, idx) => (
                <MetricItem key={idx} {...m} />
            ))}
            <div className="ml-auto hidden xl:flex items-center gap-4 px-8 border-l border-slate-100 py-4">
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Registry Health</p>
                    <p className="text-xs font-bold text-emerald-500 flex items-center justify-end gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Synchronized
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectDiaryStats;
