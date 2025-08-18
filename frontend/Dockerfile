# frontend/Dockerfile
# Используем Node только для сборки фронта
FROM node:20 AS build

WORKDIR /app

# Копируем package.json и lock-файл (для кэша зависимостей)
COPY package*.json ./

# Устанавливаем зависимости (dev нужны для билда)
RUN npm install --include=dev

# Копируем весь проект
COPY . .

# Собираем production-бандл
RUN npm run build

# На выходе получаем /app/dist
