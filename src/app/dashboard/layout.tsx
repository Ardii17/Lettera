import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { displayName, getCurrentUser, getProfile } from "@/lib/auth/session";
import { siteConfig } from "@/lib/constants";
import { signOutAction } from "@/services/auth.actions";

const nav = [
  { label: "Ringkasan", href: "/dashboard" },
  { label: "Semua surat", href: "/dashboard/letters" },
  { label: "Template", href: "/templates" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Lapis kedua setelah middleware: layout ini tidak pernah merender tanpa user.
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  const profile = await getProfile();

  return (
    <div className="flex min-h-dvh flex-col bg-page">
      <header className="border-b border-line bg-paper">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-seal-500" aria-hidden />
              <span className="font-display text-lg font-semibold text-ink">{siteConfig.name}</span>
            </Link>
            <nav aria-label="Navigasi dashboard" className="hidden items-center gap-6 sm:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.95rem] text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-soft sm:inline">
              {displayName(profile, user.email)}
            </span>
            <form action={signOutAction}>
              <Button type="submit" variant="outline" size="sm">
                <LogOut className="h-4 w-4" aria-hidden />
                Keluar
              </Button>
            </form>
          </div>
        </Container>
      </header>

      <nav aria-label="Navigasi dashboard ringkas" className="border-b border-line bg-paper sm:hidden">
        <Container className="flex gap-5 overflow-x-auto py-3">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm whitespace-nowrap text-ink-soft">
              {item.label}
            </Link>
          ))}
        </Container>
      </nav>

      <main id="konten" className="flex-1 py-10">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
