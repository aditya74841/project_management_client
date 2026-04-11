"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Users,
  Tag,
  Code2,
  Clock,
  MoreVertical,
  Edit3,
  Trash2,
  Activity,
  Plus,
  ArrowRight,
  ExternalLink,
  Github,
  Layout,
  Layers,
  Sparkles,
  Zap,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusConfig = {
  active: {
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    label: "Active",
  },
  completed: {
    gradient: "from-blue-500 via-indigo-600 to-violet-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    label: "Completed",
  },
  draft: {
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    label: "Draft",
  },
  archived: {
    gradient: "from-slate-400 via-slate-500 to-slate-600",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
    label: "Archived",
  },
};

const ProjectDetail = ({ project, onEdit, onDelete, onChangeStatus }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  if (!project) return null;

  const cfg = statusConfig[project.status] || statusConfig.active;
  const memberCount = project.members?.length || 0;
  const initials = project.name
    ? project.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "PR";

  const formatDate = (date) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard/projects")}
          className="group text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Button>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl border-slate-200 shadow-sm">
                <MoreVertical size={18} className="text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl border-slate-100 shadow-xl">
              <DropdownMenuItem onClick={() => onEdit(project)} className="rounded-lg py-2.5">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg py-2.5">
                <Github className="mr-2 h-4 w-4" /> Connect Repository
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(project._id)}
                className="rounded-lg py-2.5 text-red-600 focus:bg-red-50 focus:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Hero Section - Glassmorphism Card */}
      <motion.div variants={itemVariants} className="relative mb-10">
        <div className={`absolute inset-0 bg-gradient-to-r ${cfg.gradient} opacity-10 blur-3xl rounded-[3rem] -z-10`} />
        
        <div className="overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/70 backdrop-blur-2xl shadow-2xl shadow-indigo-100/50">
          <div className="flex flex-col lg:flex-row">
            {/* Left side: Accent and Brand */}
            <div className={`lg:w-1/3 p-10 flex flex-col items-center justify-center text-center bg-gradient-to-br ${cfg.gradient} relative overflow-hidden text-white`}>
               {/* Decorative elements */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-12 -mb-12" />
               
               <motion.div 
                 initial={{ scale: 0.8, rotate: -10 }}
                 animate={{ scale: 1, rotate: 0 }}
                 transition={{ type: "spring", stiffness: 100 }}
                 className="w-24 h-24 rounded-[2rem] bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl font-black mb-6 shadow-2xl"
               >
                 {initials}
               </motion.div>
               
               <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                 {cfg.label}
               </Badge>
               
               <h1 className="text-3xl font-black tracking-tight mb-2 drop-shadow-md">
                 {project.name}
               </h1>
               
               <p className="text-white/80 text-sm max-w-[240px] leading-relaxed">
                 Project ID: <span className="font-mono text-[10px] break-all ">{project._id}</span>
               </p>
            </div>

            {/* Right side: Summary and Actions */}
            <div className="lg:w-2/3 p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-6 mb-8 overflow-x-auto pb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Status</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
                      <span className="text-sm font-bold text-slate-700 capitalize">{project.status}</span>
                    </div>
                  </div>
                  
                  <div className="w-px h-8 bg-slate-100" />
                  
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Created</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="text-sm font-bold text-slate-700">{formatDate(project.createdAt)}</span>
                    </div>
                  </div>

                  <div className="w-px h-8 bg-slate-100" />

                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Deadline</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-rose-500" />
                      <span className="text-sm font-bold text-slate-700 accent-rose-500">{formatDate(project.deadline)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-500 leading-relaxed max-w-2xl">
                    {project.description || "Set the vision for your project. A clear description helps your team stay aligned on the core goals and values of this initiative."}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-10">
                <Button 
                  onClick={() => router.push(`/dashboard/features?projectId=${project._id}&addNew=true`)}
                  className="rounded-2xl bg-slate-900 px-6 h-12 text-sm font-bold text-white hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-200"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Feature
                </Button>
                <Button 
                  onClick={() => router.push(`/dashboard/project-diary/${project._id}`)}
                  variant="outline"
                  className="rounded-2xl border-indigo-200 bg-indigo-50/50 px-6 h-12 text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition-all"
                >
                  <Layout className="mr-2 h-4 w-4" /> Manage Diary
                </Button>
                <Button 
                  variant="ghost"
                  className="rounded-2xl px-6 h-12 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                   <Settings className="mr-2 h-4 w-4" /> Project Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Active Features", value: project.features?.length || 0, icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Team Members", value: memberCount, icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" },
          { label: "Diary Entries", value: project.diaryEntries?.length || 0, icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50" },
          { label: "Completion", value: project.status === "completed" ? "100%" : "45%", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none bg-white shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-1">
            <TabsList className="bg-transparent h-auto p-0 gap-8">
              {["overview", "team", "tech", "activity"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`
                    relative bg-transparent border-none shadow-none rounded-none px-0 py-3 text-sm font-bold transition-all
                    data-[state=active]:text-indigo-600 data-[state=active]:after:scale-x-100
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 after:scale-x-0 after:transition-transform after:duration-300
                    text-slate-400 hover:text-slate-600 capitalize
                  `}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Description and Vision */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                       <Layers size={20} className="text-indigo-400" /> Project Vision
                    </h4>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                       {project.description || "No detailed description provided. Sharing the vision of this project helps keep everyone on the same page."}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                      <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Tag size={16} className="text-emerald-400" /> Keywords & Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.length > 0 ? (
                          project.tags.map((tag, i) => (
                            <Badge key={i} className="rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border-none px-3 py-1 font-medium transition-colors">
                              {tag}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 italic">No tags added yet</span>
                        )}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                       <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Code2 size={16} className="text-indigo-400" /> Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack?.length > 0 ? (
                          project.techStack.map((tech, i) => (
                            <Badge key={i} className="rounded-xl bg-indigo-50 text-indigo-600 border-none px-3 py-1 font-medium hover:bg-indigo-100 transition-all">
                              {tech}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 italic">No tech stack listed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info Sidebar */}
                <div className="space-y-6">
                   <div className="rounded-3xl border border-indigo-50 bg-indigo-50/20 p-8">
                     <h4 className="text-base font-bold text-indigo-800 mb-6">Quick Insights</h4>
                     <ul className="space-y-4">
                       <li className="flex items-center gap-4 text-sm">
                         <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-indigo-500 shadow-sm">
                           <Users size={16} />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Ownership</span>
                           <span className="font-bold text-slate-700">{project.createdBy?.name || "System Admin"}</span>
                         </div>
                       </li>
                       <li className="flex items-center gap-4 text-sm">
                         <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-rose-500 shadow-sm">
                           <Clock size={16} />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Timeline Health</span>
                           <span className="font-bold text-slate-700">Steady Progress</span>
                         </div>
                       </li>
                       <li className="flex items-center gap-4 text-sm text-indigo-700 group cursor-pointer">
                         <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                           <ExternalLink size={16} />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">External Links</span>
                           <span className="font-bold group-hover:underline">Visit Project Website</span>
                         </div>
                       </li>
                     </ul>
                   </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="team" className="mt-0 focus-visible:outline-none">
               <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
               >
                 {project.members?.map((member, i) => (
                   <div key={i} className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-500">
                     <div className="flex items-center gap-5">
                       <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center text-xl font-black text-indigo-500 group-hover:scale-110 transition-transform duration-500">
                         {member.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                       </div>
                       <div className="flex-1">
                         <h5 className="font-bold text-slate-800 text-lg">{member.name || "Colleague"}</h5>
                         <p className="text-xs text-slate-400 mb-2 truncate max-w-[150px]">{member.email}</p>
                         <Badge className="rounded-lg bg-slate-50 text-slate-500 border-none font-bold text-[10px] uppercase tracking-tighter px-2 py-0.5">
                            Project Member
                         </Badge>
                       </div>
                       <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                         <MoreVertical size={16} className="text-slate-400" />
                       </Button>
                     </div>
                   </div>
                 ))}
                 
                 <button className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50/30 p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus size={24} />
                    </div>
                    <span className="font-bold text-sm tracking-tight">Invite Collaborator</span>
                 </button>
               </motion.div>
            </TabsContent>

            <TabsContent value="activity" className="mt-0 focus-visible:outline-none">
               <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
                  <Activity size={48} className="text-slate-200 mb-6" />
                  <h3 className="text-xl font-black text-slate-800 mb-2">Streaming Activity...</h3>
                  <p className="text-slate-400 max-w-xs text-sm">We are preparing your project's heartbeat. Soon you'll see every move made here.</p>
               </div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
