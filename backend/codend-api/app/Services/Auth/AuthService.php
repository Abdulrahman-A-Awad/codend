<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    /**
     * Register new user
     */
    public function register(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'username' => $data['username'],
            'email' => strtolower($data['email']), // تحسين بسيط
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Login by email OR username
     */
    public function login(string $login, string $password): ?User
    {
        $user = User::where('email', $login)
            ->orWhere('username', $login)
            ->first();

        if (!$user) {
            return null;
        }

        if (!Hash::check($password, $user->password)) {
            return null;
        }

        return $user;
    }
}
