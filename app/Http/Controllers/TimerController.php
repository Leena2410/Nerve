<?php

namespace App\Http\Controllers;

use App\Models\StudySession;
use App\Models\Timer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TimerController extends Controller
{
    public function start(Request $request)
    {
        $request->validate([
            'course_id' => 'nullable|integer|exists:courses,id',
        ]);

        // Direct raw input extraction (keeps course_id null on the global task page)
        $courseId = $request->input('course_id');

        // Use a transaction to ensure both writes succeed together smoothly
        $result = DB::transaction(function () use ($courseId) {

            // 1. Create the base timer row
            $timer = Timer::create([
                'user_id'          => Auth::user()->id,
                'course_id'        => $courseId,
                'type'             => 'pomodoro',
                'started_at'       => now(),
                'stopped_at'       => null,
                'duration_minutes' => 0,
            ]);

            // 2. Automatically link and create your study session reference row
            StudySession::create([
                'user_id'   => Auth::user()->id,
                'timer_id'  => $timer->id,
                'course_id' => $courseId, // Stores numerical index or null automatically
                'group_id'  => null,      // Left null for now as requested
                'notes'     => null       // Left blank for now
            ]);

            return $timer;
        });

        return response()->json([
            'status'   => 'started',
            'timer_id' => $result->id
        ]);
    }

    // 2. Update the session when they hit "Reset" or when it finishes naturally
    public function stop(Request $request, Timer $timer)
    {
        // Safety check to ensure users can only modify their own timers
        if ($timer->user_id !== Auth::user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $stoppedAt = Carbon::now();
        $startedAt = Carbon::parse($timer->started_at);

        // Calculate the actual elapsed minutes spent focusing
        $durationMinutes = round($startedAt->diffInMinutes($stoppedAt));

        $timer->update([
            'stopped_at' => $stoppedAt,
            'duration_minutes' => $durationMinutes > 0 ? $durationMinutes : 1, // default minimum 1 min if tested fast
        ]);

        return response()->json([
            'status' => 'updated',
            'duration' => $timer->duration_minutes
        ]);
    }
}
