<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{

    use SoftDeletes;

    protected $fillable = ['user_id', 'course_id', 'title', 'description', 'type', 'repeat_interval', 'is_done', 'due_at'];

    protected $casts = ['due_at' => 'datetime', 'is_done' => 'boolean'];

    public function user() { return $this->belongsTo(User::class); }
    public function course() { return $this->belongsTo(Course::class); }
}
