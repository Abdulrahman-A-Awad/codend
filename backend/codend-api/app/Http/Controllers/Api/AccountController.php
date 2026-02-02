<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Account\UpdateNameRequest;
use App\Http\Requests\Account\UpdatePasswordRequest;
use Illuminate\Support\Facades\Hash;

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
     * Update account Password
     */

public function updatePassword(UpdatePasswordRequest $request)
{
    $user = $request->user();

    $user->update([
        'password' => Hash::make($request->new_password),
    ]);

    return response()->json([
        'message' => 'Password updated successfully',
    ]);
}
}
