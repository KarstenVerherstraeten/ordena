<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserOnboardingProgress;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function index()
    {

    }

    public function completeStep(Request $request)
    {
        $request->validate([
            'step_name' => 'required|string',
        ]);

        $user = Auth::user();

        UserOnboardingProgress::updateOrCreate(
            [
                'user_id' => $user->id,
                'step_name' => $request->step_name,
            ],
            [
                'completed' => true,
            ]
        );

        return redirect()->back();
    }
}
