"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

const STORAGE_KEY = "parenting-lab-nickname";

type SiteContextValue = {
  nickname: string | null;
};

const SiteContext = createContext<SiteContextValue>({ nickname: null });

export function useSite() {
  return useContext(SiteContext);
}

type Stage = "checking" | "ask" | "welcome" | "done";

export function SiteProvider({ children }: { children: ReactNode }) {
  const [nickname, setNickname] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("checking");
  const [showReturnToast, setShowReturnToast] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setNickname(saved);
        setStage("done");
        setShowReturnToast(true);
        const t = setTimeout(() => setShowReturnToast(false), 3200);
        return () => clearTimeout(t);
      }
    } catch {
      // 忽略讀取失敗
    }
    setStage("ask");
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim().slice(0, 12);
    if (!trimmed) return;
    setNickname(trimmed);
    try {
      localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // 忽略儲存失敗
    }
    setStage("welcome");
    setTimeout(() => setStage("done"), 1700);
  }

  return (
    <SiteContext.Provider value={{ nickname }}>
      {children}

      {(stage === "ask" || stage === "welcome") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-3xl bg-cream shadow-2xl border border-cream-deep p-8 text-center">
            {stage === "ask" ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/25 text-3xl">
                  🌿
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink">
                    歡迎來到 Parenting Lab
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    開始之前，想知道該怎麼稱呼你呢？
                  </p>
                </div>
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={12}
                  placeholder="輸入你的暱稱，例如：皮皮媽"
                  className="w-full rounded-full border border-cream-deep bg-white px-5 py-3 text-center text-ink placeholder:text-ink-soft/60 outline-none focus:border-clay focus:ring-2 focus:ring-clay/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="rounded-full bg-clay px-6 py-3 font-semibold text-white shadow-md transition hover:bg-clay/90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  開始探索 →
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-3 py-2">
                <div className="text-4xl">🎉</div>
                <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink">
                  嗨，{nickname}！很高興認識你
                </h2>
                <p className="text-sm text-ink-soft">
                  希望 Parenting Lab 能成為你育兒路上的好夥伴
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {showReturnToast && nickname && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink text-cream px-5 py-2.5 text-sm shadow-lg animate-[fadeInDown_0.4s_ease]">
          歡迎回來，{nickname} 👋
        </div>
      )}
    </SiteContext.Provider>
  );
}
