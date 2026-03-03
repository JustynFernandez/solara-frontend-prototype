import React from "react";
import { Check, AlertCircle } from "lucide-react";

interface ValidatedInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel";
  required?: boolean;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  type = "text",
  required,
  disabled,
  className = "",
  autoComplete,
}) => {
  const showError = touched && error;
  const showSuccess = touched && !error && value.length > 0;

  return (
    <div className={`space-y-1 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-900 dark:text-white"
      >
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`
            w-full rounded-xl border px-4 py-3 pr-10 text-sm transition-all
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
          <Check className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500" />
        )}
        {showError && (
          <AlertCircle className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500" />
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

export default ValidatedInput;
