<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Account\UpdateNameRequest;

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
}
