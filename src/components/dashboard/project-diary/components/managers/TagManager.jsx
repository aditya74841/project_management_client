"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Tag } from "lucide-react";
import { addTag, removeTag } from "../../../../../redux/slices/projectDiarySlice";

const TagManager = ({ diaryId, tags = [] }) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [newTag, setNewTag] = useState("");

    const handleAdd = async () => {
        if (!newTag.trim()) return;
        if (tags.includes(newTag.trim())) {
            setNewTag("");
            return;
        }

        await dispatch(addTag({
            diaryId,
            tag: newTag.trim(),
        }));

        setNewTag("");
    };

    const handleRemove = async (tag) => {
        await dispatch(removeTag({ diaryId, tag }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Tag className="h-5 w-5 text-amber-500" />
                        Tags ({tags.length})
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
                            placeholder="Add a tag..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="max-w-xs"
                        />
                        <Button size="sm" onClick={handleAdd} disabled={!newTag.trim()}>
                            Add
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                            Cancel
                        </Button>
                    </div>
                )}

                {/* Tags Display */}
                {tags.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No tags yet. Add tags to categorize your project.
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                            <Badge
                                key={idx}
                                variant="secondary"
                                className="px-3 py-1.5 text-sm group hover:bg-destructive/10 transition-colors cursor-default"
                            >
                                {tag}
                                <button
                                    onClick={() => handleRemove(tag)}
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

export default TagManager;
