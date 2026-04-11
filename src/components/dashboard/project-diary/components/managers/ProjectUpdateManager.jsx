"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Activity, Pencil, CheckCircle2 } from "lucide-react";
import { addProjectUpdate, removeProjectUpdate, updateProjectUpdate } from "../../../../../redux/slices/projectDiarySlice";

const ProjectUpdateManager = ({ diaryId, updates = [] }) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newUpdate, setNewUpdate] = useState("");

    const handleSubmit = async () => {
        if (!newUpdate.trim()) return;

        if (editingId) {
            await dispatch(updateProjectUpdate({
                diaryId,
                updateId: editingId,
                update: newUpdate.trim(),
            }));
        } else {
            await dispatch(addProjectUpdate({
                diaryId,
                update: newUpdate.trim(),
            }));
        }

        handleCancel();
    };

    const handleEdit = (item) => {
        setNewUpdate(item.update);
        setEditingId(item._id);
        setIsAdding(true);
    };

    const handleCancel = () => {
        setNewUpdate("");
        setEditingId(null);
        setIsAdding(false);
    };

    const handleRemove = async (updateId) => {
        await dispatch(removeProjectUpdate({ diaryId, updateId }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
        if (e.key === "Escape") {
            handleCancel();
        }
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-500" />
                        Project Updates ({updates.length})
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
            <CardContent className="space-y-3">
                {/* Add Form */}
                {isAdding && (
                    <div className="flex gap-2">
                        <Input
                            placeholder="Add a new progress update..."
                            value={newUpdate}
                            onChange={(e) => setNewUpdate(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                        <Button size="sm" onClick={handleSubmit} disabled={!newUpdate.trim()}>
                            {editingId ? "Update" : "Add"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                )}

                {/* Updates List */}
                {updates.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No updates yet. Log your project milestones and progress.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {updates.map((item) => (
                            <div
                                key={item._id}
                                className="group flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors bg-white/50"
                            >
                                <div className="mt-1">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm leading-relaxed text-slate-700">{item.update}</p>
                                </div>
                                <div className="flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50"
                                        onClick={() => handleEdit(item)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => handleRemove(item._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ProjectUpdateManager;
