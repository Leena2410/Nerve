<div class="modal fade" id="addTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content dropdown-menu-dark" style="background: #161625; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;">
            <div class="modal-header border-bottom border-secondary border-opacity-10">
                <h5 class="modal-title fw-bold text-white">Create New Task</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <div id="task_error_alert" class="alert alert-danger" style="display: none;">
                    <ul id="task_error_messages_ul" class="mb-0"></ul>
                </div>

                <form id="createTaskForm">
                    @csrf

                    {{-- DYNAMIC COURSE HANDLING --}}
                    @if(isset($course))
                        <input type="hidden" name="course_id" value="{{ $course->id }}">
                    @else
                        <div class="mb-4">
                            <label class="form-label text-muted small fw-bold text-uppercase mb-2">Assign to Course</label>
                            <select name="course_id" class="form-select form-control text-white" style="background: rgba(255, 255, 255, 0.05); border-color: rgba(255,255,255,0.1);">
                                <option value="">None (Uncategorized)</option>
                                @foreach($courses as $c)
                                    <option value="{{ $c->id }}">{{ $c->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    @endif

                    <div class="mb-4">
                        <label class="form-label text-muted small fw-bold text-uppercase mb-2">Task Title</label>
                        <input type="text" name="title" class="form-control text-white" style="background: rgba(255, 255, 255, 0.05); border-color: rgba(255,255,255,0.1);" required placeholder="e.g., Read chapter 4">
                    </div>

                    <div class="mb-4">
                        <label class="form-label text-muted small fw-bold text-uppercase mb-2">Description</label>
                        <textarea name="description" class="form-control text-white" rows="3" style="background: rgba(255, 255, 255, 0.05); border-color: rgba(255,255,255,0.1);" placeholder="Optional details..."></textarea>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-6">
                            <label class="form-label text-muted small fw-bold text-uppercase mb-2">Type</label>
                            <select name="type" class="form-select text-white" style="background: rgba(255, 255, 255, 0.05); border-color: rgba(255,255,255,0.1);">
                                <option value="assignment">Assignment</option>
                                <option value="lecture">Lecture</option>
                                <option value="review">Review</option>
                            </select>
                        </div>
                        <div class="col-6">
                            <label class="form-label text-muted small fw-bold text-uppercase mb-2">Due Date</label>
                            <input type="date" name="due_at" class="form-control text-white" style="background: rgba(255, 255, 255, 0.05); border-color: rgba(255,255,255,0.1);">
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2 pt-2 border-top border-secondary border-opacity-10">
                        <button type="button" class="btn btn-sm btn-outline-secondary px-3" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onclick="performTaskStore()" class="btn btn-sm btn-light px-4 fw-bold">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
