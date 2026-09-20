import { SiteHeader } from "./site-header";

/** Kerangka halaman aplikasi (builder, halaman hasil) tanpa footer marketing. */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="konten" className="flex-1 pb-20">
        {children}
      </main>
    </div>
  );
}
