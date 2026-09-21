import Image from "next/image";
import { Parallax, Reveal } from "./effects";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-ink">
      <Parallax strength={0.12} className="absolute inset-0 -z-10">
        <div className="relative h-full w-full">
          <Image
            src="/images/asian-mom-child-golden-walk.jpg"
            alt="媽媽牽著孩子的手，在黃昏灑滿金色陽光的林蔭道上散步"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/55 to-cream" />

      <div className="mx-auto max-w-4xl px-6 py-32 text-center sm:px-8">
        <Reveal>
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
            🌿 Parenting Lab・育兒神助手實驗室
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-6 font-[family-name:var(--font-fredoka)] text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            當爸媽的好夥伴
            <br className="hidden sm:block" />
            陪孩子安心長大
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            我們用蒙特梭利精神與幼兒發展知識，為每個家庭篩選真正優質的資源與教具，
            用溫暖的陪伴，替爸媽分擔一點育兒路上的重量。
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#subscribe"
              className="rounded-full bg-clay px-7 py-3.5 font-semibold text-white shadow-lg shadow-clay/30 transition hover:bg-clay/90 active:scale-95"
            >
              搶先體驗新功能
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10 active:scale-95"
            >
              認識我們
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
