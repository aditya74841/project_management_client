"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Code } from "lucide-react";
import { addTechStack, removeTechStack } from "../../../../../redux/slices/projectDiarySlice";

const TechStackManager = ({ diaryId, techStack = [] }) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [newTech, setNewTech] = useState("");

    const handleAdd = async () => {
        if (!newTech.trim()) return;
        if (techStack.includes(newTech.trim())) {
            setNewTech("");
            return;
        }

        await dispatch(addTechStack({
            diaryId,
            tech: newTech.trim(),
        }));

        setNewTech("");
    };

    const handleRemove = async (tech) => {
        await dispatch(removeTechStack({ diaryId, tech }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    // Common tech icons/colors
    const getTechColor = (tech) => {
        const techLower = tech.toLowerCase();
        if (techLower.includes("react")) return "bg-cyan-500/10 text-cyan-500";
        if (techLower.includes("next")) return "bg-gray-500/10 text-gray-400";
        if (techLower.includes("node")) return "bg-green-500/10 text-green-500";
        if (techLower.includes("mongo")) return "bg-green-600/10 text-green-600";
        if (techLower.includes("sql") || techLower.includes("postgres")) return "bg-blue-500/10 text-blue-500";
        if (techLower.includes("python")) return "bg-yellow-500/10 text-yellow-500";
        if (techLower.includes("typescript") || techLower.includes("ts")) return "bg-blue-600/10 text-blue-600";
        if (techLower.includes("javascript") || techLower.includes("js")) return "bg-yellow-400/10 text-yellow-400";
        if (techLower.includes("tailwind")) return "bg-teal-500/10 text-teal-500";
        if (techLower.includes("docker")) return "bg-blue-400/10 text-blue-400";
        if (techLower.includes("aws")) return "bg-orange-500/10 text-orange-500";
        return "bg-violet-500/10 text-violet-500";
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Code className="h-5 w-5 text-violet-500" />
                        Tech Stack ({techStack.length})
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAdding(!isAdding)}
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* Add Form */}
                {isAdding && (
                    <div className="flex gap-2 mb-4">
                        <Input
                            placeholder="Add technology (e.g., React, Node.js)"
                            value={newTech}
                            onChange={(e) => setNewTech(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="max-w-xs"
                        />
                        <Button size="sm" onClick={handleAdd} disabled={!newTech.trim()}>
                            Add
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                            Cancel
                        </Button>
                    </div>
                )}

                {/* Tech Stack Display */}
                {techStack.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No tech stack yet. Add technologies you plan to use.
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, idx) => (
                            <Badge
                                key={idx}
                                variant="secondary"
                                className={`px-3 py-1.5 text-sm group transition-colors cursor-default ${getTechColor(tech)}`}
                            >
                                {tech}
                                <button
                                    onClick={() => handleRemove(tech)}
                                    className="ml-2 hover:text-destructive transition-colors"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default TechStackManager;
