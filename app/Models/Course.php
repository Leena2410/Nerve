<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['user_id', 'name', 'description', 'credits', 'color_code'];

    public function user() { return $this->belongsTo(User::class); }
    public function exams() { return $this->hasMany(Exam::class); }
    public function tasks() { return $this->hasMany(Task::class); }
    public function studySessions() { return $this->hasMany(StudySession::class); }
}
