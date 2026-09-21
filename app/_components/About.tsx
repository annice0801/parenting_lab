import Image from "next/image";
import { Parallax, Reveal } from "./effects";

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <span className="text-sm font-semibold uppercase tracking-widest text-clay">
            About Us
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-fredoka)] text-3xl font-semibold text-ink sm:text-4xl">
            關於我們
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
            Parenting Lab
            育兒神助手實驗室，是一群育兒路上「過來人」與幼兒教育工作者組成的小團隊。
            我們深知現代爸媽時間有限、資訊卻爆炸——每天要在海量的育兒資訊、玩具與課程裡，
            篩選出真正適合孩子的選擇，是一件很消耗心力的事。
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            所以我們把自己當成「實驗室」，實際測試、研究每一項資源，
            只把通過驗證、真正對孩子發展有幫助的內容留下來，
            陪你一起，把育兒這條路走得更安心、更有餘裕。
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-cream-deep pt-8">
            <div>
              <dt className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold text-clay">
                100+
              </dt>
              <dd className="mt-1 text-sm text-ink-soft">精選優質資源</dd>
            </div>
            <div>
              <dt className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold text-clay">
                3
              </dt>
              <dd className="mt-1 text-sm text-ink-soft">幼教／發展專業顧問</dd>
            </div>
            <div>
              <dt className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold text-clay">
                24hr
              </dt>
              <dd className="mt-1 text-sm text-ink-soft">陪伴不打烊</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal
          delay={150}
          className="order-1 aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-xl lg:order-2"
        >
          <Parallax strength={0.08} className="h-full w-full">
            <div className="relative h-full w-full">
              <Image
                src="/images/asian-dad-daughter-faceclose.jpg"
                alt="爸爸抱著女兒，父女倆額頭相貼、深情互看"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
