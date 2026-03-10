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
            label: "Total Projects",
            value: stats.total,
            icon: TrendingUp,
            gradient: "from-violet-500/20 to-purple-500/20",
            iconColor: "text-violet-500",
        },
        {
            label: "Ideas",
            value: stats.idea,
            icon: Lightbulb,
            gradient: "from-purple-500/20 to-pink-500/20",
            iconColor: "text-purple-500",
        },
        {
            label: "In Progress",
            value: stats.inProgress,
            icon: Zap,
            gradient: "from-amber-500/20 to-orange-500/20",
            iconColor: "text-amber-500",
        },
        {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            gradient: "from-green-500/20 to-emerald-500/20",
            iconColor: "text-green-500",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, idx) => (
                <Card
                    key={idx}
                    className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-${stat.iconColor.split('-')[1]}-500/20`}
                >
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-xl bg-background/60 backdrop-blur-md shadow-sm ${stat.iconColor}`}>
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
