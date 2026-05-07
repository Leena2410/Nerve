@extends('dashboard.parent')

@section('active_page', 'courses')
{{--
    home
    courses
    tasks
    calender
    focus
    friends
    notifications
    profile
--}}

@section('style')
<style>

</style>
@endsection


@section('content')
        <!-- Main Content -->
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
                <!-- Course Stats -->
                <div class="row g-3 mb-4">
                    <div class="col-6 col-md-3">
                        <div class="stat-card">
                            <div class="stat-icon"><i class="bi bi-journal-bookmark"></i></div>
                            <div>
                                <div class="stat-value">4</div>
                                <div class="stat-label">Active Courses</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-card cyan">
                            <div class="stat-icon cyan"><i class="bi bi-check-circle"></i></div>
                            <div>
                                <div class="stat-value">24</div>
                                <div class="stat-label">Completed Tasks</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-card green">
                            <div class="stat-icon green"><i class="bi bi-graph-up"></i></div>
                            <div>
                                <div class="stat-value">3.7</div>
                                <div class="stat-label">GPA</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-card orange">
                            <div class="stat-icon orange"><i class="bi bi-hourglass-split"></i></div>
                            <div>
                                <div class="stat-value">15</div>
                                <div class="stat-label">Credit Hours</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Course Cards -->
                <div class="row g-4">
                    <div class="col-md-6 col-xl-4">
                        <div class="course-card">
                            <div class="course-card-header" style="background: var(--nerve-accent);"></div>
                            <div class="course-card-body">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h5 class="fw-bold mb-0">Calculus II</h5>
                                    <span class="badge bg-accent-subtle text-accent">In Progress</span>
                                </div>
                                <p class="text-secondary mb-3">MATH 201 - Advanced calculus concepts</p>
                                <div class="d-flex justify-content-between text-secondary mb-2">
                                    <small><i class="bi bi-person me-1"></i> Dr. Smith</small>
                                    <small><i class="bi bi-clock me-1"></i> MWF 9:00 AM</small>
                                </div>
                                <div class="progress mt-3" style="height: 6px;">
                                    <div class="progress-bar bg-accent" style="width: 75%"></div>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <small class="text-secondary">Progress</small>
                                    <small class="text-accent fw-semibold">75%</small>
                                </div>
                            </div>
                            <div class="course-card-footer d-flex justify-content-between align-items-center">
                                <span class="badge bg-green-subtle text-green">Grade: A-</span>
                                <button class="btn btn-sm btn-outline-accent">View Details</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-xl-4">
                        <div class="course-card">
                            <div class="course-card-header" style="background: var(--nerve-cyan);"></div>
                            <div class="course-card-body">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h5 class="fw-bold mb-0">Data Structures</h5>
                                    <span class="badge bg-accent-subtle text-accent">In Progress</span>
                                </div>
                                <p class="text-secondary mb-3">CS 301 - Algorithms and data organization</p>
                                <div class="d-flex justify-content-between text-secondary mb-2">
                                    <small><i class="bi bi-person me-1"></i> Prof. Johnson</small>
                                    <small><i class="bi bi-clock me-1"></i> TTh 2:00 PM</small>
                                </div>
                                <div class="progress mt-3" style="height: 6px;">
                                    <div class="progress-bar" style="width: 60%; background: var(--nerve-cyan)"></div>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <small class="text-secondary">Progress</small>
                                    <small class="text-cyan fw-semibold">60%</small>
                                </div>
                            </div>
                            <div class="course-card-footer d-flex justify-content-between align-items-center">
                                <span class="badge bg-green-subtle text-green">Grade: B+</span>
                                <button class="btn btn-sm btn-outline-accent">View Details</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-xl-4">
                        <div class="course-card">
                            <div class="course-card-header" style="background: var(--nerve-green);"></div>
                            <div class="course-card-body">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h5 class="fw-bold mb-0">Biology</h5>
                                    <span class="badge bg-accent-subtle text-accent">In Progress</span>
                                </div>
                                <p class="text-secondary mb-3">BIO 101 - Introduction to biological sciences</p>
                                <div class="d-flex justify-content-between text-secondary mb-2">
                                    <small><i class="bi bi-person me-1"></i> Dr. Williams</small>
                                    <small><i class="bi bi-clock me-1"></i> MWF 11:00 AM</small>
                                </div>
                                <div class="progress mt-3" style="height: 6px;">
                                    <div class="progress-bar" style="width: 90%; background: var(--nerve-green)"></div>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <small class="text-secondary">Progress</small>
                                    <small class="text-green fw-semibold">90%</small>
                                </div>
                            </div>
                            <div class="course-card-footer d-flex justify-content-between align-items-center">
                                <span class="badge bg-green-subtle text-green">Grade: A</span>
                                <button class="btn btn-sm btn-outline-accent">View Details</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-xl-4">
                        <div class="course-card">
                            <div class="course-card-header" style="background: var(--nerve-purple);"></div>
                            <div class="course-card-body">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h5 class="fw-bold mb-0">Physics</h5>
                                    <span class="badge bg-accent-subtle text-accent">In Progress</span>
                                </div>
                                <p class="text-secondary mb-3">PHYS 101 - Classical mechanics fundamentals</p>
                                <div class="d-flex justify-content-between text-secondary mb-2">
                                    <small><i class="bi bi-person me-1"></i> Prof. Chen</small>
                                    <small><i class="bi bi-clock me-1"></i> TTh 10:00 AM</small>
                                </div>
                                <div class="progress mt-3" style="height: 6px;">
                                    <div class="progress-bar" style="width: 45%; background: var(--nerve-purple)"></div>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <small class="text-secondary">Progress</small>
                                    <small class="text-purple fw-semibold">45%</small>
                                </div>
                            </div>
                            <div class="course-card-footer d-flex justify-content-between align-items-center">
                                <span class="badge bg-orange-subtle text-orange">Grade: B</span>
                                <button class="btn btn-sm btn-outline-accent">View Details</button>
                            </div>
                        </div>
                    </div>
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
                            <form>
                                <div class="mb-3">
                                    <label class="form-label">Course Name</label>
                                    <input type="text" class="form-control" placeholder="e.g., Calculus II">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Course Code</label>
                                    <input type="text" class="form-control" placeholder="e.g., MATH 201">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Instructor</label>
                                    <input type="text" class="form-control" placeholder="e.g., Dr. Smith">
                                </div>
                                <div class="row">
                                    <div class="col-6 mb-3">
                                        <label class="form-label">Schedule</label>
                                        <input type="text" class="form-control" placeholder="e.g., MWF 9:00 AM">
                                    </div>
                                    <div class="col-6 mb-3">
                                        <label class="form-label">Color</label>
                                        <select class="form-select">
                                            <option value="accent">Indigo</option>
                                            <option value="cyan">Cyan</option>
                                            <option value="green">Green</option>
                                            <option value="purple">Purple</option>
                                            <option value="orange">Orange</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-accent" data-bs-dismiss="modal">Add Course</button>
                        </div>
                    </div>
                </div>
            </div>

@endsection

@section('script')
<script>

</script>
@endsection
