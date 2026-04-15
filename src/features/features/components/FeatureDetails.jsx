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
   Layout,
   Settings2,
   Trash2,
   Plus,
   Shield,
   Activity,
   Cpu,
   Target,
   MoreVertical
} from 'lucide-react';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../utils/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui-core";
import { useFeatureStore } from '@/store/featureStore';
import FeatureWorkflow from './FeatureWorkflow';
import StrategicBenchmarks from './StrategicBenchmarks';
import FeatureBenefits from './FeatureBenefits';
import FeatureComments from './FeatureComments';
import { cn } from "@/lib/utils";

/**
 * Minimalist Feature Analysis Deck
 * Focuses on content, readability, and standard typography elements.
 */
const FeatureDetails = ({
   feature,
   standalone = false,
   onEdit,
   onDelete
}) => {
   const { updateStatus, updatePriority } = useFeatureStore();

   const handleStatusChange = async (newStatus) => {
      await updateStatus(feature._id, newStatus);
   };

   const handlePriorityChange = async (newPriority) => {
      await updatePriority(feature._id, newPriority);
   };

   if (!feature) {
      if (standalone) return null;
      return (
         <div className="flex flex-col items-center justify-center py-40 text-muted-foreground/30 bg-muted/5 rounded-[2.5rem] border border-dashed border-border">
            <Layout size={40} className="mb-4 opacity-20" />
            <p className="text-sm font-bold uppercase tracking-widest">Select an entry to view details</p>
         </div>
      );
   }

   const priority = PRIORITY_OPTIONS.find(p => p.value === feature.priority) || PRIORITY_OPTIONS[1];
   const status = STATUS_OPTIONS.find(s => s.value === feature.status) || STATUS_OPTIONS[0];

   return (
      <div className={cn(
         "bg-background min-h-screen flex flex-col font-sans",
         standalone ? "animate-in fade-in duration-500" : ""
      )}>
         {/* ─── MINIMALIST HEADER ─── */}
         <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
               <div className="flex items-center gap-6">

                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                     {feature.title}
                  </h1>

                  <div className="text-xl font-black">
                     {feature.deadline ? new Date(feature.deadline).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Continuous Cycle'}
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  {standalone && (
                     <>
                        <Button
                           variant="outline"
                           onClick={onEdit}
                           className="h-10 px-5 rounded-xl gap-2 text-xs font-bold border-border hover:bg-muted transition-all"
                        >
                           <Settings2 size={14} />
                           Modify
                        </Button>
                        <Button
                           variant="outline"
                           onClick={onDelete}
                           className="h-10 px-5 rounded-xl gap-2 text-xs font-bold border-border hover:text-rose-600 hover:bg-rose-50 transition-all text-muted-foreground"
                        >
                           <Trash2 size={14} />
                           Decommission
                        </Button>
                     </>
                  )}
               </div>
            </div>
         </header>

         {/* ─── MAIN CONTENT ─── */}
         <main className="max-w-7xl mx-auto w-full px-8 py-12">
            <div className="grid lg:grid-cols-12 gap-12">

               {/* PRIMARY COLUMN */}
               <div className="lg:col-span-8 space-y-12">

                  {/* Technical Vision */}
                  <section className="space-y-4">
                     <h2 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                        <Cpu size={14} />
                        Technical Vision
                     </h2>
                     <div className="text-xl font-medium leading-relaxed text-foreground/80 bg-muted/20 p-8 rounded-3xl border border-border italic">
                        {feature.description || 'No description provided.'}
                     </div>
                  </section>

                  {/* Strategic Calibration */}
                  <section className="space-y-6">
                     <h2 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                        <Target size={14} />
                        Strategic Calibration
                     </h2>
                     
                     <div className="space-y-8">
                        {/* Value Propositions */}
                        <FeatureBenefits 
                           featureId={feature._id} 
                           benefits={feature.benefits} 
                        />

                        {/* Benchmark Registry */}
                        <StrategicBenchmarks 
                           featureId={feature._id} 
                           questions={feature.questions} 
                        />
                     </div>
                  </section>

                  {/* Classification Registry */}
                  {feature.tags?.length > 0 && (
                     <section className="space-y-4">
                        <h2 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                           <Tag size={14} />
                           Classification Index
                        </h2>
                        <div className="flex flex-wrap gap-2">
                           {feature.tags.map((tag, i) => (
                              <span key={i} className="px-4 py-1.5 rounded-full bg-muted border border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                 {tag}
                              </span>
                           ))}
                        </div>
                     </section>
                  )}
               </div>

               {/* SIDEBAR */}
               <div className="lg:col-span-4 space-y-8">

                  {/* Metadata Matrix */}
                  <div className="space-y-4">
                     <div className="p-6 bg-background border border-border rounded-2xl shadow-sm space-y-4">

                        <Select value={status.value} onValueChange={handleStatusChange}>
                           <SelectTrigger className={cn(
                              "h-8 px-4 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
                              status.value === 'completed' ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-blue-50 text-blue-600 border-blue-200"
                           )}>
                              <SelectValue placeholder="Phase" />
                           </SelectTrigger>
                           <SelectContent className="rounded-2xl border-border p-1 shadow-2xl">
                              {STATUS_OPTIONS.map((opt) => (
                                 <SelectItem key={opt.value} value={opt.value} className="rounded-xl py-2 font-black text-[9px] uppercase tracking-widest cursor-pointer">
                                    {opt.label}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="p-6 bg-background border border-border rounded-2xl shadow-sm space-y-4">
                        <div className="flex items-center justify-between text-muted-foreground/60">
                           <span className="text-[10px] font-black uppercase tracking-widest">Mission Criticality</span>
                           <Flag size={14} />
                        </div>
                        <Select value={priority.value} onValueChange={handlePriorityChange}>
                           <SelectTrigger className="w-full justify-start h-10 p-0 border-none bg-transparent focus:ring-0 shadow-none hover:text-primary transition-colors cursor-pointer ring-offset-background">
                              <div className="text-xl font-black">
                                 <SelectValue placeholder="Priority" />
                              </div>
                           </SelectTrigger>
                           <SelectContent className="rounded-2xl border-border p-1 shadow-2xl">
                              {PRIORITY_OPTIONS.map((opt) => (
                                 <SelectItem key={opt.value} value={opt.value} className="rounded-xl py-2 font-black text-[9px] uppercase tracking-widest cursor-pointer">
                                    {opt.label}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </div>

                  {/* Lifecycle Navigation */}
                  <div className="border border-border rounded-[2.5rem] overflow-hidden flex flex-col h-[600px] bg-background">
                     <Tabs defaultValue="workflow" className="flex flex-col h-full">
                        <TabsList className="bg-muted/50 p-1 border-b border-border rounded-none">
                           <TabsTrigger value="workflow" className="flex-1 gap-2 py-3 font-black text-[9px] uppercase tracking-widest data-[state=active]:bg-background">
                              <ListTree size={14} />
                              Flow
                           </TabsTrigger>
                           <TabsTrigger value="comments" className="flex-1 gap-2 py-3 font-black text-[9px] uppercase tracking-widest data-[state=active]:bg-background">
                              <MessageSquare size={14} />
                              Forum
                           </TabsTrigger>
                        </TabsList>

                        <div className="flex-1 overflow-y-auto no-scrollbar">
                           <TabsContent value="workflow" className="m-0 focus:ring-0">
                              <FeatureWorkflow featureId={feature._id} workflow={feature.workflow} />
                           </TabsContent>
                           <TabsContent value="comments" className="m-0 focus:ring-0">
                              <FeatureComments 
                                 featureId={feature._id} 
                                 comments={feature.comments} 
                                 tags={feature.tags} 
                              />
                           </TabsContent>
                        </div>
                     </Tabs>
                  </div>

               </div>
            </div>
         </main>

         {/* ─── FOOTER ─── */}
         <footer className="mt-auto px-8 py-6 border-t border-border flex items-center justify-between text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               System Synchronized
            </div>
            <span>Registry ID: {feature._id}</span>
         </footer>
      </div>
   );
};

export default FeatureDetails;
