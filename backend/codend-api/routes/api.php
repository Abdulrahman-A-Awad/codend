<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;

Route::get('/categories', [CategoryController::class, 'index']);

Route::post('/auth/register', [AuthController::class, 'register'])
    ->withoutMiddleware('*');

Route::post('/auth/login', [AuthController::class, 'login'])
    ->withoutMiddleware('*');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});
