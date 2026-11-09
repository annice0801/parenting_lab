"use client";

// 家長幫手：依年齡切換卡通電影推薦與睡前聊天題目，可以隨機抽一張聊天卡

import { useState } from "react";
import { AGE_GROUPS, BEDTIME, SHOWS, type AgeId, type Show } from "@/data/parent-helper";

export default function HelperTabs() {
  const [age, setAge] = useState<AgeId>("4-5");
  const [card, setCard] = useState<number | null>(null);
  const group = AGE_GROUPS.find((g) => g.id === age)!;
  const bedtime = BEDTIME[age];

  function selectAge(id: AgeId) {
    setAge(id);
    setCard(null);
  }

  // 抽卡：不會連續抽到同一張
  function drawCard() {
    const total = bedtime.cards.length;
    let next = Math.floor(Math.random() * total);
    if (next === card) next = (next + 1) % total;
    setCard(next);
  }

  return (
    <div className="w-full max-w-3xl flex flex-col gap-8">
      {/* 年齡分頁 */}
      <div className="sticky top-3 z-10 flex justify-center">
        <div role="tablist" aria-label="選擇年齡" className="flex gap-1 rounded-full border-4 border-[#F1DDBB] bg-white/95 p-1 shadow">
          {AGE_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={age === g.id}
              onClick={() => selectAge(g.id)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition sm:px-6 ${
                age === g.id ? "bg-[#E8A87C] text-white" : "text-[#8a6d46] hover:bg-[#FBF3E4]"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>
      <p className="-mt-4 text-center text-sm text-[#8a6d46]">{group.note}</p>

      {/* 卡通與電影 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#6B4A2E] text-center">📺 推薦卡通與電影</h2>
        <div className="grid grid-cols-1 gap-4">
          {SHOWS[age].map((show) => (
            <ShowCard key={show.original} show={show} />
          ))}
        </div>
      </section>

      {/* 睡前聊天 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#6B4A2E] text-center">🌙 睡前聊天</h2>
        <div className="bg-[#E9E4F5]/70 border-4 border-[#E9E4F5] rounded-3xl p-5 sm:p-6 flex flex-col gap-3">
          <p className="text-[#4f456b] leading-relaxed">{bedtime.focus}</p>
          <ul className="flex flex-col gap-1.5">
            {bedtime.tips.map((tip) => (
              <li key={tip} className="flex gap-2 text-sm text-[#4f456b]">
                <span aria-hidden>💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* 抽卡 */}
        <div className="flex flex-col items-center gap-3 bg-white/80 border-4 border-[#F1DDBB] rounded-3xl p-6 text-center">
          {card === null ? (
            <p className="text-[#8a6d46]">不知道今天聊什麼？抽一張聊天卡吧！</p>
          ) : (
            <div aria-live="polite" className="flex flex-col gap-2">
              <p className="text-xl font-bold text-[#6B4A2E] leading-relaxed">「{bedtime.cards[card].q}」</p>
              <p className="text-sm text-[#8a6d46]">{bedtime.cards[card].why}</p>
            </div>
          )}
          <button
            type="button"
            onClick={drawCard}
            className="rounded-full bg-[#E8A87C] px-6 py-2.5 font-bold text-white shadow transition hover:bg-[#df9764] active:scale-95"
          >
            {card === null ? "🎴 抽一張聊天卡" : "🔄 換一張"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bedtime.cards.map((c) => (
            <div key={c.q} className="flex flex-col gap-1 bg-[#DCEFC7]/60 border-4 border-[#DCEFC7] rounded-2xl p-4">
              <p className="font-bold text-[#3f5c2e]">{c.q}</p>
              <p className="text-sm text-[#4f6b3d]">{c.why}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ShowCard({ show }: { show: Show }) {
  return (
    <article className="bg-white/80 border-4 border-[#F1DDBB] rounded-3xl p-5 sm:p-6 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-xs font-bold text-white rounded-full px-3 py-1 ${show.kind === "電影" ? "bg-[#9fb0bd]" : "bg-[#E8A87C]"}`}>
          {show.kind}
        </span>
        <span className="text-xs text-[#8a6d46]">{show.length}</span>
      </div>
      <h3 className="text-lg font-bold text-[#6B4A2E]">
        {show.name}
        {show.name !== show.original && <span className="ml-2 text-sm font-normal text-[#8a6d46]">{show.original}</span>}
      </h3>
      <p className="text-[#5c4630] leading-relaxed">{show.why}</p>

      {show.episodes && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-[#6B4A2E]">推薦集數</p>
          <ul className="flex flex-col gap-2">
            {show.episodes.map((ep) => (
              <li key={ep.title} className="flex flex-col gap-0.5 rounded-2xl bg-[#FBF3E4] px-4 py-2.5 sm:flex-row sm:gap-3">
                <span className="shrink-0 font-bold text-[#6B4A2E]">
                  {ep.title}
                  <span className="ml-1.5 text-xs font-normal text-[#8a6d46]">{ep.season}</span>
                </span>
                <span className="text-sm text-[#5c4630]">{ep.why}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {show.topics && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-[#6B4A2E]">推薦主題</p>
          <div className="flex flex-wrap gap-2">
            {show.topics.map((t) => (
              <span key={t} className="rounded-full bg-[#FBF3E4] px-3 py-1 text-sm text-[#5c4630]">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {show.caution && (
        <p className="rounded-2xl bg-[#FDE9DF] px-4 py-2.5 text-sm text-[#8a4b2e]">⚠️ {show.caution}</p>
      )}
      <p className="text-sm text-[#3f5c2e]">💬 看完可以聊：{show.talk}</p>
    </article>
  );
}
