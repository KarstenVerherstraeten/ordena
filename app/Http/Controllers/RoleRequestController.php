<?php

namespace App\Http\Controllers;

use App\Models\RoleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoleRequestController extends Controller
{
    public function index()
    {
        // Show the role request page (form)
        return inertia('Profile/RoleRequest');
    }

    public function adminIndex()
    {
        $requests = RoleRequest::with('user')->get(); // eager load user
        return inertia('AdminPanel/RoleRequests', [
            'requests' => $requests,
        ]);
    }

    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'role' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle file upload if present
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('role_requests', 'public');
        }

        // Create the role request
        RoleRequest::create([
            'user_id' => auth()->id(),
            'role'    => $validated['role'],
            'image'   => $imagePath,
        ]);

        return redirect()->back()->with('message', 'Rolaanvraag succesvol ingediend.');
    }

    public function accept($id)
    {
        $request = RoleRequest::with('user.detail')->findOrFail($id);
        $user = $request->user;

        $iconMap = [
            'Gebruiker' => '/badges/Icon-Gebruiker.png',
            'Ouder' => '/badges/Icon-Ouder.png',
            'Leerkracht' => '/badges/Icon-Leerkracht.png',
            'Psycholoog' => '/badges/Icon-Psycholoog.png',
            'Organisator' => '/badges/Icon-Organisator.png',
            "GebruikerASS" => '/badges/Icon-GebruikerASS.png',
            'Admin' => '/badges/Icon-Admin.png',
        ];

        if ($user->detail) {
            $user->detail->update([
                'role' => $request->role,
                'badge_icon' => $iconMap[$request->role] ?? '/badges/Icon-Gebruiker.png',
            ]);
        } else {
            // fallback if detail doesn't exist yet
            $user->detail()->create([
                'role' => $request->role,
                'badge_icon' => $iconMap[$request->role] ?? '/badges/Icon-Gebruiker.png',
            ]);
        }

        if ($request->image) {
            Storage::disk('public')->delete($request->image);
        }

        $request->delete();

        return redirect()->back()->with('message', 'Rol succesvol toegekend en aanvraag verwijderd.');
    }


    public function deny($id)
    {
        $request = RoleRequest::with('user.detail')->findOrFail($id);

        if ($request->image) {
            Storage::disk('public')->delete($request->image);
        }

        $request->delete();

        return redirect()->back()->with('message', 'Aanvraag geweigerd.');
    }

    public function create()
    {
        return inertia('RoleRequest/Create');
    }

    public function edit($id)
    {
        return inertia('RoleRequest/Edit', ['id' => $id]);
    }
}
