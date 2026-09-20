import type { TemplateMeta } from "../types";

export const graduationTemplate: TemplateMeta = {
  slug: "graduation",
  name: "Graduation Letter",
  category: "Pencapaian",
  tagline: "Formal, tenang, dan membanggakan — seperti sertifikat, tapi terasa personal.",
  description:
    "Surat kelulusan dengan bingkai emas tipis di atas latar biru malam. Menonjolkan nama, gelar, dan institusi, lalu menutupnya dengan pesan yang hangat.",
  cardAccent: "bg-ink text-paper",
  highlights: ["Bingkai bergaya sertifikat", "Nama dan gelar sebagai fokus utama", "Cocok dicetak maupun dibaca di layar"],
  fields: [
    {
      name: "recipientName",
      label: "Nama wisudawan",
      type: "text",
      placeholder: "Alifa Rahmadani",
      required: true,
      maxLength: 80,
      isRecipient: true,
    },
    {
      name: "achievement",
      label: "Gelar / pencapaian",
      type: "text",
      placeholder: "Sarjana Ilmu Komputer",
      required: true,
      maxLength: 80,
    },
    {
      name: "institution",
      label: "Institusi",
      type: "text",
      placeholder: "Universitas Brawijaya",
      required: true,
      maxLength: 90,
    },
    {
      name: "message",
      label: "Pesan",
      type: "textarea",
      placeholder: "Tulis ucapan selamat dan doamu…",
      required: true,
      maxLength: 3000,
      rows: 9,
    },
    {
      name: "quote",
      label: "Kutipan penutup",
      type: "text",
      placeholder: "Yang sulit itu memulai, dan kamu sudah menyelesaikannya.",
      maxLength: 180,
    },
    {
      name: "senderName",
      label: "Dari",
      type: "text",
      placeholder: "Ayah & Ibu",
      required: true,
      maxLength: 60,
    },
    { name: "letterDate", label: "Tanggal", type: "date" },
  ],
  sample: {
    recipientName: "Alifa Rahmadani",
    achievement: "Sarjana Ilmu Komputer",
    institution: "Universitas Brawijaya",
    message:
      "Kami tahu berapa banyak malam yang kamu tukar untuk hari ini. Skripsi yang sempat membuatmu ingin berhenti itu akhirnya selesai, dan kami menontonnya dari jauh dengan bangga.\n\nApa pun yang kamu pilih setelah ini, pulanglah kapan pun kamu lelah.",
    quote: "Yang sulit itu memulai, dan kamu sudah menyelesaikannya.",
    senderName: "Ayah & Ibu",
    letterDate: "2026-09-20",
  },
};
