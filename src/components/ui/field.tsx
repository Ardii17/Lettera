"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const control =
  "w-full min-w-0 rounded-xl border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-muted/70 transition-colors focus:border-seal-400 focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-seal-400";

export function Field({
  label,
  htmlFor,
  id,
  error,
  hint,
  helperText,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  id?: string;
  error?: string;
  hint?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const targetId = htmlFor || id || "";
  const displayHint = hint || helperText;

  return (
    <div className="space-y-2">
      <label htmlFor={targetId} className="block text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-seal-500" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {children}
      {displayHint && !error ? (
        <p id={targetId ? `${targetId}-hint` : undefined} className="text-xs text-ink-muted">
          {displayHint}
        </p>
      ) : null}
      {error ? (
        <p
          id={targetId ? `${targetId}-error` : undefined}
          role="alert"
          className="text-xs font-medium text-seal-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(control, className)} {...props} />;
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn(control, "resize-y leading-relaxed", className)} {...props} />;
  },
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, ...props }, ref) {
    return <select ref={ref} className={cn(control, "appearance-none pr-10", className)} {...props} />;
  },
);

/** Label + input sederhana untuk form auth. */
export function TextField({
  label,
  error,
  hint,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <Field label={label} htmlFor={fieldId} error={error} hint={hint} required={props.required}>
      <Input
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        {...props}
      />
    </Field>
  );
}
