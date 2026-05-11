@extends('dashboard.parent')

@section('active_page', 'courses')

@section('style')
<style>
    .edit-container {
        max-width: 700px;
        margin: 0 auto;
    }

    .task-settings-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 2rem;
    }

    .form-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #666;
        font-weight: 800;
        margin-bottom: 0.5rem;
    }

    .form-control, .form-select {
        background: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 10px;
        color: #fff !important;
        padding: 0.75rem 1rem;
    }

    .form-control:focus {
        border-color: #4F46E5 !important; /* Standard accent */
        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
    }

    .course-context {
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.05);
    }
</style>
@endsection

@section('content')
<div class="edit-container py-4">
    <nav class="mb-4">
        <a href="{{ route('courses.show', $task->course_id) }}" class="text-decoration-none text-secondary small fw-medium">
            <i class="bi bi-chevron-left me-1"></i> Back to {{ $task->course->name }}
        </a>
    </nav>

    <header class="mb-4">
        <h4 class="fw-bold mb-1">Edit Task</h4>
        <p class="text-secondary small">Modify assignment details and deadlines.</p>
    </header>

    <div class="task-settings-card shadow-sm">
        <form id="updateTaskForm">
            @csrf
            @method('PUT')

            <div class="mb-4">
                <label class="form-label">Task Title</label>
                <input type="text" name="title" class="form-control form-control-lg" value="{{ $task->title }}" required>
            </div>

            <div class="mb-4">
                <label class="form-label">Notes / Description</label>
                <textarea name="description" class="form-control" rows="3" placeholder="Add some details...">{{ $task->description }}</textarea>
            </div>

            <div class="row g-4">
                <div class="col-md-6 mb-4">
                    <label class="form-label">Assignment Type</label>
                    <select name="type" class="form-select">
                        <option value="assignment" {{ $task->type == 'assignment' ? 'selected' : '' }}>Assignment</option>
                        <option value="review" {{ $task->type == 'review' ? 'selected' : '' }}>Review</option>
                        <option value="lecture" {{ $task->type == 'lecture' ? 'selected' : '' }}>Lecture</option>
                    </select>
                </div>

                <div class="col-md-6 mb-4">
                    <label class="form-label">Due Date</label>
                    <input type="date" name="due_at" class="form-control"
                           value="{{ $task->due_at ? $task->due_at->format('Y-m-d') : '' }}">
                </div>
            </div>

            <div class="mb-4 p-3 course-context d-flex align-items-center justify-content-between">
                <div>
                    <h6 class="mb-0 small fw-bold">Completion Status</h6>
                    <small class="text-secondary">Mark this task as finished</small>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" name="is_done" style="width: 2.5em; height: 1.25em; cursor: pointer;"
                           {{ $task->is_done ? 'checked' : '' }}>
                </div>
            </div>

            <hr class="opacity-10 my-4">

            <div class="d-flex justify-content-between align-items-center">
                <button type="button" class="btn btn-link text-danger text-decoration-none small"
                        onclick="confirmTaskDelete('{{ route('tasks.destroy', $task->id) }}')">
                    <i class="bi bi-trash3 me-1"></i> Delete Task
                </button>

                <div class="d-flex gap-2">
                    <button type="button" class="btn btn-link text-secondary text-decoration-none" onclick="history.back()">Cancel</button>
                    <button type="submit" class="btn btn-accent px-4 fw-bold">Save Changes</button>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection

@section('script')
<script>
    // Update Task Submission
document.getElementById('updateTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    formData.append('_method', 'PUT');

    axios.post("{{ route('tasks.update', $task->id) }}", formData)
        .then(response => {
            Swal.fire({
                title: 'Updated!',
                text: 'Task changes saved successfully.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
                background: '#1a1a2e',
                color: '#fff'
            });

            setTimeout(() => {
                window.location.href = "{{ route('courses.show', $task->course_id) }}";
            }, 1100);
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Could not update task.',
                icon: 'error',
                background: '#1a1a2e',
                color: '#fff'
            });
        });
});

function confirmTaskDelete(url) {
    Swal.fire({
        title: 'Move to Trash?',
        text: "You can restore this task later if needed.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF3B30',
        confirmButtonText: 'Yes, delete',
        background: '#1a1a2e',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            // Axios will send a DELETE request to /dashboard/tasks/{id}
            axios.delete(url)
                .then(response => {
                    Swal.fire({
                        title: 'Deleted!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 800,
                        background: '#1a1a2e',
                        color: '#fff'
                    });

                    setTimeout(() => {
                        window.location.href = "{{ route('courses.show', $task->course_id) }}";
                    }, 850);
                })
                .catch(error => {
                    console.error("Delete Error:", error.response);
                    Swal.fire({
                        title: 'Error',
                        text: 'Could not delete task.',
                        icon: 'error'
                    });
                });
        }
    });
}
</script>
@endsection
