"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gameConfig } from "@/data/gameConfig";
import type { Task } from "@/data/types";

export type GamePhase = "board" | "task_title" | "task" | "result" | "final";

export type GameState = {
  phase: GamePhase;
  selectedCell: { categoryIndex: number; slotIndex: number } | null;
  playedCells: Set<string>;
  score: number;
  lastAnswerCorrect: boolean | null;
  lastCorrectAnswer: string;
  /** For task_title → task transition */
  showTaskContent: boolean;
};

const STORAGE_KEY = "sviya_huinya_game";
const TOTAL_CELLS = gameConfig.categories.length * 4;
const SCORE_PER_SLOT = [100, 200, 300, 400];

function cellKey(categoryIndex: number, slotIndex: number): string {
  return `${categoryIndex}-${slotIndex}`;
}

function loadPersistedState(): { playedCells: Set<string>; score: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { playedCells?: string[]; score?: number };
    if (!Array.isArray(data.playedCells) || typeof data.score !== "number") return null;
    return {
      playedCells: new Set(data.playedCells),
      score: data.score,
    };
  } catch {
    return null;
  }
}

function savePersistedState(playedCells: Set<string>, score: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ playedCells: [...playedCells], score })
    );
  } catch {
    // ignore
  }
}

type GameContextValue = {
  state: GameState;
  categories: typeof gameConfig.categories;
  isPlayed: (categoryIndex: number, slotIndex: number) => boolean;
  selectCell: (categoryIndex: number, slotIndex: number) => void;
  getTask: (categoryIndex: number, slotIndex: number) => Task | null;
  showTaskContent: () => void;
  submitAnswer: (correct: boolean) => void;
  goBackToBoard: () => void;
  allPlayed: boolean;
};

const GameContext = createContext<GameContextValue | null>(null);

const DEFAULT_STATE: GameState = {
  phase: "board",
  selectedCell: null,
  playedCells: new Set(),
  score: 0,
  lastAnswerCorrect: null,
  lastCorrectAnswer: "",
  showTaskContent: false,
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);
  const isFirstSaveRef = useRef(true);

  useEffect(() => {
    const persisted = loadPersistedState();
    if (persisted) {
      const allPlayed = persisted.playedCells.size >= TOTAL_CELLS;
      setState((s) => ({
        ...s,
        playedCells: persisted.playedCells,
        score: persisted.score,
        phase: allPlayed ? "final" : "board",
      }));
    }
  }, []);

  useEffect(() => {
    if (isFirstSaveRef.current) {
      isFirstSaveRef.current = false;
      return;
    }
    savePersistedState(state.playedCells, state.score);
  }, [state.playedCells, state.score]);

  const isPlayed = useCallback((categoryIndex: number, slotIndex: number) => {
    return state.playedCells.has(cellKey(categoryIndex, slotIndex));
  }, [state.playedCells]);

  const selectCell = useCallback(
    (categoryIndex: number, slotIndex: number) => {
      if (state.playedCells.has(cellKey(categoryIndex, slotIndex))) return;
      setState((s) => ({
        ...s,
        phase: "task_title",
        selectedCell: { categoryIndex, slotIndex },
        showTaskContent: false,
      }));
    },
    [state.playedCells]
  );

  const getTask = useCallback(
    (categoryIndex: number, slotIndex: number): Task | null => {
      const cat = gameConfig.categories[categoryIndex];
      if (!cat) return null;
      const task = cat.tasks[slotIndex];
      return task ?? null;
    },
    []
  );

  const showTaskContent = useCallback(() => {
    setState((s) => ({ ...s, showTaskContent: true }));
  }, []);

  const submitAnswer = useCallback((correct: boolean) => {
    setState((s) => {
      if (!s.selectedCell) return s;
      const task = gameConfig.categories[s.selectedCell.categoryIndex]?.tasks[
        s.selectedCell.slotIndex
      ];
      if (!task) return s;

      const correctAnswerText =
        task.type === "splice"
          ? `${task.correctAnswer} — ${task.correctAnswerSecondary ?? ""}`
          : "correctAnswer" in task
            ? task.correctAnswer
            : "";

      const points = correct ? SCORE_PER_SLOT[s.selectedCell.slotIndex]! : 0;
      const newPlayed = new Set(s.playedCells);
      newPlayed.add(cellKey(s.selectedCell.categoryIndex, s.selectedCell.slotIndex));

      return {
        ...s,
        phase: "result",
        score: s.score + points,
        playedCells: newPlayed,
        lastAnswerCorrect: correct,
        lastCorrectAnswer: correctAnswerText,
      };
    });
  }, []);

  const goBackToBoard = useCallback(() => {
    setState((s) => {
      const allPlayed = s.playedCells.size >= TOTAL_CELLS;
      return {
        ...s,
        phase: allPlayed ? "final" : "board",
        selectedCell: null,
        showTaskContent: false,
      };
    });
  }, []);

  const allPlayed = state.playedCells.size >= TOTAL_CELLS;

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      categories: gameConfig.categories,
      isPlayed,
      selectCell,
      getTask,
      showTaskContent,
      submitAnswer,
      goBackToBoard,
      allPlayed,
    }),
    [
      state,
      isPlayed,
      selectCell,
      getTask,
      showTaskContent,
      submitAnswer,
      goBackToBoard,
      allPlayed,
    ]
  );

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
