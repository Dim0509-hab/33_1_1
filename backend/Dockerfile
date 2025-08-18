FROM php:8.2-fpm

# Установим расширения PHP
RUN apt-get update && apt-get install -y \
    zip unzip git curl libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring gd \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Сначала только composer.json и composer.lock для кэширования зависимостей
COPY composer.json composer.lock ./
RUN composer install --no-interaction --optimize-autoloader

# Копируем остальной код
COPY . .

# Права для Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

CMD ["php-fpm"]
