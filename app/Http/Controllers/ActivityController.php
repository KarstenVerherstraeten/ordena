<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use App\Models\ActivityImage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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
        $activity = Activity::with(['user.organisations', 'images'])->findOrFail($id);

        // Find organisation related to the user (assume one organisation)
        $organisation = $activity->user->organisations->first();

        // Build organiser object to pass to frontend
        $organiser = $organisation
            ? ['organisation' => $organisation]
            : ['user' => $activity->user];

        return inertia('Activity/Show', [
            'activity' => $activity,
            'organiser' => $organiser,
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
            'startDate' => 'required|date',
            'endDate' => 'required|date',
            'price' => 'required|numeric',
            'location' => 'required|string|max:255',
            'featured_image' => 'nullable|image',
            'activity_images.*' => 'nullable|image',
        ]);

        $activity = Activity::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'start' => $validated['startDate'],
            'end' => $validated['endDate'],
            'price' => $validated['price'],
            'location' => $validated['location'],
            'featured_image' => $request->file('featured_image') ? $request->file('featured_image')->store('activities', 'public') : null,
        ]);

        if ($request->hasFile('activity_images')) {
            foreach ($request->file('activity_images') as $image) {
                $path = $image->store('activities', 'public');

                $activity->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        return redirect()->route('activities')->with('success', 'Activiteit aangemaakt!');
    }

    public function destroy($id)
    {
        $activity = Activity::findOrFail($id);

        // Delete the featured image if it exists
        if ($activity->featured_image) {
            Storage::disk('public')->delete($activity->featured_image);
        }

        // Delete associated activity images
        foreach ($activity->images as $image) {
            Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }

        $activity->delete();

        return redirect()->route('activities')->with('success', 'Activiteit verwijderd!');
    }



    public function MyActivities()
    {
        $user = Auth::user();

        return Inertia::render('Dashboard/MyActivities', [
            'activities' => $user->activities()->with('user')->latest()->get(),
        ]);
    }

}
