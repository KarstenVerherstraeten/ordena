<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Anhskohbo\NoCaptcha\Rules\Captcha;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register the CAPTCHA validation rule
        Validator::extend('captcha', function ($attribute, $value, $parameters, $validator) {
            return (new Captcha)->passes($attribute, $value);
        });

        // Share data with Inertia
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();
                if ($user) {
                    $user->load('detail'); // Load the relation
                }

                return [
                    'user' => $user,
                ];
            },
        ]);

        // Vite prefetch
        Vite::prefetch(concurrency: 3);
    }
}
