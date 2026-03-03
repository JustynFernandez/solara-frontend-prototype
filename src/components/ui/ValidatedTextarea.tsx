import React from "react";
import { Check, AlertCircle } from "lucide-react";

interface ValidatedTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
}

const ValidatedTextarea: React.FC<ValidatedTextareaProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required,
  disabled,
  rows = 4,
  maxLength,
  className = "",
}) => {
  const showError = touched && error;
  const showSuccess = touched && !error && value.length > 0;
  const charCount = value.length;
  const showCharCount = maxLength && charCount > 0;

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-slate-900 dark:text-white"
        >
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
        {showCharCount && (
          <span
            className={`text-xs ${
              charCount > maxLength
                ? "text-red-500"
                : charCount > maxLength * 0.8
                  ? "text-amber-500"
                  : "text-slate-400"
            }`}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full resize-none rounded-xl border px-4 py-3 pr-10 text-sm transition-all
            focus:outline-none focus:ring-2
            disabled:cursor-not-allowed disabled:opacity-60
            ${
              showError
                ? "border-red-400 bg-red-50 text-red-900 ring-red-200 dark:border-red-500 dark:bg-red-900/20 dark:text-red-200"
                : showSuccess
                  ? "border-emerald-400 bg-emerald-50 ring-emerald-200 dark:border-emerald-500 dark:bg-emerald-900/20"
                  : "border-slate-200 bg-white ring-blue-500 dark:border-white/15 dark:bg-white/5"
            }
            text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500
          `}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={showError ? `${id}-error` : undefined}
        />
        {showSuccess && (
          <Check className="absolute right-3 top-3 h-5 w-5 text-emerald-500" />
        )}
        {showError && (
          <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-red-500" />
        )}
      </div>
      {showError && (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400"
        >
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
};

export default ValidatedTextarea;
