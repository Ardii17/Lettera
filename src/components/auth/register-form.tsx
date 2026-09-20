"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { ErrorNotice } from "@/components/ui/states";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

export function RegisterForm({ next }: { next: string }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { name: values.name },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setFormError(
        error.message.toLowerCase().includes("already")
          ? "Email ini sudah terdaftar. Coba masuk saja."
          : "Pendaftaran gagal. Periksa datamu lalu coba lagi.",
      );
      return;
    }

    // Bila konfirmasi email aktif, Supabase tidak langsung membuat session.
    if (!data.session) {
      setNeedsConfirmation(true);
      return;
    }

    router.push(next);
    router.refresh();
  });

  if (needsConfirmation) {
    return (
      <div className="rounded-2xl border border-line bg-paper p-6">
        <h2 className="font-display text-xl font-semibold text-ink">Cek kotak masukmu</h2>
        <p className="mt-2 leading-relaxed text-ink-soft">
          Kami mengirim tautan konfirmasi. Buka tautan itu untuk mengaktifkan akun, lalu kembali ke
          sini untuk melanjutkan suratmu.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <TextField
        label="Nama"
        autoComplete="name"
        required
        error={errors.name?.message}
        {...register("name")}
      />
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register("email")}
      />
      <TextField
        label="Kata sandi"
        type="password"
        autoComplete="new-password"
        required
        hint="Minimal 8 karakter."
        error={errors.password?.message}
        {...register("password")}
      />
      <TextField
        label="Ulangi kata sandi"
        type="password"
        autoComplete="new-password"
        required
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {formError ? <ErrorNotice title="Gagal mendaftar" description={formError} /> : null}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : null}
        Buat akun
      </Button>
    </form>
  );
}
