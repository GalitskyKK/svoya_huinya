import type { GameConfig } from "./types";

/**
 * Стоимости по категориям: у каждой категории свой набор из 4 подписей.
 */

/**
 * Пути к MP3: положи файлы из 1-yt_mus_sh в public/audio/.
 * Блиц (слот 4): пока треков нет — массив пустой или добавь позже.
 */
const musicalTasks: GameConfig["categories"][0]["tasks"] = [
  {
    type: "meme",
    title: "Мемная",
    audioSrc: "/audio/1-meme.mp3",
    correctAnswer: "А может просто негром стать",
  },
  {
    type: "meme",
    title: "Мемная",
    audioSrc: "/audio/2-meme.mp3",
    correctAnswer: "Казанова (Говновоз)",
  },
  {
    type: "splice",
    title: "Склейка",
    audioSrc: "/audio/3-splice.mp3",
    correctAnswer: "В Питере — пить",
    correctAnswerSecondary: "Валерий Меладзе / Ленинград",
  },
  {
    type: "blitz",
    title: "Блиц",
    audioSrc: "",
    correctAnswer: "",
    blitzTracks: [],
  },
];

/**
 * Ребусы «ХУЙНЯ от Игоря»: картинки из public/rebus/.
 * Добавление: новый объект в массив { imageSrc, correctAnswer }.
 */
const igorRebusImages = [
  { imageSrc: "/rebus/1_усики.png", correctAnswer: "Усики" },
  { imageSrc: "/rebus/2_сигареты.png", correctAnswer: "Сигареты" },
  { imageSrc: "/rebus/3_варкрафт.jpg", correctAnswer: "Варкрафт" },
  { imageSrc: "/rebus/4_стюарт_литл.png", correctAnswer: "Стюарт Литл" },
];

const igorTasks: GameConfig["categories"][1]["tasks"] = [
  {
    type: "rebus_image",
    title: "Ребус",
    imageSrc: igorRebusImages[0]!.imageSrc,
    correctAnswer: igorRebusImages[0]!.correctAnswer,
  },
  {
    type: "rebus_image",
    title: "Ребус",
    imageSrc: igorRebusImages[1]!.imageSrc,
    correctAnswer: igorRebusImages[1]!.correctAnswer,
  },
  {
    type: "rebus_image",
    title: "Ребус",
    imageSrc: igorRebusImages[2]!.imageSrc,
    correctAnswer: igorRebusImages[2]!.correctAnswer,
  },
  {
    type: "rebus_image",
    title: "Ребус",
    imageSrc: igorRebusImages[3]!.imageSrc,
    correctAnswer: igorRebusImages[3]!.correctAnswer,
  },
];

/**
 * КУЛ СТОРИИ — эмодзи-ребусы. Добавление: новый объект в массив.
 */
const coolStoriesRebuses = [
  { emoji: ["🥃", "🧻", "🤮", "х5"], correctAnswer: "Богдан покакаль" },
  { emoji: ["🏐", "🛍️", "👺"], correctAnswer: "Появление клички Пакет" },
  { emoji: ["⛺️", "🥃", "🏐", "🌞"], correctAnswer: "Напиклё Макарчику" },
  { emoji: ["🦟", "🎛", "🪱", "🤜🤛"], correctAnswer: "Набитие ебал Глисту за заю" }
]

const coolStoriesTasks: GameConfig["categories"][2]["tasks"] = coolStoriesRebuses.map(
  (r) => ({
    type: "rebus_emoji" as const,
    title: "Кул стории",
    emoji: r.emoji,
    correctAnswer: r.correctAnswer,
  })
) as GameConfig["categories"][2]["tasks"];

/**
 * COCKтейльная: картинки из public/coctail_img/.
 * Задания — Классика #1, #2 и Экспери(кре)менты #3, #4.
 */
const cocktailTasks: GameConfig["categories"][3]["tasks"] = [
  {
    type: "rebus_image",
    title: "Классика #1",
    imageSrc: "/coctail_img/1_cock.jpg",
    correctAnswer: "Классика 1",
  },
  {
    type: "rebus_image",
    title: "Классика #2",
    imageSrc: "/coctail_img/2_cock.jpg",
    correctAnswer: "Классика 2",
  },
  {
    type: "rebus_image",
    title: "Экспери(кре)менты #3",
    imageSrc: "/coctail_img/3_cock.jpg",
    correctAnswer: "Эксперименты 3",
  },
  {
    type: "rebus_image",
    title: "Экспери(кре)менты #4",
    imageSrc: "/coctail_img/4_cock.jpg",
    correctAnswer: "Эксперименты 4",
  },
];

export const gameConfig: GameConfig = {
  categories: [
    {
      id: "musical",
      name: "музыКАЛЬНАЯ",
      costLabels: ["хуй 5см", "хуй 15см", "хуй 25см", "хуй 35см"],
      tasks: musicalTasks,
    },
    {
      id: "igors",
      name: "ХУЙНЯ от Игоря",
      costLabels: ["один палец", "два пальца", "кулак", "привет от дяди"],
      tasks: igorTasks,
    },
    {
      id: "cool_stories",
      name: "КАЛ СТОРИИ",
      costLabels: ["3 см", "7 см", "12 см", "не померил"],
      tasks: coolStoriesTasks,
    },
    {
      id: "cocktail",
      name: "COCKтейльная",
      costLabels: ["один стакан", "два стакана", "три стакана", "уже не помню"],
      tasks: cocktailTasks,
    },
  ],
};
