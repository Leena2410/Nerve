<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use SoftDeletes;

    protected $fillable = ['user_id', 'name', 'description', 'credits', 'color_code'];

    public function user() { return $this->belongsTo(User::class); }
    public function exams() { return $this->hasMany(Exam::class); }
    public function tasks() { return $this->hasMany(Task::class); }
    public function studySessions() { return $this->hasMany(StudySession::class); }
}
