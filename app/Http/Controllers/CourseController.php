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

        return view('dashboard.courses', compact('courses', 'totalCredits', 'completedTasksCount'));
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
}
