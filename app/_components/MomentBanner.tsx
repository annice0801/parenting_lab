import Image from "next/image";
import { Parallax, Reveal } from "./effects";

export default function MomentBanner() {
  return (
    <section className="relative isolate flex h-[60vh] min-h-[420px] items-center overflow-hidden bg-ink">
      <Parallax strength={0.18} className="absolute inset-0 -z-10">
        <div className="relative h-full w-full">
          <Image
            src="/images/asian-boy-laughing-closeup.jpg"
            alt="亞洲小男孩開心大笑的特寫"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-ink/50" />

      <Reveal className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <p className="font-[family-name:var(--font-fredoka)] text-2xl leading-relaxed text-white sm:text-3xl md:text-4xl">
          「孩子的笑容，
          <br className="sm:hidden" />
          是我們最想守護的答案。」
        </p>
        <p className="mt-5 text-sm tracking-widest text-white/70">
          PARENTING LAB · 育兒神助手實驗室
        </p>
      </Reveal>
    </section>
  );
}
