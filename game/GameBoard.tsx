"use client";

import { Fragment } from "react";
import { useGame } from "./GameContext";

export function GameBoard() {
  const {
    state,
    categories,
    isPlayed,
    selectCell,
  } = useGame();

  if (state.phase !== "board") return null;

  return (
    <div className="w-full h-full min-h-screen flex flex-col p-4 md:p-6">
      <div className="flex justify-between items-center mb-4 md:mb-6 shrink-0">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
          СВОЯ ХУЙНЯ
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-medium">
          Счёт: {state.score}
        </p>
      </div>
      <div
        className="flex-1 grid gap-2 md:gap-3 min-h-0"
        style={{
          gridTemplateColumns: "minmax(160px, 1.2fr) repeat(4, minmax(0, 1fr))",
          gridTemplateRows: "repeat(3, 1fr)",
        }}
      >
        {categories.map((cat, catIndex) => (
          <Fragment key={cat.id}>
            <div className="rounded-lg border border-board-border bg-board-cell p-3 md:p-4 flex items-center justify-center min-h-[80px] md:min-h-0">
              <span className="text-white font-semibold text-base md:text-lg lg:text-xl text-center leading-tight">
                {cat.name}
              </span>
            </div>
            {[0, 1, 2, 3].map((slotIndex) => {
              const played = isPlayed(catIndex, slotIndex);
              return (
                <div
                  key={`${cat.id}-${slotIndex}`}
                  className={`rounded-lg border border-board-border flex items-center justify-center p-3 md:p-4 transition-colors min-h-[80px] md:min-h-0 ${
                    played
                      ? "bg-board-cellPlayed cursor-default opacity-50"
                      : "bg-board-cell hover:bg-board-cellHover cursor-pointer"
                  }`}
                  onClick={() => !played && selectCell(catIndex, slotIndex)}
                  role={played ? undefined : "button"}
                  tabIndex={played ? -1 : 0}
                  onKeyDown={(e) => {
                    if (played) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectCell(catIndex, slotIndex);
                    }
                  }}
                >
                  <span className="text-white/95 text-sm md:text-base lg:text-lg font-medium text-center leading-tight">
                    {played ? "—" : cat.costLabels[slotIndex]}
                  </span>
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
