"use client";

import { useState, useCallback } from "react";
import { useGame } from "./GameContext";
import type { RebusImageTask, RebusEmojiTask } from "@/data/types";

type RebusTaskViewProps = { task: RebusImageTask | RebusEmojiTask };

export function RebusTaskView({ task }: RebusTaskViewProps) {
  const [showCorrect, setShowCorrect] = useState(false);
  const { submitAnswer } = useGame();

  const handleShowAnswer = useCallback(() => {
    setShowCorrect(true);
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-board-bg/95 p-4 animate-task-overlay">
      <div className="w-full max-w-lg space-y-6">
        <p className="text-lg text-white/90 text-center">{task.title}</p>

        {task.type === "rebus_image" && (
          <div className="flex justify-center">
            <img
              src={task.imageSrc}
              alt="Ребус"
              className="max-h-64 object-contain rounded border border-board-border"
            />
          </div>
        )}

        {task.type === "rebus_emoji" && (
          <div className="flex flex-wrap justify-center gap-2 text-4xl md:text-5xl py-4">
            {task.emoji.map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
        )}

        {showCorrect && (
          <p className="text-center text-board-accent font-medium">
            Правильный ответ: {task.correctAnswer}
          </p>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <button
            type="button"
            onClick={handleShowAnswer}
            className="px-4 py-2 rounded-lg bg-board-cell text-white/90 hover:bg-board-cellHover text-sm transition-colors border border-board-border"
          >
            Показать ответ
          </button>
          <button
            type="button"
            onClick={() => submitAnswer(true)}
            className="px-6 py-3 rounded-lg bg-green-600/90 text-white font-medium hover:bg-green-500 transition-colors"
          >
            Верно
          </button>
          <button
            type="button"
            onClick={() => submitAnswer(false)}
            className="px-6 py-3 rounded-lg bg-red-600/90 text-white font-medium hover:bg-red-500 transition-colors"
          >
            Неверно
          </button>
        </div>
      </div>
    </div>
  );
}
