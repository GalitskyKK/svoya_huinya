"use client";

import { useGame } from "./GameContext";

export function FinalScreen() {
  const { state } = useGame();

  if (state.phase !== "final") return null;

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-board-bg p-4 animate-task-overlay">
      <div className="w-full max-w-md text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Игра окончена
        </h2>
        <p className="text-xl text-white/90">Счёт: {state.score}</p>
        <p className="text-white/80">
          Подарок другу: пройди все вопросы и забери приз!
        </p>
        <button
          type="button"
          className="px-6 py-3 rounded-lg bg-board-accent text-white font-medium hover:opacity-90"
          onClick={() => window.location.reload()}
        >
          Забрать приз
        </button>
      </div>
    </div>
  );
}
