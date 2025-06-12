<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('detail')->get();

        return Inertia::render('AdminPanel/ManageUsers', [
            'users' => $users,
        ]);
    }
    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|string|max:255',
        ]);

        $role = $request->role;

        $iconMap = [
            'Gebruiker'   => '/badges/Icon-Gebruiker.png',
            'Ouder'       => '/badges/Icon-Ouder.png',
            'Leerkracht'  => '/badges/Icon-Leerkracht.png',
            'Psycholoog'  => '/badges/Icon-Psycholoog.png',
            'Admin'       => '/badges/Icon-Admin.png',
        ];

        $user->detail->update([
            'role' => $role,
            'badge_icon' => $iconMap[$role] ?? '/badges/Icon-Gebruiker.png',
        ]);

        return redirect()->back()->with('message', 'Rol en badge succesvol aangepast.');
    }

    public function edit()
    {
        return inertia('User/EditProfile');
    }

    public function create()
    {
        return inertia('User/Create');
    }
}
