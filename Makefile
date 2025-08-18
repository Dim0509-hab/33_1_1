# --- Настройки ---
EXEC_PHP = docker exec -it messenger-backend php
EXEC_NODE = docker exec -it messenger-frontend
EXEC_DB = docker exec -it messenger-db mysql -uroot -proot messenger

# --- Основные команды ---
up:
	docker-compose up -d --build

down:
	docker-compose down -v

restart: down up

logs:
	docker-compose logs -f

ps:
	docker-compose ps

# --- Laravel ---
migrate:
	$(EXEC_PHP) artisan migrate

fresh:
	$(EXEC_PHP) artisan migrate:fresh --seed

seed:
	$(EXEC_PHP) artisan db:seed

key-generate:
	$(EXEC_PHP) artisan key:generate

cache-clear:
	$(EXEC_PHP) artisan config:clear
	$(EXEC_PHP) artisan cache:clear
	$(EXEC_PHP) artisan route:clear
	$(EXEC_PHP) artisan view:clear

# --- Удобные команды ---
bash:
	docker exec -it messenger-backend bash

nginx-bash:
	docker exec -it messenger-nginx bash

db:
	$(EXEC_DB)

# --- Frontend ---
frontend-install:
	$(EXEC_NODE) npm install

frontend-dev:
	$(EXEC_NODE) npm run dev

frontend-build:
	$(EXEC_NODE) npm run build

frontend-bash:
	$(EXEC_NODE) bash
