# Rustoria UA Community Website

## Опис

Цей проєкт — вебсайт спільноти Rustoria UA для відображення статусу серверів Rust, авторизації через Steam та перегляду інформації про VIP-підписки. Сайт дозволяє користувачам входити через Steam, переглядати список серверів, їхній онлайн-статус та ціни на VIP.

## Структура проєкту

- **public/** — статичні файли (HTML, CSS, JS, зображення)
- **public/routes/** — клієнтські скрипти для авторизації
- **public/modals/** — скрипти для модальних вікон
- **public/payments/** — (не використовується) скрипти для платіжних методів
- **config/** — налаштування Passport для Steam-авторизації
- **views/** — шаблони профілю користувача (EJS)
- **server.js** — основний сервер Express
- **.env** — змінні середовища (ключі, домен, секрет сесії)
- **package.json** — залежності Node.js та скрипти

## Встановлення

1. Клонувати репозиторій:
   ```sh
   git clone https://github.com/Voxicat/kursova-robota.git
   cd site_proj

2. Встановити залежності:
    mpn install

3. створити файл .env у корені проєкту:
    STEAM_API_KEY=ВАШ_STEAM_API_KEY
    DOMAIN=http://localhost:3000
    SESSION_SECRET=будь-який_секрет
    NODE_ENV=development

4. Запустити сервер:
    node server.js

**Сервер буде доступний за адресою http://localhost:3000**

## Основні можливості
Авторизація через Steam: Користувачі можуть увійти через Steam для доступу до профілю.
Відображення статусу серверів: На головній сторінці показується онлайн-статус та список серверів Rust.
VIP-підписки: Інформація про ціни на VIP-підписки доступна у відповідному розділі.
## Файли для налаштування
server.js — основний сервер Express
config/passport.js — налаштування Steam-авторизації
public/index.html — головна сторінка
public/js/script.js — логіка клієнта
.env — змінні середовища
## Залежності
express
express-session
passport
passport-steam
dotenv
node-fetch

## Примітка
Для роботи Steam-авторизації необхідно отримати Steam API Key на https://steamcommunity.com/dev/apikey та вказати його у .env.
