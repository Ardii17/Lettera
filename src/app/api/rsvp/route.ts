import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const letterToken = request.nextUrl.searchParams.get("letterToken");
    if (!letterToken || typeof letterToken !== "string") {
      return NextResponse.json({ ok: true, data: [] });
    }

    const supabase = await createClient();

    // Dapatkan letter_id berdasarkan public_token
    const { data: letter } = await supabase
      .from("letters")
      .select("id")
      .eq("public_token", letterToken)
      .maybeSingle();

    if (!letter) {
      return NextResponse.json({ ok: true, data: [] });
    }

    // Ambil daftar RSVP terurut dari yang terbaru
    const { data: rsvps, error } = await supabase
      .from("wedding_rsvps")
      .select("id, guest_name, presence, guest_count, message, created_at")
      .eq("letter_id", letter.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("[api/rsvp GET] Error fetching rsvps:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data: rsvps || [] });
  } catch (err: unknown) {
    console.error("[api/rsvp GET] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Gagal memuat data kehadiran." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { letterToken, guestName, presence, guestCount, message } = body;

    if (!guestName || typeof guestName !== "string" || !guestName.trim()) {
      return NextResponse.json(
        { ok: false, error: "Nama tamu wajib diisi." },
        { status: 400 },
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { ok: false, error: "Untaian doa restu wajib diisi." },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    // Jika letterToken ada, cari di database
    let letterId: string | null = null;
    if (letterToken && typeof letterToken === "string") {
      const { data: letter } = await supabase
        .from("letters")
        .select("id")
        .eq("public_token", letterToken)
        .maybeSingle();

      if (letter) {
        letterId = letter.id;
      }
    }

    // Jika sedang dalam mode preview atau letter tidak ditemukan di DB, berikan respon simulasi sukses
    if (!letterId) {
      return NextResponse.json({
        ok: true,
        isSimulated: true,
        data: {
          id: `simulated-${Date.now()}`,
          guest_name: guestName.trim().slice(0, 100),
          presence: presence || "Hadir",
          guest_count: String(guestCount || "1"),
          message: message.trim().slice(0, 500),
          created_at: new Date().toISOString(),
        },
      });
    }

    // Simpan permanen ke tabel wedding_rsvps di Supabase
    const { data: insertedRsvp, error: insertError } = await supabase
      .from("wedding_rsvps")
      .insert({
        letter_id: letterId,
        guest_name: guestName.trim().slice(0, 100),
        presence: presence || "Hadir",
        guest_count: String(guestCount || "1"),
        message: message.trim().slice(0, 500),
      })
      .select("id, guest_name, presence, guest_count, message, created_at")
      .single();

    if (insertError) {
      console.error("[api/rsvp POST] Error inserting rsvp:", insertError);
      return NextResponse.json(
        { ok: false, error: insertError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, data: insertedRsvp });
  } catch (err: unknown) {
    console.error("[api/rsvp POST] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Gagal mengirimkan konfirmasi kehadiran." },
      { status: 500 },
    );
  }
}
