"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { Eye, PencilLine, Wand2 } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/button";
import { ErrorNotice } from "@/components/ui/states";
import { Spinner } from "@/components/ui/spinner";
import { useLocalDraft } from "@/hooks/use-local-draft";
import { buildContentSchema, buildDefaultValues } from "@/lib/validations/letter-content";
import { cn } from "@/lib/utils/cn";
import { createLetterAction, updateLetterAction } from "@/services/letters.actions";
import type { TemplateMeta } from "@/templates/types";
import type { LetterContent } from "@/types/letter";
import { DynamicForm, type LetterFormValues } from "./dynamic-form";
import { RomanticBuilderForm } from "./romantic-builder-form";
import { BirthdayBuilderForm } from "./birthday-builder-form";
import { GraduationBuilderForm } from "./graduation-builder-form";
import { FriendshipBuilderForm } from "./friendship-builder-form";
import { PreviewPanel } from "./preview-panel";
import { FinalPreviewModal } from "./final-preview-modal";

type Mode = "create" | "edit";

export function LetterBuilder({
  template,
  mode = "create",
  letterId,
  initialContent,
}: {
  template: TemplateMeta;
  mode?: Mode;
  letterId?: string;
  initialContent?: LetterContent;
}) {
  const router = useRouter();
  const draft = useLocalDraft<LetterContent>(`lettera:draft:${template.slug}`);
  const [tab, setTab] = useState<"editor" | "preview">("editor");
  const [formError, setFormError] = useState<string | null>(null);
  const [showFinalPreview, setShowFinalPreview] = useState(false);
  const [pending, startTransition] = useTransition();

  const schema = useMemo(() => buildContentSchema(template.fields), [template.fields]);
  const defaultValues = useMemo(
    () => buildDefaultValues(template, initialContent),
    [template, initialContent],
  );

  const form = useForm<LetterFormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<LetterFormValues>,
    defaultValues,
    mode: "onBlur",
  });

  const values = form.watch();

  // Pulihkan draft lokal (hanya untuk surat baru), dijalankan sekali setelah mount.
  useEffect(() => {
    if (mode !== "create") return;
    const saved = draft.load();
    if (saved) form.reset({ ...defaultValues, ...saved });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave ringan dengan jeda, supaya tidak menulis ke localStorage tiap ketikan.
  useEffect(() => {
    if (mode !== "create") return;
    const timer = setTimeout(() => draft.save(values), 700);
    return () => clearTimeout(timer);
  }, [values, mode, draft]);

  const handleOpenFinalPreview = async () => {
    setFormError(null);
    const isValid = await form.trigger();
    if (isValid) {
      setShowFinalPreview(true);
    }
  };

  const handleConfirmPreview = () => {
    form.handleSubmit((content) => {
      setFormError(null);

      startTransition(async () => {
        const result =
          mode === "create"
            ? await createLetterAction({ templateSlug: template.slug, content })
            : await updateLetterAction({ id: letterId, templateSlug: template.slug, content });

        if (!result.ok) {
          setShowFinalPreview(false);
          setFormError(result.error);
          if (result.fieldErrors) {
            for (const [name, messages] of Object.entries(result.fieldErrors)) {
              if (messages?.[0]) form.setError(name, { message: messages[0] });
            }
          }
          return;
        }

        if (mode === "create" && "token" in result.data) {
          draft.clear();
          setShowFinalPreview(false);
          router.push(`/pay/${result.data.templateSlug}/${result.data.token}`);
        } else {
          router.push("/templates");
        }
        router.refresh();
      });
    })();
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOpenFinalPreview();
        }}
        noValidate
      >
      {/* Mobile: editor dan preview bergantian. Desktop: dua panel berdampingan. */}
      <div className="mb-5 flex gap-2 lg:hidden" role="tablist" aria-label="Tampilan builder">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "editor"}
          onClick={() => setTab("editor")}
          className={buttonStyles({
            variant: tab === "editor" ? "secondary" : "outline",
            size: "sm",
            className: "flex-1",
          })}
        >
          <PencilLine className="h-4 w-4" aria-hidden />
          Tulis
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "preview"}
          onClick={() => setTab("preview")}
          className={buttonStyles({
            variant: tab === "preview" ? "secondary" : "outline",
            size: "sm",
            className: "flex-1",
          })}
        >
          <Eye className="h-4 w-4" aria-hidden />
          Pratinjau
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
        <div className={cn(tab === "editor" ? "block" : "hidden lg:block", "min-w-0 w-full")}>
          <div className="rounded-2xl border border-line bg-paper p-4 sm:p-7 min-w-0 w-full overflow-hidden">
            <div className="mb-6 flex items-start justify-between gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl font-semibold text-ink truncate">{template.name}</h2>
                <p className="mt-1 text-sm text-ink-soft">{template.tagline}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => form.reset(template.sample)}
                title="Isi form dengan contoh isi surat"
                className="shrink-0"
              >
                <Wand2 className="h-4 w-4" aria-hidden />
                Contoh
              </Button>
            </div>

            {template.slug === "romantic" ? (
              <RomanticBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "birthday" ? (
              <BirthdayBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "graduation" ? (
              <GraduationBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "friendship" ? (
              <FriendshipBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : (
              <DynamicForm
                fields={template.fields}
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            )}

            {formError ? (
              <div className="mt-6">
                <ErrorNotice title="Surat belum tersimpan" description={formError} />
              </div>
            ) : null}

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 border-t border-line pt-6">
              <Button
                type="button"
                size="lg"
                onClick={handleOpenFinalPreview}
                disabled={pending}
                className="w-full sm:w-auto bg-seal-600 hover:bg-seal-700 text-white shadow-sm"
              >
                {pending ? <Spinner /> : <Eye className="h-4 w-4" />}
                {mode === "create" ? "Pratinjau & Konfirmasi" : "Pratinjau & Simpan"}
              </Button>
              <Link href="/templates" className={buttonStyles({ variant: "ghost", size: "lg", className: "w-full sm:w-auto text-center" })}>
                Ganti template
              </Link>
            </div>

            <p className="mt-4 text-sm text-ink-muted">
              Draf tersimpan otomatis di perangkatmu. Pembayaran QRIS dilakukan setelah konfirmasi pratinjau.
            </p>
          </div>
        </div>

        {/* Panel Pratinjau (Mengapung/Sticky di Desktop) */}
        <div
          className={cn(
            tab === "preview" ? "block" : "hidden lg:block",
            "min-w-0 w-full lg:sticky lg:top-20 z-10",
          )}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Pratinjau Langsung
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleOpenFinalPreview}
                title="Buka pratinjau dalam layar penuh"
                className="bg-white/95 backdrop-blur-xs hover:bg-page shadow-2xs text-xs font-medium"
              >
                <Eye className="h-3.5 w-3.5" />
                Pratinjau Layar Penuh
              </Button>
            </div>
            <PreviewPanel
              template={template.slug}
              data={values as LetterContent}
            />
          </div>
        </div>
      </div>
    </form>

      {/* Fullscreen Final Confirmation Preview Modal */}
      <FinalPreviewModal
        isOpen={showFinalPreview}
        onClose={() => setShowFinalPreview(false)}
        onConfirm={handleConfirmPreview}
        templateSlug={template.slug}
        templateName={template.name}
        data={values as LetterContent}
        isPending={pending}
        mode={mode}
      />
    </>
  );
}
