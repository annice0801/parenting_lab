import type { Metadata } from "next";
import Link from "next/link";
import { BEDTIME_GENERAL, PRINCIPLES, REFERENCES, WAIT_LIST } from "@/data/parent-helper";
import HelperTabs from "./HelperTabs";

export const metadata: Metadata = {
  title: "家長幫手 | Parenting Lab",
  description: "依年齡挑選不影響發展的卡通與電影、推薦集數，以及 3 到 6 歲的睡前聊天題目。",
};

export default function HelperPage() {
  return (
    <div className="min-h-screen bg-[#FBF3E4] flex flex-col items-center py-10 px-4 gap-10">
      <div className="w-full max-w-3xl flex flex-col items-center gap-2">
        <Link href="/" className="self-start text-sm text-[#8a6d46] hover:underline">
          ← 回首頁
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6B4A2E] text-center">🧸 家長幫手</h1>
        <p className="text-[#8a6d46] text-center max-w-xl">
          挑卡通不用再一部一部試。這裡依年齡整理了節奏慢、內容正向的卡通與電影，附上推薦集數，還有每晚都用得到的睡前聊天題目。
        </p>
      </div>

      {/* 選片原則 */}
      <section className="w-full max-w-3xl flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#6B4A2E] text-center">✅ 選片五原則</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="flex flex-col gap-1 bg-white/80 border-4 border-[#F1DDBB] rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{p.icon}</span>
                <h3 className="font-bold text-[#6B4A2E]">{p.title}</h3>
              </div>
              <p className="text-sm text-[#5c4630] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <HelperTabs />

      {/* 等大一點再看 */}
      <section className="w-full max-w-3xl flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#6B4A2E] text-center">⏳ 很紅，但可以等大一點再看</h2>
        <div className="flex flex-col gap-3">
          {WAIT_LIST.map((w) => (
            <div key={w.name} className="bg-white/80 border-4 border-[#F1DDBB] rounded-2xl p-4">
              <p className="font-bold text-[#6B4A2E]">{w.name}</p>
              <p className="text-sm text-[#5c4630]">{w.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 睡前聊天的共通技巧 */}
      <section className="w-full max-w-3xl bg-[#E9E4F5]/70 border-4 border-[#E9E4F5] rounded-3xl p-5 sm:p-6 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-[#4f456b]">🛏️ 每個年齡都適用的睡前聊天技巧</h2>
        <ul className="flex flex-col gap-2">
          {BEDTIME_GENERAL.map((t) => (
            <li key={t} className="flex gap-2 text-[#4f456b]">
              <span aria-hidden>・</span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* 參考資料 */}
      <footer className="w-full max-w-3xl flex flex-col gap-2 text-xs text-[#8a6d46]">
        <p className="font-bold">參考資料</p>
        <ul className="flex flex-col gap-1">
          {REFERENCES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="mt-2">
          片長為約略時間；集數以英文原名標示，各平台的中文譯名可能不同。每個孩子的敏感度不一樣，建議家長先看過一次再決定。
        </p>
      </footer>
    </div>
  );
}
