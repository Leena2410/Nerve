<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['name', 'email', 'password'];
    protected $hidden = ['password', 'remember_token'];

    // Relationships
    public function courses() { return $this->hasMany(Course::class); }
    public function tasks() { return $this->hasMany(Task::class); }
    public function streak() { return $this->hasOne(Streak::class); }
    public function timers() { return $this->hasMany(Timer::class); }
    public function groups() { return $this->belongsToMany(Group::class)->withPivot('role'); }
    public function notifications() { return $this->belongsToMany(Notification::class)->withPivot('is_read'); }
    public function achievements() { return $this->belongsToMany(Achievement::class)->withPivot('earned_at'); }
}
