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
  Zap,
  Tag,
  Plus
} from "lucide-react";
import { useFeatureStore } from "@/store/featureStore";
import { useAuthStore } from "@/store/authStore";
import { Button, Input } from "@/components/ui-core";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Collaboration Feed (Zen Prism Edition)
 * A premium discussion registry for engineering collaboration.
 * Features sophisticated message distribution and high-fidelity interactions.
 */
const FeatureComments = ({ featureId, comments = [], tags = [] }) => {
  const [newComment, setNewComment] = useState("");
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTagging, setIsTagging] = useState(false);
  
  const { addComment, addTag, removeTag } = useFeatureStore();
  const { profile } = useAuthStore();

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    const success = await addComment(featureId, newComment.trim());
    if (success) setNewComment("");
    setIsSubmitting(false);
  };

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    setIsTagging(true);
    await addTag(featureId, newTag.trim());
    setNewTag("");
    setIsTagging(false);
  };

  const handleRemoveTag = async (tag) => {
    await removeTag(featureId, tag);
  };

  return (
    <div className="flex flex-col h-full space-y-8 pt-8 border-t border-border/50 overflow-hidden">
      {/* Feed Header */}
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/10">
                  <MessageSquare size={18} />
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Collaboration Feed</h4>
                  <p className="text-sm font-black text-foreground tracking-tight">Standardized Registry Notes</p>
               </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground text-background text-[10px] font-black shadow-lg">
               {comments.length}
            </div>
         </div>

         {/* Tag Management Core */}
         <div className="space-y-3 p-4 bg-muted/30 rounded-3xl border border-border/50">
            <div className="flex items-center justify-between px-1">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                  <Tag size={12} />
                  Classification Index
               </div>
            </div>
            <div className="flex flex-wrap gap-2">
               <AnimatePresence mode="popLayout">
                  {tags.map((tag, i) => (
                     <motion.span 
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        key={tag + i} 
                        className="pl-3 pr-1 py-1 rounded-full bg-background border border-border text-[9px] font-black uppercase tracking-[0.15em] text-foreground flex items-center gap-2 group/tag shadow-sm"
                     >
                        {tag}
                        <button 
                           onClick={() => handleRemoveTag(tag)}
                           className="w-5 h-5 rounded-full flex items-center justify-center text-muted-foreground/30 hover:bg-rose-500 hover:text-white transition-all scale-0 group-hover/tag:scale-100"
                        >
                           <X size={10} strokeWidth={4} />
                        </button>
                     </motion.span>
                  ))}
               </AnimatePresence>
               
               <form onSubmit={handleAddTag} className="flex-1 min-w-[120px]">
                  <div className="relative group">
                     <Input 
                        placeholder="Append categorization..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="h-8 pl-8 text-[9px] font-black uppercase tracking-widest bg-background/50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20"
                        disabled={isTagging}
                     />
                     <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors">
                        {isTagging ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>

      {/* Message Registry */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-4 no-scrollbar min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {[...comments].reverse().map((comment, index) => {
            const isOwnComment = comment.createdBy?._id === profile?._id || comment.createdBy === profile?._id;
            const creator = typeof comment.createdBy === 'object' ? comment.createdBy : (isOwnComment ? profile : null);
            const name = creator?.name || "Registry Maintainer";
            const initial = name.charAt(0);

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={comment._id || index}
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
                       ? "bg-primary text-background border-primary/20" 
                       : "bg-card text-muted-foreground/40 border-border"
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
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                          {name}
                        </span>
                      )}
                      <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-tighter">
                        {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : "Synced Now"}
                      </span>
                   </div>

                   <div className={cn(
                      "group relative px-6 py-4 rounded-[1.75rem] text-sm font-medium shadow-sm border",
                      isOwnComment 
                        ? "bg-slate-950 dark:bg-primary/20 text-white rounded-tr-none border-slate-900/50 dark:border-primary/20" 
                        : "bg-card border-border text-foreground/80 rounded-tl-none"
                   )}>
                      <p className="whitespace-pre-wrap leading-relaxed">{comment.text}</p>
                      
                      {isOwnComment && (
                        <div className="absolute right-full top-2 mr-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                           <button className="p-2.5 bg-card rounded-xl shadow-xl border border-border text-muted-foreground/40 hover:text-primary transition-all">
                              <Edit2 size={14} />
                           </button>
                           <button className="p-2.5 bg-card rounded-xl shadow-xl border border-border text-muted-foreground/40 hover:text-rose-500 transition-all">
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
          <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border/40">
            <div className="w-16 h-16 bg-card rounded-[1.25rem] flex items-center justify-center shadow-lg mb-4 text-muted-foreground/20">
               <Zap size={32} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">Discussion Registry Open</p>
            <p className="text-xs font-medium text-muted-foreground/60 mt-2">No synchronization notes recorded yet.</p>
          </div>
        )}
      </div>

      {/* Input Module */}
      <form onSubmit={handleAddComment} className="relative pt-6 border-t border-border/50">
        <textarea 
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Append a new perspective to the registry..."
          className="w-full text-sm font-bold bg-card border-2 border-border/40 rounded-[2rem] px-8 py-5 pr-20 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-xl shadow-primary/5 resize-none no-scrollbar placeholder:text-muted-foreground/20"
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
          className="absolute right-6 bottom-8 w-12 h-12 bg-primary text-background rounded-2xl hover:brightness-110 disabled:bg-muted disabled:text-muted-foreground/30 transition-all shadow-xl shadow-primary/20 flex items-center justify-center active:scale-95 group"
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
