"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GitBranch, GripVertical, Pencil } from "lucide-react";
import { addUserFlow, removeUserFlow, updateUserFlow } from "../../../../../redux/slices/projectDiarySlice";

const UserFlowManager = ({ diaryId, userFlows = [] }) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newFlow, setNewFlow] = useState("");

    const handleSubmit = async () => {
        if (!newFlow.trim()) return;

        if (editingId) {
            await dispatch(updateUserFlow({
                diaryId,
                flowId: editingId,
                flow: newFlow.trim(),
            }));
        } else {
            await dispatch(addUserFlow({
                diaryId,
                flow: newFlow.trim(),
            }));
        }

        handleCancel();
    };

    const handleEdit = (flow) => {
        setNewFlow(flow.flow);
        setEditingId(flow._id);
        setIsAdding(true);
    };

    const handleCancel = () => {
        setNewFlow("");
        setEditingId(null);
        setIsAdding(false);
    };

    const handleRemove = async (flowId) => {
        await dispatch(removeUserFlow({ diaryId, flowId }));
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
                        <GitBranch className="h-5 w-5 text-green-500" />
                        User Flows ({userFlows.length})
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
                            placeholder="Describe a user flow step..."
                            value={newFlow}
                            onChange={(e) => setNewFlow(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                        <Button size="sm" onClick={handleSubmit} disabled={!newFlow.trim()}>
                            {editingId ? "Update" : "Add"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                )}

                {/* User Flows List */}
                {userFlows.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No user flows yet. Document how users will interact with your app.
                    </p>
                ) : (
                    <div className="space-y-2">
                        {userFlows.map((flow, index) => (
                            <div
                                key={flow._id}
                                className="group flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                            >
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">
                                    {index + 1}
                                </div>
                                <p className="flex-1 text-sm">{flow.flow}</p>
                                <div className="flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleEdit(flow)}
                                    >
                                        <Pencil className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleRemove(flow._id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
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

export default UserFlowManager;
