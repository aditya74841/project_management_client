"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Loader2,
  Edit2,
  X,
  Check,
  Target,
  MessageSquare,
  ChevronDown,
  ChevronUp
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
import { Button, Input, Textarea } from "@/components/ui-core";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Strategic Benchmark Registry (Zen Prism Edition)
 * A premium Q&A registry for calibrating high-level tactical objectives.
 * Supports dual-field input (Question/Answer) and real-time telemetry sync.
 */
const StrategicBenchmarks = ({ featureId, questions = [] }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  const { toggleQuestion, addQuestion, updateQuestion, deleteQuestion } = useFeatureStore();

  const handleToggle = async (e, questionId) => {
    e.stopPropagation();
    setLoadingId(questionId);
    await toggleQuestion(featureId, questionId);
    setLoadingId(null);
  };

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;
    setIsAdding(true);
    const success = await addQuestion(featureId, { 
      name: newQuestion, 
      answer: newAnswer 
    });
    if (success) {
      setNewQuestion("");
      setNewAnswer("");
      setIsAdding(false);
    } else {
      setIsAdding(false);
    }
  };

  const startEditing = (e, question) => {
    e.stopPropagation();
    setEditingId(question._id);
    setEditName(question.name);
    setEditAnswer(question.answer || "");
  };

  const handleUpdate = async (questionId) => {
    if (!editName.trim()) {
      setEditingId(null);
      return;
    }
    setLoadingId(questionId);
    await updateQuestion(featureId, questionId, { 
      name: editName, 
      answer: editAnswer 
    });
    setEditingId(null);
    setLoadingId(null);
  };

  const handleDelete = (e, questionId) => {
    e.stopPropagation();
    setDeletingId(questionId);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setLoadingId(deletingId);
    await deleteQuestion(featureId, deletingId);
    setDeletingId(null);
    setLoadingId(null);
  };

  const completedCount = questions.filter(q => q.isCompleted).length;
  const progress = questions.length > 0 ? Math.round((completedCount / questions.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Progress Telemetry */}
      <div className="flex items-center justify-between p-6 bg-primary/[0.03] border border-primary/10 rounded-[2rem]">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-inner">
               <Target size={20} />
            </div>
            <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Registry Health</h4>
               <p className="text-lg font-black text-foreground tracking-tight">Strategic Calibration Index</p>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-right">
               <span className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Finalized</span>
               <span className="text-xl font-black text-foreground">{completedCount} / {questions.length}</span>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-primary/10 flex items-center justify-center relative">
               <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="24" cy="24" r="20"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-primary"
                    strokeDasharray={125.6}
                    strokeDashoffset={125.6 - (125.6 * progress) / 100}
                    strokeLinecap="round"
                  />
               </svg>
               <span className="absolute text-[10px] font-black">{progress}%</span>
            </div>
         </div>
      </div>

      {/* Benchmarks List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {questions.map((question, index) => {
            const isEditing = editingId === question._id;
            const isLoading = loadingId === question._id;
            const isExpanded = expandedId === question._id;
            
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={question._id || index}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] border transition-all duration-300",
                  isEditing ? "bg-card border-primary ring-4 ring-primary/5 shadow-2xl" : "bg-background border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
                  question.isCompleted && !isEditing && "opacity-75"
                )}
              >
                {/* Status Indicator Bar */}
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-1.5 transition-colors",
                  question.isCompleted ? "bg-emerald-500" : "bg-primary/20 group-hover:bg-primary/50"
                )} />

                <div className="p-6 ml-1.5">
                   <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 space-y-3">
                         {isEditing ? (
                            <div className="space-y-4">
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-primary">Strategic Question</label>
                                  <Input 
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="h-12 font-bold border-border/40 bg-muted/30"
                                    autoFocus
                                  />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-primary">Resolution / Answer</label>
                                  <Textarea 
                                    value={editAnswer}
                                    onChange={(e) => setEditAnswer(e.target.value)}
                                    className="min-h-[100px] font-medium border-border/40 bg-muted/30 resize-none"
                                    placeholder="Provide the strategic context or resolution..."
                                  />
                               </div>
                            </div>
                         ) : (
                            <div 
                              className="cursor-pointer group/content"
                              onClick={() => setExpandedId(isExpanded ? null : question._id)}
                            >
                               <div className="flex items-center gap-3 mb-1">
                                  <span className={cn(
                                    "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
                                    question.isCompleted ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-primary/10 text-primary border-primary/20"
                                  )}>
                                     {question.isCompleted ? "Validated" : "Pending Calibration"}
                                  </span>
                               </div>
                               <h5 className={cn(
                                 "text-lg font-black tracking-tight transition-all",
                                 question.isCompleted ? "text-muted-foreground/40 line-through" : "text-foreground group-hover/content:text-primary"
                               )}>
                                  {question.name}
                               </h5>
                               <AnimatePresence>
                                  {(isExpanded || question.answer) && (
                                     <motion.div 
                                       initial={{ height: 0, opacity: 0 }}
                                       animate={{ height: "auto", opacity: 1 }}
                                       exit={{ height: 0, opacity: 0 }}
                                       className="overflow-hidden"
                                     >
                                        <p className="mt-4 text-sm font-medium text-muted-foreground leading-relaxed border-l-2 border-primary/10 pl-4 py-1 italic">
                                           {question.answer || "No strategic context provided."}
                                        </p>
                                     </motion.div>
                                  )}
                               </AnimatePresence>
                            </div>
                         )}
                      </div>

                      <div className="flex flex-col gap-2">
                         {isEditing ? (
                            <div className="flex flex-col gap-2">
                               <Button 
                                 size="sm"
                                 onClick={() => handleUpdate(question._id)}
                                 disabled={isLoading}
                                 className="rounded-xl shadow-lg shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600"
                               >
                                  {isLoading ? <Loader2 size={16} className="animate-spin text-white" /> : <Check size={16} className="text-white" />}
                               </Button>
                               <Button 
                                 size="sm"
                                 variant="ghost"
                                 onClick={() => setEditingId(null)}
                                 className="rounded-xl hover:bg-rose-50 text-rose-500"
                               >
                                  <X size={16} />
                               </Button>
                            </div>
                         ) : (
                            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                               <button 
                                 onClick={(e) => handleToggle(e, question._id)}
                                 disabled={isLoading}
                                 className={cn(
                                   "w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all shadow-sm",
                                   question.isCompleted 
                                     ? "bg-emerald-500 border-emerald-500 text-white shadow-emerald-500/20" 
                                     : "bg-white border-border text-muted-foreground/30 hover:border-primary hover:text-primary"
                                 )}
                               >
                                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={18} />}
                               </button>
                               <button 
                                 onClick={(e) => startEditing(e, question)}
                                 className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground/40 hover:text-primary hover:border-primary transition-all shadow-sm"
                               >
                                  <Edit2 size={16} />
                               </button>
                               <button 
                                 onClick={(e) => handleDelete(e, question._id)}
                                 className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground/40 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all shadow-sm"
                               >
                                  <Trash2 size={16} />
                               </button>
                            </div>
                         )}
                      </div>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {questions.length === 0 && (
          <div className="py-20 text-center rounded-[3rem] border-2 border-dashed border-border/40 bg-muted/10">
             <div className="w-16 h-16 bg-muted/20 rounded-3xl flex items-center justify-center mx-auto mb-4 text-muted-foreground/20">
                <MessageSquare size={32} />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">Strategic Void</p>
             <p className="text-sm font-bold text-muted-foreground/40 mt-2">No strategic benchmarks have been initialized.</p>
          </div>
        )}
      </div>

      {/* Strategic Entry Point */}
      <motion.div 
        layout
        className="p-8 bg-card border-2 border-dashed border-border/60 rounded-[2.5rem] space-y-6"
      >
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
               <Plus size={20} />
            </div>
            <h4 className="text-sm font-black tracking-tight">Register New Strategic Benchmark</h4>
         </div>

         <div className="space-y-4">
            <Input 
              placeholder="Primary objective or question? (e.g. How do we ensure low latency?)"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="h-14 font-black border-border shadow-sm bg-background"
            />
            <Textarea 
              placeholder="Expected resolution or strategic response..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="min-h-[100px] font-medium border-border shadow-sm bg-background resize-none"
            />
            <div className="flex justify-end pt-2">
               <Button 
                 onClick={handleAddQuestion}
                 disabled={!newQuestion.trim() || isAdding}
                 className="h-12 px-8 rounded-2xl shadow-xl shadow-primary/20 gap-2 font-black transition-all hover:scale-[1.02]"
               >
                 {isAdding ? <Loader2 className="animate-spin" /> : <Check size={18} />}
                 Commit to Registry
               </Button>
            </div>
         </div>
      </motion.div>

      {/* DECOMMISSION CONFIRMATION DIALOG */}
      <Dialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
         <DialogContent className="rounded-[2.5rem] p-8 border-border shadow-2xl max-w-md">
            <DialogHeader className="space-y-4">
               <div className="w-16 h-16 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 mx-auto sm:mx-0">
                  <Trash2 size={32} />
               </div>
               <div className="space-y-2 text-center sm:text-left">
                  <DialogTitle className="text-2xl font-black tracking-tight text-foreground">
                     Decommission Benchmark?
                  </DialogTitle>
                  <DialogDescription className="text-sm font-medium text-muted-foreground leading-relaxed">
                     You are about to extract this strategic benchmark node from the registry. This action is irreversible and will update the global execution health telemetry.
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

export default StrategicBenchmarks;
