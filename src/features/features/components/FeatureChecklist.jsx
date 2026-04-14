"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle,
  Loader2,
  Edit2,
  X,
  Check,
  ListTodo
} from "lucide-react";
import { useFeatureStore } from "@/store/featureStore";
import { Button, Input } from "@/components/ui-core";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Tactical Feature Checklist (Zen Prism Edition)
 * A premium sub-task manager for tracking granular implementation details.
 * Featured standardized progress telemetry and high-fidelity interactions.
 */
const FeatureChecklist = ({ featureId, questions = [] }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  
  const { toggleSubQuestion } = useFeatureStore();
  // Note: For now, I'll keep the direct API calls for specific sub-tasks or use the store if implemented.
  // Given the complexity, I'll assume we want these in the store too.

  const handleToggle = async (questionId) => {
    setLoadingId(questionId);
    await toggleSubQuestion(featureId, questionId);
    setLoadingId(null);
  };

  const completedCount = questions.filter(q => q.isCompleted).length;
  const progress = questions.length > 0 ? Math.round((completedCount / questions.length) * 100) : 0;

  return (
    <div className="space-y-6 pt-6 border-t border-slate-50">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
               <ListTodo size={18} />
            </div>
            <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Execution Checklist</h4>
               <p className="text-sm font-black text-slate-900 tracking-tight">Technical Benchmarks</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
               {completedCount} / {questions.length} Finalized
            </span>
            <span className="text-xl font-black text-slate-900">{progress}%</span>
         </div>
      </div>

      {/* Telemetry Bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-primary rounded-full"
        />
      </div>

      {/* Items Registry */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
        <AnimatePresence mode="popLayout">
          {questions.map((question) => {
            const isEditing = editingId === question._id;
            
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={question._id}
                className={cn(
                  "group flex items-center justify-between p-4 rounded-2xl transition-all border",
                  isEditing ? "bg-white border-primary shadow-xl" : "bg-slate-50/50 border-transparent hover:bg-white hover:border-slate-100 hover:shadow-sm"
                )}
              >
                <div className="flex items-center gap-4 flex-1">
                  {!isEditing && (
                    <button 
                      onClick={() => handleToggle(question._id)}
                      disabled={loadingId === question._id}
                      className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                        question.isCompleted 
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200" 
                          : "border-slate-200 text-slate-200 hover:border-primary hover:text-primary"
                      )}
                    >
                      {loadingId === question._id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : question.isCompleted ? (
                        <Check size={14} strokeWidth={4} />
                      ) : (
                        <div className="w-1 h-1 rounded-full bg-current" />
                      )}
                    </button>
                  )}
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 bg-transparent border-none text-sm font-bold text-slate-900 outline-none p-0"
                      autoFocus
                    />
                  ) : (
                    <span className={cn(
                      "text-sm font-bold transition-all",
                      question.isCompleted ? "line-through text-slate-300" : "text-slate-700"
                    )}>
                      {question.name}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  {isEditing ? (
                    <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                      <Check size={16} />
                    </button>
                  ) : (
                    <>
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {questions.length === 0 && (
          <div className="text-center py-12 rounded-[2rem] border-2 border-dashed border-slate-100 bg-slate-50/30 text-slate-400">
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Registry Vacant</p>
            <p className="text-xs font-medium mt-1">No execution benchmarks identified.</p>
          </div>
        )}
      </div>

      {/* Construction Control */}
      <div className="flex gap-3 pt-6 border-t border-slate-50">
        <Input 
          placeholder="Designate new benchmark..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="h-14 font-bold border-2 border-slate-100"
          disabled={isAdding}
        />
        <Button 
          variant="primary"
          className="h-14 w-14 shrink-0 rounded-2xl shadow-lg shadow-primary/20"
          disabled={!newQuestion.trim()}
        >
          <Plus size={24} />
        </Button>
      </div>
    </div>
  );
};

export default FeatureChecklist;
