<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index()
    {
        return inertia('Activity/ActivitiesIndex', [
            'activities' => Activity::with('user')->latest()->get(),
        ]);
    }

    public function show($id)
    {
        return inertia('Activity/Show', [
            'activities' => $activity,
        ]);
    }

    public function create()
    {
        return inertia('Activity/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string|max:255',
        ]);

        Activity::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'date' => $validated['date'],
            'location' => $validated['location'],
        ]);

        return redirect()->route('activities.index')->with('message', 'Activiteit succesvol aangemaakt.');
    }
}
