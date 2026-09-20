import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email wajib diisi.").email("Format email tidak valid."),
  password: z.string().min(8, "Kata sandi minimal 8 karakter."),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Nama minimal 2 karakter.").max(60, "Nama maksimal 60 karakter."),
    email: z.string().trim().min(1, "Email wajib diisi.").email("Format email tidak valid."),
    password: z.string().min(8, "Kata sandi minimal 8 karakter.").max(72, "Kata sandi maksimal 72 karakter."),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Konfirmasi kata sandi belum sama.",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

/** Memastikan parameter ?next= hanya berupa path internal (mencegah open redirect). */
export function safeRedirectPath(value: string | null | undefined, fallback = "/dashboard") {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}
