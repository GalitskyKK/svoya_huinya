# СВОЯ ХУЙНЯ

Однопользовательская викторина 18+ в стиле «Своей игры». Next.js, TypeScript, Tailwind.

## Запуск

```bash
npm install
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

## Сборка и деплой на Vercel

```bash
npm run build
```

В Vercel: импортируй репозиторий, build command — `npm run build`, output — Next.js.

## Ассеты

- **Аудио:** файлы уже скопированы в `public/audio/` (1-meme.mp3, 2-meme.mp3, 3-splice.mp3). Блиц (4-й слот музыКАЛЬНОЙ) — треков пока нет, добавь в `data/gameConfig.ts` в `blitzTracks`.
- **Ребусы:** картинки в `public/rebus/`. Новые ребусы — добавь файл в `public/rebus/` и объект в массив `igorRebusImages` в `data/gameConfig.ts`.

## Добавление контента

- **Стоимости:** измени массив `costLabels` в `data/gameConfig.ts`.
- **Музыкальные задания:** правь `musicalTasks` (пути к MP3, правильные ответы).
- **Ребусы ХУЙНЯ от Игоря:** добавь `{ imageSrc: "/rebus/имя.png", correctAnswer: "..." }` в `igorRebusImages`.
- **КУЛ СТОРИИ:** добавь объект в `coolStoriesRebuses` с полями `emoji` (массив строк) и `correctAnswer`.
