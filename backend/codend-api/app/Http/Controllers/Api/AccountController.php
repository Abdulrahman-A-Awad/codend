<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\UpdateNameRequest;
use App\Http\Requests\Account\UpdatePasswordRequest;

class AccountController extends Controller
{
    /**
     * Update account name
     */
    public function updateName(UpdateNameRequest $request)
    {
        $user = $request->user();

        $user->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Name updated successfully',
            'user' => $user,
        ]);
    }

    /**
     * Update account password
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = $request->user();

        // ❌ لا Hash::make هنا
        $user->update([
            'password' => $request->password,
        ]);

        return response()->json([
            'message' => 'Password updated successfully',
        ]);
    }
}
