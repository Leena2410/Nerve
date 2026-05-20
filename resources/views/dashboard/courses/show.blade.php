@extends('dashboard.parent')

@section('active_page', 'courses')

@section('style')
    <link href="{{ asset('css/courses-show.css') }}" rel="stylesheet">
    <style>
        :root { --course-accent: {{ $course->color_code }}; }
        .accent-soft { background: var(--course-accent)10; color: var(--course-accent); }
        .border-accent { border-color: var(--course-accent)30 !important; }
        .task-item { transition: all 0.2s ease; border-left: 3px solid transparent; }
        .task-item:hover { border-left-color: var(--course-accent); background: #f8f9fa; }
        .completed { opacity: 0.6; }
        .completed .task-title { text-decoration: line-through; }

        /* Focus timer specific font layout styling */
        .mono-font {
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            letter-spacing: -1px;
        }
    </style>
@endsection

@section('content')
<div class="dashboard-content px-md-4">
    <nav class="mb-4">
        <a href="{{ route('courses') }}" class="text-decoration-none text-secondary small fw-medium">
            <i class="bi bi-chevron-left me-1"></i> Courses
        </a>
    </nav>

    <header class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4 mb-5">
        <div class="d-flex align-items-center gap-4">
            <div class="course-icon shadow-sm d-flex align-items-center justify-content-center"
                 style="width: 64px; height: 64px; border-radius: 16px; background: var(--course-accent)15; color: var(--course-accent)">
                <i class="bi bi-journal-bookmark-fill fs-3"></i>
            </div>
            <div>
                <h1 class="fw-bold h2 mb-1">{{ $course->name }}</h1>
                <p class="text-secondary mb-0 max-w-600">{{ $course->description ?? 'No description provided.' }}</p>

                <div class="d-flex gap-3 mt-3">
                    <span class="badge accent-soft rounded-pill px-3">{{ $course->credits ?? 0 }} Credits</span>
                    <span class="text-muted small d-flex align-items-center">
                        <i class="bi bi-calendar3 me-2"></i> {{ $course->created_at->diffForHumans() }}
                    </span>
                </div>
            </div>
        </div>

        <div class="d-flex gap-2">
            <a href="{{ route('courses.edit', $course->id) }}" class="btn btn-sm btn-outline-secondary px-3 shadow-sm border-opacity-25 hover-bg-white-10">
                <i class="bi bi-pencil me-1"></i> Edit
            </a>

            <button onclick="confirmDestroy('{{ route('courses.destroy', $course->id) }}', this)"
                    class="btn btn-sm btn-outline-danger px-3 shadow-sm border-opacity-25">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    </header>

    <div class="row g-5">
        <div class="col-lg-8">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="h5 fw-bold mb-0">Tasks</h3>
                <button class="btn btn-dark btn-sm rounded-3 px-3" data-bs-toggle="modal" data-bs-target="#addTaskModal">
                    <i class="bi bi-plus-lg me-1"></i> New Task
                </button>
            </div>

            <div class="task-container">
                @forelse($course->tasks as $task)
                    <div class="task-row d-flex align-items-center justify-content-between py-3 border-bottom border-secondary-subtle border-opacity-10">
                        <div class="d-flex align-items-center gap-3">
                            <div class="form-check custom-checkbox">
                                <input class="form-check-input shadow-none" type="checkbox"
                                    {{ $task->is_done ? 'checked' : '' }}
                                    onchange="toggleTask({{ $task->id }})"
                                    style="width: 1.2rem; height: 1.2rem; cursor: pointer; border-radius: 4px; border-color: rgba(255,255,255,0.2); background-color: transparent;">
                            </div>

                            <div class="d-flex flex-column">
                                <span class="fw-medium {{ $task->is_done ? 'text-decoration-line-through text-muted' : 'text-white' }}">
                                    {{ $task->title }}
                                </span>
                                @if($task->description)
                                    <small class="text-muted mt-1">{{ $task->description }}</small>
                                @endif
                            </div>
                        </div>

                        <div class="d-flex align-items-center gap-4">
                            <span class="badge rounded-pill text-uppercase d-none d-sm-inline-block"
                                style="font-size: 0.65rem; padding: 0.4em 0.9em; background: rgba(255,255,255,0.03); color: #888; border: 1px solid rgba(255,255,255,0.08);">
                                {{ $task->type }}
                            </span>

                            @if($task->due_at)
                                <small class="text-muted d-none d-md-block" style="font-size: 0.75rem; min-width: 80px; text-align: right;">
                                    {{ $task->due_at->format('M d') }}
                                </small>
                            @endif

                            <div class="dropdown">
                                <button class="btn btn-link p-0 text-muted hover-white" data-bs-toggle="dropdown">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end border-secondary border-opacity-25 shadow-lg" style="border-radius: 10px; background: #161625;">
                                    <li>
                                        <a class="dropdown-item small py-2" href="{{ route('tasks.edit', $task->id) }}">
                                            <i class="bi bi-pencil me-2"></i> Edit Task
                                        </a>
                                    </li>
                                    <li><hr class="dropdown-divider opacity-10"></li>
                                    <li>
                                        <button class="dropdown-item small py-2 text-danger"
                                                onclick="confirmTaskDestroy('{{ route('tasks.destroy', $task->id) }}')">
                                            <i class="bi bi-trash3 me-2"></i> Delete Task
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="text-center py-5 text-muted">
                        <p class="mb-0 small">No tasks yet. Click "+ New Task" to get started.</p>
                    </div>
                @endforelse
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card border-0 shadow-sm rounded-4 mb-4 p-4" style="background: #161625; border: 1px solid rgba(255,255,255,0.05) !important;">
                <h6 class="fw-bold mb-3 small text-uppercase text-muted">Course Completion</h6>
                <div class="h2 fw-bold mb-2 text-white">{{ $progressPercentage }}%</div>
                <div class="progress mb-3" style="height: 6px; border-radius: 3px; background: rgba(255,255,255,0.05);">
                    <div class="progress-bar" style="width: {{ $progressPercentage }}%; background: var(--course-accent)"></div>
                </div>
                <div class="d-flex justify-content-between small text-secondary">
                    <span>{{ $completedCount }} Finished</span>
                    <span>{{ $pendingTasksCount }} To-do</span>
                </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden" style="background: #161625; border: 1px solid rgba(255,255,255,0.05) !important;">
                <div class="card-body p-4 text-center">
                    <h6 class="fw-bold mb-4 small text-uppercase text-muted text-start">Focus Mode</h6>
                    <div class="d-inline-flex align-items-center justify-content-center border border-3 border-accent mb-4"
                         style="width: 140px; height: 140px; border-radius: 50%;">
                        <span id="quickTimer" class="h2 fw-bold mb-0 mono-font text-white">25:00</span>
                    </div>
                    <button class="btn btn-light w-100 rounded-3 py-2 fw-bold" id="startQuickTimer">
                        <i class="bi bi-play-fill"></i> Start Session
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

@include('dashboard.modals.task-add')
@endsection


@section('script')
<script>
function performTaskStore() {
    const form = document.getElementById('createTaskForm');
    const formData = new FormData(form);
    const errorAlert = document.getElementById('task_error_alert');
    const errorList = document.getElementById('task_error_messages_ul');

    errorAlert.style.display = 'none';
    errorList.innerHTML = '';

    axios.post("{{ route('tasks.store') }}", formData)
        .then(response => {
            Swal.fire({
                title: 'Success!',
                text: 'Task added to your list.',
                icon: 'success',
                timer: 1200,
                showConfirmButton: false,
                background: '#1a1a2e',
                color: '#fff'
            });

            setTimeout(() => {
                window.location.reload();
            }, 1300);
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
                errorAlert.style.display = 'block';
                const errors = error.response.data.errors;
                for (let key in errors) {
                    const li = document.createElement('li');
                    li.textContent = errors[key][0];
                    errorList.appendChild(li);
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong. Check your console.',
                    icon: 'error'
                });
                console.error(error);
            }
        });
}

