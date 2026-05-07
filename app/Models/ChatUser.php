<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ChatUser extends Pivot
{
    protected $table = 'chat_user';

    protected $fillable = ['chat_id', 'user_id', 'last_read_at'];

    protected $casts = ['last_read_at' => 'datetime'];
}
