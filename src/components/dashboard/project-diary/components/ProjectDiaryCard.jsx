"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    MoreVertical,
    Eye,
    Trash2,
    Lightbulb,
    Target,
    Zap,
    CheckCircle2,
    Archive,
    ArrowUpRight,
    Tag,
    Code,
    Pencil
} from "lucide-react";

const STATUS_CONFIG = {
    idea: { label: "Idea", icon: Lightbulb, className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    scoping: { label: "Scoping", icon: Target, className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    "in-progress": { label: "In Progress", icon: Zap, className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    completed: { label: "Completed", icon: CheckCircle2, className: "bg-green-500/20 text-green-400 border-green-500/30" },
    archived: { label: "Archived", icon: Archive, className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

const PRIORITY_CONFIG = {
    low: { label: "Low", className: "bg-green-500/10 text-green-500" },
    medium: { label: "Medium", className: "bg-amber-500/10 text-amber-500" },
    high: { label: "High", className: "bg-red-500/10 text-red-500" },
};

const ProjectDiaryCard = ({ diary, onEdit, onDelete }) => {
    const router = useRouter();
    const statusConfig = STATUS_CONFIG[diary.status] || STATUS_CONFIG.idea;
    const priorityConfig = PRIORITY_CONFIG[diary.priority] || PRIORITY_CONFIG.medium;
    const StatusIcon = statusConfig.icon;

    const featuresCount = diary.features?.length || 0;
    const completedFeatures = diary.features?.filter((f) => f.status === "completed").length || 0;
    const tagsCount = diary.tags?.length || 0;
    const techStackCount = diary.techStack?.length || 0;

    const handleView = () => {
        const query = diary.projectId ? `?projectId=${diary.projectId}` : "";
        router.push(`/dashboard/project-diary/${diary._id}${query}`);
    };

    return (
        <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={`${statusConfig.className} text-xs font-medium`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig.label}
                            </Badge>
                            <Badge variant="secondary" className={`${priorityConfig.className} text-xs`}>
                                {priorityConfig.label}
                            </Badge>
                        </div>
                        <CardTitle className="text-lg font-semibold truncate text-slate-900">
                            {diary.title}
                        </CardTitle>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleView}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(diary)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onDelete(diary._id)}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {diary.description && (
                    <CardDescription className="line-clamp-2 mt-2">
                        {diary.description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent className="pb-3">
                {/* Stats Row */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {featuresCount > 0 && (
                        <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{completedFeatures}/{featuresCount}</span>
                        </div>
                    )}
                    {tagsCount > 0 && (
                        <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            <span>{tagsCount}</span>
                        </div>
                    )}
                    {techStackCount > 0 && (
                        <div className="flex items-center gap-1">
                            <Code className="w-4 h-4" />
                            <span>{techStackCount}</span>
                        </div>
                    )}
                </div>

                {/* Tags Preview */}
                {diary.tags && diary.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {diary.tags.slice(0, 3).map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5 bg-secondary/50">
                                {tag}
                            </Badge>
                        ))}
                        {diary.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-secondary/50">
                                +{diary.tags.length - 3}
                            </Badge>
                        )}
                    </div>
                )}

                {/* Tech Stack Preview */}
                {diary.techStack && diary.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {diary.techStack.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                                {tech}
                            </span>
                        ))}
                        {diary.techStack.length > 4 && (
                            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                                +{diary.techStack.length - 4}
                            </span>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="pt-3 border-t border-border/50">
                <Button
                    variant="ghost"
                    className="w-full border border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800"
                    onClick={handleView}
                >
                    <span>View Project</span>
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProjectDiaryCard;
