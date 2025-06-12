<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Ensure default steps exist
        $defaultSteps = ['profile_setup', 'explore_dashboard', 'connect_project'];
        foreach ($defaultSteps as $step) {
            $user->onboardingProgress()->firstOrCreate(['step_name' => $step]);
        }

        // Load progress
        $steps = $user->onboardingProgress()->get(['step_name', 'completed']);

        return Inertia::render('Dashboard/Dashboard', [
            'onboardingSteps' => $steps
        ]);
    }
}
