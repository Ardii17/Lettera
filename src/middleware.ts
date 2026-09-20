import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Jalankan pada semua route kecuali aset statis.
     * Halaman publik tetap dilewati agar session cookie tidak pernah dibuat untuk pembaca surat.
     */
    "/((?!_next/static|_next/image|favicon.ico|letter/|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
