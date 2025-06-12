<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class RoleRequest extends Model
{
    protected $table = 'pending_requests'; // <- Explicitly define it

    protected $fillable = [
        'user_id',
        'role',
        'image',
    ];

    public static function findOrFail($id)
    {
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
