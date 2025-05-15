<?php

use App\Http\Controllers\AdminController;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleRequestController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


use App\Http\Controllers\PostController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/dashboard/myposts', [PostController::class, 'myPosts'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard.posts');

Route::get('/dashboard/rolerequest', [RoleRequestController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard.rolerequest');

Route::post('/dashboard/rolerequest', [RoleRequestController::class, 'store'])->middleware(['auth', 'verified'])->name('dashboard.rolerequest.store');
Route::get('/forum', [PostController::class, 'index'])->name('forum');

Route::middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/manage', [UserController::class, 'index'])->name('admin.manage');
    Route::put('/admin/manage/{user}/role', [UserController::class, 'updateRole'])->name('admin.manage.role');
    Route::get('/admin/requests', [RoleRequestController::class, 'adminIndex'])->name('admin.rolerequest');
    Route::delete('admin/requests/{id}/deny', [RoleRequestController::class, 'deny'])->name('admin.rolerequest.destroy');
    Route::post('admin/requests/{id}/accept', [RoleRequestController::class, 'accept'])->name('admin.rolerequest.accept');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/forum/posts/{post}/upvote', [PostController::class, 'upvote'])->name('posts.upvote');
    Route::post('/forum', [PostController::class, 'store'])->middleware(['auth'])->name('forum.store');
    Route::get('/forum/create', [PostController::class, 'create'])->name('forum.create');
    Route::get('/forum/posts/{post}', [PostController::class, 'show'])->name('posts.show');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
});

require __DIR__.'/auth.php';
