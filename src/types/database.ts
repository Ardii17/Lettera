/**
 * Tipe database (ditulis manual agar repo bisa di-typecheck tanpa koneksi).
 * Setelah schema berubah, regenerate dengan:
 *   npx supabase gen types typescript --project-id <id> > src/types/database.ts
 */
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type UserRole = "user" | "admin";
export type LetterStatus = "draft" | "published" | "archived";

export type ProfileRow = {
  id: string;
  email: string | null;
  name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export type TemplateRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  thumbnail_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type LetterRow = {
  id: string;
  user_id: string;
  template_id: string;
  public_token: string;
  title: string | null;
  content: Json;
  status: LetterStatus;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export type PublicLetterRow = {
  public_token: string;
  template_slug: string;
  template_name: string;
  title: string | null;
  content: Json;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow> & { id: string };
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      templates: {
        Row: TemplateRow;
        Insert: Partial<TemplateRow> & { slug: string; name: string; category: string };
        Update: Partial<TemplateRow>;
        Relationships: [];
      };
      letters: {
        Row: LetterRow;
        Insert: Omit<LetterRow, "id" | "created_at" | "updated_at" | "view_count"> &
          Partial<Pick<LetterRow, "id" | "status" | "view_count">>;
        Update: Partial<LetterRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_public_letter: {
        Args: { p_token: string };
        Returns: PublicLetterRow[];
      };
    };
    Enums: {
      user_role: UserRole;
      letter_status: LetterStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
