"use client";

type ResultViewProps = {
  correct: boolean;
  correctAnswer: string;
  onNext: () => void;
};

export function ResultView({
  correct,
  correctAnswer,
  onNext,
}: ResultViewProps) {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-board-bg/95 p-4 animate-task-overlay">
      <div className="w-full max-w-md text-center space-y-4">
        <p
          className={`text-2xl font-semibold ${
            correct ? "text-green-400" : "text-red-400"
          }`}
        >
          {correct ? "Верно!" : "Неверно"}
        </p>
        <p className="text-white/90">Правильный ответ: {correctAnswer}</p>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-lg bg-board-accent text-white font-medium hover:opacity-90"
        >
          Далее
        </button>
      </div>
    </div>
  );
}
