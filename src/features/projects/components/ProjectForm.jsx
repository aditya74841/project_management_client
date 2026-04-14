"use client";

import React from "react";
import {
  CheckCircle2,
  Layers,
  ArrowRight,
  Type,
  AlignLeft,
  Activity,
  Calendar,
  Tag,
  Code2,
  AlertCircle,
  Zap,
} from "lucide-react";

import { Button, Input } from "@/components/ui-core";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

const SectionLabel = ({ icon: Icon, label }) => (
  <h5 className="flex items-center gap-2.5 px-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">
    {Icon && <Icon size={14} className="text-primary/60" />}
    {label}
  </h5>
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
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-10">
        {/* Core Identity Section */}
        <section className="space-y-8">
          <SectionLabel icon={Layers} label={createMode ? "System Initialization" : "Registry Core"} />

          <Input
            label="Project Designation"
            id="name"
            name="name"
            placeholder="e.g. Project Orion Redesign"
            required
            value={formData.name}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.name ? errors.name : null}
            icon={<Type className="w-4 h-4 text-muted-foreground" />}
          />

          {!createMode && (
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Lifecycle State
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors">
                    <Activity size={16} />
                  </div>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="h-12 w-full pl-11 pr-4 rounded-2xl border border-border bg-background text-sm font-bold text-foreground outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 appearance-none cursor-pointer transition-all"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Input
                label="Target Milestone"
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.deadline ? errors.deadline : null}
                icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
          )}
        </section>

        {/* Narrative Section */}
        <section className="space-y-8">
          <SectionLabel icon={AlignLeft} label="Strategic Narrative" />
          <Input
            label="Executive Summary"
            id="description"
            name="description"
            placeholder="Define the vision, core objectives, and strategic alignment..."
            value={formData.description}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.description ? errors.description : null}
            icon={<AlignLeft className="w-4 h-4 text-muted-foreground" />}
          />
        </section>

        {/* Technical Registry Section */}
        {/* {!createMode && (
          <section className="space-y-8">
            <SectionLabel icon={Code2} label="Technical Taxonomy" />
            <div className="grid gap-6 sm:grid-cols-2">
               <Input
                  label="Architecture"
                  id="techStack"
                  name="techStack"
                  placeholder="e.g. React, Node.js, PostgreSQL"
                  value={formData.techStack}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={touched.techStack ? errors.techStack : null}
                  icon={<Code2 className="w-4 h-4 text-slate-400" />}
               />
               <Input
                  label="Metadata Tags"
                  id="tags"
                  name="tags"
                  placeholder="e.g. backend, priority, prototype"
                  value={formData.tags}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={touched.tags ? errors.tags : null}
                  icon={<Tag className="w-4 h-4 text-slate-400" />}
               />
            </div>
          </section>
        )} */}
      </div>

      {/* Global Actions */}
      <div className="flex gap-4 pt-10 border-t border-border items-center">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 h-14 font-black text-xs uppercase tracking-widest"
        >
          Discard Changes
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
          className="flex-3 h-14 font-black text-xs uppercase tracking-widest group"
        >
          {createMode ? "Initialize System" : "Sync Registry"}
          {!isSubmitting && <CheckCircle2 className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
