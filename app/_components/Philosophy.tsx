import Image from "next/image";
import type { SVGProps } from "react";
import { Parallax, Reveal } from "./effects";

function IconPartners(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.1} {...props}>
      <circle cx="9" cy="12" r="6.5" />
      <circle cx="15" cy="12" r="6.5" />
    </svg>
  );
}

function IconSprout(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.1} {...props}>
      <path d="M12 21V10" strokeLinecap="round" />
      <path d="M12 10c0-3.5 2.8-6.5 6.3-6.5C18.3 7 15.5 10 12 10Z" strokeLinejoin="round" />
      <path d="M12 14c0-3.5-2.8-6.5-6.3-6.5C5.7 11 8.5 14 12 14Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconGrowth(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.1} {...props}>
      <path d="M3.5 20.5h17" strokeLinecap="round" />
      <rect x="5.5" y="13" width="3.4" height="7.5" />
      <rect x="10.3" y="9" width="3.4" height="11.5" />
      <rect x="15.1" y="4.5" width="3.4" height="16" />
    </svg>
  );
}

function IconScreen(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.1} {...props}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.8" />
      <path d="M8.5 20.5h7M12 16.5v4" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.1} {...props}>
      <path
        d="M12 20.5s-7.5-4.6-9.7-8.9C1.2 9.6 1.8 6.3 4.7 4.9c2.1-1 4.5-.3 6 1.4l1.3 1.5 1.3-1.5c1.5-1.7 3.9-2.4 6-1.4 2.9 1.4 3.5 4.7 2.4 6.7-2.2 4.3-9.7 8.9-9.7 8.9Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHelper(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.1} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3 10.6 15 16 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PILLARS = [
  {
    Icon: IconPartners,
    title: "爸媽的好夥伴",
    desc: "站在爸媽的角度思考，親自試用、嚴格把關，只把真正優質的資源與商品推薦給你，幫你省下大海撈針的時間。",
  },
  {
    Icon: IconSprout,
    title: "蒙特梭利精神",
    desc: "相信每個孩子都有自己的成長節奏，我們重視自主探索與動手實作，讓學習從生活中自然發生。",
  },
  {
    Icon: IconGrowth,
    title: "幼兒發展為本",
    desc: "所有建議都根基於幼兒發展階段知識，用符合孩子年齡與能力的方式，給予剛剛好的引導與刺激。",
  },
  {
    Icon: IconScreen,
    title: "科技 × 數位教具",
    desc: "善用科技的力量，打造寓教於樂又安全的數位學習體驗，讓工具成為孩子探索世界的翅膀，而非保母。",
  },
  {
    Icon: IconHeart,
    title: "溫馨陪伴",
    desc: "育兒路上難免焦慮與孤單，我們希望像朋友一樣在旁陪伴，讓每個爸媽都知道，你不是一個人在戰鬥。",
  },
  {
    Icon: IconHelper,
    title: "減輕負擔的好幫手",
    desc: "從資訊篩選到日常安排，我們願意承擔那些瑣碎又耗神的功課，讓爸媽多一點餘裕，好好享受親子時光。",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden bg-cream-soft py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-clay">
            Our Philosophy
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-fredoka)] text-3xl font-semibold text-ink sm:text-4xl">
            我們相信的事
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            這六件事，是 Parenting Lab 每一次選品、每一篇建議背後的初衷。
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 80}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-cream-deep bg-cream p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <pillar.Icon className="pointer-events-none absolute -right-5 -bottom-6 h-32 w-32 text-clay/10" />
                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          <Reveal className="aspect-[16/11] overflow-hidden rounded-[2.5rem] shadow-lg">
            <Parallax strength={0.07} className="h-full w-full">
              <div className="relative h-full w-full">
                <Image
                  src="/images/asian-kids-running.jpg"
                  alt="一群亞洲孩子在戶外自在奔跑、開心玩耍"
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
          </Reveal>
          <Reveal delay={120} className="aspect-[16/11] overflow-hidden rounded-[2.5rem] shadow-lg">
            <Parallax strength={0.07} className="h-full w-full">
              <div className="relative h-full w-full">
                <Image
                  src="/images/parent-child-reading.jpg"
                  alt="爸媽和孩子一起趴在地上專注閱讀繪本"
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
