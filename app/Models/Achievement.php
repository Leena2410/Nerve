<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $fillable = ['name', 'description', 'badge_path', 'type'];

    public function users() { return $this->belongsToMany(User::class)->withPivot('earned_at'); }
}
