<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\UserDetails;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function detail()
    {
        return $this->hasOne(UserDetails::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function organisations()
    {
        return $this->belongsToMany(Organisation::class);
    }

    public function onboardingProgress()
    {
        return $this->hasMany(UserOnboardingProgress::class);
    }

    protected $appends = ['role', 'badge_icon'];

    public function getRoleAttribute()
    {
        return $this->detail?->role;
    }

    public function getBadgeIconAttribute()
    {
        return $this->detail?->badge_icon;
    }

    protected static function booted()
    {
        static::created(function ($user) {
            $user->detail()->create([
                'role' => 'Gebruiker',
                'badge_icon' => '/badges/Icon-Gebruiker.png',
            ]);
        });
    }
    public function upvotedPosts()
    {
        return $this->belongsToMany(Post::class, 'post_user_upvotes')->withTimestamps();
    }


}
