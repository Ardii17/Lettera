"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { Eye, PencilLine, RotateCcw, Wand2 } from "lucide-react";
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
import { GrandLaureateBuilderForm } from "./grand-laureate-builder-form";
import { SummitAchievementBuilderForm } from "./summit-achievement-builder-form";
import { FriendshipBuilderForm } from "./friendship-builder-form";
import { CampfireFriendshipBuilderForm } from "./campfire-friendship-builder-form";
import { BistroFriendshipBuilderForm } from "./bistro-friendship-builder-form";
import { RoadtripFriendshipBuilderForm } from "./roadtrip-friendship-builder-form";
import { TreehouseFriendshipBuilderForm } from "./treehouse-friendship-builder-form";
import { WeddingBuilderForm } from "./wedding-builder-form";
import { ApologyBuilderForm } from "./apology-builder-form";
import { KintsugiRepairBuilderForm } from "./kintsugi-repair-builder-form";
import { SafeHarborBuilderForm } from "./safe-harbor-builder-form";
import { SolsticeThawBuilderForm } from "./solstice-thaw-builder-form";
import { VintageLoveBuilderForm } from "./vintage-love-builder-form";
import { StarlightLoveBuilderForm } from "./starlight-love-builder-form";
import { LoveMixtapeBuilderForm } from "./love-mixtape-builder-form";
import { LoveScrapbookBuilderForm } from "./love-scrapbook-builder-form";
import { MuseumOfUsBuilderForm } from "./museum-of-us-builder-form";
import { SecretHerbariumBuilderForm } from "./secret-herbarium-builder-form";
import { ParfumDamourBuilderForm } from "./parfum-damour-builder-form";
import { ExLibrisBuilderForm } from "./ex-libris-builder-form";
import { TourbillonLoveBuilderForm } from "./tourbillon-love-builder-form";
import { CartographyLoveBuilderForm } from "./cartography-love-builder-form";
import { SymphonyLoveBuilderForm } from "./symphony-love-builder-form";
import { HauteJoaillerieBuilderForm } from "./haute-joaillerie-builder-form";
import { RoyalGardenWeddingBuilderForm } from "./royal-garden-wedding-builder-form";
import { ArtExhibitionBuilderForm } from "./art-exhibition-builder-form";
import { NeonBashBuilderForm } from "./neon-bash-builder-form";
import { GalaAwardBuilderForm } from "./gala-award-builder-form";
import { HeritageWeddingBuilderForm } from "./heritage-wedding-builder-form";
import { AmalfiWeddingBuilderForm } from "./amalfi-wedding-builder-form";
import { ChateauWeddingBuilderForm } from "./chateau-wedding-builder-form";
import { BirthdayGazetteBuilderForm } from "./birthday-gazette-builder-form";
import { CelestialBirthdayBuilderForm } from "./celestial-birthday-builder-form";
import { BirthdayPassportBuilderForm } from "./birthday-passport-builder-form";
import { BirthdayCinemaBuilderForm } from "./birthday-cinema-builder-form";
import { BirthdayFestivalBuilderForm } from "./birthday-festival-builder-form";
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
    if (saved) {
      // Jika data tersimpan di localStorage hanyalah teks sample lama yang tersimpan otomatis,
      // abaikan dan bersihkan draft agar user mendapatkan form kosong yang siap diisi.
      if (template.sample) {
        const isOnlyOldSample = Object.entries(saved).every(
          ([k, v]) =>
            v === "" ||
            v === template.sample?.[k] ||
            template.fields.find((f) => f.name === k)?.type === "color",
        );
        if (isOnlyOldSample) {
          draft.clear();
          return;
        }
      }

      const cleanSaved: LetterContent = {};
      for (const [k, v] of Object.entries(saved)) {
        if (v !== "" && v !== null && v !== undefined) {
          cleanSaved[k] = v;
        }
      }
      if (Object.keys(cleanSaved).length > 0) {
        form.reset({ ...defaultValues, ...cleanSaved });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave ringan dengan jeda, supaya tidak menulis ke localStorage tiap ketikan.
  useEffect(() => {
    if (mode !== "create") return;
    // Jangan autosave jika form masih dalam kondisi default kosong
    const isFormEmpty = Object.entries(values).every(
      ([k, v]) =>
        v === "" ||
        v === null ||
        v === undefined ||
        template.fields.find((f) => f.name === k)?.type === "color",
    );
    if (isFormEmpty) return;

    const timer = setTimeout(() => draft.save(values), 700);
    return () => clearTimeout(timer);
  }, [values, mode, draft, template.fields]);

  const handleOpenFinalPreview = async (enforceValidation = false) => {
    setFormError(null);

    // Mode pratinjau bebas (misalnya tombol 'Pratinjau Layar Penuh')
    if (!enforceValidation) {
      setShowFinalPreview(true);
      return;
    }

    // Mode validasi sebelum lanjut bayar ('Pratinjau & Konfirmasi')
    const isValid = await form.trigger();
    if (isValid) {
      setShowFinalPreview(true);
    } else {
      const errorEntries = Object.entries(form.formState.errors);
      if (errorEntries.length > 0) {
        const [firstField, err] = errorEntries[0];
        const msg = (err?.message as string) || "Ada kolom wajib yang belum diisi.";
        setFormError(`Perhatian: ${msg}`);

        // Pastikan tab editor aktif agar error terlihat di mobile
        setTab("editor");

        setTimeout(() => {
          const el =
            document.getElementById(`${template.slug}-${firstField}`) ||
            document.getElementsByName(firstField)[0];
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.focus?.();
          }
        }, 100);
      } else {
        setFormError("Mohon periksa kembali kolom formulir yang belum valid.");
      }
    }
  };

  const handleConfirmPreview = () => {
    form.handleSubmit(
      (content) => {
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
      },
      (errors) => {
        setShowFinalPreview(false);
        const [firstField, err] = Object.entries(errors)[0] || [];
        const msg = (err?.message as string) || "Mohon lengkapi seluruh kolom wajib bertanda bintang (*).";
        setFormError(`Perhatian: ${msg}`);
        setTab("editor");

        setTimeout(() => {
          if (firstField) {
            const el =
              document.getElementById(`${template.slug}-${firstField}`) ||
              document.getElementsByName(firstField)[0];
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
              el.focus?.();
            }
          }
        }, 100);
      },
    )();
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOpenFinalPreview(true);
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
            <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="min-w-0 w-full flex-1">
                <h2 className="font-display text-xl font-semibold text-ink">{template.name}</h2>
                <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">{template.tagline}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    draft.clear();
                    form.reset(buildDefaultValues(template));
                  }}
                  title="Kosongkan seluruh isian formulir"
                  className="text-xs text-ink-muted hover:text-ink hover:bg-page border-line"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1" aria-hidden />
                  Kosongkan
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => form.reset({ ...defaultValues, ...(template.sample ?? {}) })}
                  title="Isi form dengan contoh isi surat"
                  className="text-xs"
                >
                  <Wand2 className="h-3.5 w-3.5 mr-1" aria-hidden />
                  Contoh
                </Button>
              </div>
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
            ) : template.slug === "birthday-gazette" ? (
              <BirthdayGazetteBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "celestial-birthday" ? (
              <CelestialBirthdayBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "birthday-passport" ? (
              <BirthdayPassportBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "birthday-cinema" ? (
              <BirthdayCinemaBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "birthday-festival" ? (
              <BirthdayFestivalBuilderForm
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
            ) : template.slug === "grand-laureate" ? (
              <GrandLaureateBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "summit-achievement" ? (
              <SummitAchievementBuilderForm
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
            ) : template.slug === "campfire-friendship" ? (
              <CampfireFriendshipBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "bistro-friendship" ? (
              <BistroFriendshipBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "roadtrip-friendship" ? (
              <RoadtripFriendshipBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "treehouse-friendship" ? (
              <TreehouseFriendshipBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "wedding" ? (
              <WeddingBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "apology" ? (
              <ApologyBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "kintsugi-repair" ? (
              <KintsugiRepairBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "safe-harbor" ? (
              <SafeHarborBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "solstice-thaw" ? (
              <SolsticeThawBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "vintage-love" ? (
              <VintageLoveBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "starlight-love" ? (
              <StarlightLoveBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "love-mixtape" ? (
              <LoveMixtapeBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "love-scrapbook" ? (
              <LoveScrapbookBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "museum-of-us" ? (
              <MuseumOfUsBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "secret-herbarium" ? (
              <SecretHerbariumBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "parfum-damour" ? (
              <ParfumDamourBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "ex-libris" ? (
              <ExLibrisBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "tourbillon-love" ? (
              <TourbillonLoveBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "cartography-love" ? (
              <CartographyLoveBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "symphony-love" ? (
              <SymphonyLoveBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "haute-joaillerie" ? (
              <HauteJoaillerieBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "royal-garden-wedding" ? (
              <RoyalGardenWeddingBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "heritage-wedding" ? (
              <HeritageWeddingBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "amalfi-wedding" ? (
              <AmalfiWeddingBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "chateau-wedding" ? (
              <ChateauWeddingBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "art-exhibition" ? (
              <ArtExhibitionBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "neon-bash" ? (
              <NeonBashBuilderForm
                register={form.register}
                setValue={form.setValue}
                watch={form.watch}
                errors={form.formState.errors}
                idPrefix={template.slug}
              />
            ) : template.slug === "gala-award" ? (
              <GalaAwardBuilderForm
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
                onClick={() => handleOpenFinalPreview(true)}
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
                onClick={() => handleOpenFinalPreview(false)}
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