function confirmDestroy(url, button) {
    Swal.fire({
        title: 'Are you sure?',
        text: "This will move the course to trash.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#FF3B30',
        background: '#1a1a2e',
        color: '#fff',
        customClass: {
            popup: 'rounded-4 border border-white border-opacity-10'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(url).then(response => {
                Swal.fire({
                    title: 'Deleted!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 800,
                    background: '#1a1a2e',
                    color: '#fff'
                });

                if (window.location.pathname.includes('/courses/')) {
                    window.location.href = "{{ route('courses') }}";
                } else {
                    setTimeout(() => window.location.reload(), 850);
                }
            });
        }
    });
}

function toggleTask(taskId) {
    const url = `/dashboard/tasks/${taskId}/toggle`;

    axios.patch(url)
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            console.error("Error details:", error.response);
            Swal.fire({
                title: 'Error',
                text: 'Could not update task status.',
                icon: 'error',
                background: '#1a1a2e',
                color: '#fff'
            });
        });
}

function confirmTaskDestroy(url) {
    Swal.fire({
        title: 'Delete Task?',
        text: "This will move the task to trash.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#FF3B30',
        background: '#1a1a2e',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.showLoading();

            axios.delete(url)
                .then(response => {
                    window.location.reload(true);
                })
                .catch(error => {
                    console.error("Delete Error:", error.response);
                    if (error.response && error.response.status === 404) {
                        window.location.reload();
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Could not delete the task. Check console.',
                            icon: 'error'
                        });
                    }
                });
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const timerBtn = document.getElementById('startQuickTimer');
    const timerDisplay = document.getElementById('quickTimer');
    let countdown = null;
    let isRunning = false;
    let currentTimerId = null; // Stores the database row reference primary key
    const sessionDurationMinutes = 25;

    const alarm = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");

    // Ensure Axios passes CSRF tokens appropriately
    const tokenMeta = document.querySelector('meta[name="csrf-token"]');
    if (tokenMeta) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = tokenMeta.getAttribute('content');
    }

    if (timerBtn) {
        timerBtn.addEventListener('click', function () {
            if (isRunning) {
                // --- STOP / RESET ACTION ---
                clearInterval(countdown);
                alarm.pause();
                alarm.currentTime = 0;

                // If a database entry exists, update it instantly when they click reset mid-way
                if (currentTimerId) {
                    axios.patch(`/dashboard/timers/${currentTimerId}/stop`)
                        .then(res => console.log('Session stopped early. Saved to DB.', res.data))
                        .catch(err => console.error('Error closing session record:', err));
                }

                // Reset standard UI values
                timerDisplay.textContent = "25:00";
                timerBtn.innerHTML = '<i class="bi bi-play-fill"></i> Start Focus Zone';
                timerBtn.className = "btn btn-light w-100 rounded-3 py-2 fw-bold";
                isRunning = false;
                currentTimerId = null;
            } else {
                // --- START ACTION ---
                isRunning = true;
                timerBtn.innerHTML = '<i class="bi bi-stop-fill"></i> Reset Session';
                timerBtn.className = "btn btn-outline-danger w-100 rounded-3 py-2 fw-bold";

                // Hit database immediately when the timer starts counting down
                axios.post("{{ route('timers.start') }}", {
                    course_id: {{ $course->id }}
                })
                .then(response => {
                    // Cache the returned row identity ID from the DB
                    currentTimerId = response.data.timer_id;
                    console.log(`Database row initiated successfully. ID assigned: ${currentTimerId}`);
                })
                .catch(error => {
                    console.error("Failed to initialize database timer instance:", error);
                });

                let timeLeft = sessionDurationMinutes * 60;
                countdown = setInterval(() => {
                    timeLeft--;
                    let minutes = Math.floor(timeLeft / 60);
                    let seconds = timeLeft % 60;

                    timerDisplay.textContent =
                        (minutes < 10 ? "0" : "") + minutes + ":" +
                        (seconds < 10 ? "0" : "") + seconds;

                    if (timeLeft <= 0) {
                        // --- TIMER COMPLETED ACTUALLY ---
                        clearInterval(countdown);
                        isRunning = false;

                        alarm.loop = true;
                        alarm.play().catch(e => console.log("Audio blocked:", e));

                        // If it finishes smoothly, patch the exact same row index record
                        if (currentTimerId) {
                            axios.patch(`/dashboard/timers/${currentTimerId}/stop`)
                            .then(response => {
                                Swal.fire({
                                    title: 'Session Finished! 🏆',
                                    text: 'Great job! Focus session synced to log entries.',
                                    icon: 'success',
                                    background: '#1a1a2e',
                                    color: '#fff',
                                    confirmButtonText: 'Stop Alarm'
                                }).then(() => {
                                    alarm.pause();
                                    alarm.currentTime = 0;
                                    window.location.reload();
                                });
                            })
                            .catch(error => {
                                console.error("Error updates on countdown resolution:", error);
                                alarm.pause();
                            });
                        }

                        timerDisplay.textContent = "25:00";
                        timerBtn.innerHTML = '<i class="bi bi-play-fill"></i> Start Focus Zone';
                        timerBtn.className = "btn btn-light w-100 rounded-3 py-2 fw-bold";
                        currentTimerId = null;
                    }
                }, 1000);
            }
        });
    }
});
</script>
@endsection
