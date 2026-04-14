"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Collapsible = ({ open, onOpenChange, children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

const CollapsibleTrigger = ({ asChild, children, onClick, ...props }) => {
  const Comp = asChild ? "div" : "button";
  return (
    <Comp
      onClick={onClick}
      {...props}
    >
      {children}
    </Comp>
  );
};

const CollapsibleContent = ({ children, open, className }) => {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
