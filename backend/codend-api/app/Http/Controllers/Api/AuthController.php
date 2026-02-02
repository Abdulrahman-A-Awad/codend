<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\Auth\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, AuthService $auth)
    {
        $user = $auth->register($request->validated());

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request, AuthService $auth)
    {
        $user = $auth->login(
            $request->login,
            $request->password
        );

        if (!$user) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'username' => $user->username,
        'email' => $user->email,
        'roles' => $user->getRoleNames(), // collection
        'is_admin' => $user->hasRole('admin'),
    ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
