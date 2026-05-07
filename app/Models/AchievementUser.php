<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class AchievementUser extends Pivot
{
    protected $table = 'achievement_user';

    protected $fillable = ['achievement_id', 'user_id', 'earned_at'];

    protected $casts = ['earned_at' => 'datetime'];
}
