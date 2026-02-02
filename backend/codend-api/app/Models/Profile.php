<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'avatar',
        'bio',
        'field',
        'github_url',
        'linkedin_url',
        'portfolio_url',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
