import type { Metadata } from "next";
import Link from "next/link";
import { GoogleButton } from "@/components/auth/google-button";
import { RegisterForm } from "@/components/auth/register-form";
import { safeRedirectPath } from "@/lib/validations/auth";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Buat akun untuk menyimpan surat digital dan mengelola tautannya.",
  robots: { index: false, follow: false },
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const redirectTo = safeRedirectPath(next);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Buat akun</h1>
        <p className="mt-2 text-ink-soft">
          Akun dipakai untuk menyimpan surat dan mengubahnya kapan pun setelah dikirim.
        </p>
      </div>

      <GoogleButton next={redirectTo} />
      <RegisterForm next={redirectTo} />

      <p className="text-sm text-ink-soft">
        Sudah punya akun?{" "}
        <Link
          href={`/login?next=${encodeURIComponent(redirectTo)}`}
          className="font-medium text-seal-600 hover:text-seal-700"
        >
          Masuk
        </Link>
      </p>
    </div>
  );
}
