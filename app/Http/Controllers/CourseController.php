<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('user_id', Auth::user()->id)
            ->withCount(['tasks' => function ($query) {
                $query->where('is_done', false);
            }])
            ->orderBy('created_at', 'desc')
            ->get();

        $totalCredits = $courses->sum('credits');

        $completedTasksCount = \App\Models\Task::where('user_id', Auth::user()->id)
            ->where('is_done', true)
            ->count();

        return view('dashboard.courses.index', compact('courses', 'totalCredits', 'completedTasksCount'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'credits'     => 'nullable|integer',
            'color_code'  => 'required|string|max:7',
        ]);

        $validated['user_id'] = Auth::user()->id;
        Course::create($validated);

        return response()->json([
            'icon'  => 'success',
            'title' => 'Course Created',
            'text'  => 'The course was added successfully!'
        ], 201);
    }

    public function show($id)
    {
        $course = Course::where('user_id', Auth::user()->id)
            ->with(['tasks' => function($query) {
                $query->latest();
            }])
            ->findOrFail($id);

        // Calculate statistics
        $tasks = $course->tasks;
        $totalTasksCount = $tasks->count();
        $completedCount = $tasks->where('is_done', true)->count();
        $pendingTasksCount = $totalTasksCount - $completedCount;

        // Tasks due this week
        $thisWeekTasks = $tasks->filter(function($task) {
            return $task->due_at && $task->due_at->isFuture() && $task->due_at->diffInDays(now()) <= 7;
        })->count();

        // Progress percentage
        $progressPercentage = $totalTasksCount > 0
            ? round(($completedCount / $totalTasksCount) * 100)
            : 0;

        // Stats by type
        $statsByType = [
            'assignment' => $tasks->where('type', 'assignment')->count(),
            'review' => $tasks->where('type', 'review')->count(),
            'lecture' => $tasks->where('type', 'lecture')->count(),
        ];

        return view('dashboard.courses.show', compact(
            'course',
            'totalTasksCount',
            'completedCount',
            'pendingTasksCount',
            'thisWeekTasks',
            'progressPercentage',
            'statsByType'
        ));
    }

    public function destroy(Course $course)
    {
        if ($course->user_id !== Auth::user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $course->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Course moved to trash'
        ]);
    }

    public function update(Request $request, Course $course)
    {
        if ($course->user_id !== Auth::user()->id) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'credits'     => 'nullable|numeric|min:0',
            'color_code'  => 'required|string|max:7',
        ]);

        $course->update($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'Course updated successfully'
        ]);
    }

    public function edit(Course $course)
    {
        if ($course->user_id !== Auth::user()->id) {
            abort(403);
        }

        return view('dashboard.courses.edit', compact('course'));
    }
}
