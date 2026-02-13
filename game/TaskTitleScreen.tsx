"use client";

type TaskTitleScreenProps = {
  title: string;
  onNext: () => void;
};

export function TaskTitleScreen({ title, onNext }: TaskTitleScreenProps) {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-board-bg/95 p-4 animate-task-overlay">
      <p className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">
        {title}
      </p>
      <button
        type="button"
        onClick={onNext}
        className="px-6 py-3 rounded-lg bg-board-accent text-white font-medium hover:opacity-90 transition"
      >
        Далее
      </button>
    </div>
  );
}
