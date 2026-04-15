"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  GripVertical,
  Loader2,
  ArrowDown,
  Edit2,
  X,
  Check,
  Zap,
  ChevronRight,
  GitCommit
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useFeatureStore } from "@/store/featureStore";
import { Button, Textarea } from "@/components/ui-core";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Technical Workflow Registry (Zen Prism Edition)
 * A premium implementation sequencer for tracking development phases.
 * Features a high-fidelity visual connector system and optimized registry entries.
 */
const FeatureWorkflow = ({ featureId, workflow = [] }) => {
  const [newStep, setNewStep] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFlow, setEditFlow] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  
  const { addWorkflow, updateWorkflow, deleteWorkflow } = useFeatureStore();

  const handleAddStep = async (e) => {
    e.preventDefault();
    if (!newStep.trim()) return;
    setIsAdding(true);
    await addWorkflow(featureId, { flow: newStep });
    setNewStep("");
    setIsAdding(false);
  };

  const startEditing = (step) => {
    setEditingId(step._id);
    setEditFlow(step.flow);
  };

  const handleUpdate = async (workflowId) => {
    if (!editFlow.trim()) {
      setEditingId(null);
      return;
    }
    setLoadingId(workflowId);
    await updateWorkflow(featureId, workflowId, { flow: editFlow });
    setEditingId(null);
    setLoadingId(null);
  };

  const handleDeleteTrigger = (workflowId) => {
    setDeletingId(workflowId);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setLoadingId(deletingId);
    await deleteWorkflow(featureId, deletingId);
    setDeletingId(null);
    setLoadingId(null);
  };

  return (
    <div className="space-y-8 pt-8 border-t border-border/50">
      {/* Header telemetry */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/10">
               <GitCommit size={18} />
            </div>
            <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Execution Workflow</h4>
               <p className="text-sm font-black text-foreground tracking-tight">Sequence Registry</p>
            </div>
         </div>
         <div className="px-3 py-1 rounded-full bg-foreground text-background text-[10px] font-black shadow-lg">
            {workflow.length} Phases
         </div>
      </div>

      {/* Workflow Sequence */}
      <div className="relative space-y-4 pr-2 no-scrollbar">
        <AnimatePresence mode="popLayout">
          {workflow.map((step, index) => {
            const isEditing = editingId === step._id;
            const isLoading = loadingId === step._id;
            
            return (
              <React.Fragment key={step._id || index}>
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "group relative flex items-start gap-6 p-6 rounded-[2rem] transition-all duration-500 border",
                    isEditing ? "bg-card border-primary shadow-2xl" : "bg-muted/30 border-transparent hover:bg-card hover:border-border hover:shadow-xl hover:shadow-primary/5",
                    isLoading && !isEditing && "opacity-50 pointer-events-none"
                  )}
                >
                  {/* Step Indicator Core */}
                  <div className="shrink-0 flex flex-col items-center">
                     <div className={cn(
                       "w-10 h-10 rounded-[1.25rem] border-2 flex items-center justify-center text-xs font-black transition-all shadow-sm",
                       isEditing ? "bg-primary text-white border-primary" : "bg-card border-border text-muted-foreground/30 group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                     )}>
                        {index + 1}
                     </div>
                  </div>
                  
                  {/* Flow Narrative */}
                  <div className="flex-1 space-y-1">
                     {isEditing ? (
                        <div className="space-y-4">
                           <Textarea 
                              value={editFlow}
                              onChange={(e) => setEditFlow(e.target.value)}
                              className="w-full min-h-[100px] rounded-2xl border-border/40 bg-background font-bold text-sm"
                              autoFocus
                           />
                           <div className="flex gap-2 justify-end">
                              <Button 
                                 size="sm"
                                 onClick={() => handleUpdate(step._id)}
                                 disabled={isLoading}
                                 className="rounded-xl h-10 px-4 bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
                              >
                                 {isLoading ? <Loader2 className="animate-spin" /> : <Check size={16} />}
                              </Button>
                              <Button 
                                 size="sm"
                                 variant="ghost"
                                 onClick={() => setEditingId(null)}
                                 className="rounded-xl h-10 px-4 hover:bg-rose-50 text-rose-500"
                              >
                                 <X size={16} />
                              </Button>
                           </div>
                        </div>
                     ) : (
                        <p className="text-sm font-bold text-foreground/80 leading-relaxed group-hover:text-primary transition-colors">
                           {step.flow}
                        </p>
                     )}
                  </div>

                  {/* Registry Controls */}
                  {!isEditing && (
                     <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button 
                           onClick={() => startEditing(step)}
                           className="p-2.5 bg-card rounded-xl shadow-lg border border-border text-muted-foreground/40 hover:text-primary transition-all"
                        >
                           <Edit2 size={14} />
                        </button>
                        <button 
                           onClick={() => handleDeleteTrigger(step._id)}
                           className="p-2.5 bg-card rounded-xl shadow-lg border border-border text-muted-foreground/40 hover:text-rose-500 transition-all"
                        >
                           <Trash2 size={14} />
                        </button>
                     </div>
                  )}
                </motion.div>
                
                {/* Visual Connector Logic */}
                {index < workflow.length - 1 && (
                  <div className="flex justify-center ml-11">
                     <div className="w-0.5 h-6 bg-border/50" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </AnimatePresence>

        {workflow.length === 0 && (
          <div className="text-center py-16 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border/40">
             <div className="w-16 h-16 bg-card rounded-[1.25rem] flex items-center justify-center shadow-lg border border-border mx-auto mb-6 text-muted-foreground/20">
                <Zap size={32} />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">Workflow Unsequenced</p>
             <p className="text-xs font-medium text-muted-foreground/60 mt-2">Initialize the implementation stages in the registry.</p>
          </div>
        )}
      </div>

      {/* Append New Sequence Phase */}
      <form onSubmit={handleAddStep} className="pt-8 border-t border-border/50">
        <div className="relative group">
          <Textarea 
            placeholder="Define next execution phase..."
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            className="w-full min-h-[120px] rounded-[2rem] border-2 border-border/40 bg-card font-bold scrollbar-none"
            disabled={isAdding}
          />
          <div className="absolute bottom-4 right-4">
             <Button 
               variant="primary"
               type="submit" 
               disabled={isAdding || !newStep.trim()}
               className="h-12 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20"
             >
               {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Append Stage"}
             </Button>
          </div>
        </div>
      </form>

      {/* DECOMMISSION CONFIRMATION DIALOG */}
      <Dialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
         <DialogContent className="rounded-[2.5rem] p-8 border-border shadow-2xl max-w-md">
            <DialogHeader className="space-y-4">
               <div className="w-16 h-16 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 mx-auto sm:mx-0">
                  <Trash2 size={32} />
               </div>
               <div className="space-y-2 text-center sm:text-left">
                  <DialogTitle className="text-2xl font-black tracking-tight text-foreground">
                     Decommission Phase?
                  </DialogTitle>
                  <DialogDescription className="text-sm font-medium text-muted-foreground leading-relaxed">
                     You are about to extract this technical execution stage from the registry. This action will permanently modify the feature's implementation lifecycle.
                  </DialogDescription>
               </div>
            </DialogHeader>
            <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
               <DialogClose asChild>
                  <Button variant="ghost" className="rounded-2xl h-12 flex-1 font-bold hover:bg-muted text-muted-foreground">
                     Abort Extraction
                  </Button>
               </DialogClose>
               <Button 
                  onClick={confirmDelete}
                  disabled={loadingId === deletingId}
                  className="rounded-2xl h-12 flex-1 font-black bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-500/20 text-white gap-2"
               >
                  {loadingId === deletingId ? <Loader2 className="animate-spin" /> : <Check size={18} />}
                  Decommission Stage
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeatureWorkflow;
