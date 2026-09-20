import type { Metadata } from "next";
import Link from "next/link";
import { GoogleButton } from "@/components/auth/google-button";
import { LoginForm } from "@/components/auth/login-form";
import { safeRedirectPath } from "@/lib/validations/auth";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk untuk menyimpan dan mengelola surat digitalmu.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const redirectTo = safeRedirectPath(next);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Masuk ke akunmu
        </h1>
        <p className="mt-2 text-ink-soft">
          Draft yang sedang kamu tulis tetap tersimpan di perangkat ini.
        </p>
      </div>

      <GoogleButton next={redirectTo} />
      <LoginForm next={redirectTo} />

      <p className="text-sm text-ink-soft">
        Belum punya akun?{" "}
        <Link
          href={`/register?next=${encodeURIComponent(redirectTo)}`}
          className="font-medium text-seal-600 hover:text-seal-700"
        >
          Daftar gratis
        </Link>
      </p>
    </div>
  );
}
