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
import { useFeatureStore } from "@/store/featureStore";
import { Button, Textarea } from "@/components/ui-core";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Technical Workflow Registry (Zen Prism Edition)
 * A premium implementation sequencer for tracking development phases.
 * Features a high-fidelity visual connector system and optimized registry entries.
 */
const FeatureWorkflow = ({ featureId, workFlow = [] }) => {
  const [newStep, setNewStep] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  
  // Placeholder for store actions if needed
  const handleAddStep = async (e) => {
    e.preventDefault();
    if (!newStep.trim()) return;
    setIsAdding(true);
    // Logic for adding workflow step...
    setIsAdding(false);
  };

  return (
    <div className="space-y-8 pt-8 border-t border-slate-50">
      {/* Header telemetry */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
               <GitCommit size={18} />
            </div>
            <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Execution Workflow</h4>
               <p className="text-sm font-black text-slate-900 tracking-tight">Sequence Registry</p>
            </div>
         </div>
         <div className="px-3 py-1 rounded-full bg-slate-950 text-white text-[10px] font-black shadow-lg">
            {workFlow.length} Phases
         </div>
      </div>

      {/* Workflow Sequence */}
      <div className="relative space-y-4 pr-2 no-scrollbar">
        <AnimatePresence mode="popLayout">
          {workFlow.map((step, index) => (
            <React.Fragment key={step._id}>
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative flex items-start gap-6 p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 shadow-sm hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Step Indicator Core */}
                <div className="shrink-0 flex flex-col items-center">
                   <div className="w-10 h-10 rounded-[1.25rem] bg-white border-2 border-slate-100 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm">
                      {index + 1}
                   </div>
                </div>
                
                {/* Flow Narrative */}
                <div className="flex-1 space-y-1">
                   <p className="text-sm font-bold text-slate-900 leading-relaxed group-hover:text-primary transition-colors">
                      {step.flow}
                   </p>
                </div>

                {/* Registry Controls */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                   <button className="p-2.5 bg-white rounded-xl shadow-lg border border-slate-50 text-slate-400 hover:text-primary transition-all">
                      <Edit2 size={14} />
                   </button>
                   <button className="p-2.5 bg-white rounded-xl shadow-lg border border-slate-50 text-slate-400 hover:text-rose-600 transition-all">
                      <Trash2 size={14} />
                   </button>
                </div>
              </motion.div>
              
              {/* Visual Connector Logic */}
              {index < workFlow.length - 1 && (
                <div className="flex justify-center ml-11">
                   <div className="w-0.5 h-6 bg-slate-100" />
                </div>
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>

        {workFlow.length === 0 && (
          <div className="text-center py-16 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
             <div className="w-16 h-16 bg-white rounded-[1.25rem] flex items-center justify-center shadow-lg border border-slate-50 mx-auto mb-6 text-slate-200">
                <Zap size={32} />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Workflow Unsequenced</p>
             <p className="text-xs font-medium text-slate-500 mt-2">Initialize the implementation stages in the registry.</p>
          </div>
        )}
      </div>

      {/* Append New Sequence Phase */}
      <form onSubmit={handleAddStep} className="pt-8 border-t border-slate-50">
        <div className="relative group">
          <Textarea 
            placeholder="Define next execution phase..."
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            className="w-full min-h-[120px] rounded-[2rem] border-2 border-slate-100"
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
    </div>
  );
};

export default FeatureWorkflow;
