import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream-deep bg-cream-soft">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-ink">
                Parenting Lab 育兒神助手實驗室
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              當爸媽的好夥伴，用蒙特梭利精神與幼兒發展知識，
              為孩子篩選優質資源與教具，用溫暖陪伴減輕育兒路上的負擔。
            </p>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-fredoka)] text-sm font-semibold text-ink">
              探索
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li>
                <a href="#about" className="transition hover:text-clay">
                  關於我們
                </a>
              </li>
              <li>
                <a href="#philosophy" className="transition hover:text-clay">
                  我們的理念
                </a>
              </li>
              <li>
                <Link href="/dog-game" className="transition hover:text-clay">
                  coding小遊戲
                </Link>
              </li>
              <li>
                <Link href="/binomial-cube" className="transition hover:text-clay">
                  積木教具
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-clay">
                  幼兒發展文章
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-fredoka)] text-sm font-semibold text-ink">
              與我們聯絡
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li>hello@parentinglab.tw</li>
              <li>週一至週五 09:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream-deep pt-6 text-center text-xs text-ink-soft">
          © {year} Parenting Lab 育兒神助手實驗室．用溫度陪你育兒
        </div>
      </div>
    </footer>
  );
}
