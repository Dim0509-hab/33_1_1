FROM node:20

WORKDIR /app

# сначала копируем package.json + package-lock.json (если есть)
COPY package*.json ./

# устанавливаем зависимости вместе с devDependencies
RUN npm install --include=dev

# копируем остальное приложение
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
