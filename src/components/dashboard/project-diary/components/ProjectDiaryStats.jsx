"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Target, Zap, CheckCircle2, Archive, TrendingUp } from "lucide-react";

const ProjectDiaryStats = ({ diaries }) => {
    const stats = {
        total: diaries.length,
        idea: diaries.filter((d) => d.status === "idea").length,
        scoping: diaries.filter((d) => d.status === "scoping").length,
        inProgress: diaries.filter((d) => d.status === "in-progress").length,
        completed: diaries.filter((d) => d.status === "completed").length,
        archived: diaries.filter((d) => d.status === "archived").length,
        highPriority: diaries.filter((d) => d.priority === "high").length,
    };

    const statCards = [
        {
            label: "Total Diaries",
            value: stats.total,
            icon: TrendingUp,
            panel: "border-cyan-200 bg-cyan-50",
            iconWrap: "bg-white text-cyan-700",
        },
        {
            label: "Ideas",
            value: stats.idea,
            icon: Lightbulb,
            panel: "border-slate-200 bg-white",
            iconWrap: "bg-slate-100 text-slate-700",
        },
        {
            label: "In Progress",
            value: stats.inProgress,
            icon: Zap,
            panel: "border-amber-200 bg-amber-50",
            iconWrap: "bg-white text-amber-700",
        },
        {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            panel: "border-emerald-200 bg-emerald-50",
            iconWrap: "bg-white text-emerald-700",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, idx) => (
                <Card
                    key={idx}
                    className={`border shadow-sm ${stat.panel}`}
                >
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</p>
                            </div>
                            <div className={`rounded-xl p-3 ${stat.iconWrap}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ProjectDiaryStats;
