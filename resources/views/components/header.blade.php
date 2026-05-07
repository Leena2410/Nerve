<header class="dashboard-header">
    <div class="d-flex align-items-center gap-3">
        <button class="btn btn-outline-light d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar">
            <i class="bi bi-list"></i>
        </button>
        <div>
            <h4 class="fw-bold mb-0">Good morning, Alex!</h4>
            <small class="text-secondary">Here&apos;s your overview for today</small>
        </div>
    </div>
    <div class="d-flex align-items-center gap-3">
        <div class="dropdown">
            <button class="btn btn-outline-light position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-bell"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-accent">3</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 py-0 overflow-hidden" style="width: 280px; background: var(--nerve-surface, #1a1a1a);">
                <li class="p-3 border-bottom border-secondary border-opacity-10">
                    <h6 class="mb-0 fw-bold">Notifications</h6>
                </li>
                <li>
                    <a class="dropdown-item p-3 d-flex gap-3 align-items-center border-bottom border-secondary border-opacity-10" href="#">
                        <div class="rounded-circle bg-accent bg-opacity-10 p-2 text-accent"><i class="bi bi-journal-text"></i></div>
                        <div class="text-wrap">
                            <div class="small fw-bold">Assignment Due</div>
                            <small class="text-secondary">Math logic in 2 hours</small>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="dropdown-item p-3 d-flex gap-3 align-items-center border-bottom border-secondary border-opacity-10" href="#">
                        <div class="rounded-circle bg-success bg-opacity-10 p-2 text-success"><i class="bi bi-fire"></i></div>
                        <div class="text-wrap">
                            <div class="small fw-bold">Streak Saved!</div>
                            <small class="text-secondary">7 day streak achieved</small>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="dropdown-item text-center py-2 small text-accent fw-bold" href="notifications.html">View All</a>
                </li>
            </ul>
        </div>
        <div class="dropdown">
            <button class="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown">
                <div class="avatar-sm">A</div>
                <span class="d-none d-md-inline">Alex</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg">
                <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person me-2"></i> Profile</a></li>
                <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i> Settings</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="index.html"><i class="bi bi-box-arrow-right me-2"></i> Log Out</a></li>
            </ul>
        </div>
    </div>
</header>

<style>
</style>
