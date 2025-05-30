<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index()
    {
        return inertia('About');
    }

    public function team()
    {
        return inertia('About/Team');
    }

    public function contact()
    {
        return inertia('About/Contact');
    }
}
