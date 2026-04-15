"use client";

import React from "react";
import { BookOpen, Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui-core";
import { motion } from "framer-motion";

/**
 * Project Diary Empty State (Zen Prism Edition)
 * A visually engaging empty state to encourage registry initialization.
 */
const ProjectDiaryEmptyState = ({ onAddDiary }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center bg-muted/50 rounded-[3rem] border-2 border-dashed border-border mt-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-8"
            >
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-24 h-24 bg-card rounded-[2rem] shadow-xl flex items-center justify-center text-primary border border-border">
                    <BookOpen size={40} strokeWidth={1.5} />
                    <div className="absolute -top-2 -right-2 p-1.5 bg-primary rounded-xl text-white shadow-lg">
                        <Sparkles size={16} />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-md space-y-4"
            >
                <h3 className="text-2xl font-black text-foreground tracking-tight">
                    Registry Nodes Empty
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                    Every revolutionary project starts with a single perspective. 
                    Initialize your first diary entry to begin documenting your engineering journey.
                </p>
                
                <div className="pt-6">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={onAddDiary}
                        className="h-14 px-10 gap-3 shadow-xl shadow-primary/20 group"
                    >
                        <Plus size={20} />
                        Initialize Perspective
                    </Button>
                </div>

                <div className="pt-8 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-border" />
                        Strategic Alignment
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-border" />
                        Feature Tracking
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectDiaryEmptyState;
