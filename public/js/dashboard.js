// ===== NERVE - Dashboard JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Quick Timer functionality
    const quickTimerDisplay = document.getElementById('quickTimer');
    const startQuickTimerBtn = document.getElementById('startQuickTimer');
    
    if (startQuickTimerBtn && quickTimerDisplay) {
        let timerRunning = false;
        let timeLeft = 25 * 60; // 25 minutes in seconds
        let timerInterval;

        function updateTimerDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            quickTimerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        startQuickTimerBtn.addEventListener('click', function() {
            if (!timerRunning) {
                timerRunning = true;
                startQuickTimerBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause';
                timerInterval = setInterval(function() {
                    if (timeLeft > 0) {
                        timeLeft--;
                        updateTimerDisplay();
                    } else {
                        clearInterval(timerInterval);
                        timerRunning = false;
                        startQuickTimerBtn.innerHTML = '<i class="bi bi-play-fill"></i> Start';
                        timeLeft = 25 * 60;
                        updateTimerDisplay();
                        alert('Focus session complete! Take a break.');
                    }
                }, 1000);
            } else {
                timerRunning = false;
                clearInterval(timerInterval);
                startQuickTimerBtn.innerHTML = '<i class="bi bi-play-fill"></i> Start';
            }
        });
    }

    // Task checkbox functionality
    const taskCheckboxes = document.querySelectorAll('.task-item .form-check-input');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.style.opacity = '0.5';
                taskItem.querySelector('.task-title').style.textDecoration = 'line-through';
            } else {
                taskItem.style.opacity = '1';
                taskItem.querySelector('.task-title').style.textDecoration = 'none';
            }
        });
    });

    // Update greeting based on time
    const greeting = document.querySelector('.dashboard-header h4');
    if (greeting) {
        const hour = new Date().getHours();
        let greetingText = 'Good morning';
        if (hour >= 12 && hour < 17) {
            greetingText = 'Good afternoon';
        } else if (hour >= 17) {
            greetingText = 'Good evening';
        }
        greeting.textContent = `${greetingText}, Alex!`;
    }
});

// Utility functions for other pages
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showToast(message, type = 'success') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
