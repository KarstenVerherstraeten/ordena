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
        return Inertia::render('post_create', [
            'posts' => Post::with('user')->latest()->get(),
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Post::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

        return redirect()->route('forum'); // or Inertia::location('/forum');
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

    public function upvote(Post $post)
    {
        $post->increment('upvotes');

        // For Inertia, return a redirect or just 204 No Content for SPA
        return back(); // Or: return response()->noContent();
    }
    public function destroy($id)
    {
        // Delete the post
        // Redirect to the posts index
    }
}
