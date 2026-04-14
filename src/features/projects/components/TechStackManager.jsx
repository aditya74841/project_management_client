"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  MoreHorizontal,
  Check,
  X,
  Code2,
  Layers,
  ChevronRight,
  Sparkles,
  Zap,
  Box
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjectStore } from "@/store/projectStore";

const TechStackManager = ({ projectId, techStack = [] }) => {
  const {
    addTechCategory,
    updateTechCategory,
    removeTechCategory,
    addTechItem,
    updateTechItem,
    removeTechItem
  } = useProjectStore();

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    await addTechCategory(projectId, newCategoryName.trim());
    setNewCategoryName("");
    setIsAddingCategory(false);
  };

  return (
    <div className="space-y-12">
      {/* Registry Title & Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-8 bg-primary rounded-full" />
          <h3 className="text-xl font-black text-foreground tracking-tight">System Components</h3>
        </div>

        {isAddingCategory ? (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              autoFocus
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Infrastructure, Edge..."
              className="h-11 w-56 rounded-2xl border-border bg-background shadow-sm focus:ring-indigo-500"
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            />
            <Button onClick={handleAddCategory} className="rounded-2xl h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest">
              Establish
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsAddingCategory(false)} className="rounded-xl h-11 w-11 text-muted-foreground">
              <X size={20} />
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsAddingCategory(true)}
            variant="outline"
            className="rounded-[1.2rem] border-dashed border-border h-11 px-6 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all font-black text-[10px] uppercase tracking-[0.2em] bg-background"
          >
            <Plus size={14} className="mr-2" /> Add Category
          </Button>
        )}
      </div>

      <div className="space-y-16">
        {techStack.length > 0 ? (
          techStack.map((category) => (
            <CategorySection
              key={category._id || category.name}
              projectId={projectId}
              category={category}
              onUpdate={updateTechCategory}
              onRemove={removeTechCategory}
              onAddItem={addTechItem}
              onUpdateItem={updateTechItem}
              onRemoveItem={removeTechItem}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-muted/50 rounded-[3rem] border-2 border-dashed border-border shadow-inner">
            <div className="w-16 h-16 bg-card rounded-3xl shadow-sm flex items-center justify-center text-muted-foreground/50 mb-6 group-hover:scale-110 transition-transform">
              <Box size={32} strokeWidth={1.5} />
            </div>
            <p className="text-foreground font-black text-lg mb-2">Registry is Empty</p>
            <p className="text-muted-foreground text-sm max-w-xs text-center leading-relaxed">
              Connect your technical stack categories to define the architecture of this project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CategorySection = ({
  projectId,
  category,
  onUpdate,
  onRemove,
  onAddItem,
  onUpdateItem,
  onRemoveItem
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(category.name);

  const handleRename = async () => {
    if (!editName.trim() || editName === category.name) {
      setIsEditingName(false);
      return;
    }
    await onUpdate(projectId, category.name, editName.trim());
    setIsEditingName(false);
  };

  return (
    <div className="group animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                autoFocus
                size="sm"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRename()}
                className="h-10 w-48 font-black text-sm rounded-xl border-border bg-background shadow-sm"
              />
              <button onClick={handleRename} className="w-10 h-10 flex items-center justify-center text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-colors"><Check size={20} /></button>
              <button onClick={() => { setEditName(category.name); setIsEditingName(false); }} className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:bg-accent rounded-xl transition-colors"><X size={20} /></button>
            </div>
          ) : (
            <>
               <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-1">Architecture Tier</span>
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-black text-foreground tracking-tight">{category.name}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <MoreHorizontal size={14} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 p-2 rounded-2xl border-border bg-popover shadow-2xl">
                      <DropdownMenuItem onClick={() => setIsEditingName(true)} className="rounded-xl py-2.5 font-bold">
                        <Edit3 size={14} className="mr-3 text-muted-foreground" /> Rename Layer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onRemove(projectId, category.name)} className="rounded-xl py-2.5 font-bold text-destructive focus:bg-destructive/10">
                        <Trash2 size={14} className="mr-3" /> Dissolve Category
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </>
          )}
        </div>

        <TechItemDialog
          title="Append Component"
          onSubmit={(name, desc) => onAddItem(projectId, category.name, name, desc)}
        >
          <Button variant="ghost" size="sm" className="h-10 px-5 rounded-[1rem] bg-primary/10 text-primary hover:bg-primary/20 font-black text-[10px] uppercase tracking-widest transition-all active:scale-[0.98]">
            <Plus size={14} className="mr-2" /> Add Component
          </Button>
        </TechItemDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {category.tech.map((item) => (
          <TechCard
            key={item._id || item.name}
            projectId={projectId}
            categoryName={category.name}
            item={item}
            onUpdate={onUpdateItem}
            onRemove={onRemoveItem}
          />
        ))}
        {category.tech.length === 0 && (
          <div className="col-span-full py-10 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 border border-dashed border-border rounded-[2rem]">
            Awaiting System Definitions
          </div>
        )}
      </div>
    </div>
  );
};

const TechCard = ({ projectId, categoryName, item, onUpdate, onRemove }) => {
  return (
    <div className="group/card relative bg-card border border-border p-6 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-500 flex flex-col justify-between overflow-hidden">
      {/* Accent Corner Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-transparent blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-primary uppercase tracking-widest mb-1">Component</span>
            <h5 className="font-black text-foreground group-hover/card:text-primary transition-colors uppercase tracking-tight text-sm">
              {item.name}
            </h5>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-all translate-x-2 group-hover/card:translate-x-0">
            <TechItemDialog
              title="Refine Component"
              initialName={item.name}
              initialDesc={item.description}
              isEditing={true}
              onSubmit={(newName, newDesc) => onUpdate(projectId, categoryName, item.name, newName, newDesc)}
            >
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                <Edit3 size={14} />
              </button>
            </TechItemDialog>

            <button
              onClick={() => onRemove(projectId, categoryName, item.name)}
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-muted rounded-full" />
          <p className="text-xs text-muted-foreground leading-relaxed font-medium pl-4 py-1 italic">
             {item.description || "No strategic definition provided for this architectural choice."}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between opacity-0 group-hover/card:opacity-100 transition-opacity">
        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/50 animate-pulse">Synchronized</span>
        <ChevronRight size={14} className="text-primary/20" />
      </div>
    </div>
  );
};

const TechItemDialog = ({ children, title, initialName = "", initialDesc = "", onSubmit, isEditing = false }) => {
  const [name, setName] = useState(initialName);
  const [desc, setDesc] = useState(initialDesc);
  const [open, setOpen] = useState(false);

  const handleAction = async () => {
    if (!name.trim()) return;
    await onSubmit(name.trim(), desc.trim());
    if (!isEditing) {
      setName("");
      setDesc("");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px] rounded-[3rem] border-border shadow-2xl p-10 bg-card selection:bg-primary/20 overflow-hidden">
        {/* Decorative background flare */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

        <DialogHeader className="relative items-center text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mb-4 shadow-sm">
            <Sparkles size={32} />
          </div>
          <DialogTitle className="text-3xl font-black text-foreground tracking-tighter">
            {title}
          </DialogTitle>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Registry Definition Module</p>
        </DialogHeader>

        <div className="grid gap-8 py-10 relative">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Component Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Next.js Core, Redis Cloud, Docker Engine"
              className="rounded-2xl border-border bg-background focus:border-primary focus:ring-0 h-14 font-bold text-foreground shadow-sm transition-all"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Rationale</label>
              <span className="text-[10px] font-black text-muted-foreground/50 uppercase">Decision Log</span>
            </div>
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Define the strategic role of this component in the project architecture..."
              className="rounded-2xl border-border bg-background focus:border-primary focus:ring-0 min-h-[160px] resize-none font-medium leading-relaxed shadow-sm transition-all"
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-3 relative">
          <Button
            onClick={handleAction}
            className="w-full rounded-[1.3rem] h-14 bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-widest shadow-xl shadow-black/20 transition-all active:scale-[0.98]"
          >
            {isEditing ? "Finalize Definitions" : "Establish Component"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="w-full rounded-[1.3rem] h-12 font-bold text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            Abort Connection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TechStackManager;
