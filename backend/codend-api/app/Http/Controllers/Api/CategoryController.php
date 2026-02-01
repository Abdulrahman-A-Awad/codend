<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $locale = $request->get('lang', 'ar');

        return Category::with([
            'translations' => fn ($q) => $q->where('locale', $locale),
            'children.translations' => fn ($q) => $q->where('locale', $locale),
        ])->whereNull('parent_id')->get();
    }
}
