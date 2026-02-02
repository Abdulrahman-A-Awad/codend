<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'bio' => 'nullable|string|max:500',
            'field' => 'nullable|string|max:100',
            'github_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            'portfolio_url' => 'nullable|url',
            'avatar' => 'nullable|image|max:2048',
        ];
    }
}
