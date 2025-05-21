<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'start',
        'end',
        'price',
        'location',
        'featured_image',
        'activity_images',


    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(ActivityImage::class);
    }
}
