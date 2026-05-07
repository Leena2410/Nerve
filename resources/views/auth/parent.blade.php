<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Nerve</title>
    <!-- Fonts & Bootstrap -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>
<body>
    <div class="min-vh-100 d-flex">
        <!-- Left Panel - Branding (Kept your styles) -->
        <div class="d-none d-lg-flex col-lg-6 flex-column justify-content-between p-5" style="background: radial-gradient(ellipse at 30% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), var(--nerve-surface);">
            <div>
                <a href="/" class="text-decoration-none">
                    <h4 class="fw-bold text-white">
                        <i class="bi bi-lightning-charge-fill text-accent"></i> NERVE
                    </h4>
                </a>
            </div>
            <div>
                <h2 class="display-5 fw-bold mb-4 text-balance">Take control of your academic life.</h2>
                <p class="text-secondary fs-5">Join thousands of students who use Nerve to stay organized, focused, and ahead of their goals.</p>
            </div>
            <div class="d-flex gap-4">
                <div>
                    <div class="h3 fw-bold text-white mb-0">50K+</div>
                    <small class="text-secondary">Active Students</small>
                </div>
                <div>
                    <div class="h3 fw-bold text-white mb-0">4.9</div>
                    <small class="text-secondary">App Rating</small>
                </div>
                <div>
                    <div class="h3 fw-bold text-white mb-0">1M+</div>
                    <small class="text-secondary">Tasks Completed</small>
                </div>
            </div>
        </div>
        @yield('form')
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="{{ asset('js/crud.js') }}"></script>
@yield('script')
</body>
</html>
