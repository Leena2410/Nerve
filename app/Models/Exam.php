<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = ['course_id', 'title', 'type', 'scheduled_at'];

    protected $casts = ['scheduled_at' => 'datetime'];

    public function course() { return $this->belongsTo(Course::class); }
}
