<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Message;
use App\Models\User;
use App\Models\Chat;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $chat  = Chat::first();

        if ($users->count() > 1 && $chat) {
            foreach (range(1, 20) as $i) {
                Message::create([
                    'user_id' => $users->random()->id,
                    'chat_id' => $chat->id,
                    'content' => fake()->sentence(),
                ]);
            }
        }
    }
}
