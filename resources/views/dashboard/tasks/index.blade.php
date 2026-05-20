@extends('dashboard.parent')

@section('active_page', 'tasks')

@section('style')
    <link href="{{ asset('css/courses-show.css') }}" rel="stylesheet">
    <style>
        /* Force remove the left border styling inherited from the CSS file */
        .task-row {
            transition: all 0.2s ease;
            border-left: none !important;
        }

        .hover-white:hover {
            color: #fff !important;
        }

        /* Fixed structural widths for metadata alignment */
        .task-meta-type {
            width: 100px;
            text-align: center;
        }
        .task-meta-date {
            width: 80px;
            text-align: right;
        }
        .task-meta-actions {
            width: 30px;
            text-align: right;
        }

        /* Focus timer specific font layout styling */
        .mono-font {
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            letter-spacing: -1px;
        }
    </style>
@endsection

@section('content')
<div class="dashboard-content px-md-4">

    <div class="row g-5 justify-content-start">

        <div class="col-lg-8 col-xl-8">

            <header class="d-flex justify-content-between align-items-center gap-4 mb-5">
                <div>
                    <h1 class="fw-bold h2 mb-1">All Tasks</h1>
                    <p class="text-secondary mb-0 small">Manage your assignments, lectures, and reviews across all courses.</p>
                </div>
                <button class="btn btn-dark btn-sm rounded-3 px-3" data-bs-toggle="modal" data-bs-target="#addTaskModal">
                    <i class="bi bi-plus-lg me-1"></i> New Task
                </button>
            </header>

            <div class="task-container">
                @forelse($tasks as $task)
                    @php
                        $hasCourse = !empty($task->course_id) && $task->course;
                        $accentColor = $hasCourse ? $task->course->color_code : '#6c757d';
                    @endphp

                    <div class="task-row d-flex align-items-center justify-content-between py-3 border-bottom border-secondary-subtle border-opacity-10"
                         style="--task-accent: {{ $accentColor }};"
                         onmouseenter="this.style.background='rgba(255,255,255,0.01)'"
                         onmouseleave="this.style.background='transparent'">

                        <div class="d-flex align-items-center gap-3 text-truncate flex-grow-1 pe-3">
                            <div class="form-check custom-checkbox flex-shrink-0">
                                <input class="form-check-input shadow-none" type="checkbox"
                                    {{ $task->is_done ? 'checked' : '' }}
                                    onchange="toggleTask({{ $task->id }})"
                                    style="width: 1.2rem; height: 1.2rem; cursor: pointer; border-radius: 4px; border-color: rgba(255,255,255,0.2); background-color: transparent;">
                            </div>

                            <div class="d-flex flex-column text-truncate">
                                <span class="fw-medium text-truncate {{ $task->is_done ? 'text-decoration-line-through text-muted' : 'text-white' }}">
                                    {{ $task->title }}
                                </span>

                                <div class="d-flex align-items-center gap-2 mt-1 flex-wrap">
                                    @if($hasCourse)
                                        <a href="{{ route('courses.show', $task->course_id) }}"
                                        class="badge rounded-pill small fw-semibold flex-shrink-0 text-decoration-none task-course-link"
                                        style="background: {{ $accentColor }}15; color: {{ $accentColor }}; font-size: 0.7rem;">
                                            <i class="bi bi-journal-bookmark-fill me-1"></i>{{ $task->course->name }}
                                        </a>
                                    @else
                                        <span class="badge rounded-pill small fw-semibold bg-secondary bg-opacity-10 text-secondary flex-shrink-0" style="font-size: 0.7rem;">
                                            <i class="bi bi-folder-x me-1"></i>Uncategorized
                                        </span>
                                    @endif

                                    @if($task->description)
                                        <small class="text-muted d-none d-sm-inline-block text-truncate">• {{ $task->description }}</small>
                                    @endif
                                </div>

                                @if($task->description)
                                    <small class="text-muted mt-1 d-block d-sm-none text-truncate">{{ $task->description }}</small>
                                @endif
                            </div>
                        </div>

                        <div class="d-flex align-items-center gap-3 flex-shrink-0">

                            <div class="task-meta-type d-none d-sm-block">
                                <span class="badge rounded-pill text-uppercase w-100"
                                    style="font-size: 0.65rem; padding: 0.4em 0.9em; background: rgba(255,255,255,0.03); color: #888; border: 1px solid rgba(255,255,255,0.08);">
                                    {{ $task->type }}
                                </span>
                            </div>

                            <div class="task-meta-date d-none d-md-block">
                                @if($task->due_at)
                                    <small class="text-muted" style="font-size: 0.75rem;">
                                        {{ \Carbon\Carbon::parse($task->due_at)->format('M d') }}
                                    </small>
                                @else
                                    <small style="visibility: hidden;">—</small>
                                @endif
                            </div>

                            <div class="task-meta-actions">
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
                    </div>
                @empty
                    <div class="text-center py-5 text-muted">
                        <p class="mb-0 small">No tasks found. Click "+ New Task" to create one.</p>
                    </div>
                @endforelse
            </div>

        </div>

        <div class="col-lg-4 d-none d-lg-block">

            <div class="card border-0 shadow-sm rounded-4 mb-4 p-4" style="background: #161625; border: 1px solid rgba(255,255,255,0.05) !important;">
                <h6 class="fw-bold mb-3 small text-uppercase text-muted">Global Analytics</h6>
                <div class="h2 fw-bold mb-2 text-white">{{ $tasks->count() }}</div>
                <p class="text-secondary small mb-3">Total active components logged across your workflow tracks.</p>

                <div class="d-flex justify-content-between small border-top border-secondary border-opacity-10 pt-3">
                    <span class="text-success"><i class="bi bi-check-circle me-1"></i> {{ $tasks->where('is_done', 1)->count() }} Done</span>
                    <span class="text-warning"><i class="bi bi-clock me-1"></i> {{ $tasks->where('is_done', 0)->count() }} Pending</span>
                </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 mb-4 p-4" style="background: #161625; border: 1px solid rgba(255,255,255,0.05) !important;">
                <h6 class="fw-bold mb-3 small text-uppercase text-muted">Legend & Types</h6>
                <div class="d-flex flex-column gap-2">
                    <div class="d-flex justify-content-between align-items-center small py-1">
                        <span class="text-secondary"><i class="bi bi-journal-text me-2"></i> Assignments</span>
                        <span class="badge bg-white bg-opacity-5 text-muted">{{ $tasks->where('type', 'assignment')->count() }}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center small py-1">
                        <span class="text-secondary"><i class="bi bi-laptop me-2"></i> Lectures</span>
                        <span class="badge bg-white bg-opacity-5 text-muted">{{ $tasks->where('type', 'lecture')->count() }}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center small py-1">
                        <span class="text-secondary"><i class="bi bi-arrow-repeat me-2"></i> Reviews</span>
                        <span class="badge bg-white bg-opacity-5 text-muted">{{ $tasks->where('type', 'review')->count() }}</span>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden" style="background: #161625; border: 1px solid rgba(255,255,255,0.05) !important;">
                <div class="card-body p-4 text-center">
                    <h6 class="fw-bold mb-4 small text-uppercase text-muted text-start">Global Focus Session</h6>
                    <div class="d-inline-flex align-items-center justify-content-center border border-3 mb-4"
                         style="width: 140px; height: 140px; border-radius: 50%; border-color: rgba(255,255,255,0.1) !important;">
                        <span id="quickTimer" class="h2 fw-bold mb-0 mono-font text-white">25:00</span>
                    </div>
                    <button class="btn btn-light w-100 rounded-3 py-2 fw-bold" id="startQuickTimer">
                        <i class="bi bi-play-fill"></i> Start Focus Zone
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
// Configure Axios CSRF defaults cleanly upfront
const tokenMeta = document.querySelector('meta[name="csrf-token"]');
if (tokenMeta) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = tokenMeta.getAttribute('content');
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
        color: '#fff',
        customClass: {
            popup: 'rounded-4 border border-white border-opacity-10'
        }
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
                            text: 'Could not delete the task.',
                            icon: 'error',
                            background: '#1a1a2e',
                            color: '#fff'
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
    let currentTimerId = null; // Caches the active database reference key
    const sessionDurationMinutes = 25;

    const alarm = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");

    if(timerBtn) {
        timerBtn.addEventListener('click', function () {
            if (isRunning) {
                // --- RESET/STOP RECOVERY WORKFLOW ---
                clearInterval(countdown);
                alarm.pause();
                alarm.currentTime = 0;

                // Sync stop data mid-session if record is active
                if (currentTimerId) {
                    axios.patch(`/dashboard/timers/${currentTimerId}/stop`)
                        .then(res => console.log('Global session stopped early. Saved to database.', res.data))
                        .catch(err => console.error('Error closing global session:', err));
                }

                timerDisplay.textContent = "25:00";
                timerBtn.innerHTML = '<i class="bi bi-play-fill"></i> Start Focus Zone';
                timerBtn.className = "btn btn-light w-100 rounded-3 py-2 fw-bold";
                isRunning = false;
                currentTimerId = null;
            } else {
                // --- START LIFE-CYCLE WORKFLOW ---
                isRunning = true;
                timerBtn.innerHTML = '<i class="bi bi-stop-fill"></i> Reset Session';
                timerBtn.className = "btn btn-outline-danger w-100 rounded-3 py-2 fw-bold";

                // Explicitly post a NULL course_id for global tracking context
                axios.post("{{ route('timers.start') }}", {
                    course_id: null
                })
                .then(response => {
                    currentTimerId = response.data.timer_id;
                    console.log(`Global session & study logs generated. ID: ${currentTimerId}`);
                })
                .catch(error => {
                    console.error("Failed to initialize tracking row context:", error.response?.data);
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
                        // --- COMPLETION RESOLUTION ---
                        clearInterval(countdown);
                        isRunning = false;

                        alarm.loop = true;
                        alarm.play().catch(e => console.log("Audio target blocked:", e));

                        if (currentTimerId) {
                            axios.patch(`/dashboard/timers/${currentTimerId}/stop`)
                            .then(response => {
                                Swal.fire({
                                    title: 'Session Done! 🏆',
                                    text: 'Take a short break. Workflow metrics synchronized.',
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
                                console.error("Error updates on global resolution countdown:", error);
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
