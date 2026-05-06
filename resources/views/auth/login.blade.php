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

        <!-- Right Panel - Login Form -->
        <div class="col-12 col-lg-6 d-flex flex-column justify-content-center p-4 p-lg-5">
            <div class="mx-auto w-100" style="max-width: 400px;">

                <div class="text-center text-lg-start mb-4">
                    <h2 class="fw-bold mb-2">Welcome back</h2>
                    <p class="text-secondary">Enter your credentials to access your account</p>
                </div>

                <!-- Display General Errors (e.g., Invalid Credentials) -->
                @if ($errors->any())
                    <div class="alert alert-danger py-2 small">
                        <ul class="mb-0">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <!-- Dynamic Login Form -->
                <form action="{{ route('login') }}" method="POST">
                    @csrf

                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" name="email" class="form-control @error('email') is-invalid @enderror"
                               placeholder="you@university.edu" value="{{ old('email') }}" required autofocus>
                        @error('email')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <div class="position-relative">
                            <input type="password" name="password" class="form-control" id="loginPassword"
                                   placeholder="Enter your password" required>
                            <button type="button" class="btn btn-link position-absolute end-0 top-50 translate-middle-y text-secondary"
                                    onclick="togglePassword('loginPassword')">
                                <i class="bi bi-eye"></i>
                            </button>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div class="form-check">
                            <input type="checkbox" name="remember" class="form-check-input" id="remember">
                            <label class="form-check-label text-secondary" for="remember">Remember me</label>
                        </div>
                        <a href="#" class="text-accent text-decoration-none">Forgot password?</a>
                    </div>

                    <button type="submit" class="btn btn-accent w-100 mb-3">Sign In</button>
                </form>

                <p class="text-center text-secondary mb-0">
                    Don't have an account?
                    <a href="{{ route('signup') }}" class="text-accent text-decoration-none fw-bold">Sign up</a>
                </p>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function togglePassword(id) {
            const input = document.getElementById(id);
            const icon = event.currentTarget.querySelector('i');
            input.type = input.type === 'password' ? 'text' : 'password';
            icon.classList.toggle('bi-eye');
            icon.classList.toggle('bi-eye-slash');
        }
    </script>
</body>
</html>
