<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timer extends Model
{
    protected $fillable = ['user_id', 'type', 'started_at', 'stopped_at', 'duration_minutes'];

    protected $casts = ['started_at' => 'datetime', 'stopped_at' => 'datetime'];

    public function user() { return $this->belongsTo(User::class); }
    public function studySession() { return $this->hasOne(StudySession::class); }
}
