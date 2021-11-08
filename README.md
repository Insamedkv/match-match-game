Deploy link: https://rolling-scopes-school.github.io/insamedkv-JSFE2021Q1/match-match-game/
Match-Match Game
Задача
Ваша задача реализовать игру match-match. Игра часто используется для тренировки памяти. Игровое поле состоит из карточек с разными рисунками на обратной стороне. Перед началом игровой сессии игроку показывают расположение всех парных карточек, по истечению 30 секунд их скрывают. Победа засчитывается когда найдены все пары карточек.

UX прототип
Базовый UX прототип в figma Дизайн можно менять любым образом, мобильная версия не требуется.
Разрешается использовать любые препроцессоры.

Требования к функционалу приложения
Имя базы данных indexedDb должно соответствовать github-name студента

Тег body в html документе должен оставаться пустым.

В приложении должно быть следующие страницы:

Settings
About Game
Best score
На странице About Game должна быть представлена краткая инструкция по началу игры

Приложение должно быть SPA - Генерация новых страниц должна быть реализована через javascript, перезагрузок страниц не должно быть (Перезагрузки инициализируемые из кода для сброса js состояния, например для сброса состояния игры считаются хаком и штрафуются ).

На странице Best score должен отображаться топ 10 игроков.

На странице Settings должны находится настройки приложения. Допускаются любые настройки, но две базовые нельзя игнорировать:

Настройка сложности игры (4х4, 6х6, 8х8)
Настройка типов карточек для сравнений (можно использовать любые типы. Пример: Животные, автомобили и т.п.)
В приложение должен быть header в котором должны быть реализованна маршрутизация между страницами.

Активный роут должен быть выделен.

На главной странице должна быть возможность зарегистрироваться как новый игрок.

При регистрации должна быть следующее правило проверки вводимых значений:

Имя:

- Имя не может быть пустым.
- Имя не может состоять из цифр.
- Имя не может содержать служебные символы (~ ! @ # $ % * () _ — + = | : ; " ' ` < > , . ? / ^).
Фамилия:

- Фамилия не может быть пустой.
- Фамилия не может состоять из цифр.
- Фамилия не может содержать служебные символы. (~ ! @ # $ % * () _ — + = | : ; " ' ` < > , . ? / ^)
email:

- email не может быть пустым.
- должен соответствовать стандартному правилу формированию email [RFC](https://en.wikipedia.org/wiki/Email_address#Standards_documents)
Форма в целом:

- Возможно использование любого языка для ввода имени и фамилии.
- Колличество символов не должно превышать 30 символов включая пробелы
- В случае несоответствия любого из вышеуказанных правил, необходимо блокировать кнопку создания пользователя
- Все неправильные поля должны быть подсвечены и иметь соответствующие сообщения об ошибках.
- После нажатия на кнопку создания игрока страница не должна перезагружаться.
- После нажатия на кнопку cancel вся ранее заполненная информация должна быть сброшена.
Если все данные игрока корректны, все правильно заполненные поля должны быть помеченные как правильные.
После регистрации игрока в header должна появится кнопка позволяющая начать игру
После нажатия на кнопку старт должен начинаться игровой цикл
У игрока должна быть возможность остановить игру.
Расчет очков игрока должен производиться по следующей формуле: (количество сравнений - количество ошибочных сравнений) * 100 - (время прошедшее с начала в секундах) * 10. При этом количество очков не должно быть меньше 0.
На игровом поле должен присутствовать таймер.
В случае несовпадения карточек, неправильная пара должна быть подсвечена красным.
Совпавшие пары должны подсвечиваться зеленым.
После нахождения всех совпадений необходимо показать модальное окно с поздравлениями. После клика на кнопку "ОК" в этом окне приложение должно перейти на страницу рекордов.
Нефункциональные требования

eslint
eslint должен быть настроен. Запрещено использовать какие-либо аннотации, отключающие правила eslint вида // eslint-disable

eslint включен в package.json,
вы должны использовать конфигурацию eslint-config-airbnb-typescript/base
весь код должен быть проверен
проверка eslint выполняется запуском команды npm run lint
должен быть подключен prettier
Ограничения
Код должен быть написан на typescript.
Проект должен использовать webpack.
Задание должно работать в Chrome
Использование material design или bootstrap допускается
Вы НЕ МОЖЕТЕ использовать какие-либо SPA фреймворки, такие как Angular / React / Vue
Вы можете общаться, переписываться в чате, гуглить и использовать stackoverflow
Вы можете использовать lodash.js
Данные должны храниться в indexedDb
Запрещается обертки indexedDb.
