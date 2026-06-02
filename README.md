## Требования

- Node.js 22+
- npm
- Docker и Docker Compose (для запуска через Docker)
- API-ключ GigaChat с [портала разработчиков Сбера](https://developers.sber.ru/portal/products/gigachat-api)

---

## Настройка окружения

Перед запуском приложения создайте файл `.env` в директории `/server`:

```
API_AUTH_KEY=ваш_api_ключ_gigachat
```

`API_AUTH_KEY` — это строка credentials в формате base64 (`client_id:client_secret`), которую можно получить в личном кабинете GigaChat API.

---

## Запуск через Docker

### 1. Соберите и запустите контейнеры из корня проекта

```sh
docker compose up --build
```

Будут запущены:
- **Сервер** на `http://localhost:8080`
- **Фронтенд** на `http://localhost:5173`

### 2. Откройте приложение

Перейдите по адресу [http://localhost:5173](http://localhost:5173) в браузере.

---

## Запуск вручную

### 1. Запустите сервер

```sh
cd server
npm i
npm start
```

Сервер будет доступен по адресу `http://localhost:8080`.

### 2. Запустите фронтенд

Откройте новый терминал в корневой директории:

```sh
npm i
npm run dev
```

Фронтенд будет доступен по адресу `http://localhost:5173`.

### Сборка фронтенда для продакшена

```sh
npm run build
npm run preview
```

