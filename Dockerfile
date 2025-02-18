FROM node:20.17.0 AS build

WORKDIR /app

# Установка pnpm
RUN npm install -g pnpm

# Копирование файлов package.json
COPY package*.json ./

# Установка всех зависимостей для сборки
RUN pnpm install

# Копирование исходного кода
COPY . .

# Исключение тестовых файлов из сборки
RUN find . -name "*.test.*" -type f -delete
RUN find . -name "__tests__" -type d -exec rm -rf {} +
RUN find . -name "test-utils.tsx" -type f -delete

# Сборка проекта
RUN pnpm build

# Очистка devDependencies после сборки
RUN pnpm prune --prod

# Настройка nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 