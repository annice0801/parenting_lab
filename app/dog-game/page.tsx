"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right";
type Position = { col: number; row: number };
type Outcome = "none" | "won" | "lost";
type Stamp = "obstacle" | "start" | "home";
type Layout = { obstacles: boolean[][]; start: Position; home: Position };

const LEVEL_SIZES = [4, 5, 6, 7, 8, 9, 10];
const GAP = 8;
const BOARD_MAX = 640;
const STORAGE_KEY = "dog-game-levels-v2";

function samePos(a: Position, b: Position): boolean {
  return a.col === b.col && a.row === b.row;
}

function cloneGrid(grid: boolean[][]): boolean[][] {
  return grid.map((row) => [...row]);
}

// 固定種子的簡單亂數產生器，讓同一個關卡每次產生的地圖一樣
function mulberry32(seed: number) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 產生一個保證有路可走的關卡：起點左下角、終點右上角
function generateLevel(n: number): Layout {
  const start: Position = { col: 0, row: n - 1 };
  const home: Position = { col: n - 1, row: 0 };
  const obstacles: boolean[][] = Array.from({ length: n }, () =>
    Array(n).fill(false)
  );
  const rand = mulberry32(n * 7919 + 101);

  const path = new Set<string>([`${start.col},${start.row}`]);
  let cur = { ...start };
  while (!samePos(cur, home)) {
    const canUp = cur.row > home.row;
    const canRight = cur.col < home.col;
    const goUp = canUp && canRight ? rand() < 0.5 : canUp;
    cur = goUp ? { col: cur.col, row: cur.row - 1 } : { col: cur.col + 1, row: cur.row };
    path.add(`${cur.col},${cur.row}`);
  }

  const density = 0.28;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (path.has(`${c},${r}`)) continue;
      if (rand() < density) obstacles[r][c] = true;
    }
  }

  return { obstacles, start, home };
}

const DIRECTIONS: {
  id: Direction;
  label: string;
  icon: string;
  dx: number;
  dy: number;
  color: string;
}[] = [
  { id: "up", label: "向上走一步", icon: "⬆️", dx: 0, dy: -1, color: "#E8A87C" },
  { id: "left", label: "向左走一步", icon: "⬅️", dx: -1, dy: 0, color: "#E7B98F" },
  { id: "right", label: "向右走一步", icon: "➡️", dx: 1, dy: 0, color: "#E7B98F" },
  { id: "down", label: "向下走一步", icon: "⬇️", dx: 0, dy: 1, color: "#E8A87C" },
];

const HEARTS = [
  { dx: -20, delay: 0 },
  { dx: 4, delay: 0.25 },
  { dx: 22, delay: 0.5 },
  { dx: -8, delay: 0.75 },
  { dx: 14, delay: 1.0 },
];

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const INITIAL_LEVEL = generateLevel(LEVEL_SIZES[0]);

