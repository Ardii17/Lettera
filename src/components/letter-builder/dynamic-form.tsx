"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import type { TemplateField } from "@/templates/types";
import type { LetterContent } from "@/types/letter";

export type LetterFormValues = LetterContent;

/**
 * Form dibangun dari konfigurasi template, bukan ditulis ulang per template.
 * Menambah field baru cukup dengan mengubah `definition.ts` milik template.
 */
export function DynamicForm({
  fields,
  register,
  errors,
  idPrefix = "field",
}: {
  fields: TemplateField[];
  register: UseFormRegister<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}) {
  return (
    <div className="space-y-6">
      {fields.map((field) => {
        const fieldId = `${idPrefix}-${field.name}`;
        const error = errors[field.name]?.message as string | undefined;
        const describedBy = error
          ? `${fieldId}-error`
          : field.helperText
            ? `${fieldId}-hint`
            : undefined;

        const shared = {
          id: fieldId,
          "aria-invalid": Boolean(error),
          "aria-describedby": describedBy,
          placeholder: field.placeholder,
          ...register(field.name),
        };

        return (
          <Field
            key={field.name}
            label={field.label}
            htmlFor={fieldId}
            error={error}
            hint={field.helperText}
            required={field.required}
          >
            {field.type === "textarea" ? (
              <Textarea rows={field.rows ?? 6} maxLength={field.maxLength} {...shared} />
            ) : field.type === "select" ? (
              <Select {...shared}>
                {(field.options ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            ) : field.type === "number" ? (
              <Input type="number" inputMode="numeric" min={field.min} max={field.max} {...shared} />
            ) : field.type === "date" ? (
              <Input type="date" {...shared} />
            ) : (
              <Input type="text" maxLength={field.maxLength} {...shared} />
            )}
          </Field>
        );
      })}
    </div>
  );
}
