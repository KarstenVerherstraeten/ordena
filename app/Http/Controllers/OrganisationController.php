<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
use Illuminate\Http\Request;

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
        return inertia('Organisation/Index', [
            'organisation' => $organisation,
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
            'website' => $validated['website'],
        ]);

        // Attach the user to the organisation via the pivot table
        $organisation->users()->attach(auth()->id());
        return redirect()->route('organisatie.show', $organisation->id)
            ->with('message', 'Organisation created successfully.');
    }
}
