"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGame } from "./GameContext";
import type { MusicTask as MusicTaskType } from "@/data/types";

type MusicTaskViewProps = { task: MusicTaskType };

export function MusicTaskView({ task }: MusicTaskViewProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const { submitAnswer } = useGame();

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setPlaying(false);
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  const handlePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      stop();
      return;
    }
    el.play().catch(() => setPlaying(false));
    setPlaying(true);
  }, [playing, stop]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setPlaying(false);
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, []);

  const isBlitz = task.type === "blitz";
  const hasTracks = isBlitz && task.blitzTracks && task.blitzTracks.length > 0;

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-board-bg/95 p-4 animate-task-overlay">
      <div className="w-full max-w-lg space-y-6">
        <p className="text-lg text-white/90 text-center">{task.title}</p>

        {task.type === "blitz" && !hasTracks && (
          <p className="text-white/70 text-center text-sm">
            Треков для блица пока нет. Ведущий нажимает «Верно» или «Неверно».
          </p>
        )}

        {(task.audioSrc || (isBlitz && hasTracks && task.blitzTracks?.[0]?.audioSrc)) && (
          <div className="flex flex-col items-center gap-3">
            <audio
              ref={audioRef}
              src={task.audioSrc || task.blitzTracks?.[0]?.audioSrc}
              preload="metadata"
            />
            <button
              type="button"
              onClick={handlePlay}
              className="px-6 py-3 rounded-lg bg-board-cell text-white font-medium hover:bg-board-cellHover transition-colors border border-board-border"
            >
              {playing ? "Стоп" : "Слушать"}
            </button>
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <button
            type="button"
            onClick={() => {
              stop();
              submitAnswer(true);
            }}
            className="px-6 py-3 rounded-lg bg-green-600/90 text-white font-medium hover:bg-green-500 transition-colors"
          >
            Верно
          </button>
          <button
            type="button"
            onClick={() => {
              stop();
              submitAnswer(false);
            }}
            className="px-6 py-3 rounded-lg bg-red-600/90 text-white font-medium hover:bg-red-500 transition-colors"
          >
            Неверно
          </button>
        </div>
      </div>
    </div>
  );
}
