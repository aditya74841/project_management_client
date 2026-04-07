import React from "react";
import {
  CalendarDays,
  ClipboardList,
  Eye,
  FileText,
  FolderKanban,
  LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import FormField from "../../companies/components/FormField";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-slate-50/90 p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <FolderKanban className="h-5 w-5 text-slate-700" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-slate-900">
              {createMode ? "Create a project shell first" : "Project details"}
            </h3>
            <p className="text-sm leading-6 text-slate-600">
              {createMode
                ? "Only the project name is needed right now. You can come back and add description, deadline, status, and other details later."
                : "This is where you enrich the project after the quick-create step."}
            </p>
          </div>
        </div>
      </div>

      <FormField
        id="name"
        name="name"
        label="Project Name"
        required
        value={formData.name}
        error={touched.name ? errors.name : null}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Example: Client portal redesign"
      />

      {createMode ? (
        <div className="grid gap-3 rounded-[24px] border border-dashed border-slate-300 bg-white p-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 h-4 w-4 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-800">Description later</p>
              <p className="text-xs leading-5 text-slate-500">
                Add context once the project shell exists.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-4 w-4 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-800">Deadline later</p>
              <p className="text-xs leading-5 text-slate-500">
                Set dates once scope and timing are clearer.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ClipboardList className="mt-0.5 h-4 w-4 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-800">Status later</p>
              <p className="text-xs leading-5 text-slate-500">
                New projects start in draft automatically.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Eye className="mt-0.5 h-4 w-4 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-800">Visibility later</p>
              <p className="text-xs leading-5 text-slate-500">
                Toggle visibility from the project card when you are ready.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <FormField
            id="description"
            name="description"
            label="Description"
            value={formData.description}
            error={touched.description ? errors.description : null}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Capture what this project is for, who it serves, and any current constraints"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="deadline"
              name="deadline"
              type="date"
              label="Deadline"
              value={formData.deadline}
              error={touched.deadline ? errors.deadline : null}
              onChange={onChange}
              onBlur={onBlur}
            />

            <div className="space-y-2">
              <label className="font-medium text-slate-700" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={onChange}
                onBlur={onBlur}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <LockKeyhole className="h-5 w-5 text-amber-700" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">
                  Members and visibility
                </p>
                <p className="text-sm leading-6 text-slate-700">
                  Visibility is managed from the project card actions. Members can be layered in
                  after the project basics are stable.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="h-11 flex-1 rounded-xl">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="h-11 flex-1 rounded-xl bg-[linear-gradient(135deg,#0f172a_0%,#0f766e_55%,#06b6d4_100%)] text-white shadow-md hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? createMode
              ? "Creating..."
              : "Saving..."
            : createMode
              ? "Create Project"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
