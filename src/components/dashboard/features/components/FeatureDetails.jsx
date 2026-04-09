import React from 'react';
import { Calendar, Flag, User, Tag, CheckSquare, ListTree, MessageSquare, Info, Clock, ExternalLink } from 'lucide-react';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../utils/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeatureChecklist from './FeatureChecklist';
import FeatureWorkflow from './FeatureWorkflow';
import FeatureComments from './FeatureComments';

const FeatureDetails = ({ feature }) => {
  if (!feature) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-300">
        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 border-2 border-dashed border-gray-100">
           <Info className="w-10 h-10 opacity-20" />
        </div>
        <p className="text-xl font-black uppercase tracking-tighter opacity-40">Select a feature</p>
      </div>
    );
  }

  const priorityInfo = PRIORITY_OPTIONS.find(p => p.value === feature.priority);
  const statusInfo = STATUS_OPTIONS.find(s => s.value === feature.status);

  // Status mapping for header gradients
  const getHeaderGradient = (status) => {
    switch (status) {
      case 'completed': return 'from-emerald-500/10 via-emerald-500/5 to-transparent';
      case 'in-progress': return 'from-blue-500/10 via-blue-500/5 to-transparent';
      case 'on-hold': return 'from-rose-500/10 via-rose-500/5 to-transparent';
      default: return 'from-slate-500/10 via-slate-500/5 to-transparent';
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full">
      {/* Hero Header */}
      <div className={`relative p-8 bg-gradient-to-b ${getHeaderGradient(feature.status)} border-b border-gray-50`}>
        <div className="flex justify-between items-start mb-6">
           <div className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-white shadow-sm border border-gray-100 text-${statusInfo?.color}-600 flex items-center gap-2`}>
             <div className={`w-2 h-2 rounded-full bg-${statusInfo?.color}-500 animate-pulse`} />
             {statusInfo?.label}
           </div>
           
           <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1, 2].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-400" />
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <h3 className="text-4xl font-black text-gray-900 tracking-tight mb-4 leading-none">{feature.title}</h3>
        
        <p className="text-lg font-medium text-gray-500 leading-relaxed max-w-2xl">
          {feature.description || 'Define the scope and vision for this feature to align your team.'}
        </p>
      </div>

      {/* Insight Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white">
        <div className="space-y-4">
           {feature.benefits && (
            <div className="p-6 bg-indigo-50/30 rounded-[2rem] border border-indigo-100/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                 <ExternalLink className="w-12 h-12 text-indigo-900" />
              </div>
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Strategic Value</h4>
              <p className="text-sm font-bold text-indigo-900/80 leading-relaxed italic">
                "{feature.benefits}"
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50/50 rounded-3xl border border-gray-100 flex flex-col gap-1">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Priority</span>
               <div className="flex items-center gap-2">
                  <Flag className={`w-4 h-4 text-${priorityInfo?.color}-500`} />
                  <span className={`font-black text-sm text-${priorityInfo?.color}-700`}>{priorityInfo?.label}</span>
               </div>
            </div>
            <div className="p-4 bg-gray-50/50 rounded-3xl border border-gray-100 flex flex-col gap-1">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deadline</span>
               <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="font-black text-sm text-gray-700">
                    {feature.deadline ? new Date(feature.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
                  </span>
               </div>
            </div>
          </div>
        </div>

        {/* Dynamic Interaction Tabs */}
        <div className="flex flex-col h-full min-h-[400px]">
          <Tabs defaultValue="tasks" className="w-full flex flex-col h-full">
            <TabsList className="bg-gray-100/50 p-1.5 rounded-[1.5rem] self-start border border-gray-100 mb-6">
              <TabsTrigger value="tasks" className="flex items-center gap-2 rounded-2xl py-2.5 px-6 font-black text-[11px] uppercase tracking-tighter transition-all data-[state=active]:bg-white data-[state=active]:shadow-xl">
                <CheckSquare className="w-4 h-4" />
                Checklist
              </TabsTrigger>
              <TabsTrigger value="workflow" className="flex items-center gap-2 rounded-2xl py-2.5 px-6 font-black text-[11px] uppercase tracking-tighter transition-all data-[state=active]:bg-white data-[state=active]:shadow-xl">
                <ListTree className="w-4 h-4" />
                Workflow
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2 rounded-2xl py-2.5 px-6 font-black text-[11px] uppercase tracking-tighter transition-all data-[state=active]:bg-white data-[state=active]:shadow-xl">
                <MessageSquare className="w-4 h-4" />
                Discussion
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 bg-gray-50/30 rounded-[2.5rem] border border-gray-100 p-6 overflow-y-auto custom-scrollbar">
              <TabsContent value="tasks" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-500">
                <FeatureChecklist featureId={feature._id} questions={feature.questions} />
              </TabsContent>

              <TabsContent value="workflow" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-500">
                <FeatureWorkflow featureId={feature._id} workFlow={feature.workFlow} />
              </TabsContent>

              <TabsContent value="comments" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-500">
                <FeatureComments featureId={feature._id} comments={feature.comments} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Footer Audit */}
      <div className="mt-auto px-8 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
           Synced with Cloud Data
        </div>
        <span className="text-[9px] font-bold text-gray-400 italic">ID: {feature._id.slice(-8)}</span>
      </div>
    </div>
  );
};

export default FeatureDetails;
