<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProfileController;


Route::get('/categories', [CategoryController::class, 'index']);

Route::post('/auth/register', [AuthController::class, 'register'])
    ->withoutMiddleware('*');

Route::post('/auth/login', [AuthController::class, 'login'])
    ->withoutMiddleware('*');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile/me', [ProfileController::class, 'me']);
    Route::post('/profile', [ProfileController::class, 'update']);
});

Route::get('/profiles/{username}', [ProfileController::class, 'show']);
