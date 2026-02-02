<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Models\User;


class ProfileController extends Controller
{
    // 🔐 My Profile
    public function me(Request $request)
    {
        $user = $request->user();

        $profile = $user->profile()->firstOrCreate([]);

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

    // ✏️ Update My Profile
    public function update(UpdateProfileRequest $request)
    {
        $user = $request->user();
        $profile = $user->profile()->firstOrCreate([]);

        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $data['avatar'] = $path;
        }

        $profile->update($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'profile' => $profile,
        ]);
    }

    // 🌍 Public Profile
    public function show(string $username)
    {
        $user = User::where('username', $username)
            ->with('profile')
            ->firstOrFail();

        return response()->json([
            'name' => $user->name,
            'username' => $user->username,
            'profile' => $user->profile,
        ]);
    }
}
