"use client";

import { GameProvider } from "@/game/GameContext";
import { GameBoard } from "@/game/GameBoard";
import { QuestionFlow } from "@/game/QuestionFlow";
import { FinalScreen } from "@/game/FinalScreen";

export default function Home() {
  return (
    <GameProvider>
      <main className="min-h-screen w-full flex flex-col">
        <GameBoard />
        <QuestionFlow />
        <FinalScreen />
      </main>
    </GameProvider>
  );
}
