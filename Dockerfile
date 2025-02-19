FROM node:18-alpine

WORKDIR /app

# Установка pnpm
RUN npm install -g pnpm

# Копирование файлов зависимостей
COPY package.json pnpm-lock.yaml ./

# Установка зависимостей
RUN pnpm install

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN pnpm build

# Открытие порта
EXPOSE 3000

# Запуск приложения
CMD ["pnpm", "preview", "--host"]