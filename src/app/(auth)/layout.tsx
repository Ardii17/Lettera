import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="envelope-lining flex min-h-dvh flex-col">
      <header className="px-5 py-6 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-seal-500" aria-hidden />
          <span className="font-display text-lg font-semibold text-ink">{siteConfig.name}</span>
        </Link>
      </header>
      <main id="konten" className="flex flex-1 items-center justify-center px-5 pb-16">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
