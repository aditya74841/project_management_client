"use client";

import React from "react";
import {
  CalendarDays,
  ClipboardList,
  FileText,
  FolderKanban,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  Type,
  AlignLeft,
  Activity,
  Calendar,
  Users,
  Tag,
  Code2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ProjectFormField from "./ProjectFormField";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

const InfoCard = ({ icon: Icon, title, description, color = "indigo" }) => (
  <div className={`rounded-[24px] border border-${color}-100 bg-${color}-50/50 p-6 flex gap-4 transition-all hover:bg-${color}-50`}>
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm text-${color}-600`}>
      <Icon size={24} />
    </div>
    <div className="space-y-1">
      <h4 className="text-[15px] font-bold text-slate-900 tracking-tight">{title}</h4>
      <p className="text-[13px] leading-relaxed text-slate-500 italic">{description}</p>
    </div>
  </div>
);

const PlaceholderGridItem = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col gap-3 rounded-[24px] border border-dashed border-slate-200 bg-white/50 p-5 transition-all hover:border-slate-300 hover:bg-white">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
      <Icon size={20} />
    </div>
    <div className="space-y-1">
      <p className="text-sm font-bold text-slate-800">{title}</p>
      <p className="text-[12px] text-slate-400 leading-normal">{description}</p>
    </div>
  </div>
);

const ProjectForm = ({
  formData,
  errors,
  touched,
  isValid,
  isSubmitting,
  isEditing,
  onChange,
  onBlur,
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const createMode = !isEditing;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Intro Info */}
      <InfoCard 
        icon={isEditing ? Layers : Package}
        title={createMode ? "Project Blueprint" : "Core Configuration"}
        description={createMode 
          ? "We only need a title to register your initial idea. You can add more context once the project is initialized."
          : "Refine your project metrics to ensure your product roadmap stays aligned with your strategic goals."}
        color={isEditing ? "indigo" : "purple"}
      />

      <div className="space-y-6 px-1">
        <ProjectFormField
          id="name"
          name="name"
          label="Project Name"
          required
          icon={Type}
          value={formData.name}
          error={touched.name ? errors.name : null}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. Project Orion Redesign"
          helpText="Choose a distinctive name to identify this initiative."
        />

        {createMode ? (
          <div className="space-y-4 pt-2">
            <h5 className="px-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Future Refinements
            </h5>
            <div className="grid gap-4 sm:grid-cols-2">
              <PlaceholderGridItem icon={AlignLeft} title="Detailed Scope" description="Add technical requirements and product description." />
              <PlaceholderGridItem icon={Calendar} title="Temporal Tracking" description="Set deadlines and milestone dates for the roadmap." />
              <PlaceholderGridItem icon={Activity} title="Status Pipeline" description="Manage the progression through project lifecycle phases." />
              <PlaceholderGridItem icon={Users} title="Team Allocation" description="Layer in members and assign specific ownership roles." />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <ProjectFormField
              id="description"
              name="description"
              label="Overview"
              icon={AlignLeft}
              value={formData.description}
              error={touched.description ? errors.description : null}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Capture the 'why' behind this project..."
              helpText="Provide a high-level summary of the target outcomes."
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <ProjectFormField
                id="deadline"
                name="deadline"
                type="date"
                label="Target Launch"
                icon={Calendar}
                value={formData.deadline}
                error={touched.deadline ? errors.deadline : null}
                onChange={onChange}
                onBlur={onBlur}
              />

              <div className="space-y-2.5">
                <label className="text-[13px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1" htmlFor="status">
                  <Activity size={14} className="text-indigo-500" />
                  Lifecycle Phase
                </label>
                <div className="group relative">
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="h-12 w-full rounded-2xl border border-white/40 bg-white/60 px-4 text-[15px] shadow-sm backdrop-blur-md outline-none transition-all duration-300 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 hover:border-indigo-200 cursor-pointer appearance-none"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors">
                    <ArrowRight size={16} className="rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <ProjectFormField
              id="tags"
              name="tags"
              label="Tags"
              icon={Tag}
              value={formData.tags}
              error={touched.tags ? errors.tags : null}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="e.g. frontend, api, mvp"
              helpText="Comma-separated labels to categorize this project."
            />

            {/* Tech Stack */}
            <ProjectFormField
              id="techStack"
              name="techStack"
              label="Tech Stack"
              icon={Code2}
              value={formData.techStack}
              error={touched.techStack ? errors.techStack : null}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="e.g. React, Node.js, MongoDB"
              helpText="Comma-separated technologies used in this project."
            />
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-6 sticky bottom-0 bg-white/80 backdrop-blur-md pb-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel} 
          className="h-12 flex-1 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all font-bold text-sm"
        >
          Discard
        </Button>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="h-12 flex-1 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200 transition-all hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0 font-bold text-sm flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              {createMode ? "Initialize Project" : "Finalize Changes"}
              <CheckCircle2 size={18} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
