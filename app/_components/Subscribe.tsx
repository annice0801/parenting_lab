"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./effects";
import { useSite } from "./site-context";

const STORAGE_KEY = "parenting-lab-subscribers";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Subscribe() {
  const { nickname } = useSite();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("請輸入正確的 Email 格式哦");
      return;
    }
    setError("");
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      if (!list.includes(trimmed)) list.push(trimmed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // 忽略儲存失敗，仍給予前端成功回饋
    }
    setSubmitted(true);
  }

  return (
    <section id="subscribe" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-clay">
            Early Access
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-fredoka)] text-3xl font-semibold text-ink sm:text-4xl">
            搶先體驗新功能
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            留下 Email，我們會在新的育兒神器、教具評測、活動上線時
            <br className="hidden sm:block" />
            第一時間通知你，讓你永遠比別人快一步。
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <div className="rounded-[2.5rem] border border-cream-deep bg-cream-soft p-8 shadow-sm sm:p-10">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              >
                <div className="w-full sm:max-w-xs">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      nickname ? `${nickname} 的 Email` : "輸入你的 Email"
                    }
                    className="w-full rounded-full border border-cream-deep bg-white px-5 py-3.5 text-ink placeholder:text-ink-soft/60 outline-none focus:border-clay focus:ring-2 focus:ring-clay/30"
                  />
                  {error && (
                    <p className="mt-2 text-left text-sm text-plum">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full shrink-0 rounded-full bg-clay px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-clay/90 active:scale-95 sm:w-auto"
                >
                  搶先體驗 🎉
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative flex h-28 w-28 items-center justify-center">
                  <span className="animate-bear-sway text-7xl">🐻</span>
                  <span
                    className="animate-heart-beat absolute -top-2 left-1/2 -translate-x-1/2 text-3xl"
                    style={{ animationDelay: "0.1s" }}
                  >
                    ❤️
                  </span>
                  <span
                    className="animate-heart-beat absolute -top-4 left-3 text-lg"
                    style={{ animationDelay: "0.4s" }}
                  >
                    💛
                  </span>
                  <span
                    className="animate-heart-beat absolute -top-4 right-3 text-lg"
                    style={{ animationDelay: "0.7s" }}
                  >
                    💛
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink">
                  謝謝你{nickname ? `，${nickname}` : ""}！
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
                  我們收到你的 Email 了 💌
                  新功能上線時，會是第一個告訴你的人。
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
