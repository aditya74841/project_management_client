"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  Camera, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  Hash,
  Activity,
  LogOut,
  Edit3
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui-core";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

/**
 * Identity Terminal (Zen Prism Redesign)
 * A premium user profile interface featuring glassmorphic aesthetics,
 * high-fidelity metadata categorization, and smooth motion reveal.
 */
const ProfilePage = () => {
  const fileInputRef = useRef(null);
  const { user, fetchProfile, updateAvatar, isLoading, logout } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsUploading(true);
      await updateAvatar(formData);
      toast.success("Identity visual updated successfully");
    } catch (err) {
      toast.error("Failed to calibrate identity visual");
    } finally {
      setIsUploading(false);
    }
  };

  if (!user && isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="w-10 h-10 text-primary animate-spin" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Synchronizing Identity...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-12 pb-24">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-12 px-6"
      >
        {/* --- IDENTITY HEADER TERMINAL --- */}
        <motion.section variants={itemVariants} className="relative">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10" />
          
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div 
                onClick={handleAvatarClick}
                className="relative w-40 h-40 rounded-[3rem] border-4 border-background shadow-2xl overflow-hidden cursor-pointer group-hover:scale-[1.02] transition-transform duration-500"
              >
                {user?.avatar?.url ? (
                  <img 
                    src={user.avatar.url} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground/20">
                    <User size={64} />
                  </div>
                )}
                
                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-white gap-2">
                   {isUploading ? <Loader2 className="animate-spin" /> : <Camera size={24} />}
                   <span className="text-[9px] font-black uppercase tracking-widest">Update Visual</span>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="space-y-2">
               <div className="flex items-center justify-center gap-3">
                  <h1 className="text-4xl font-black tracking-tighter text-foreground">
                    {user?.name || "Registry User"}
                  </h1>
                  {user?.isEmailVerified && (
                    <div className="text-primary" title="Verified Terminal Access">
                       <CheckCircle2 size={24} strokeWidth={3} />
                    </div>
                  )}
               </div>
               <p className="text-muted-foreground font-medium text-lg">
                 {user?.email}
               </p>
               <div className="flex items-center justify-center gap-2">
                  <span className="px-4 py-1 rounded-full bg-primary text-background text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                     {user?.role || "Operator"}
                  </span>
                  <span className="px-4 py-1 rounded-full bg-muted border border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                     ID: {user?._id?.slice(-8).toUpperCase()}
                  </span>
               </div>
            </div>
          </div>
        </motion.section>

        {/* --- METADATA GRID --- */}
        <div className="grid md:grid-cols-3 gap-6">
           {/* Section: Personnel Calibration */}
           <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-sm space-y-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <div className="flex items-center gap-3 text-primary">
                 <User size={18} />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Personnel Calibration</h3>
              </div>
              <div className="space-y-4">
                 <MetadataItem label="Display Name" value={user?.name} icon={<Edit3 size={12}/>} />
                 <MetadataItem label="Access Level" value={user?.role} />
                 <MetadataItem label="Registry Mode" value={user?.loginType || "Standard"} />
              </div>
           </motion.div>

           {/* Section: Communications */}
           <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-sm space-y-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <div className="flex items-center gap-3 text-primary">
                 <Mail size={18} />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Communication Hub</h3>
              </div>
              <div className="space-y-4">
                 <MetadataItem label="Active Email" value={user?.email} />
                 <MetadataItem label="Phone Proxy" value={user?.phoneNumber || "Decommissioned"} />
                 <MetadataItem 
                    label="Verification" 
                    value={user?.isEmailVerified ? "Terminal Verified" : "Access Pending"} 
                    className={user?.isEmailVerified ? "text-emerald-500" : "text-rose-500"}
                  />
              </div>
           </motion.div>

           {/* Section: Operational Timeline */}
           <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-sm space-y-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <div className="flex items-center gap-3 text-primary">
                 <Activity size={18} />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Operational Timeline</h3>
              </div>
              <div className="space-y-4">
                 <MetadataItem label="Initial Sync" value={user?.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : "N/A"} />
                 <MetadataItem label="Last Active" value="Synced Now" />
                 <MetadataItem label="Session Health" value="Stable" className="text-emerald-500" />
              </div>
           </motion.div>
        </div>

        {/* --- SYSTEM ACTIONS --- */}
        <motion.section variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between p-10 rounded-[3rem] bg-muted/20 border border-border/40 gap-8">
           <div className="space-y-2 text-center sm:text-left">
              <h4 className="text-xl font-black tracking-tight text-foreground">Session Architecture</h4>
              <p className="text-sm text-muted-foreground font-medium">Manage your terminal presence and registry credentials.</p>
           </div>
           <div className="flex items-center gap-4">
              <Button variant="outline" className="h-14 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 hover:bg-muted transition-all">
                 Configure Identity
              </Button>
              <Button 
                onClick={logout}
                className="h-14 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-rose-500 hover:bg-rose-600 text-white shadow-xl shadow-rose-500/20 flex items-center gap-3"
              >
                 <LogOut size={16} />
                 Decommission Session
              </Button>
           </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

const MetadataItem = ({ label, value, className, icon }) => (
  <div className="group/item">
    <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-tighter mb-1 select-none">
       {label}
    </p>
    <div className="flex items-center justify-between">
       <span className={cn("text-sm font-black text-foreground tracking-tight truncate pr-4", className)}>
          {value || "None"}
       </span>
       {icon && (
         <div className="opacity-0 group-hover/item:opacity-100 transition-opacity text-primary cursor-pointer">
            {icon}
         </div>
       )}
    </div>
  </div>
);

export default ProfilePage;
