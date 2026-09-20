import { formatDate, toParagraphs } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Seseorang",
  title: "Sebuah surat untukmu",
  message: "Tulisanmu akan muncul di sini.",
  quote: "",
  senderName: "Pengirim",
  signature: "",
  letterDate: "",
  mood: "blush",
};

type Mood = {
  page: string;
  paper: string;
  border: string;
  title: string;
  body: string;
  muted: string;
  seal: string;
  rule: string;
};

const MOODS: Record<string, Mood> = {
  blush: {
    page: "bg-[#fbf0f1]",
    paper: "bg-[#fffcfb]",
    border: "border-[#f0dcdd]",
    title: "text-[#3a2029]",
    body: "text-[#4d3a41]",
    muted: "text-[#9b8087]",
    seal: "bg-[#c03a52]",
    rule: "bg-[#eddadd]",
  },
  midnight: {
    page: "bg-[#161b33]",
    paper: "bg-[#20274a]",
    border: "border-[#333c68]",
    title: "text-[#f1eefb]",
    body: "text-[#cfcbe6]",
    muted: "text-[#8d89ad]",
    seal: "bg-[#c4a6ff]",
    rule: "bg-[#333c68]",
  },
  sage: {
    page: "bg-[#eef3ef]",
    paper: "bg-[#fbfdfb]",
    border: "border-[#dbe5de]",
    title: "text-[#1f3329]",
    body: "text-[#3b4b42]",
    muted: "text-[#82938a]",
    seal: "bg-[#2f6f5e]",
    rule: "bg-[#dbe5de]",
  },
};

export function RomanticTemplate({
  data,
  className,
}: {
  data: LetterContent;
  className?: string;
}) {
  const letter = withDefaults(defaults, data);
  const mood = MOODS[String(letter.mood)] ?? MOODS.blush;
  const paragraphs = toParagraphs(String(letter.message));
  const date = formatDate(String(letter.letterDate));

  return (
    <article className={cn("w-full px-5 py-12 sm:px-8 sm:py-16", mood.page, className)}>
      <div
        className={cn(
          "mx-auto max-w-[38rem] rounded-[2rem] border px-7 py-12 shadow-paper sm:px-14 sm:py-16",
          mood.paper,
          mood.border,
        )}
      >
        <div className="flex items-center justify-center gap-3">
          <span className={cn("h-px w-10", mood.rule)} aria-hidden />
          <span className={cn("h-2.5 w-2.5 rounded-full", mood.seal)} aria-hidden />
          <span className={cn("h-px w-10", mood.rule)} aria-hidden />
        </div>

        <header className="mt-8 text-center">
          <h1
            className={cn(
              "font-display text-[2rem] leading-[1.15] font-semibold tracking-[-0.01em] sm:text-[2.6rem]",
              mood.title,
            )}
          >
            {String(letter.title)}
          </h1>
          <p className={cn("mt-4 font-display text-lg italic", mood.muted)}>
            untuk {String(letter.recipientName)}
          </p>
        </header>

        {String(letter.quote).trim() ? (
          <blockquote
            className={cn(
              "mt-10 border-y py-6 text-center font-display text-lg leading-relaxed italic sm:text-xl",
              mood.border,
              mood.body,
            )}
          >
            {String(letter.quote)}
          </blockquote>
        ) : null}

        <div className={cn("mt-10 space-y-6 font-display text-[1.05rem] leading-[1.95]", mood.body)}>
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p className={mood.muted}>Tulisanmu akan muncul di sini.</p>
          )}
        </div>

        <footer className="mt-12 flex items-end justify-between gap-6">
          <p className={cn("text-sm", mood.muted)}>{date}</p>
          <div className="text-right">
            {String(letter.signature).trim() ? (
              <p className={cn("font-hand text-3xl leading-none", mood.title)}>
                {String(letter.signature)}
              </p>
            ) : null}
            <p className={cn("mt-2 text-sm", mood.muted)}>{String(letter.senderName)}</p>
          </div>
        </footer>
      </div>
    </article>
  );
}
