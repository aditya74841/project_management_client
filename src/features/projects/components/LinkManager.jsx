"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Check,
  X,
  Globe,
  Github,
  BookOpen,
  Figma,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store/projectStore";

// ─── Utility: pick icon by URL heuristic ──────────────────────────────────────
const getLinkIcon = (url = "") => {
  if (!url) return <Globe size={13} />;
  const u = url.toLowerCase();
  if (u.includes("github")) return <Github size={13} />;
  if (u.includes("figma")) return <Figma size={13} />;
  if (u.includes("notion") || u.includes("docs") || u.includes("confluence"))
    return <BookOpen size={13} />;
  return <Globe size={13} />;
};

// ─── Inline Edit / Add Form ───────────────────────────────────────────────────
const LinkForm = ({ initial = { name: "", url: "" }, onSave, onCancel, saving }) => {
  const [name, setName] = useState(initial.name);
  const [url, setUrl] = useState(initial.url);
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) return "Label is required.";
    if (!url.trim()) return "URL is required.";
    if (!/^https?:\/\/.+/.test(url.trim())) return "URL must start with http:// or https://";
    return "";
  };

  const handleSave = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    onSave(name.trim(), url.trim());
  };

  return (
    <div className="space-y-2.5 bg-muted/60 rounded-2xl p-3 border border-border">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }}
          placeholder="Label  (e.g. GitHub Repo)"
          className="w-full text-xs font-semibold bg-background border border-border rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>
      <div>
        <input
          type="url"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setError(""); }}
          placeholder="https://..."
          className="w-full text-xs font-semibold bg-background border border-border rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>
      {error && (
        <p className="text-[10px] font-bold text-destructive px-1">{error}</p>
      )}
      <div className="flex gap-2 justify-end pt-0.5">
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-lg hover:bg-accent transition-all"
        >
          <X size={10} /> Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
        >
          <Check size={10} /> {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const LinkManager = ({ projectId, links = [] }) => {
  const { addLink, updateLink, removeLink } = useProjectStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const handleAdd = async (name, url) => {
    setSaving(true);
    const ok = await addLink(projectId, name, url);
    setSaving(false);
    if (ok) setShowAddForm(false);
  };

  const handleUpdate = async (linkId, name, url) => {
    setSaving(true);
    const ok = await updateLink(projectId, linkId, name, url);
    setSaving(false);
    if (ok) setEditingId(null);
  };

  const handleRemove = async (linkId) => {
    setRemovingId(linkId);
    await removeLink(projectId, linkId);
    setRemovingId(null);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-2 space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 text-primary rounded-lg">
            <Link2 size={12} />
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            References
          </h4>
        </div>
        <button
          onClick={() => { setShowAddForm(true); setEditingId(null); }}
          title="Add Link"
          className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary bg-muted hover:bg-primary/10 px-2 py-1 rounded-lg transition-all group"
        >
          <Plus size={10} className="group-hover:rotate-90 transition-transform duration-200" />
          Add
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            key="add-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <LinkForm
              onSave={handleAdd}
              onCancel={() => setShowAddForm(false)}
              saving={saving}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Links List */}
      <div className="space-y-1.5">
        <AnimatePresence>
          {links.length === 0 && !showAddForm && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-5 text-center"
            >
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center mb-2">
                <Link2 size={14} className="text-muted-foreground/50" />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                No links yet
              </p>
            </motion.div>
          )}

          {links.map((link, i) => (
            <motion.div
              key={link._id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              layout
            >
              <AnimatePresence mode="wait">
                {editingId === link._id ? (
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <LinkForm
                      initial={{ name: link.name, url: link.url }}
                      onSave={(name, url) => handleUpdate(link._id, name, url)}
                      onCancel={() => setEditingId(null)}
                      saving={saving}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border border-transparent hover:border-border hover:bg-muted/50 transition-all ${removingId === link._id ? "opacity-40 pointer-events-none" : ""}`}
                  >
                    {/* Icon */}
                    <div className="shrink-0 w-7 h-7 rounded-xl bg-primary/8 text-primary flex items-center justify-center border border-primary/10">
                      {getLinkIcon(link.url)}
                    </div>

                    {/* Label + URL */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-foreground capitalize truncate leading-tight">
                        {link.name}
                      </p>
                      <p className="text-[9px] font-medium text-muted-foreground truncate mt-0.5">
                        {link.url.replace(/^https?:\/\//, "")}
                      </p>
                    </div>

                    {/* Actions (appear on hover) */}
                    <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open link"
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={11} />
                      </a>
                      <button
                        title="Edit link"
                        onClick={() => { setEditingId(link._id); setShowAddForm(false); }}
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                      >
                        <Pencil size={11} />
                      </button>
                      <button
                        title="Remove link"
                        onClick={() => handleRemove(link._id)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default LinkManager;
