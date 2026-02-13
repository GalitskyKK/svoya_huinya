export type TaskType = "meme" | "splice" | "blitz" | "rebus_image" | "rebus_emoji";

export type MusicTask = {
  type: "meme" | "splice" | "blitz";
  title: string;
  audioSrc: string;
  correctAnswer: string;
  /** For splice: second part of answer (cover artist / song name) */
  correctAnswerSecondary?: string;
  /** For blitz: multiple tracks, 5 sec each */
  blitzTracks?: { audioSrc: string; correctAnswer: string }[];
};

export type RebusImageTask = {
  type: "rebus_image";
  title: string;
  imageSrc: string;
  correctAnswer: string;
};

export type RebusEmojiTask = {
  type: "rebus_emoji";
  title: string;
  emoji: string[];
  correctAnswer: string;
};

export type Task = MusicTask | RebusImageTask | RebusEmojiTask;

export type CategoryId = "musical" | "igors" | "cool_stories" | "cocktail";

export type CostLabels = [string, string, string, string];

export type Category = {
  id: CategoryId;
  name: string;
  /** Стоимости для 4 слотов этой категории (у каждой категории свой набор). */
  costLabels: CostLabels;
  tasks: [Task, Task, Task, Task];
};

export type GameConfig = {
  categories: Category[];
};

export type CellId = { categoryIndex: number; slotIndex: number };
