<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
use Illuminate\Http\Request;
use App\Models\PendingOrganisationRequest;
use Inertia\Inertia;

class OrganisationRequestController extends Controller
{
    public function index()
    {

    }

    public function adminIndex()
    {
        // Fetch all pending organisation requests
        $pendingRequests = PendingOrganisationRequest::where('status', 'pending')->get();
        return inertia::render('AdminPanel/OrganisationRequests', [
            'pendingRequests' => $pendingRequests,
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
            'phone_number' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'status' => 'in:pending,approved,rejected', // Optional, default to pending

        ]);
        $validated['status'] = 'pending';

        // Handle file upload if present
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('organisations', 'public');
        }

        $organisation = PendingOrganisationRequest::create([
            'user_id' => auth()->id(),
            'owner_id' => auth()->id(),
            'organisation_name' => $validated['organisation_name'],
            'description' => $validated['description'],
            'organisation_address' => $validated['organisation_address'],
            'btw_number' => $validated['btw_number'],
            'image' => $imagePath,
            'website' => $validated['website'],
            'phone_number' => $validated['phone_number'],
            'email' => $validated['email'],
            'status' => $validated['status'],
        ]);

        // Attach the user to the organisation via the pivot table
        return redirect()->route('dashboard', $organisation->id)
            ->with('message', 'Organisation created successfully.');
    }

    public function acceptRequest($id)
    {
        $pending = PendingOrganisationRequest::findOrFail($id);

        // Create new organisation from pending request
        $organisation = Organisation::create([
            'user_id' => $pending->user_id,
            'owner_id' => $pending->owner_id,
            'organisation_name' => $pending->organisation_name,
            'description' => $pending->description,
            'organisation_address' => $pending->organisation_address,
            'btw_number' => $pending->btw_number,
            'image' => $pending->image, // image already stored
            'phone_number' => $pending->phone_number,
            'email' => $pending->email,
            'website' => $pending->website,
        ]);

        // Attach the user to the organisation via the pivot table
        $organisation->users()->attach($pending->user_id);

        // Update status of pending request (optional: you could also delete it)
        $pending->status = 'accepted';
        $pending->save();

        return redirect()->route('admin.organisation.requests')
            ->with('message', 'Organisation request accepted and organisation created successfully.');
    }
}
