@extends('dashboard.parent')

@section('active_page', 'courses')

@section('style')
<style>
    .course-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding-left: 4px; /* Space for the accent line */
    }

    .card-accent-line {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        z-index: 5;
    }

    .status-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        box-shadow: 0 0 8px currentColor; /* Makes the color glow slightly */
    }

    /* Subtle glow animation for pending tasks */
    .status-indicator {
        position: relative;
    }

    .status-indicator::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: inherit;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(1); opacity: 0.6; }
        70% { transform: scale(2.5); opacity: 0; }
        100% { transform: scale(1); opacity: 0; }
    }
</style>
@endsection
@section('content')
    <header class="dashboard-header">
        <div class="d-flex align-items-center gap-3">
            <button class="btn btn-outline-light d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar">
                <i class="bi bi-list"></i>
            </button>
            <div>
                <h4 class="fw-bold mb-0">Courses</h4>
                <small class="text-secondary">Manage your classes and track progress</small>
            </div>
        </div>
        <div class="d-flex align-items-center gap-3">
            <button class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#addCourseModal">
                <i class="bi bi-plus-lg me-1"></i> Add Course
            </button>
        </div>
    </header>

    <div class="dashboard-content">
        <!-- Stats Section -->
        <div class="row g-3 mb-4">
            <div class="col-6 col-md-3">
                <div class="stat-card">
                    <div class="stat-icon"><i class="bi bi-journal-bookmark"></i></div>
                    <div>
                        <div class="stat-value">{{ $courses->count() }}</div>
                        <div class="stat-label">Active Courses</div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="stat-card cyan">
                    <div class="stat-icon cyan"><i class="bi bi-check-circle"></i></div>
                    <div>
                        <div class="stat-value">{{ $completedTasksCount ?? 0 }}</div>
                        <div class="stat-label">Completed Tasks</div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="stat-card green">
                    <div class="stat-icon green"><i class="bi bi-calendar-check"></i></div>
                    <div>
                        <div class="stat-value">{{ $courses->where('credits', '>', 0)->count() }}</div>
                        <div class="stat-label">Credit Courses</div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="stat-card orange">
                    <div class="stat-icon orange"><i class="bi bi-hourglass-split"></i></div>
                    <div>
                        <div class="stat-value">{{ $totalCredits ?? 0 }}</div>
                        <div class="stat-label">Total Credits</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Course Cards Grid -->
        <div class="row g-4" id="courses-container">
            @forelse($courses as $course)
                @php
                    $pendingCount = $course->tasks_count ?? 0;
                    $indicatorColor = $pendingCount > 0 ? '#FF3B30' : '#4CD964';
                @endphp

                <div class="col-md-6 col-xl-4">
                    <div class="course-card position-relative overflow-hidden">
                        <div class="card-accent-line" style="background: {{ $course->color_code }}"></div>

                        <div class="course-card-header" style="background: {{ $course->color_code }}; opacity: 0.8;"></div>

                        <div class="course-card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="fw-bold mb-0 text-truncate" style="max-width: 70%;">{{ $course->name }}</h5>
                                <span class="badge bg-accent-subtle text-accent">{{ $course->credits ?? 0 }} Credits</span>
                            </div>

                            <p class="text-secondary mb-3 small line-clamp-2">
                                {{ $course->description ?? 'No description provided.' }}
                            </p>
                        </div>

                        <div class="course-card-footer d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-2">
                                <div class="status-indicator" style="background: {{ $indicatorColor }}"></div>
                                <small class="fw-medium {{ $pendingCount > 0 ? 'text-white' : 'text-secondary' }}">
                                    {{ $pendingCount > 0 ? $pendingCount . ' Tasks Pending' : 'All Caught Up' }}
                                </small>
                            </div>
                            <div class="d-flex gap-2">
                                <a href="{{ route('courses.show', $course->id) }}" class="btn btn-sm btn-outline-accent">View</a>
                                <button onclick="confirmDestroy('{{ route('courses.destroy', $course->id) }}', this)"
                                        class="btn btn-sm btn-outline-danger px-3 shadow-sm border-opacity-25">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-12 text-center py-5">
                    <p class="text-secondary">No courses found. Add your first course to begin tracking.</p>
                </div>
            @endforelse
        </div>
    </div>

    <!-- Add Course Modal -->
    <div class="modal fade" id="addCourseModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold">Add New Course</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div id="error_alert" class="alert alert-danger" hidden>
                        <ul id="error_messages_ul" class="mb-0 small"></ul>
                    </div>

                    <form id="create_form">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label">Course Name</label>
                            <input type="text" name="name" class="form-control" placeholder="e.g., Web Development" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea name="description" class="form-control" rows="3" placeholder="Describe the course..."></textarea>
                        </div>

                        <div class="row">
                            <div class="col-6 mb-3">
                                <label class="form-label">Credits</label>
                                <input type="number" name="credits" class="form-control" placeholder="3">
                            </div>
                            <div class="col-6 mb-3">
                                <label class="form-label">Color Theme</label>
                                <input type="color" name="color_code" class="form-control form-control-color w-100" value="#4F46E5">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-accent" onclick="performStore()">Add Course</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
<script>
function performStore() {
    const form = document.getElementById('create_form');
    const formData = new FormData(form);
    const errorAlert = document.getElementById('error_alert');
    const errorList = document.getElementById('error_messages_ul');

    // Reset UI errors
    errorAlert.hidden = true;
    errorList.innerHTML = '';

    // Direct Axios call for total control
    axios.post("{{ route('courses.store') }}", formData)
        .then(response => {
            // Dark Mode Alert
            Swal.fire({
                title: 'Course Created!',
                text: 'Refreshing your dashboard...',
                icon: 'success',
                showConfirmButton: false,
                timer: 1200,
                background: '#1a1a2e',
                color: '#fff'
            });

            // Force reload to update stats and the grid
            setTimeout(() => {
                window.location.reload();
            }, 1300);
        })
        .catch(error => {
            // If Laravel validation fails (422)
            if (error.response && error.response.status === 422) {
                errorAlert.hidden = false;
                const errors = error.response.data.errors;

                Object.keys(errors).forEach(key => {
                    const li = document.createElement('li');
                    li.textContent = errors[key][0];
                    errorList.appendChild(li);
                });
            } else {
                console.error(error);
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong. Check the console.',
                    icon: 'error',
                    background: '#1a1a2e',
                    color: '#fff'
                });
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
        cancelButtonText: 'Cancel', // Forces English
        confirmButtonColor: '#FF3B30',
        background: '#1a1a2e',      // Forces Dark Background
        color: '#fff',              // Forces White Text
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

                // Logic to handle where to go after delete
                if (window.location.pathname.includes('/courses/')) {
                    // If we are on the SHOW page, go back to list
                    window.location.href = "{{ route('courses') }}";
                } else {
                    // If we are on the INDEX page, just reload
                    setTimeout(() => window.location.reload(), 850);
                }
            });
        }
    });
}
</script>
@endsection
