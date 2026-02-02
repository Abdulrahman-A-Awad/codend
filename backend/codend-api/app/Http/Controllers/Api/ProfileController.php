<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Support\Facades\Storage;


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

    /*
    |--------------------------------------------------------------------------
    | 🗑 Remove avatar
    |--------------------------------------------------------------------------
    | لو الفرونت بعت avatar = null
    */
    if ($request->has('avatar') && $request->input('avatar') === null) {
        if ($profile->avatar) {
            Storage::disk('public')->delete($profile->avatar);
        }

        $data['avatar'] = null;
    }

    /*
    |--------------------------------------------------------------------------
    | 📤 Upload new avatar
    |--------------------------------------------------------------------------
    */
    if ($request->hasFile('avatar')) {
        // احذف القديم
        if ($profile->avatar) {
            Storage::disk('public')->delete($profile->avatar);
        }

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
    $user = User::where('username', $username)->firstOrFail();

    // Create empty profile if not exists
    $profile = $user->profile()->firstOrCreate([]);

    return response()->json([
        'name' => $user->name,
        'username' => $user->username,
        'profile' => $profile,
    ]);
}
}
