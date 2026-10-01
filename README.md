# Атласы невидимого

Обложка серии интерактивных научных атласов: восемь томов, каждый — в своей эпохе печати.
Статичный сайт без сборки: `index.html`, `style.css`, `main.js`, без внешних библиотек.
Тома лежат в картотеке — в интерактивных папках; внутри каждой лист, свёрстанный
как титул своего тома (шаблоны — объект `SHEETS` в `main.js`, стили — `.sheet--*` в `style.css`).

| Том | Название | Адрес |
|---|---|---|
| I | HAEMA — Кровь и вирусы | https://dmitrylelee.github.io/hiv/ |
| II | MYCELIUM — Подземная сеть | https://dmitrylelee.github.io/MYCELIUM/ |
| III | Ночная смена — Сон и мозг | https://dmitrylelee.github.io/sleep/ |
| IV | Кабинет восприятия — Как устроен разум | https://dmitrylelee.github.io/night_dev/ |
| V | Кабинет восприятия — Испытуемый | https://dmitrylelee.github.io/psycho/ |
| VI | BLOB — Слизевик | https://dmitrylelee.github.io/blob/ |
| VII | Жгучий атлас — Как перец обманывает мозг | https://dmitrylelee.github.io/smth/ |
| VIII | MORS — Что происходит, когда мы умираем | https://dmitrylelee.github.io/after_death/ |

Тома перечислены в массиве `VOLUMES` в начале `main.js`. У тома без `url` кнопка
неактивна и стоит статус «в печати».

После правок увеличьте номер версии `?v=` у `style.css` и `main.js` в `index.html`,
чтобы браузеры не держали старые файлы из кэша GitHub Pages.

Локально: `npx http-server .` и открыть http://localhost:8080.
