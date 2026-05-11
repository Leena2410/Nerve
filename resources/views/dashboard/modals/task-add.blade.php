<div class="modal fade" id="addTaskModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 15px;">
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title fw-bold">Add New Task</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div id="task_error_alert" class="alert alert-danger border-0 small" style="display: none; border-radius: 10px;">
                    <ul id="task_error_messages_ul" class="mb-0"></ul>
                </div>

                <form id="createTaskForm">
                    @csrf
                    <input type="hidden" name="course_id" value="{{ $course->id }}">

                    <div class="mb-3">
                        <label class="form-label small fw-bold text-secondary">Task Title *</label>
                        <input type="text" name="title" class="form-control" placeholder="e.g., Complete Chapter 1 Quiz" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label small fw-bold text-secondary">Description</label>
                        <textarea name="description" class="form-control" rows="2" placeholder="Add details about this task..."></textarea>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label small fw-bold text-secondary">Type</label>
                            <select name="type" class="form-select">
                                <option value="assignment">Assignment</option>
                                <option value="review">Review</option>
                                <option value="lecture">Lecture</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label small fw-bold text-secondary">Repeat</label>
                            <select name="repeat_interval" class="form-select">
                                <option value="none">None</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label small fw-bold text-secondary">Due Date & Time</label>
                        <input type="datetime-local" name="due_at" class="form-control">
                    </div>
                </form>
            </div>
            <div class="modal-footer border-0 pt-0 pb-4">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-accent px-4 fw-bold"
                        style="background-color: {{ $course->color_code }}; border-color: {{ $course->color_code }}; color: #fff;"
                        onclick="performTaskStore()">
                    Add Task
                </button>
            </div>
        </div>
    </div>
</div>
