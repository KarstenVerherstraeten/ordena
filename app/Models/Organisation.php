<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
{
    protected $fillable = [
        'user_id',
        "owner_id",
        'organisation_name',
        'organisation_address',
        'description',
        'btw_number',
        'image',
        'website',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'organisation_user');

    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
