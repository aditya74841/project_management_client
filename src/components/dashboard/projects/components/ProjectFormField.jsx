import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const ProjectFormField = ({
  id,
  name,
  label,
  type = 'text',
  required = false,
  value,
  error,
  onChange,
  onBlur,
  placeholder,
  helpText,
  icon: Icon
}) => {
  const hasError = !!error;
  const hasValue = !!value && value.length > 0;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <Label 
          htmlFor={id} 
          className="text-[13px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"
        >
          {Icon && <Icon size={14} className="text-indigo-500" />}
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </Label>
        {hasError && (
          <span className="text-[11px] font-medium text-red-500 flex items-center gap-1 animate-in fade-in slide-in-from-right-1">
            <AlertCircle size={12} /> {error}
          </span>
        )}
      </div>
      
      <div className="relative group">
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`h-12 rounded-2xl border-white/40 bg-white/60 px-4 text-[15px] shadow-sm backdrop-blur-md transition-all duration-300 focus-visible:ring-4 focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 placeholder:text-slate-400 ${
            hasError
              ? 'border-red-200 bg-red-50/30'
              : hasValue
              ? 'border-emerald-100 bg-emerald-50/10'
              : 'hover:border-indigo-200'
          }`}
        />
        
        {hasValue && !hasError && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 animate-in zoom-in-50 duration-300">
            <CheckCircle2 size={18} />
          </div>
        )}
      </div>
      
      {helpText && !error && (
        <p className="px-1 text-[11px] font-medium text-slate-400 leading-relaxed italic">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default ProjectFormField;
