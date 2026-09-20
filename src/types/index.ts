export * from "./database";
export * from "./letter";
export type { TemplateField, TemplateFieldType, TemplateMeta } from "@/templates/types";

/** Hasil server action yang seragam agar UI tidak pernah menerima error mentah. */
export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
