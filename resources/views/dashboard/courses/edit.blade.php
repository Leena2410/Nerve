@extends('dashboard.parent')

@section('active_page', 'courses')

@section('style')
<style>
    .edit-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .settings-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 2rem;
    }

    .form-label {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #888;
        font-weight: 700;
        margin-bottom: 0.75rem;
    }

    .form-control, .form-select {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        color: #fff;
        padding: 0.75rem 1rem;
        transition: all 0.2s;
    }

    .form-control:focus {
        background: rgba(255, 255, 255, 0.08);
        border-color: {{ $course->color_code }};
        box-shadow: 0 0 0 4px {{ $course->color_code }}33;
        color: #fff;
    }

    .color-preview {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        border: 2px solid rgba(255,255,255,0.1);
    }

    .danger-zone {
        border: 1px solid rgba(255, 59, 48, 0.2);
        background: rgba(255, 59, 48, 0.02);
    }
</style>
@endsection

@section('content')
<div class="edit-container py-4">
    <header class="d-flex align-items-center justify-content-between mb-4">
        <div class="d-flex align-items-center gap-3">
            <a href="{{ route('courses.show', $course->id) }}" class="btn btn-outline-light btn-sm rounded-3">
                <i class="bi bi-arrow-left"></i>
            </a>
            <div>
                <h4 class="fw-bold mb-0">Course Settings</h4>
                <small class="text-secondary">Update details for <span class="text-white">{{ $course->name }}</span></small>
            </div>
        </div>
    </header>

    <div class="settings-card shadow-sm mb-4">
        <form id="updateCourseForm">
            @csrf
            @method('PUT')

            <div class="mb-4">
                <label class="form-label">Course Title</label>
                <input type="text" name="name" class="form-control form-control-lg" value="{{ $course->name }}" required>
            </div>

            <div class="mb-4">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="4" placeholder="What is this course about?">{{ $course->description }}</textarea>
            </div>

            <div class="row g-4 mb-4">
                <div class="col-md-6">
                    <label class="form-label">Academic Credits</label>
                    <input type="number" name="credits" class="form-control" value="{{ $course->credits }}" step="0.5" min="0">
                </div>
<div class="col-md-6">
    <label class="form-label">Accent Color</label>
    <div class="d-flex align-items-center gap-3 p-2 rounded-3 border border-white border-opacity-10"
         style="background: #11111d; cursor: pointer;"
         onclick="document.getElementById('colorInput').click()">

        <div id="colorPreview" class="rounded-2"
             style="width: 40px; height: 30px; background-color: {{ $course->color_code }};">
        </div>

        <span class="text-uppercase small fw-bold text-white opacity-75" id="colorText">
            {{ $course->color_code }}
        </span>

        <input type="color" name="color_code" id="colorInput"
               value="{{ $course->color_code }}"
               class="opacity-0" style="width:0; height:0; position:absolute;">
    </div>
</div>
            </div>

            <hr class="opacity-10 my-4">

            <div class="d-flex justify-content-end gap-3">
                <button type="button" class="btn btn-link text-secondary text-decoration-none" onclick="history.back()">Cancel</button>
                <button type="submit" class="btn px-4 fw-bold shadow-sm"
                        style="background: {{ $course->color_code }}; color: #fff; border-radius: 10px;">
                    Save Changes
                </button>
            </div>
        </form>
    </div>

    <div class="settings-card danger-zone">
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <h6 class="fw-bold text-danger mb-1">Delete Course</h6>
                <p class="text-secondary small mb-0">Permanently remove this course and all associated tasks.</p>
            </div>
            <button class="btn btn-outline-danger px-4" onclick="confirmDestroy('{{ route('courses.destroy', $course->id) }}', this)">
                Delete
            </button>
        </div>
    </div>
</div>
@endsection

@section('script')
<script>
    // Live color hex update
    document.getElementById('colorInput').addEventListener('input', function(e) {
        document.getElementById('colorText').textContent = e.target.value.toUpperCase();
    });

    // Update Logic
    document.getElementById('updateCourseForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);

        axios.post("{{ route('courses.update', $course->id) }}", formData)
            .then(response => {
                Swal.fire({
                    title: 'Settings Saved',
                    text: 'Updating course details...',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                    background: '#1a1a2e',
                    color: '#fff'
                });

                setTimeout(() => {
                    // Redirect back to the course show page to see changes
                    window.location.href = "{{ route('courses.show', $course->id) }}";
                }, 1100);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    let errors = Object.values(error.response.data.errors).flat().join('\n');
                    Swal.fire({
                        title: 'Update Failed',
                        text: errors,
                        icon: 'error',
                        background: '#1a1a2e',
                        color: '#fff'
                    });
                }
            });
    });

    // Reuse your established confirmDestroy logic
    function confirmDestroy(url, button) {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF3B30',
            confirmButtonText: 'Yes, delete it!',
            background: '#1a1a2e',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url).then(response => {
                    window.location.href = "{{ route('courses') }}";
                });
            }
        });
    }
</script>
@endsection
