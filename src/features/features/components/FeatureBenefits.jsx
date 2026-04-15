"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Loader2,
  Edit2,
  X,
  Check,
  Zap,
  Sparkles
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
 * Feature Benefits Manager (Zen Prism Edition)
 * A premium interactive grid for managing feature value propositions.
 * Features high-fidelity card interactions and real-time registry sync.
 */
const FeatureBenefits = ({ featureId, benefits = [] }) => {
  const [newBenefit, setNewBenefit] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  
  const { addBenefit, updateBenefit, deleteBenefit } = useFeatureStore();

  const handleAdd = async () => {
    if (!newBenefit.trim()) return;
    setIsAdding(true);
    await addBenefit(featureId, { text: newBenefit });
    setNewBenefit("");
    setIsAdding(false);
  };

  const startEditing = (benefit) => {
    setEditingId(benefit._id);
    setEditText(benefit.text);
  };

  const handleUpdate = async (benefitId) => {
    if (!editText.trim()) {
      setEditingId(null);
      return;
    }
    setLoadingId(benefitId);
    await updateBenefit(featureId, benefitId, { text: editText });
    setEditingId(null);
    setLoadingId(null);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setLoadingId(deletingId);
    await deleteBenefit(featureId, deletingId);
    setDeletingId(null);
    setLoadingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {benefits.map((benefit, idx) => {
            const isEditing = editingId === benefit._id;
            const isLoading = loadingId === benefit._id;
            
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={benefit._id || idx} 
                className={cn(
                  "group relative p-6 rounded-2xl bg-background border transition-all duration-300 min-h-[140px] flex flex-col",
                  isEditing ? "border-primary ring-4 ring-primary/5 shadow-2xl z-10" : "border-border shadow-sm hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
                )}
              >
                 {isEditing ? (
                    <div className="flex-1 flex flex-col gap-4">
                       <Textarea 
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 min-h-[80px] text-sm font-bold bg-muted/30 border-none resize-none no-scrollbar focus-visible:ring-0"
                          autoFocus
                       />
                       <div className="flex justify-end gap-2">
                          <Button 
                             size="sm"
                             onClick={() => handleUpdate(benefit._id)}
                             disabled={isLoading}
                             className="h-8 w-8 p-0 rounded-lg bg-emerald-500 hover:bg-emerald-600"
                          >
                             {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check size={14} />}
                          </Button>
                          <Button 
                             size="sm"
                             variant="ghost"
                             onClick={() => setEditingId(null)}
                             className="h-8 w-8 p-0 rounded-lg text-rose-500 hover:bg-rose-50"
                          >
                             <X size={14} />
                          </Button>
                       </div>
                    </div>
                 ) : (
                    <>
                       <div className="flex-1 flex gap-4">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform" />
                          <p className="font-bold text-muted-foreground text-sm leading-relaxed">
                             {benefit.text}
                          </p>
                       </div>

                       {/* Hover Actions */}
                       <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                             onClick={() => startEditing(benefit)}
                             className="p-1.5 rounded-lg bg-background border border-border text-muted-foreground/30 hover:text-primary hover:border-primary transition-all"
                          >
                             <Edit2 size={12} />
                          </button>
                          <button 
                             onClick={() => setDeletingId(benefit._id)}
                             className="p-1.5 rounded-lg bg-background border border-border text-muted-foreground/30 hover:text-rose-500 hover:border-rose-200 transition-all"
                          >
                             <Trash2 size={12} />
                          </button>
                       </div>
                    </>
                 )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Action Input Module */}
        <motion.div 
           layout
           className="p-6 rounded-2xl bg-muted/20 border-2 border-dashed border-border/40 flex flex-col gap-4 group/add transition-all hover:bg-muted/30 hover:border-primary/20"
        >
           <Textarea 
              placeholder="Append a new value proposition..."
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              className="flex-1 min-h-[80px] text-sm font-bold bg-transparent border-none resize-none no-scrollbar focus-visible:ring-0 placeholder:text-muted-foreground/20"
           />
           <div className="flex justify-end">
              <Button 
                 onClick={handleAdd}
                 disabled={!newBenefit.trim() || isAdding}
                 className="h-10 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 bg-foreground text-background shadow-lg shadow-foreground/10 hover:scale-[1.02] transition-all"
              >
                 {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles size={14} />}
                 Commit Value
              </Button>
           </div>
        </motion.div>
      </div>

      {/* DECOMMISSION CONFIRMATION */}
      <Dialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
         <DialogContent className="rounded-[2.5rem] p-8 border-border shadow-2xl max-w-md">
            <DialogHeader className="space-y-4">
               <div className="w-16 h-16 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 mx-auto sm:mx-0">
                  <Trash2 size={32} />
               </div>
               <div className="space-y-2 text-center sm:text-left">
                  <DialogTitle className="text-2xl font-black tracking-tight text-foreground">
                     Decommission Value?
                  </DialogTitle>
                  <DialogDescription className="text-sm font-medium text-muted-foreground leading-relaxed">
                     You are about to extract this value proposition from the strategic registry. This action is irreversible and will modify the feature's core impact assessment.
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
                  Decommission Node
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeatureBenefits;
