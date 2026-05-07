@extends('auth.parent')

@section('form')
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

                <div id="error_alert" class="alert alert-danger mb-4" hidden>
                    <ul id="error_messages_ul" class="mb-0"></ul>
                </div>
                <!-- Signup Form -->
                <form id="signupForm" method="POST" onsubmit="event.preventDefault(); performSignup();">
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

                <p class="text-center text-secondary mb-0">
                    Already have an account?
                    <a href="{{ route('login') }}" class="text-accent text-decoration-none fw-bold">Sign In</a>
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

        function performSignup() {
            let data = {
                name: document.getElementsByName('name')[0].value,
                email: document.getElementsByName('email')[0].value,
                university: document.getElementsByName('university')[0].value,
                major: document.getElementsByName('major')[0].value,
                password: document.getElementsByName('password')[0].value,
                password_confirmation: document.getElementsByName('password_confirmation')[0].value,
                terms: document.getElementById('terms').checked ? 1 : 0, // Add this!
            };

            storeRoute("{{ route('register') }}", data);
        }
    </script>
@endsection


