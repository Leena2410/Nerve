<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = ['title', 'content', 'link', 'type', 'sent_at'];

    protected $casts = ['sent_at' => 'datetime'];

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('is_read', 'read_at');
    }
}
