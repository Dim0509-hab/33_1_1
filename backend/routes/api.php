<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\UserController;

Route::get('/ping', fn() => response()->json(['message' => 'pong']));

// регистрация
Route::post('/register', [RegisteredUserController::class, 'store']);

// логин
Route::post('/login', [LoginController::class, 'store']);

// защищённые маршруты
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [UserController::class, 'me']);
    Route::post('/logout', [LoginController::class, 'destroy']);
});
