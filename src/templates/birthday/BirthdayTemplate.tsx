import { formatDate, toParagraphs } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Seseorang",
  age: 0,
  greeting: "Selamat ulang tahun!",
  message: "Tulisanmu akan muncul di sini.",
  quote: "",
  senderName: "Pengirim",
  letterDate: "",
};

/** Posisi konfeti ditulis statis supaya render server dan client identik. */
const CONFETTI = [
  { left: "6%", top: "8%", size: 14, color: "#f0b429", rotate: -18 },
  { left: "88%", top: "6%", size: 10, color: "#e8453c", rotate: 24 },
  { left: "17%", top: "34%", size: 8, color: "#2f9e8f", rotate: 8 },
  { left: "92%", top: "42%", size: 13, color: "#7b61ff", rotate: -32 },
  { left: "10%", top: "72%", size: 11, color: "#e8453c", rotate: 40 },
  { left: "82%", top: "80%", size: 9, color: "#f0b429", rotate: -12 },
  { left: "48%", top: "3%", size: 8, color: "#2f9e8f", rotate: 16 },
  { left: "30%", top: "92%", size: 12, color: "#7b61ff", rotate: -6 },
];

export function BirthdayTemplate({
  data,
  className,
}: {
  data: LetterContent;
  className?: string;
}) {
  const letter = withDefaults(defaults, data);
  const paragraphs = toParagraphs(String(letter.message));
  const date = formatDate(String(letter.letterDate));
  const age = Number(letter.age);

  return (
    <article className={cn("relative w-full overflow-hidden bg-[#fff6e3] px-5 py-12 sm:px-8 sm:py-16", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {CONFETTI.map((piece, index) => (
          <span
            key={index}
            className="absolute block rounded-[2px]"
            style={{
              left: piece.left,
              top: piece.top,
              width: piece.size,
              height: piece.size * 0.45,
              backgroundColor: piece.color,
              transform: `rotate(${piece.rotate}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[36rem] rounded-[2.5rem] bg-white px-6 py-10 shadow-paper sm:px-12 sm:py-14">
        <p className="text-center text-lg font-semibold tracking-tight text-[#e8453c] sm:text-xl">
          {String(letter.greeting)}
        </p>

        <div className="mt-6 flex justify-center">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-[#fff0d6] sm:h-48 sm:w-48">
            <span className="absolute inset-3 rounded-full border-2 border-dashed border-[#f0b429]" aria-hidden />
            <span className="relative text-[4.5rem] leading-none font-bold tracking-tighter text-[#e8453c] tabular-nums sm:text-[5.5rem]">
              {Number.isFinite(age) && age > 0 ? age : "?"}
            </span>
          </div>
        </div>

        <h1 className="mt-8 text-center font-display text-[2rem] leading-tight font-semibold text-[#1f1b16] sm:text-[2.4rem]">
          {String(letter.recipientName)}
        </h1>

        <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.85] text-[#42392f]">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p className="text-[#8b8175]">Tulisanmu akan muncul di sini.</p>
          )}
        </div>

        {String(letter.quote).trim() ? (
          <p className="mt-8 -rotate-1 rounded-2xl bg-[#fff0d6] px-6 py-4 text-center text-base font-medium text-[#6b4b12]">
            {String(letter.quote)}
          </p>
        ) : null}

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#f2e6cf] pt-6">
          <span className="rounded-full bg-[#2f9e8f] px-4 py-2 text-sm font-semibold text-white">
            dari {String(letter.senderName)}
          </span>
          <span className="text-sm text-[#8b8175]">{date}</span>
        </footer>
      </div>
    </article>
  );
}
