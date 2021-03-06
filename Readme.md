[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/stLucky/1566267-what-to-watch-8)
[![Eslint](https://github.com/stLucky/1566267-what-to-watch-8/actions/workflows/check.yml/badge.svg)](https://github.com/stLucky/1566267-what-to-watch-8/actions/workflows/check.yml)
[![Project test & build](https://github.com/stLucky/WhatToWatch/actions/workflows/main.yml/badge.svg)](https://github.com/stLucky/WhatToWatch/actions/workflows/main.yml)
# Что Посмотреть? 
*Онлайн кинотеатр*
https://wtw-stlucky.vercel.app/
## Особенности проекта
* Приложение состоит из 6 страниц: `Main (/)`, `Sign In (/login)`, `MyList (/mylist)`, `Film (/films/:id)`, `Add review (/films/:id/review)`, `Player (/player/:id)`.
* Страницы `MyList`, `Add review` доступны только авторизованным пользователям. Если пользователь не авторизован, то при переходе к этим страницам выполняется перенаправление на страницу `Sign In`.
* Для логина в приложение достаточно ввести рандомные валидные `email`  и `password` (должен содержать минимум одну строчную, одну заглавную латинские буквы и одну цифру)
* При обращении к несуществующей странице пользователь перенаправляется на страницу `«404»`.
* При наведении и удержании курсора мыши на изображении фильма, вместо изображения начинает воспроизводиться видео-превью фильма
* Добавление нового отзыва выполняется по кнопке `«Add review»`. Кнопка отображается только для авторизованных пользователей
* Для отправки комментария к фильму необходимо выставить оценку фильма от `1 до 10`, а текст отзыва должен быть не меньше `50` и не больше `400` символов
* Добавление в список `«К просмотру»` осуществляется при нажатии на кнопку `«+ MyList»`. Клик по аватарке пользователя выполняет переход на страницу `MyList`
* При нажатии на кнопку `«Play»` запускается проигрывание фильма. Реализована остановка, запуск, перемотка фильма по клику на прогресс бар, а также методом перетаскивания ползунка, переход в `fullscreen`
* Во время ожидания загрузки контента реализованы лоадеры, а в случае возникновения ошибок на сервере реализованы всплывающие уведомления
## Технические особенности
* В проекте реализованы функциональные компоненты с использование хуков
* Для маршрутизации используется `react router`
* Для глобального хранения состояния используется `redux`. Асинхронные действия реализованы при помощи middleware `redux-thunk`
* Для оптимизации компонентов применяется мемоизация (методом `React.memo()`, хуками `useMemo` и `useCallback`, библиотекой `reselect`)
* Все компоненты покрыты тестами с использованием фреймворка `Jest`
