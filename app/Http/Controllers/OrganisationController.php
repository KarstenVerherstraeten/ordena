<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
use Illuminate\Http\Request;
use App\Models\User;

class OrganisationController extends Controller
{
    public function index()
    {
        return inertia('Organisation/Organisation');
    }

    public function create()
    {
        return inertia('Organisation/Create');
    }

    public function edit($id)
    {
        return inertia('Organisation/Edit', ['id' => $id]);
    }

    public function show($id)
    {
        $organisation = Organisation::with('users')->findOrFail($id);

        $userIds = $organisation->users->pluck('id')->toArray();

        $organisatorUsers = User::whereHas('detail', function ($query) {
            $query->where('role', 'Organisator');
        })
            ->whereNotIn('id', $userIds)
            ->get(['id', 'name', 'email']);

        return inertia('Organisation/Index', [
            'organisation' => $organisation,
            'organisatorUsers' => $organisatorUsers,
            'authUserId' => auth()->id(),
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'organisation_name' => 'required|string|max:255',
            'description' => 'required|string',
            'organisation_address' => 'required|string|max:255',
            'btw_number' => 'required|string|max:255', // Or BTW-nummer, just match your DB
            'image' => 'nullable|image',
            'website' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone_number' => 'nullable|string|max:20',
        ]);

        // Handle file upload if present
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('organisations', 'public');
        }

        $organisation = Organisation::create([
            'user_id' => auth()->id(),
            'owner_id' => auth()->id(),
            'organisation_name' => $validated['organisation_name'],
            'description' => $validated['description'],
            'organisation_address' => $validated['organisation_address'],
            'btw_number' => $validated['btw_number'],
            'image' => $imagePath,
            'website' => $validated['website'] ?? null,
            'phone_number' => $validated['phone_number'] ?? null,
            'email' => $validated['email'] ?? null,
        ]);

        // Attach the user to the organisation via the pivot table
        $organisation->users()->attach(auth()->id());
        return redirect()->route('organisatie.show', $organisation->id)
            ->with('message', 'Organisation created successfully.');
    }

    public function addUser(Request $request, Organisation $organisation)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $organisation->users()->syncWithoutDetaching($request->user_id);

        return back()->with('message', 'User added to organisation.');
    }

    public function removeUser(Organisation $organisation, User $user)
    {
        $organisation->users()->detach($user->id);

        return back()->with('message', 'User removed from organisation.');
    }

    public function makeOwner(Organisation $organisation, User $user)
    {
        // Check if the user is part of the organisation
        if (!$organisation->users->contains($user)) {
            return back()->with('error', 'User is not part of this organisation.');
        }

        // Update the owner_id of the organisation
        $organisation->update(['owner_id' => $user->id]);

        return back()->with('message', 'User is now the owner of the organisation.');
    }
}
