import { GraduationCap } from "lucide-react";
import { formatDate, toParagraphs } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Seseorang",
  achievement: "Sarjana",
  institution: "Universitas",
  message: "Tulisanmu akan muncul di sini.",
  quote: "",
  senderName: "Pengirim",
  letterDate: "",
};

export function GraduationTemplate({
  data,
  className,
}: {
  data: LetterContent;
  className?: string;
}) {
  const letter = withDefaults(defaults, data);
  const paragraphs = toParagraphs(String(letter.message));
  const date = formatDate(String(letter.letterDate));

  return (
    <article className={cn("w-full bg-[#141a30] px-5 py-12 sm:px-8 sm:py-16", className)}>
      <div className="mx-auto max-w-[38rem] rounded-sm border border-[#caa64f]/50 bg-[#1b2340] p-2 shadow-paper">
        <div className="border border-[#caa64f]/25 px-6 py-12 sm:px-12 sm:py-14">
          <div className="flex justify-center text-[#d5b45c]">
            <GraduationCap className="h-8 w-8" strokeWidth={1.25} aria-hidden />
          </div>

          <p className="mt-6 text-center text-sm text-[#8d96bb]">Dengan bangga untuk</p>

          <h1 className="mt-3 text-center font-display text-[2.1rem] leading-[1.15] font-semibold text-[#e7dcbb] sm:text-[2.7rem]">
            {String(letter.recipientName)}
          </h1>

          <div className="mt-5 flex flex-col items-center gap-1 text-center">
            <p className="font-display text-lg text-[#d5b45c] italic">{String(letter.achievement)}</p>
            <p className="text-sm text-[#8d96bb]">{String(letter.institution)}</p>
          </div>

          <div className="mx-auto mt-9 h-px w-24 bg-[#caa64f]/40" aria-hidden />

          <div className="mt-9 space-y-5 font-display text-[1.02rem] leading-[1.95] text-[#cdd3e8]">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
            ) : (
              <p className="text-[#8d96bb]">Tulisanmu akan muncul di sini.</p>
            )}
          </div>

          {String(letter.quote).trim() ? (
            <p className="mt-9 text-center font-display text-lg leading-relaxed text-[#e7dcbb] italic">
              {String(letter.quote)}
            </p>
          ) : null}

          <footer className="mt-12 flex items-end justify-between gap-6 border-t border-[#caa64f]/20 pt-6">
            <span className="text-sm text-[#8d96bb]">{date}</span>
            <span className="text-right text-sm text-[#cdd3e8]">{String(letter.senderName)}</span>
          </footer>
        </div>
      </div>
    </article>
  );
}
