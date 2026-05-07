@extends('auth.parent')

@section('form')
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
@endsection

@section('script')
    <script>
        function togglePassword(id) {
            const input = document.getElementById(id);
            const icon = event.currentTarget.querySelector('i');
            input.type = input.type === 'password' ? 'text' : 'password';
            icon.classList.toggle('bi-eye');
            icon.classList.toggle('bi-eye-slash');
        }
    </script>
@endsection('scrip')
</body>
</html>
