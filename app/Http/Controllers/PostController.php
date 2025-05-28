<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('user');

        // Search filter
        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                    ->orWhere('content', 'like', "%$search%");
            });
        }

        // Role filter
        if ($request->has('role') && $request->role !== '') {
            $query->whereHas('user.detail', function ($q) use ($request) {
                $q->where('role', $request->role);
            });
        }

        //Sorting
        $sortField = $request->get('sortField', 'created_at');
        $sortOrder = $request->get('sortOrder', 'desc');

        if ($sortField === 'upvotes') {
            $query->orderBy('upvotes', $sortOrder);
        } else {
            $query->orderBy($sortField, $sortOrder);
        }


        // 📄 Pagination
        $posts = $query->paginate(10)->withQueryString();

        return Inertia::render('Kennisbank/Kennisbank', [
            'posts' => $posts,
            'filters' => $request->only(['search', 'role', 'sortField', 'sortOrder']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Kennisbank/post_create', [
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
        return Inertia::render('Kennisbank/SinglePost', [
            'post' => Post::with('user')->findOrFail($id),
            'phpVersion' => PHP_VERSION,
        ]);
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
        $user = Auth::user();

        if ($post->upvotedBy()->where('user_id', $user->id)->exists()) {
            // User already upvoted: remove upvote
            $post->upvotedBy()->detach($user->id);
            $post->decrement('upvotes');
        } else {
            // User hasn't upvoted yet: add upvote
            $post->upvotedBy()->attach($user->id);
            $post->increment('upvotes');
        }

        return back(); // Or: return response()->noContent();
    }
    public function destroy(Request $request, Post $post)
    {
        // Check if the authenticated user is the owner of the post
        if ($post->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'Je hebt geen toestemming om deze post te verwijderen.');
        }

        // Delete the post
        $post->delete();
        return redirect()->back()->with('message', 'Post verwijderd.');


    }

    public function myPosts()
    {
        $user = Auth::user();

        return Inertia::render('Dashboard/Myposts', [
            'posts' => $user->posts()->with('user')->latest()->get(),
        ]);
    }
}
