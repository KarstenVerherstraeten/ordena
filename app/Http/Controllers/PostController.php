<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;


class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Forum', [
            'posts' => Post::with('user')->latest()->get(),
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function create()
    {
        return view('posts.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $request->user()->posts()->create($request->only('title', 'content'));

        return redirect()->route('forum');
    }

    public function show($id)
    {
        return view('posts.show', ['post' => $id]);
    }

    public function edit($id)
    {
        return view('posts.edit', ['post' => $id]);
    }

    public function update(Request $request, $id)
    {
        // Validate and update the post
        // Redirect to the posts index
    }

    public function destroy($id)
    {
        // Delete the post
        // Redirect to the posts index
    }
}
