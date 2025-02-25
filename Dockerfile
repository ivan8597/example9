# Multi-stage build для React приложения
FROM node:18-alpine AS builder

WORKDIR /app

# Установка pnpm
RUN npm install -g pnpm

# Копирование только файлов, необходимых для установки зависимостей
COPY package.json pnpm-lock.yaml ./

# Установка зависимостей
RUN pnpm install

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN pnpm build

# Рабочий образ
FROM nginx:alpine

# Копирование собранного приложения из предыдущего этапа
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование nginx конфигурации для SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспозиция порта
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]