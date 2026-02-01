<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\CategoryTranslation;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Programming (Root)
        $programming = Category::create([
            'slug' => 'programming',
            'type' => 'mixed',
        ]);

        CategoryTranslation::insert([
            [
                'category_id' => $programming->id,
                'locale' => 'ar',
                'name' => 'البرمجة',
                'description' => 'مقالات وشروحات برمجية',
            ],
            [
                'category_id' => $programming->id,
                'locale' => 'en',
                'name' => 'Programming',
                'description' => 'Programming tutorials and articles',
            ],
        ]);

        // Web Development (Child)
        $web = Category::create([
            'parent_id' => $programming->id,
            'slug' => 'web-development',
            'type' => 'mixed',
        ]);

        CategoryTranslation::insert([
            [
                'category_id' => $web->id,
                'locale' => 'ar',
                'name' => 'تطوير الويب',
                'description' => 'كل ما يخص تطوير الويب',
            ],
            [
                'category_id' => $web->id,
                'locale' => 'en',
                'name' => 'Web Development',
                'description' => 'Everything about web development',
            ],
        ]);

        // University Subjects
        $university = Category::create([
            'slug' => 'university-subjects',
            'type' => 'university',
        ]);

        CategoryTranslation::insert([
            [
                'category_id' => $university->id,
                'locale' => 'ar',
                'name' => 'مواد الجامعة',
                'description' => 'مواد كليات الحاسبات والمعلومات',
            ],
            [
                'category_id' => $university->id,
                'locale' => 'en',
                'name' => 'University Subjects',
                'description' => 'Computer science university subjects',
            ],
        ]);
    }
}
