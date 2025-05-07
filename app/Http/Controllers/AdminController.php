<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AdminController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        return Inertia::render('AdminPanel', [


        ]);
    }

    public function create()
    {
        return inertia('Admin/Create');
    }

    public function edit($id)
    {
        return inertia('Admin/Edit', ['id' => $id]);
    }
}
