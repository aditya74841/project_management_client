"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Rocket, Shield, Globe } from "lucide-react";
import { Button } from "../ui-core";
import { useUiStore } from "@/store/uiStore";

/**
 * Zen Prism Hero Section
 * Modern, high-performance landing hero with global UI store integration.
 */
export default function HeroSection() {
  const ui = useUiStore();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Decorative Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-wider"
            >
              <Rocket className="w-4 h-4" />
              Revolutionizing Project Management
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900"
            >
              Manage projects <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-600">
                where work happens
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed"
            >
              The first truly embedded project manager. Track features, manage team activity, 
              and ship faster—all from a single, high-performance iframe.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                variant="primary" 
                size="lg" 
                className="h-14 px-10 group"
                onClick={ui.openRegister}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-10 gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                View Demo
              </Button>
            </motion.div>

            {/* Social Proof Badges */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="flex items-center gap-8 pt-6 border-t border-slate-100"
            >
               {[
                 { icon: Shield, text: "Enterprise Security" },
                 { icon: Globe, text: "Global Edge Network" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2 text-slate-400">
                    <item.icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
                 </div>
               ))}
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-xl p-2 shadow-2xl overflow-hidden ring-1 ring-slate-950/5">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm h-[450px] overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                   </div>
                   <div className="px-3 py-1 rounded-lg bg-slate-50 text-[10px] font-mono text-slate-400">
                      zen-prism-dashboard
                   </div>
                </div>
                <div className="flex-1 bg-slate-50/50 p-6 space-y-4">
                   <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
                   <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm" />
                       <div className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm" />
                   </div>
                   <div className="h-40 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-2">
                       <div className="h-4 w-full bg-slate-100 rounded" />
                       <div className="h-4 w-5/6 bg-slate-100 rounded" />
                       <div className="h-4 w-4/6 bg-slate-100 rounded" />
                   </div>
                </div>
              </div>
            </div>

            {/* Decorative Orbs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