export default function DogGamePage() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [obstacles, setObstacles] = useState<boolean[][]>(INITIAL_LEVEL.obstacles);
  const [startPos, setStartPos] = useState<Position>(INITIAL_LEVEL.start);
  const [homePos, setHomePos] = useState<Position>(INITIAL_LEVEL.home);
  const [dogPos, setDogPos] = useState<Position>(INITIAL_LEVEL.start);
  const [savedLayouts, setSavedLayouts] = useState<Record<number, Layout>>({});
  const [ready, setReady] = useState(false);

  const [queue, setQueue] = useState<Direction[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<Outcome>("none");

  const [editMode, setEditMode] = useState(false);
  const [stamp, setStamp] = useState<Stamp>("obstacle");

  const cancelledRef = useRef(false);
  const lastKeyMoveRef = useRef(0);

  const size = LEVEL_SIZES[levelIndex];

  // 讀取先前儲存的關卡設計
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<number, Layout>;
        setSavedLayouts(parsed);
        const layout = parsed[LEVEL_SIZES[0]];
        if (layout) {
          setObstacles(layout.obstacles);
          setStartPos(layout.start);
          setHomePos(layout.home);
          setDogPos(layout.start);
        }
      }
    } catch {
      // 忽略讀取失敗
    }
    setReady(true);
  }, []);

  // 儲存目前關卡設計
  useEffect(() => {
    if (!ready) return;
    setSavedLayouts((prev) => {
      const next = { ...prev, [size]: { obstacles, start: startPos, home: homePos } };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // 忽略儲存失敗
      }
      return next;
    });
  }, [ready, obstacles, startPos, homePos, size]);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  function isObstacleAt(pos: Position): boolean {
    return obstacles[pos.row][pos.col];
  }

  function isHomeAt(pos: Position): boolean {
    return samePos(pos, homePos);
  }

  function switchLevel(newIndex: number) {
    if (isRunning) return;
    if (newIndex < 0 || newIndex >= LEVEL_SIZES.length) return;
    const newSize = LEVEL_SIZES[newIndex];
    const layout = savedLayouts[newSize] ?? generateLevel(newSize);

    cancelledRef.current = true;
    setLevelIndex(newIndex);
    setObstacles(layout.obstacles);
    setStartPos(layout.start);
    setHomePos(layout.home);
    setDogPos(layout.start);
    setQueue([]);
    setOutcome("none");
    setActiveIndex(null);
    setEditMode(false);
    setIsRunning(false);
  }

  function addCommand(dir: Direction) {
    if (isRunning || editMode) return;
    setOutcome("none");
    setQueue((q) => [...q, dir]);
  }

  function removeCommand(index: number) {
    if (isRunning) return;
    setQueue((q) => q.filter((_, i) => i !== index));
  }

  function clearQueue() {
    if (isRunning) return;
    setQueue([]);
    setOutcome("none");
  }

  function resetDog() {
    cancelledRef.current = true;
    setIsRunning(false);
    setActiveIndex(null);
    setOutcome("none");
    setDogPos(startPos);
  }

  // 即時移動（鍵盤方向鍵 / 畫面上的方向鍵）
  function moveDogDirect(dir: Direction) {
    if (isRunning || editMode || outcome !== "none") return;
    const now = Date.now();
    if (now - lastKeyMoveRef.current < 160) return;
    lastKeyMoveRef.current = now;

    const meta = DIRECTIONS.find((d) => d.id === dir)!;
    setDogPos((prev) => {
      const next: Position = { col: prev.col + meta.dx, row: prev.row + meta.dy };
      const inBounds = next.col >= 0 && next.col < size && next.row >= 0 && next.row < size;
      if (!inBounds) return prev;

      if (isHomeAt(next)) {
        setOutcome("won");
        return next;
      }
      if (isObstacleAt(next)) {
        setOutcome("lost");
        return next;
      }
      return next;
    });
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const dir = KEY_TO_DIRECTION[e.key];
      if (!dir) return;
      e.preventDefault();
      moveDogDirect(dir);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, editMode, outcome, obstacles, homePos, size]);

  async function runProgram() {
    if (isRunning || queue.length === 0 || editMode) return;

    cancelledRef.current = false;
    setIsRunning(true);
    setOutcome("none");
    setActiveIndex(null);

    let pos = { ...startPos };
    setDogPos(pos);
    await sleep(400);

    for (let i = 0; i < queue.length; i++) {
      if (cancelledRef.current) return;
      setActiveIndex(i);
      await sleep(300);
      if (cancelledRef.current) return;

      const dir = DIRECTIONS.find((d) => d.id === queue[i])!;
      const next: Position = { col: pos.col + dir.dx, row: pos.row + dir.dy };
      const inBounds = next.col >= 0 && next.col < size && next.row >= 0 && next.row < size;

      if (!inBounds) {
        await sleep(400);
        continue;
      }

      pos = next;
      setDogPos(pos);
      await sleep(500);
      if (cancelledRef.current) return;

      if (isHomeAt(pos)) {
        setOutcome("won");
        setIsRunning(false);
        setActiveIndex(null);
        return;
      }

      if (isObstacleAt(pos)) {
        setOutcome("lost");
        setIsRunning(false);
        setActiveIndex(null);
        return;
      }
    }

    setIsRunning(false);
    setActiveIndex(null);
  }

  function startEditing() {
    setIsRunning(false);
    setActiveIndex(null);
    setOutcome("none");
    setStamp("obstacle");
    setEditMode(true);
  }

  function finishEditing() {
    setEditMode(false);
    setOutcome("none");
    setActiveIndex(null);
    setQueue([]);
    setDogPos(startPos);
  }

  function resetLayout() {
    const layout = generateLevel(size);
    setObstacles(layout.obstacles);
    setStartPos(layout.start);
    setHomePos(layout.home);
    setDogPos(layout.start);
  }

  function handleCellClick(pos: Position) {
    if (!editMode) return;

    if (stamp === "obstacle") {
      if (samePos(pos, startPos) || samePos(pos, homePos)) return;
      setObstacles((prev) => {
        const next = cloneGrid(prev);
        next[pos.row][pos.col] = !next[pos.row][pos.col];
        return next;
      });
    } else if (stamp === "start") {
      if (samePos(pos, homePos)) return;
      setObstacles((prev) => {
        const next = cloneGrid(prev);
        next[pos.row][pos.col] = false;
        return next;
      });
      setStartPos(pos);
      setDogPos(pos);
    } else if (stamp === "home") {
      if (samePos(pos, startPos)) return;
      setObstacles((prev) => {
        const next = cloneGrid(prev);
        next[pos.row][pos.col] = false;
        return next;
      });
      setHomePos(pos);
    }
  }

  const CELL = Math.min(104, Math.floor((BOARD_MAX - (size - 1) * GAP) / size));
  const cellIconSize = Math.max(16, Math.floor(CELL * 0.42));
  const dogIconSize = Math.max(22, Math.floor(CELL * 0.62));
  const dogX = dogPos.col * (CELL + GAP);
  const dogY = dogPos.row * (CELL + GAP);
  const dogOnObstacle = outcome === "lost" && isObstacleAt(dogPos);
  const controlsDisabled = isRunning || editMode || outcome !== "none";
  const isLastLevel = levelIndex === LEVEL_SIZES.length - 1;

  return (
    <div className="min-h-screen bg-[#FBF3E4] flex flex-col items-center py-10 px-4 gap-6">
      <div className="w-full max-w-2xl flex flex-col items-center gap-1">
        <Link
          href="/"
          className="self-start text-sm text-[#8a6d46] hover:underline"
        >
          ← 回首頁
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6B4A2E] text-center">
          🐶 小狗回家大冒險
        </h1>
        <p className="text-[#8a6d46] text-center max-w-md">
          把下面的方向方塊由左到右排好，組成一條路線，按下「開始出發」帶小狗躲開障礙物、找到回家的路吧！
          也可以直接用鍵盤方向鍵，或畫面上的按鈕即時操作小狗。
        </p>
      </div>

      {/* 關卡選擇 */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-2">
        <h2 className="text-lg font-bold text-[#6B4A2E]">🏁 選擇關卡</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {LEVEL_SIZES.map((s, i) => (
            <button
              key={s}
              onClick={() => switchLevel(i)}
              disabled={isRunning}
              className={`rounded-xl px-3 py-2 font-bold shadow transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                i === levelIndex
                  ? "bg-[#7BB97A] text-white ring-4 ring-[#DCEFC7]"
                  : "bg-white/80 text-[#8a6d46] hover:bg-white"
              }`}
            >
              {s}×{s}
            </button>
          ))}
        </div>
      </div>

      {/* 編輯工具列 */}
      {editMode && (
        <div className="w-full max-w-md flex flex-col items-center gap-2 bg-white/70 border-4 border-dashed border-[#D9C08F] rounded-2xl p-4">
          <p className="font-bold text-[#6B4A2E]">🎨 編輯關卡：選一個圖章，點擊格子放置</p>
          <div className="flex gap-3">
            <button
              onClick={() => setStamp("obstacle")}
              className={`rounded-xl px-4 py-2 font-bold shadow transition active:scale-95 ${
                stamp === "obstacle"
                  ? "bg-[#E8987A] text-white ring-4 ring-[#F8C9B4]"
                  : "bg-white text-[#8a6d46]"
              }`}
            >
              🪨 障礙物
            </button>
            <button
              onClick={() => setStamp("start")}
              className={`rounded-xl px-4 py-2 font-bold shadow transition active:scale-95 ${
                stamp === "start"
                  ? "bg-[#E8A87C] text-white ring-4 ring-[#FBEFD9]"
                  : "bg-white text-[#8a6d46]"
              }`}
            >
              🐶 起點
            </button>
            <button
              onClick={() => setStamp("home")}
              className={`rounded-xl px-4 py-2 font-bold shadow transition active:scale-95 ${
                stamp === "home"
                  ? "bg-[#7BB97A] text-white ring-4 ring-[#DCEFC7]"
                  : "bg-white text-[#8a6d46]"
              }`}
            >
              🏠 終點
            </button>
          </div>
          <div className="flex gap-3 mt-1">
            <button
              onClick={resetLayout}
              className="rounded-full bg-[#B7A9C9] hover:bg-[#A897BC] text-white font-bold px-4 py-2 shadow transition active:scale-95"
            >
              🔄 恢復預設關卡
            </button>
            <button
              onClick={finishEditing}
              className="rounded-full bg-[#7BB97A] hover:bg-[#6AA869] text-white font-bold px-4 py-2 shadow transition active:scale-95"
            >
              ✅ 完成編輯
            </button>
          </div>
        </div>
      )}

      {/* 遊戲棋盤 */}
      <div className="bg-white/70 rounded-3xl shadow-lg p-4 sm:p-6 border-4 border-[#F1DDBB]">
        <div
          className="relative"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${size}, ${CELL}px)`,
            gridAutoRows: `${CELL}px`,
            gap: `${GAP}px`,
          }}
        >
          {obstacles.map((rowArr, row) =>
            rowArr.map((_, col) => {
              const pos = { col, row };
              const obstacle = isObstacleAt(pos);
              const home = isHomeAt(pos);
              const start = samePos(pos, startPos);

              let cellClasses =
                "rounded-2xl flex items-center justify-center border-2 select-none";
              if (editMode) cellClasses += " cursor-pointer hover:brightness-95";
              if (obstacle) {
                cellClasses +=
                  " bg-[#F8C9B4] border-[#E8987A]" +
                  (dogOnObstacle && dogPos.col === col && dogPos.row === row
                    ? " ring-4 ring-red-400"
                    : "");
              } else if (home) {
                cellClasses +=
                  " bg-[#DCEFC7] border-[#B7DE93]" +
                  (outcome === "won" ? " ring-4 ring-yellow-300" : "");
              } else {
                cellClasses += " bg-[#FBEFD9] border-[#F1DDBB]";
              }

              return (
                <div
                  key={`${col}-${row}`}
                  className={cellClasses}
                  style={{ fontSize: cellIconSize }}
                  onClick={() => handleCellClick(pos)}
                >
                  {obstacle && "🪨"}
                  {home && "🏠"}
                  {start && !obstacle && !home && (
                    <span className="opacity-40" style={{ fontSize: cellIconSize * 0.7 }}>
                      🐾
                    </span>
                  )}
                </div>
              );
            })
          )}

          {/* 小狗 */}
          {!editMode && (
            <div
              className="absolute top-0 left-0 transition-transform duration-500 ease-in-out"
              style={{
                width: CELL,
                height: CELL,
                transform: `translate(${dogX}px, ${dogY}px)`,
              }}
            >
              <div
                className={`relative w-full h-full flex items-center justify-center select-none ${
                  outcome === "won" ? "animate-happy-jump" : ""
                } ${outcome === "lost" ? "animate-pulse" : ""}`}
                style={{ fontSize: dogIconSize }}
              >
                🐶
                {outcome === "won" &&
                  HEARTS.map((h, i) => (
                    <span
                      key={i}
                      className="heart-pop"
                      style={
                        {
                          left: "50%",
                          top: "8%",
                          marginLeft: -10,
                          fontSize: Math.max(14, Math.floor(dogIconSize * 0.4)),
                          animationDelay: `${h.delay}s`,
                          "--tx": `${h.dx}px`,
                        } as React.CSSProperties
                      }
                    >
                      ❤️
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 結果訊息 */}
      {outcome === "won" && (
        <div className="w-full max-w-md text-center bg-[#FFF3B0] border-4 border-yellow-300 rounded-2xl p-4">
          <p className="text-lg font-bold text-[#7a5c1e]">
            🎉 太棒了！小狗平安到家了！🏠🐶💕
          </p>
          {isLastLevel ? (
            <p className="mt-1 font-bold text-[#7a5c1e]">
              🏆 太厲害了！已經破完全部關卡（4×4～10×10）！
            </p>
          ) : (
            <button
              onClick={() => switchLevel(levelIndex + 1)}
              className="mt-2 rounded-full bg-[#7BB97A] hover:bg-[#6AA869] text-white font-bold px-5 py-2 shadow transition active:scale-95"
            >
              🚀 挑戰下一關（{LEVEL_SIZES[levelIndex + 1]}×{LEVEL_SIZES[levelIndex + 1]}）
            </button>
          )}
          <div className="flex justify-center gap-3 mt-2">
            <button
              onClick={resetDog}
              className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-5 py-2 shadow transition active:scale-95"
            >
              再玩一次
            </button>
            <button
              onClick={startEditing}
              className="rounded-full bg-[#B7A9C9] hover:bg-[#A897BC] text-white font-bold px-5 py-2 shadow transition active:scale-95"
            >
              🎨 調整關卡
            </button>
          </div>
        </div>
      )}
      {outcome === "lost" && (
        <div className="w-full max-w-md text-center bg-[#FADCD9] border-4 border-red-300 rounded-2xl p-4">
          <p className="text-lg font-bold text-[#9a3f34]">
            😢 哎呀，撞到障礙物了！再想想看怎麼走吧
          </p>
          <div className="flex justify-center gap-3 mt-2">
            <button
              onClick={resetDog}
              className="rounded-full bg-red-400 hover:bg-red-500 text-white font-bold px-5 py-2 shadow transition active:scale-95"
            >
              重新開始
            </button>
            <button
              onClick={startEditing}
              className="rounded-full bg-[#B7A9C9] hover:bg-[#A897BC] text-white font-bold px-5 py-2 shadow transition active:scale-95"
            >
              🎨 調整關卡
            </button>
          </div>
        </div>
      )}

      {!editMode && (
        <>
          {/* 即時操作 D-pad */}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg font-bold text-[#6B4A2E]">
              🕹️ 即時操作（也可以直接按鍵盤方向鍵）
            </h2>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => moveDogDirect("up")}
                disabled={controlsDisabled}
                className="w-14 h-14 rounded-2xl bg-[#E8A87C] hover:bg-[#DF9764] text-white text-2xl shadow-md transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ⬆️
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveDogDirect("left")}
                  disabled={controlsDisabled}
                  className="w-14 h-14 rounded-2xl bg-[#E7B98F] hover:bg-[#DDA876] text-white text-2xl shadow-md transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ⬅️
                </button>
                <span className="text-3xl w-14 text-center">🐾</span>
                <button
                  onClick={() => moveDogDirect("right")}
                  disabled={controlsDisabled}
                  className="w-14 h-14 rounded-2xl bg-[#E7B98F] hover:bg-[#DDA876] text-white text-2xl shadow-md transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ➡️
                </button>
              </div>
              <button
                onClick={() => moveDogDirect("down")}
                disabled={controlsDisabled}
                className="w-14 h-14 rounded-2xl bg-[#E8A87C] hover:bg-[#DF9764] text-white text-2xl shadow-md transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ⬇️
              </button>
            </div>
          </div>

          {/* 指令方塊 */}
          <div className="w-full max-w-2xl flex flex-col items-center gap-3">
            <h2 className="text-xl font-bold text-[#6B4A2E]">🧩 指令方塊（排路線）</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {DIRECTIONS.map((dir) => (
                <button
                  key={dir.id}
                  onClick={() => addCommand(dir.id)}
                  disabled={isRunning}
                  style={{ backgroundColor: dir.color }}
                  className="flex flex-col items-center justify-center gap-1 min-w-[96px] px-6 py-4 rounded-3xl text-white font-bold shadow-md transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-95"
                >
                  <span className="text-4xl">{dir.icon}</span>
                  <span className="text-sm">{dir.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 路線組合區 */}
          <div className="w-full max-w-2xl flex flex-col gap-2">
            <h2 className="text-xl font-bold text-[#6B4A2E] text-center">
              📋 我的路線（由左到右）
            </h2>
            <div className="min-h-[96px] flex items-center gap-2 overflow-x-auto rounded-2xl border-2 border-dashed border-[#E7D2A8] bg-white/60 p-3">
              {queue.length === 0 ? (
                <p className="w-full text-center text-[#C2A878] italic">
                  點擊上面的方塊，把路線排在這裡吧！
                </p>
              ) : (
                queue.map((dir, i) => {
                  const meta = DIRECTIONS.find((d) => d.id === dir)!;
                  return (
                    <button
                      key={i}
                      onClick={() => removeCommand(i)}
                      disabled={isRunning}
                      title="點擊移除這個方塊"
                      className={`flex flex-shrink-0 flex-col items-center justify-center rounded-xl px-3 py-2 text-2xl shadow transition disabled:cursor-not-allowed ${
                        activeIndex === i
                          ? "bg-yellow-200 scale-110 ring-4 ring-yellow-400"
                          : "bg-[#FBEFD9]"
                      } ${!isRunning ? "hover:bg-red-100 cursor-pointer" : ""}`}
                    >
                      {meta.icon}
                      <span className="text-[10px] text-[#8a6d46]">{i + 1}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* 動作按鈕 */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={runProgram}
              disabled={isRunning || queue.length === 0}
              className="rounded-full bg-[#7BB97A] hover:bg-[#6AA869] text-white font-bold px-6 py-3 shadow-md transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ▶️ 開始出發
            </button>
            <button
              onClick={clearQueue}
              disabled={isRunning || queue.length === 0}
              className="rounded-full bg-[#D9A67B] hover:bg-[#C99667] text-white font-bold px-6 py-3 shadow-md transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🗑️ 清空路線
            </button>
            <button
              onClick={resetDog}
              disabled={isRunning}
              className="rounded-full bg-[#B7A9C9] hover:bg-[#A897BC] text-white font-bold px-6 py-3 shadow-md transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔄 重新開始
            </button>
            <button
              onClick={startEditing}
              disabled={isRunning}
              className="rounded-full bg-[#9BB6D9] hover:bg-[#89A6CB] text-white font-bold px-6 py-3 shadow-md transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎨 編輯關卡
            </button>
          </div>
        </>
      )}
    </div>
  );
}
