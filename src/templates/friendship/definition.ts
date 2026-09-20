import type { TemplateMeta } from "../types";

export const friendshipTemplate: TemplateMeta = {
  slug: "friendship",
  name: "Friendship Letter",
  category: "Pertemanan",
  tagline: "Santai dan hangat — seperti catatan yang ditempel di pintu kamar.",
  description:
    "Surat pertemanan dengan kartu yang sedikit miring, selotip kertas, dan kotak kenangan bergaya polaroid. Tidak formal, tapi tetap rapi.",
  cardAccent: "bg-sage/15 text-sage",
  highlights: ["Kotak kenangan terpisah dari isi surat", "Detail 'berteman sejak'", "Nada santai tanpa terlihat berantakan"],
  fields: [
    {
      name: "recipientName",
      label: "Nama teman",
      type: "text",
      placeholder: "Bagas",
      required: true,
      maxLength: 60,
      isRecipient: true,
    },
    {
      name: "friendsSince",
      label: "Berteman sejak",
      type: "text",
      placeholder: "2015, kelas 10 IPA 3",
      maxLength: 60,
    },
    {
      name: "message",
      label: "Isi surat",
      type: "textarea",
      placeholder: "Tulis apa pun yang ingin kamu sampaikan…",
      required: true,
      maxLength: 3000,
      rows: 9,
    },
    {
      name: "favoriteMemory",
      label: "Kenangan favorit",
      type: "textarea",
      placeholder: "Momen yang selalu kalian bahas sampai sekarang…",
      maxLength: 600,
      rows: 4,
    },
    {
      name: "quote",
      label: "Penutup singkat",
      type: "text",
      placeholder: "Sampai ketemu di warung yang sama.",
      maxLength: 160,
    },
    {
      name: "senderName",
      label: "Dari",
      type: "text",
      placeholder: "Yudha",
      required: true,
      maxLength: 60,
    },
    { name: "letterDate", label: "Tanggal", type: "date" },
  ],
  sample: {
    recipientName: "Bagas",
    friendsSince: "2015, kelas 10 IPA 3",
    message:
      "Kita jarang ngobrol serius, jadi anggap saja ini sekali seumur hidup. Terima kasih sudah jadi orang yang tetap angkat telepon jam dua pagi tanpa banyak tanya.\n\nSemoga kerjaanmu di kota sebelah lancar. Kalau capek, pulang saja dulu.",
    favoriteMemory:
      "Motor mogok di Malang, hujan deras, dan kita malah ketawa sambil dorong dua kilometer.",
    quote: "Sampai ketemu di warung yang sama.",
    senderName: "Yudha",
    letterDate: "2026-09-20",
  },
};
