<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Запускаем кастомные сидеры
        $this->call([
            UserSeeder::class,
            ChatSeeder::class,
            ChatUserSeeder::class,
            MessageSeeder::class,
        ]);

        // Дополнительно создаём пользователей прямо отсюда
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
        ]);

        User::factory()->create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
        ]);
    }
}
