"use client";

import React from 'react';
import { 
  Calendar, 
  Flag, 
  User, 
  Tag, 
  CheckSquare, 
  ListTree, 
  MessageSquare, 
  Info, 
  Clock, 
  ExternalLink,
  Zap,
  Layout
} from 'lucide-react';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../utils/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeatureChecklist from './FeatureChecklist';
import FeatureWorkflow from './FeatureWorkflow';
import FeatureComments from './FeatureComments';
import { cn } from "@/lib/utils";

/**
 * Feature Analysis Deck (Zen Prism Edition)
 * A high-fidelity detail view for comprehensive feature analysis.
 * Integrates checklists, workflows, and discussion feeds into a unified command deck.
 */
const FeatureDetails = ({ feature }) => {
  if (!feature) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-slate-300 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
        <div className="w-24 h-24 rounded-[2rem] bg-white shadow-xl flex items-center justify-center mb-8 border border-slate-100">
           <Layout size={40} strokeWidth={1.5} className="opacity-20 text-primary" />
        </div>
        <p className="text-xl font-black uppercase tracking-[0.2em] opacity-30">Registry Access Pending</p>
        <p className="text-sm font-medium mt-2">Select a milestone to analyze its technical configuration.</p>
      </div>
    );
  }

  const priority = PRIORITY_OPTIONS.find(p => p.value === feature.priority) || PRIORITY_OPTIONS[1];
  const status = STATUS_OPTIONS.find(s => s.value === feature.status) || STATUS_OPTIONS[0];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Header Registry */}
      <div className="relative p-12 overflow-hidden bg-slate-950 text-white rounded-b-[4rem] shadow-2xl">
         <div className="absolute top-0 right-0 p-12 opacity-10 blur-3xl">
            <Zap size={200} fill="white" className="rotate-12" />
         </div>

         <div className="relative z-10 space-y-8">
            <div className="flex justify-between items-start">
               <div className={cn(
                 "px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2.5 shadow-xl",
                 status.value === 'completed' ? "text-emerald-400" : "text-indigo-400"
               )}>
                  <div className={cn("w-2 h-2 rounded-full animate-pulse", status.value === 'completed' ? "bg-emerald-400" : "bg-indigo-400")} />
                  {status.label}
               </div>

               <div className="flex -space-x-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-2xl border-4 border-slate-950 bg-slate-900 flex items-center justify-center shadow-2xl overflow-hidden">
                       <User size={20} className="text-slate-700" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-2xl border-4 border-slate-950 bg-indigo-600 flex items-center justify-center text-[10px] font-black shadow-2xl">
                    +4
                  </div>
               </div>
            </div>

            <div className="max-w-3xl space-y-4">
               <h3 className="text-5xl font-black tracking-tight leading-[0.9] text-white">
                 {feature.title}
               </h3>
               <p className="text-xl font-medium text-slate-400 leading-relaxed italic border-l-2 border-indigo-500/50 pl-6">
                 {feature.description || 'Architectural vision pending registry update...'}
               </p>
            </div>
         </div>
      </div>

      {/* Grid: Analysis Blocks */}
      <div className="grid lg:grid-cols-[1fr,450px] gap-12 p-12 flex-1">
         <div className="space-y-12">
            {/* Strategic Value Card */}
            {feature.benefits && (
               <div className="relative p-10 rounded-[3rem] bg-indigo-50/20 border border-indigo-100/50 overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                     <ExternalLink size={120} className="text-indigo-950" />
                  </div>
                  <div className="relative z-10 space-y-4">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-[9px] font-black uppercase tracking-widest text-indigo-500">
                        <Zap size={12} />
                        Strategic Calibration
                     </div>
                     <h4 className="text-2xl font-black text-indigo-950 tracking-tight leading-tight">
                        Impact & Value Proposition
                     </h4>
                     <p className="text-lg font-bold text-indigo-900/60 leading-relaxed">
                       {feature.benefits}
                     </p>
                  </div>
               </div>
            )}

            {/* Core Metadata Grid */}
            <div className="grid md:grid-cols-2 gap-6">
               <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex flex-col gap-4 shadow-sm group hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 group-hover:text-primary transition-colors">
                        <Flag size={18} />
                     </div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority Index</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">{priority.label}</span>
               </div>

               <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex flex-col gap-4 shadow-sm group hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 group-hover:text-primary transition-colors">
                        <Calendar size={18} />
                     </div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registry Deadline</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    {feature.deadline ? new Date(feature.deadline).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Continuous Cycle'}
                  </span>
               </div>
            </div>

            {/* Tags Registry */}
            {feature.tags?.length > 0 && (
               <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Classification Index</h5>
                  <div className="flex flex-wrap gap-2">
                     {feature.tags.map((tag, i) => (
                        <div key={i} className="px-5 py-2 rounded-2xl bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm hover:border-primary/30 hover:text-primary transition-all cursor-default">
                           {tag}
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>

         {/* Right Sidebar: Lifecycle Tabs */}
         <div className="flex flex-col h-full bg-white">
            <Tabs defaultValue="tasks" className="flex flex-col h-full space-y-8">
               <TabsList className="bg-slate-50 border border-slate-100 p-2 rounded-[2rem] shadow-sm justify-between">
                  <TabsTrigger value="tasks" className="flex-1 gap-2 rounded-2xl py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl">
                     <CheckSquare size={16} />
                     Checklist
                  </TabsTrigger>
                  <TabsTrigger value="workflow" className="flex-1 gap-2 rounded-2xl py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl">
                     <ListTree size={16} />
                     Workflow
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="flex-1 gap-2 rounded-2xl py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl">
                     <MessageSquare size={16} />
                     Forum
                  </TabsTrigger>
               </TabsList>

               <div className="flex-1 overflow-y-auto no-scrollbar pb-12">
                  <AnimatePresence mode="wait">
                     <TabsContent value="tasks" className="m-0 focus-visible:outline-none">
                        <FeatureChecklist featureId={feature._id} questions={feature.questions} />
                     </TabsContent>

                     <TabsContent value="workflow" className="m-0 focus-visible:outline-none">
                        <FeatureWorkflow featureId={feature._id} workFlow={feature.workFlow} />
                     </TabsContent>

                     <TabsContent value="comments" className="m-0 focus-visible:outline-none">
                        <FeatureComments featureId={feature._id} comments={feature.comments} />
                     </TabsContent>
                  </AnimatePresence>
               </div>
            </Tabs>
         </div>
      </div>

      {/* Footer Audit Registry */}
      <div className="mt-auto px-12 py-6 bg-slate-950 border-t border-white/5 flex items-center justify-between text-white/40">
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">System Synchronized</span>
         </div>
         <span className="text-[9px] font-black tracking-widest opacity-50">NODE_REGISTRY_ID: {feature._id}</span>
      </div>
    </div>
  );
};

export default FeatureDetails;
