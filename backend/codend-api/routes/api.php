<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\AccountController;

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/profiles/{username}', [ProfileController::class, 'show']);

Route::post('/auth/register', [AuthController::class, 'register'])
    ->withoutMiddleware('*');

Route::post('/auth/login', [AuthController::class, 'login'])
    ->withoutMiddleware('*');

/*
|--------------------------------------------------------------------------
| Authenticated
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // 🔐 Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // 👤 Profile (bio, avatar, links)
    Route::get('/profile/me', [ProfileController::class, 'me']);
    Route::post('/profile', [ProfileController::class, 'update']);

    // ⚙️ Account (name, password لاحقًا)
    Route::prefix('account')->group(function () {
        Route::post('/name', [AccountController::class, 'updateName']);
        // Route::post('/password', [AccountController::class, 'updatePassword']); ← بعد شوية
    });
});
