@extends('dashboard.parent')

@section('active_page', 'home')

@section('content')
    <!-- Top Header -->
    @include('components.header')

    <!-- Dashboard Content -->
    {{--
    <div class="dashboard-content">
        <!-- Stats Row -->
        <div class="row g-4 mb-4">
            <div class="col-6 col-lg-3">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="bi bi-check2-circle"></i>
                    </div>
                    <div>
                        <div class="stat-value">12</div>
                        <div class="stat-label">Tasks Done</div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-3">
                <div class="stat-card cyan">
                    <div class="stat-icon cyan">
                        <i class="bi bi-clock"></i>
                    </div>
                    <div>
                        <div class="stat-value">4.5h</div>
                        <div class="stat-label">Study Time</div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-3">
                <div class="stat-card orange">
                    <div class="stat-icon orange">
                        <i class="bi bi-fire"></i>
                    </div>
                    <div>
                        <div class="stat-value">7</div>
                        <div class="stat-label">Day Streak</div>
                    </div>
                </div>
            </div>
            <div class="col-6 col-lg-3">
                <div class="stat-card green">
                    <div class="stat-icon green">
                        <i class="bi bi-graph-up"></i>
                    </div>
                    <div>
                        <div class="stat-value">89%</div>
                        <div class="stat-label">Completion</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <!-- Upcoming Tasks -->
            <div class="col-lg-8">
                <div class="card h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="fw-bold mb-0">Upcoming Tasks</h6>
                        <a href="tasks.html" class="btn btn-sm btn-outline-accent">View All</a>
                    </div>
                    <div class="card-body p-0">
                        <div class="task-list">
                            <div class="task-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="task1">
                                </div>
                                <div class="task-info">
                                    <div class="task-title">Complete Calculus Assignment</div>
                                    <div class="task-meta">
                                        <span class="badge bg-accent-subtle text-accent">Math 201</span>
                                        <span class="text-secondary"><i class="bi bi-clock me-1"></i>Due Tomorrow</span>
                                    </div>
                                </div>
                                <span class="priority-badge high">High</span>
                            </div>
                            <div class="task-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="task2">
                                </div>
                                <div class="task-info">
                                    <div class="task-title">Read Chapter 5 - Biology</div>
                                    <div class="task-meta">
                                        <span class="badge bg-green-subtle text-green">Bio 101</span>
                                        <span class="text-secondary"><i class="bi bi-clock me-1"></i>Due in 2 days</span>
                                    </div>
                                </div>
                                <span class="priority-badge medium">Medium</span>
                            </div>
                            <div class="task-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="task3">
                                </div>
                                <div class="task-info">
                                    <div class="task-title">Physics Lab Report</div>
                                    <div class="task-meta">
                                        <span class="badge bg-purple-subtle text-purple">Physics 101</span>
                                        <span class="text-secondary"><i class="bi bi-clock me-1"></i>Due in 3 days</span>
                                    </div>
                                </div>
                                <span class="priority-badge medium">Medium</span>
                            </div>
                            <div class="task-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="task4">
                                </div>
                                <div class="task-info">
                                    <div class="task-title">Review Lecture Notes</div>
                                    <div class="task-meta">
                                        <span class="badge bg-cyan-subtle text-cyan">CS 301</span>
                                        <span class="text-secondary"><i class="bi bi-clock me-1"></i>Due in 5 days</span>
                                    </div>
                                </div>
                                <span class="priority-badge low">Low</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Timer -->
            <div class="col-lg-4">
                <div class="card h-100">
                    <div class="card-header">
                        <h6 class="fw-bold mb-0">Quick Focus</h6>
                    </div>
                    <div class="card-body text-center">
                        <div class="timer-display mb-3">
                            <div class="timer-circle-large">
                                <span id="quickTimer">25:00</span>
                            </div>
                        </div>
                        <p class="text-secondary mb-3">Focus Session</p>
                        <div class="d-flex gap-2 justify-content-center">
                            <button class="btn btn-accent" id="startQuickTimer">
                                <i class="bi bi-play-fill"></i> Start
                            </button>
                            <a href="timer.html" class="btn btn-outline-light">
                                Full Timer
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4 mt-0">
            <!-- Course Progress -->
            <div class="col-lg-6">
                <div class="card h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="fw-bold mb-0">Course Progress</h6>
                        <a href="courses.html" class="btn btn-sm btn-outline-accent">View All</a>
                    </div>
                    <div class="card-body">
                        <div class="course-progress-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="fw-semibold">Math 201 - Calculus II</span>
                                <span class="text-accent">75%</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-accent" style="width: 75%"></div>
                            </div>
                        </div>
                        <div class="course-progress-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="fw-semibold">CS 301 - Data Structures</span>
                                <span class="text-cyan">60%</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar" style="width: 60%; background: var(--nerve-cyan)"></div>
                            </div>
                        </div>
                        <div class="course-progress-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="fw-semibold">Bio 101 - Introduction to Biology</span>
                                <span class="text-green">90%</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar" style="width: 90%; background: var(--nerve-green)"></div>
                            </div>
                        </div>
                        <div class="course-progress-item">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="fw-semibold">Physics 101 - Mechanics</span>
                                <span class="text-purple">45%</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar" style="width: 45%; background: var(--nerve-purple)"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="col-lg-6">
                <div class="card h-100">
                    <div class="card-header">
                        <h6 class="fw-bold mb-0">Recent Activity</h6>
                    </div>
                    <div class="card-body p-0">
                        <div class="activity-list">
                            <div class="activity-item">
                                <div class="activity-icon green">
                                    <i class="bi bi-check"></i>
                                </div>
                                <div class="activity-info">
                                    <div class="activity-text">Completed "Linear Algebra Quiz"</div>
                                    <small class="text-secondary">2 hours ago</small>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon cyan">
                                    <i class="bi bi-stopwatch"></i>
                                </div>
                                <div class="activity-info">
                                    <div class="activity-text">Focus session - 45 minutes</div>
                                    <small class="text-secondary">4 hours ago</small>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon accent">
                                    <i class="bi bi-plus"></i>
                                </div>
                                <div class="activity-info">
                                    <div class="activity-text">Added new task "Physics Lab Report"</div>
                                    <small class="text-secondary">Yesterday</small>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon orange">
                                    <i class="bi bi-fire"></i>
                                </div>
                                <div class="activity-info">
                                    <div class="activity-text">7 day streak achieved!</div>
                                    <small class="text-secondary">Yesterday</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     --}}
@endsection
