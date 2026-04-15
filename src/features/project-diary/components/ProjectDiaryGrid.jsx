"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectDiaryCard from "./ProjectDiaryCard";

/**
 * Project Diary Grid (Zen Prism Edition)
 * A responsive container for diary cards with entry animation sequence.
 */
const ProjectDiaryGrid = ({ diaries, onEdit, onDelete, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      <AnimatePresence mode="popLayout">
        {diaries.map((diary, index) => (
          <motion.div
            key={diary._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.05, duration: 0.5, ease: "easeOut" }
            }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="h-full"
          >
            <ProjectDiaryCard
              diary={diary}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Loading Overlay for bulk actions if needed */}
      {loading && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-[2px] z-50 flex items-center justify-center animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-card shadow-2xl border border-border">
             <div className="w-12 h-12 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Processing Audit Change...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDiaryGrid;
