import { randomUUID } from "node:crypto";

/**
 * Token publik untuk URL surat.
 *
 * Memakai UUID v4 dari crypto (CSPRNG) — 122 bit entropi, tidak berurutan, dan
 * tidak berhubungan dengan id user maupun id baris database.
 */
export function generatePublicToken(): string {
  return randomUUID();
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Validasi bentuk token sebelum menyentuh database (mencegah query sampah). */
export function isValidPublicToken(token: string): boolean {
  return UUID_PATTERN.test(token);
}
