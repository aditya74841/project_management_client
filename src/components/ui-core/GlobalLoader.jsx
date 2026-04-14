"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoadingStore } from "@/store/useLoadingStore";

/**
 * Global Loader Component
 * A slim, premium top-progress bar that animates when global network
 * activity is detected via useLoadingStore.
 */
export const GlobalLoader = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 pointer-events-none">
          {/* Main Progress Bar */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: [0, 0.3, 0.7, 0.9], 
              opacity: 1 
            }}
            transition={{ 
              duration: 15, // Slow crawl to 90%
              ease: "easeOut" 
            }}
            exit={{ 
              scaleX: 1, 
              opacity: 0,
              transition: { duration: 0.3, ease: "easeInOut" } 
            }}
            className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 origin-left"
          />
          
          {/* Glow Effect */}
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 10px rgba(59,130,246,0.5)", "0 0 20px rgba(139,92,246,0.5)", "0 0 10px rgba(59,130,246,0.5)"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}
    </AnimatePresence>
  );
};
