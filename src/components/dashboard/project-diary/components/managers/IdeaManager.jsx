"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Lightbulb, Pencil } from "lucide-react";
import { addIdea, removeIdea, updateIdea } from "../../../../../redux/slices/projectDiarySlice";

const IdeaManager = ({ diaryId, ideas = [] }) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newIdea, setNewIdea] = useState("");

    const handleSubmit = async () => {
        if (!newIdea.trim()) return;

        if (editingId) {
            await dispatch(updateIdea({
                diaryId,
                ideaId: editingId,
                idea: newIdea.trim(),
            }));
        } else {
            await dispatch(addIdea({
                diaryId,
                idea: newIdea.trim(),
            }));
        }

        handleCancel();
    };

    const handleEdit = (item) => {
        setNewIdea(item.idea);
        setEditingId(item._id);
        setIsAdding(true);
    };

    const handleCancel = () => {
        setNewIdea("");
        setEditingId(null);
        setIsAdding(false);
    };

    const handleRemove = async (ideaId) => {
        await dispatch(removeIdea({ diaryId, ideaId }));
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
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        Ideas ({ideas.length})
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
                            placeholder="Share a new idea..."
                            value={newIdea}
                            onChange={(e) => setNewIdea(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                        <Button size="sm" onClick={handleSubmit} disabled={!newIdea.trim()}>
                            {editingId ? "Update" : "Add"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                )}

                {/* Ideas List */}
                {ideas.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No ideas yet. Brainstorm your next big feature or improvement.
                    </p>
                ) : (
                    <div className="space-y-2">
                        {ideas.map((item) => (
                            <div
                                key={item._id}
                                className="group flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                            >
                                <div className="flex-1 mt-0.5">
                                    <p className="text-sm leading-relaxed text-slate-700">{item.idea}</p>
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

export default IdeaManager;
