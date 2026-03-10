"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Link2, ExternalLink } from "lucide-react";
import { addReferenceLink, removeReferenceLink } from "../../../../../redux/slices/projectDiarySlice";

const ReferenceLinksManager = ({ diaryId, referenceLinks = [] }) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [newLink, setNewLink] = useState({ name: "", url: "" });
    const [error, setError] = useState("");

    const validateUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleAdd = async () => {
        if (!newLink.name.trim() || !newLink.url.trim()) return;

        if (!validateUrl(newLink.url.trim())) {
            setError("Please enter a valid URL");
            return;
        }

        await dispatch(addReferenceLink({
            diaryId,
            name: newLink.name.trim(),
            url: newLink.url.trim(),
        }));

        setNewLink({ name: "", url: "" });
        setError("");
        setIsAdding(false);
    };

    const handleRemove = async (linkId) => {
        await dispatch(removeReferenceLink({ diaryId, linkId }));
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Link2 className="h-5 w-5 text-cyan-500" />
                        Reference Links ({referenceLinks.length})
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
                    <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                        <Input
                            placeholder="Link name (e.g., Design Doc)"
                            value={newLink.name}
                            onChange={(e) => setNewLink((p) => ({ ...p, name: e.target.value }))}
                        />
                        <Input
                            placeholder="URL (e.g., https://example.com)"
                            value={newLink.url}
                            onChange={(e) => {
                                setNewLink((p) => ({ ...p, url: e.target.value }));
                                setError("");
                            }}
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={handleAdd}
                                disabled={!newLink.name.trim() || !newLink.url.trim()}
                            >
                                Add Link
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {/* Links List */}
                {referenceLinks.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No reference links yet. Add links to documentation, designs, or resources.
                    </p>
                ) : (
                    <div className="space-y-2">
                        {referenceLinks.map((link) => (
                            <div
                                key={link._id}
                                className="group flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                            >
                                <Link2 className="h-4 w-4 text-muted-foreground shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-sm text-primary hover:underline flex items-center gap-1"
                                    >
                                        {link.name}
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {link.url}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleRemove(link._id)}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ReferenceLinksManager;
