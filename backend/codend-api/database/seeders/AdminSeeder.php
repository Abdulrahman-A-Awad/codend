<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        $admin = User::firstOrCreate(
            ['email' => 'admin@codend.com'],
            [
                'name' => 'CodeNDesign Admin',
                'username' => 'admin',
                'password' => Hash::make('admin12345'),
            ]
        );

        $admin->assignRole($adminRole);
    }
}
