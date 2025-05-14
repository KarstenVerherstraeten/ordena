<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Admin account
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // Change this to something secure
            'role' => 'admin',
            'badge_icon' => 'badges/admin-icon.png', // Example icon
        ]);

        // Leerkracht
        User::create([
            'name' => 'Test Leerkracht',
            'email' => 'leerkracht@example.com',
            'password' => Hash::make('password'),
            'role' => 'leerkracht',
            'badge_icon' => 'badges/Icon-leerkracht.png', // Example icon
        ]);

        // Ouder
        User::create([
            'name' => 'Test Ouder',
            'email' => 'ouder@example.com',
            'password' => Hash::make('password'),
            'role' => 'ouder',
            'badge_icon' => 'badges/Icon-Ouder.png', // Example icon
        ]);

        // Psycholoog
        User::create([
            'name' => 'Test Psycholoog',
            'email' => 'psycholoog@example.com',
            'password' => Hash::make('password'),
            'role' => 'psycholoog',
            'badge_icon' => 'badges/Icon-psycholoog.png', // Example icon
        ]);
    }
}
