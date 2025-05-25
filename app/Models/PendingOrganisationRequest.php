<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PendingOrganisationRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'owner_id',
        'organisation_name',
        'organisation_address',
        'btw_number',
        'description',
        'image',
        'website',
        'email',
        'phone_number',
        'status',
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
