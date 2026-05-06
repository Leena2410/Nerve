<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - Nerve</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>
<body>
    <div class="min-vh-100 d-flex">
        <!-- Left Panel - Branding (Kept consistent with Login) -->
        <div class="d-none d-lg-flex col-lg-6 flex-column justify-content-between p-5" style="background: radial-gradient(ellipse at 30% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), var(--nerve-surface);">
            <div>
                <a href="{{ url('/') }}" class="text-decoration-none">
                    <h4 class="fw-bold text-white">
                        <i class="bi bi-lightning-charge-fill text-accent"></i> NERVE
                    </h4>
                </a>
            </div>
            <div>
                <h2 class="display-5 fw-bold mb-4 text-balance">Your academic peak starts here.</h2>
                <p class="text-secondary fs-5">Create your profile to start tracking tasks, managing courses, and building your study streak.</p>
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

        <!-- Right Panel - Signup Form -->
        <div class="col-12 col-lg-6 d-flex flex-column justify-content-center p-4 p-lg-5 overflow-y-auto">
            <div class="mx-auto w-100" style="max-width: 450px;">
                <!-- Mobile Logo -->
                <div class="d-lg-none text-center mb-4">
                    <a href="{{ url('/') }}" class="text-decoration-none">
                        <h4 class="fw-bold text-white">
                            <i class="bi bi-lightning-charge-fill text-accent"></i> NERVE
                        </h4>
                    </a>
                </div>

                <div class="text-center text-lg-start mb-4">
                    <h2 class="fw-bold mb-2">Create an account</h2>
                    <p class="text-secondary">Join the community and boost your productivity.</p>
                </div>

                <!-- Signup Form -->
                <form id="signupForm" action="{{ route('register') }}" method="POST">
                    @csrf

                    <div class="row g-3 mb-3">
                        <div class="col-md-12">
                            <label class="form-label">Full Name</label>
                            <input type="text" name="name" class="form-control @error('name') is-invalid @enderror" placeholder="John Doe" value="{{ old('name') }}" required>
                            @error('name')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email Address</label>
                        <input type="email" name="email" class="form-control @error('email') is-invalid @enderror" placeholder="you@university.edu" value="{{ old('email') }}" required>
                        @error('email')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label">University</label>
                            <input type="text" name="university" class="form-control @error('university') is-invalid @enderror" placeholder="Harvard" value="{{ old('university') }}" required>
                            @error('university')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Major</label>
                            <input type="text" name="major" class="form-control @error('major') is-invalid @enderror" placeholder="Computer Science" value="{{ old('major') }}" required>
                            @error('major')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <div class="position-relative">
                            <input type="password" name="password" class="form-control @error('password') is-invalid @enderror" id="signupPassword" placeholder="Min. 8 characters" required>
                            <button type="button" class="btn btn-link position-absolute end-0 top-50 translate-middle-y text-secondary text-decoration-none" onclick="togglePassword('signupPassword')">
                                <i class="bi bi-eye"></i>
                            </button>
                            @error('password')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Confirm Password</label>
                        <input type="password" name="password_confirmation" class="form-control" placeholder="Repeat password" required>
                    </div>

                    <div class="form-check mb-4">
                        <input type="checkbox" name="terms" class="form-check-input" id="terms" required>
                        <label class="form-check-label text-secondary" for="terms">
                            I agree to the <a href="#" class="text-accent text-decoration-none">Terms</a> and <a href="#" class="text-accent text-decoration-none">Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" class="btn btn-accent w-100 mb-3">
                        Create Account
                    </button>
                </form>

                <div class="text-center my-4">
                    <span class="text-secondary">Or sign up with</span>
                </div>

                <div class="d-flex gap-3 mb-4">
                    <button type="button" class="btn btn-outline-light flex-fill">
                        <i class="bi bi-google me-2"></i> Google
                    </button>
                    <button type="button" class="btn btn-outline-light flex-fill">
                        <i class="bi bi-apple me-2"></i> Apple
                    </button>
                </div>

                <p class="text-center text-secondary mb-0">
                    Already have an account?
                    <a href="{{ route('login') }}" class="text-accent text-decoration-none fw-bold">Sign In</a>
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
