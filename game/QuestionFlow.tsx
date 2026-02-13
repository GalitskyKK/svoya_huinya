"use client";

import { useGame } from "./GameContext";
import { TaskTitleScreen } from "./TaskTitleScreen";
import { MusicTaskView } from "./MusicTaskView";
import { RebusTaskView } from "./RebusTaskView";
import { ResultView } from "./ResultView";

export function QuestionFlow() {
  const { state, getTask, goBackToBoard, showTaskContent } = useGame();

  if (state.phase === "board" || state.phase === "final") return null;
  if (!state.selectedCell) return null;

  const task = getTask(state.selectedCell.categoryIndex, state.selectedCell.slotIndex);
  if (!task) return null;

  if (state.phase === "task_title" && !state.showTaskContent) {
    return (
      <TaskTitleScreen
        title={task.type === "rebus_emoji" ? "Кул стории" : task.title}
        onNext={showTaskContent}
      />
    );
  }

  if (state.phase === "task_title" && state.showTaskContent) {
    if (task.type === "meme" || task.type === "splice" || task.type === "blitz") {
      return <MusicTaskView task={task} />;
    }
    if (task.type === "rebus_image" || task.type === "rebus_emoji") {
      return <RebusTaskView task={task} />;
    }
  }

  if (state.phase === "task") {
    if (task.type === "meme" || task.type === "splice" || task.type === "blitz") {
      return <MusicTaskView task={task} />;
    }
    if (task.type === "rebus_image" || task.type === "rebus_emoji") {
      return <RebusTaskView task={task} />;
    }
  }

  if (state.phase === "result") {
    return (
      <ResultView
        correct={state.lastAnswerCorrect ?? false}
        correctAnswer={state.lastCorrectAnswer}
        onNext={goBackToBoard}
      />
    );
  }

  return null;
}
