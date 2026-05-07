<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudySession extends Model
{
    protected $fillable = ['user_id', 'timer_id', 'course_id', 'group_id', 'notes'];

    public function user() { return $this->belongsTo(User::class); }
    public function timer() { return $this->belongsTo(Timer::class); }
    public function course() { return $this->belongsTo(Course::class); }
}
