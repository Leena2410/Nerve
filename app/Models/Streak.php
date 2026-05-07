<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Streak extends Model
{
    protected $fillable = ['user_id', 'current_count', 'longest_count', 'last_active_date'];

    protected $casts = ['last_active_date' => 'date'];

    public function user() { return $this->belongsTo(User::class); }
}
