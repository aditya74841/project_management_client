"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Layers, CheckCircle2, Clock, Loader2 } from "lucide-react";
import {
    addFeature,
    removeFeature,
    toggleFeatureCompletion,
    updateFeatureStatus,
} from "../../../../../redux/slices/projectDiarySlice";

const PRIORITY_OPTIONS = [
    { value: "musthave", label: "Must Have", className: "bg-red-500/10 text-red-500" },
    { value: "nicetohave", label: "Nice to Have", className: "bg-blue-500/10 text-blue-500" },
];

const STATUS_OPTIONS = [
    { value: "pending", label: "Pending", icon: Clock },
    { value: "in-progress", label: "In Progress", icon: Loader2 },
    { value: "completed", label: "Completed", icon: CheckCircle2 },
];

const FeatureManager = ({ diaryId, features = [] }) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [newFeature, setNewFeature] = useState({
        name: "",
        description: "",
        priority: "musthave",
        status: "pending",
    });

    const handleAdd = async () => {
        if (!newFeature.name.trim()) return;

        await dispatch(addFeature({
            diaryId,
            name: newFeature.name.trim(),
            description: newFeature.description.trim(),
            priority: newFeature.priority,
            status: newFeature.status,
        }));

        setNewFeature({ name: "", description: "", priority: "musthave", status: "pending" });
        setIsAdding(false);
    };

    const handleRemove = async (featureId) => {
        await dispatch(removeFeature({ diaryId, featureId }));
    };

    const handleToggle = async (featureId) => {
        await dispatch(toggleFeatureCompletion({ diaryId, featureId }));
    };

    const handleStatusChange = async (featureId, status) => {
        await dispatch(updateFeatureStatus({ diaryId, featureId, status }));
    };

    const completedCount = features.filter((f) => f.status === "completed").length;
    const progress = features.length > 0 ? (completedCount / features.length) * 100 : 0;

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Layers className="h-5 w-5 text-purple-500" />
                        Features ({completedCount}/{features.length})
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
                {/* Progress Bar */}
                {features.length > 0 && (
                    <div className="mt-2">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {Math.round(progress)}% complete
                        </p>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Add Form */}
                {isAdding && (
                    <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                        <Input
                            placeholder="Feature name"
                            value={newFeature.name}
                            onChange={(e) => setNewFeature((p) => ({ ...p, name: e.target.value }))}
                        />
                        <Textarea
                            placeholder="Description (optional)"
                            value={newFeature.description}
                            onChange={(e) => setNewFeature((p) => ({ ...p, description: e.target.value }))}
                            rows={2}
                        />
                        <div className="flex gap-2">
                            <Select
                                value={newFeature.priority}
                                onValueChange={(value) => setNewFeature((p) => ({ ...p, priority: value }))}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {PRIORITY_OPTIONS.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={newFeature.status}
                                onValueChange={(value) => setNewFeature((p) => ({ ...p, status: value }))}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_OPTIONS.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleAdd} disabled={!newFeature.name.trim()}>
                                Add Feature
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {/* Features List */}
                {features.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No features yet. Add features to track your project requirements.
                    </p>
                ) : (
                    <div className="space-y-2">
                        {features.map((feature) => {
                            const priorityConfig = PRIORITY_OPTIONS.find((p) => p.value === feature.priority);
                            const isCompleted = feature.status === "completed";

                            return (
                                <div
                                    key={feature._id}
                                    className={`group flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors ${isCompleted ? "opacity-60" : ""
                                        }`}
                                >
                                    <Checkbox
                                        checked={isCompleted}
                                        onCheckedChange={() => handleToggle(feature._id)}
                                        className="mt-1"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`font-medium text-sm ${isCompleted ? "line-through" : ""}`}>
                                                {feature.name}
                                            </span>
                                            {priorityConfig && (
                                                <Badge variant="secondary" className={`text-xs ${priorityConfig.className}`}>
                                                    {priorityConfig.label}
                                                </Badge>
                                            )}
                                        </div>
                                        {feature.description && (
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {feature.description}
                                            </p>
                                        )}
                                    </div>
                                    <Select
                                        value={feature.status}
                                        onValueChange={(value) => handleStatusChange(feature._id, value)}
                                    >
                                        <SelectTrigger className="w-[120px] h-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {STATUS_OPTIONS.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleRemove(feature._id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default FeatureManager;
