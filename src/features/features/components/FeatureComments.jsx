"use client";

import React, { useState } from "react";
import { 
  Send, 
  Trash2, 
  User,
  Loader2,
  MessageSquare,
  Edit2,
  X,
  Check,
  Zap
} from "lucide-react";
import { useFeatureStore } from "@/store/featureStore";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui-core";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Collaboration Feed (Zen Prism Edition)
 * A premium discussion registry for engineering collaboration.
 * Features sophisticated message distribution and high-fidelity interactions.
 */
const FeatureComments = ({ featureId, comments = [] }) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment } = useFeatureStore();
  const { profile } = useAuthStore();

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    const success = await addComment(featureId, newComment.trim());
    if (success) setNewComment("");
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col h-full space-y-8 pt-8 border-t border-slate-50 overflow-hidden">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
               <MessageSquare size={18} />
            </div>
            <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Collaboration Feed</h4>
               <p className="text-sm font-black text-slate-900 tracking-tight">Standardized Registry Notes</p>
            </div>
         </div>
         <div className="px-3 py-1 rounded-full bg-slate-950 text-white text-[10px] font-black shadow-lg">
            {comments.length}
         </div>
      </div>

      {/* Message Registry */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-4 no-scrollbar min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {[...comments].reverse().map((comment) => {
            const isOwnComment = comment.createdBy?._id === profile?._id || comment.createdBy === profile?._id;
            const creator = typeof comment.createdBy === 'object' ? comment.createdBy : (isOwnComment ? profile : null);
            const name = creator?.name || "Registry Maintainer";
            const initial = name.charAt(0);

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={comment._id}
                className={cn(
                  "flex gap-4",
                  isOwnComment ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar Core */}
                <div className="shrink-0 pt-1">
                   <div className={cn(
                     "w-10 h-10 rounded-[1.25rem] border-2 flex items-center justify-center text-xs font-black shadow-sm transition-transform hover:scale-110",
                     isOwnComment 
                       ? "bg-primary text-white border-primary/20" 
                       : "bg-white text-slate-400 border-slate-100"
                   )}>
                     {initial || <User size={16} />}
                   </div>
                </div>

                {/* Content Shell */}
                <div className={cn(
                   "flex flex-col max-w-[80%] space-y-2",
                   isOwnComment ? "items-end" : "items-start"
                )}>
                   <div className="flex items-center gap-2 px-1">
                      {!isOwnComment && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                          {name}
                        </span>
                      )}
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                        {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : "Synced Now"}
                      </span>
                   </div>

                   <div className={cn(
                      "group relative px-6 py-4 rounded-[1.75rem] text-sm font-medium shadow-sm border",
                      isOwnComment 
                        ? "bg-slate-950 text-white rounded-tr-none border-slate-900" 
                        : "bg-white border-slate-100 text-slate-700 rounded-tl-none"
                   )}>
                      <p className="whitespace-pre-wrap leading-relaxed">{comment.text}</p>
                      
                      {isOwnComment && (
                        <div className="absolute right-full top-2 mr-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                           <button className="p-2.5 bg-white rounded-xl shadow-xl border border-slate-100 text-slate-400 hover:text-primary transition-all">
                              <Edit2 size={14} />
                           </button>
                           <button className="p-2.5 bg-white rounded-xl shadow-xl border border-slate-100 text-slate-400 hover:text-rose-600 transition-all">
                              <Trash2 size={14} />
                           </button>
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {comments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
            <div className="w-16 h-16 bg-white rounded-[1.25rem] flex items-center justify-center shadow-lg mb-4 text-slate-200">
               <Zap size={32} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Discussion Registry Open</p>
            <p className="text-xs font-medium text-slate-500 mt-2">No synchronization notes recorded yet.</p>
          </div>
        )}
      </div>

      {/* Input Module */}
      <form onSubmit={handleAddComment} className="relative pt-6 border-t border-slate-50">
        <textarea 
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Append a new perspective to the registry..."
          className="w-full text-sm font-bold bg-white border-2 border-slate-100 rounded-[2rem] px-8 py-5 pr-20 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-xl shadow-slate-100/20 resize-none no-scrollbar placeholder:text-slate-300"
          disabled={isSubmitting}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddComment(e);
            }
          }}
        />
        <button 
          type="submit" 
          disabled={isSubmitting || !newComment.trim()}
          className="absolute right-6 bottom-8 w-12 h-12 bg-primary text-white rounded-2xl hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-xl shadow-primary/20 flex items-center justify-center active:scale-95 group"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          )}
        </button>
      </form>
    </div>
  );
};

export default FeatureComments;
