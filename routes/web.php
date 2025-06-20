<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AdminController;

use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\OrganisationController;
use App\Http\Controllers\OrganisationRequestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleRequestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Models\PendingOrganisationRequest;
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


// dashboard routes


Route::get('/mijnprofiel', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::post('/mijnprofiel/complete', [OnboardingController::class, 'completeStep'])
    ->middleware('auth')
    ->name('dashboard.completeStep');

Route::get('/mijnprofiel/mijnberichten', [PostController::class, 'myPosts'])
    ->middleware(['auth', 'verified', 'role:Organisator,Psycholoog,Leerkracht,Ouder,GebruikerASS,Admin'])
    ->name('dashboard.posts');

Route::get('/mijnprofiel/mijnactiviteiten', [ActivityController::class, 'MyActivities'])
    ->middleware(['auth', 'verified', 'role:Organisator,Admin'])
    ->name('dashboard.activities');

Route::get('/mijnprofiel/rolaanvraag', [RoleRequestController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard.rolerequest');

Route::post('/mijnprofiel/rolerequest', [RoleRequestController::class, 'store'])->middleware(['auth', 'verified'])->name('dashboard.rolerequest.store');

// Organisaties

Route::get('organisatie/aanvragen', [OrganisationController::class, 'create'])->middleware(['auth', 'verified', 'role:Organisator,Admin'])->name('organisatie.aanvragen');
Route::post('dashboard/organisatie/aanvragen', [OrganisationRequestController::class, 'store'])->middleware(['auth', 'verified',])->name('organisatie.aanvragen.store');
Route::get('dashboard/organisatie/{id}', [OrganisationController::class, 'show'])->middleware(['auth', 'verified', 'role:Organisator,Admin'])->name('organisatie.show');
Route::post('/organisations/{organisation}/users/add', [OrganisationController::class, 'addUser'])
    ->middleware('auth', 'owner')->name('organisations.users.add');

Route::delete('/organisations/{organisation}/users/{user}/remove', [OrganisationController::class, 'removeUser'])
    ->middleware('auth', 'owner')->name('organisations.users.remove');

Route::put('/organisations/{organisation}/users/{user}/update', [OrganisationController::class, 'makeOwner'])
    ->middleware('auth', 'owner')->name('organisations.users.update');

// No login required
Route::get('/kennisbank', [PostController::class, 'index'])->name('forum');
Route::get('/activiteiten', [ActivityController::class, 'index'])->name('activities');
Route::get('/over-ons', [AboutController::class, 'index'])->name('about');
Route::get('/activiteiten/activiteit/{id}', [ActivityController::class, 'show'])->name('activities.show');

//mail routes
Route::post('/contact', [AboutController::class, 'send']);

Route::middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/manage', [UserController::class, 'index'])->name('admin.manage');
    Route::put('/admin/manage/{user}/role', [UserController::class, 'updateRole'])->name('admin.manage.role');
    Route::get('/admin/requests', [RoleRequestController::class, 'adminIndex'])->name('admin.rolerequest');
    Route::delete('admin/requests/{id}/deny', [RoleRequestController::class, 'deny'])->name('admin.rolerequest.destroy');
    Route::post('admin/requests/{id}/accept', [RoleRequestController::class, 'accept'])->name('admin.rolerequest.accept');

    Route::get('/admin/organisations', [OrganisationRequestController::class, 'adminIndex'])->name('admin.organisation.requests');
    Route::post('/admin/organisations/{id}/approve', [OrganisationRequestController::class, 'acceptRequest'])->name('admin.organisation.approve');
});

Route::middleware(['auth', 'role:Organisator,Admin'])->group(function () {
    Route::get('/activiteiten/registreren', [ActivityController::class, 'create'])->name('activities.create');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Kennisbank routes
    Route::post('/kennisbank/posts/{post}/upvote', [PostController::class, 'upvote'])->name('posts.upvote');
    Route::post('/kennisbank', [PostController::class, 'store'])->middleware(['auth'])->name('forum.store');
    Route::get('/kennisbank/create', [PostController::class, 'create'])->middleware('auth', 'role:Ouder,Organisator,GebruikerASS,Psycholoog,Leerkracht,Admin')->name('forum.create');
    Route::get('/kennisbank/posts/{post}', [PostController::class, 'show'])->name('posts.show');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    //Activity routes
    Route::post('/activiteiten', [ActivityController::class, 'store'])->name('activities.store');
    Route::delete('/activiteiten/activiteit/{id}', [ActivityController::class, 'destroy'])->name('activities.destroy');
});

require __DIR__.'/auth.php';
