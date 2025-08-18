<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Chat;

class ChatUserSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $chats = Chat::all();

        // Добавим всех пользователей в первый чат
        $general = Chat::where('name', 'General Chat')->first();
        if ($general) {
            $general->users()->attach($users->pluck('id')->toArray());
        }

        // Добавим рандомных пользователей в другие чаты
        foreach ($chats as $chat) {
            $chat->users()->attach(
                $users->random(rand(3, 6))->pluck('id')->toArray()
            );
        }
    }
}
