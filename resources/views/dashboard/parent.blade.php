@php $page = View::yieldContent('active_page'); @endphp

<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Nerve</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/dashboard.css') }}" rel="stylesheet">

    @yield('style')
</head>
<body>
    <div class="d-flex">
        <!-- Sidebar -->
        <nav class="sidebar d-none d-lg-flex flex-column">
            <div class="sidebar-header">
                <a href="index.html" class="text-decoration-none">
                    <h5 class="fw-bold text-white mb-0">
                        <i class="bi bi-lightning-charge-fill text-accent"></i> NERVE
                    </h5>
                </a>
            </div>

            <ul class="nav flex-column sidebar-nav">
                <li class="nav-item">
                    <a href="{{ route('dashboard') }}" class="nav-link  {{ $page === 'home' ? 'active' : '' }}">
                        <i class="bi bi-grid-1x2"></i> Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('courses') }}" class="nav-link {{ $page === 'courses' ? 'active' : '' }}">
                        <i class="bi bi-journal-bookmark"></i> Courses
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link {{ $page === 'tasks' ? 'active' : '' }}">
                        <i class="bi bi-check2-square"></i> Tasks
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link {{ $page === 'calender' ? 'active' : '' }}">
                        <i class="bi bi-calendar3"></i> Calendar
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link {{ $page === 'focus' ? 'active' : '' }}">
                        <i class="bi bi-stopwatch"></i> Focus Timer
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link {{ $page === 'friends' ? 'active' : '' }}">
                        <i class="bi bi-people"></i> Friends
                    </a>
                </li>
            </ul>

            <div class="mt-auto">
                <ul class="nav flex-column sidebar-nav">
                    <li class="nav-item">
                        <a href="#" class="nav-link {{ $page === 'notifications' ? 'active' : '' }}">
                            <i class="bi bi-bell"></i> Notifications
                            <span class="badge bg-accent ms-auto">3</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link {{ $page === 'profile' ? 'active' : '' }}">
                            <i class="bi bi-person"></i> Profile
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="main-content">
            @yield('content')
        </main>
    </div>

    <!-- Mobile Sidebar -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileSidebar">
        <div class="offcanvas-header">
            <h5 class="fw-bold"><i class="bi bi-lightning-charge-fill text-accent"></i> NERVE</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body p-0">
            <ul class="nav flex-column sidebar-nav">
                <li class="nav-item"><a href="{{ route('dashboard') }}" class="nav-link {{ $page === 'home' ? 'active' : '' }}"><i class="bi bi-grid-1x2"></i> Dashboard</a></li>
                <li class="nav-item"><a href="{{ route('courses') }}" class="nav-link {{ $page === 'courses' ? 'active' : '' }}"><i class="bi bi-journal-bookmark"></i> Courses</a></li>
                <li class="nav-item"><a href="#" class="nav-link {{ $page === 'tasks' ? 'active' : '' }}"><i class="bi bi-check2-square"></i> Tasks</a></li>
                <li class="nav-item"><a href="#" class="nav-link {{ $page === 'calender' ? 'active' : '' }}"><i class="bi bi-calendar3"></i> Calendar</a></li>
                <li class="nav-item"><a href="#" class="nav-link {{ $page === 'focus' ? 'active' : '' }}"><i class="bi bi-stopwatch"></i> Focus Timer</a></li>
                <li class="nav-item"><a href="#" class="nav-link {{ $page === 'friends' ? 'active' : '' }}"><i class="bi bi-people"></i> Friends</a></li>
                <li class="nav-item"><a href="#" class="nav-link {{ $page === 'notifications' ? 'active' : '' }}"><i class="bi bi-bell"></i> Notifications</a></li>
                <li class="nav-item"><a href="#" class="nav-link {{ $page === 'profile' ? 'active' : '' }}"><i class="bi bi-person"></i> Profile</a></li>
            </ul>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="{{ asset('js/dashboard.js') }}"></script>
    <script src="{{ asset('js/crud.js') }}"></script>
    @yield('script')
</body>
</html>
