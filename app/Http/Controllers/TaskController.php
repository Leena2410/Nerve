<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'           => 'required|string|max:255',
            'description'     => 'nullable|string',
            'type'            => 'required|in:assignment,review,lecture',
            'repeat_interval' => 'required|in:none,daily,weekly,monthly',
            'due_at'          => 'nullable|date',
            'course_id'       => 'required|exists:courses,id',
        ]);

        $validated['user_id'] = Auth::user()->id;
        $validated['is_done'] = false;

        $task = Task::create($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'Task created successfully',
            'task'    => $task
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task) {
        return view('dashboard.tasks.edit', compact('task'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'type'        => 'required|in:review,assignment,lecture',
            'due_at'      => 'nullable|date',
        ]);

        $validated['is_done'] = $request->has('is_done');

        $task->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'success' => true,
            'message' => 'Task moved to trash'
        ]);
    }

    public function toggle(Task $task)
    {
        $task->is_done = !$task->is_done;
        $task->save();

        return response()->json([
            'success' => true,
            'is_done' => $task->is_done
        ]);
    }
}
