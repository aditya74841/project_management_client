"use client";

import React, { useState } from "react";
import { Plus, X, Tag as TagIcon, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjectStore } from "@/store/projectStore";

const TagManager = ({ projectId, tags = [] }) => {
  const { addTag, removeTag } = useProjectStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    await addTag(projectId, newTag.trim());
    setNewTag("");
    setIsAdding(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddTag();
    if (e.key === "Escape") setIsAdding(false);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2 mr-2">
        <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg">
          <Hash size={12} strokeWidth={3} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Meta Tags</span>
      </div>

      {tags.map((tag, i) => (
        <Badge
          key={`${tag}-${i}`}
          className="group rounded-xl bg-card border border-border hover:border-emerald-500/50 hover:bg-emerald-500/10 text-foreground/80 hover:text-emerald-500 px-3 py-1.5 font-bold flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-emerald-500/10"
        >
          {tag}
          <button
            onClick={() => removeTag(projectId, tag)}
            className="opacity-40 group-hover:opacity-100 hover:text-red-500 transition-all focus:outline-none"
          >
            <X size={12} strokeWidth={3} />
          </button>
        </Badge>
      ))}

      {isAdding ? (
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
          <Input
            autoFocus
            size="sm"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Action, SEO, SaaS..."
            className="h-9 w-40 px-3 text-xs rounded-xl border-emerald-500/20 bg-background focus-visible:ring-emerald-500 shadow-sm"
          />
          <Button
            size="sm"
            onClick={handleAddTag}
            className="h-9 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest shadow-md shadow-emerald-500/10"
          >
            Add
          </Button>
          <button
            onClick={() => setIsAdding(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAdding(true)}
          className="h-9 px-4 rounded-xl border border-dashed border-border text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-[10px] font-black uppercase tracking-[0.15em]"
        >
          <Plus size={12} className="mr-2" /> Add Tag
        </Button>
      )}
    </div>
  );
};

export default TagManager;
