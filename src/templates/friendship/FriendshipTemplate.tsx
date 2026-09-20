import { formatDate, toParagraphs } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Seseorang",
  friendsSince: "",
  message: "Tulisanmu akan muncul di sini.",
  favoriteMemory: "",
  quote: "",
  senderName: "Pengirim",
  letterDate: "",
};

export function FriendshipTemplate({
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
    <article className={cn("w-full bg-[#fdf3e3] px-5 py-14 sm:px-8 sm:py-16", className)}>
      <div className="relative mx-auto max-w-[36rem] -rotate-[1.2deg] rounded-2xl bg-white px-6 py-11 shadow-paper sm:px-12 sm:py-14">
        <span
          aria-hidden
          className="absolute -top-3 left-8 h-6 w-24 rotate-[-6deg] bg-[#e8dcc0]/80"
        />
        <span
          aria-hidden
          className="absolute -top-3 right-8 h-6 w-20 rotate-[5deg] bg-[#e8dcc0]/80"
        />

        <p className="text-sm text-[#9a8e7a]">Halo,</p>
        <h1 className="mt-1 font-hand text-[2.8rem] leading-none text-[#25211a] sm:text-[3.4rem]">
          {String(letter.recipientName)}
        </h1>

        {String(letter.friendsSince).trim() ? (
          <p className="mt-4 inline-block rounded-full bg-[#f4ece0] px-3 py-1 text-sm text-[#6d6252]">
            berteman sejak {String(letter.friendsSince)}
          </p>
        ) : null}

        <div className="mt-7 space-y-5 text-[1.02rem] leading-[1.85] text-[#3d372e]">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p className="text-[#9a8e7a]">Tulisanmu akan muncul di sini.</p>
          )}
        </div>

        {String(letter.favoriteMemory).trim() ? (
          <div className="mt-9 rotate-[0.8deg] rounded-md bg-[#fff8e8] p-5 pb-8 shadow-lift">
            <p className="text-sm text-[#9a8e7a]">Satu yang tidak pernah kami lupa</p>
            <p className="mt-2 font-hand text-2xl leading-snug text-[#3d372e]">
              {String(letter.favoriteMemory)}
            </p>
          </div>
        ) : null}

        {String(letter.quote).trim() ? (
          <p className="mt-9 text-center text-base text-[#6d6252]">{String(letter.quote)}</p>
        ) : null}

        <footer className="mt-10 flex items-end justify-between gap-6 border-t border-[#efe6d7] pt-6">
          <span className="text-sm text-[#9a8e7a]">{date}</span>
          <span className="font-hand text-2xl text-[#25211a]">— {String(letter.senderName)}</span>
        </footer>
      </div>
    </article>
  );
}
