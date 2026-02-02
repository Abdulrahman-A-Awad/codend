<?php

namespace App\Http\Requests\Account;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UpdatePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'current_password' => [
                'required',
                function ($attr, $value, $fail) {
                    if (!Hash::check($value, $this->user()->password)) {
                        $fail('Current password is incorrect');
                    }
                },
            ],

            'new_password' => [
                'required',
                Password::min(8),
                'confirmed',
            ],
        ];
    }
}
