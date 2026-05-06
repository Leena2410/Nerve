// ===== NERVE - Timer JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Timer state
    let timeLeft = 25 * 60;
    let totalTime = 25 * 60;
    let timerRunning = false;
    let timerInterval;
    let currentMode = 'focus';

    // Elements
    const timerDisplay = document.getElementById('timerDisplay');
    const timerProgress = document.getElementById('timerProgress');
    const timerLabel = document.getElementById('timerLabel');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const skipBtn = document.getElementById('skipBtn');
    const modeTabs = document.querySelectorAll('.timer-mode-tab');

    // Settings elements
    const focusDuration = document.getElementById('focusDuration');
    const shortBreak = document.getElementById('shortBreak');
    const longBreak = document.getElementById('longBreak');
    const focusDurationValue = document.getElementById('focusDurationValue');
    const shortBreakValue = document.getElementById('shortBreakValue');
    const longBreakValue = document.getElementById('longBreakValue');

    // Circle circumference
    const circumference = 2 * Math.PI * 130;
    timerProgress.style.strokeDasharray = circumference;

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Update progress ring
        const progress = timeLeft / totalTime;
        const offset = circumference * (1 - progress);
        timerProgress.style.strokeDashoffset = offset;

        // Update progress color based on mode
        if (currentMode === 'focus') {
            timerProgress.style.stroke = 'var(--nerve-accent)';
        } else if (currentMode === 'short') {
            timerProgress.style.stroke = 'var(--nerve-cyan)';
        } else {
            timerProgress.style.stroke = 'var(--nerve-green)';
        }
    }

    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            startBtn.innerHTML = '<i class="bi bi-pause-fill me-1"></i> Pause';
            timerLabel.textContent = currentMode === 'focus' ? 'Stay focused!' : 'Take a break!';

            timerInterval = setInterval(function() {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    completeSession();
                }
            }, 1000);
        } else {
            pauseTimer();
        }
    }

    function pauseTimer() {
        timerRunning = false;
        clearInterval(timerInterval);
        startBtn.innerHTML = '<i class="bi bi-play-fill me-1"></i> Resume';
        timerLabel.textContent = 'Paused';
    }

    function resetTimer() {
        pauseTimer();
        const activeTab = document.querySelector('.timer-mode-tab.active');
        const time = parseInt(activeTab.dataset.time);
        timeLeft = time * 60;
        totalTime = time * 60;
        startBtn.innerHTML = '<i class="bi bi-play-fill me-1"></i> Start';
        timerLabel.textContent = 'Ready to focus?';
        updateDisplay();
    }

    function completeSession() {
        pauseTimer();
        timerLabel.textContent = 'Session complete!';
        
        // Update stats
        if (currentMode === 'focus') {
            const sessionsEl = document.getElementById('sessionsCompleted');
            const minutesEl = document.getElementById('totalMinutes');
            sessionsEl.textContent = parseInt(sessionsEl.textContent) + 1;
            minutesEl.textContent = parseInt(minutesEl.textContent) + Math.floor(totalTime / 60);
        }

        // Play notification sound (if enabled)
        const soundEnabled = document.getElementById('soundEnabled').checked;
        if (soundEnabled) {
            // Simple beep using Web Audio API
            try {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.frequency.value = 800;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
                oscillator.start(audioCtx.currentTime);
                oscillator.stop(audioCtx.currentTime + 0.5);
            } catch (e) {
                console.log('Audio not supported');
            }
        }

        // Auto-start next session if enabled
        const autoStart = document.getElementById('autoStart').checked;
        if (autoStart) {
            setTimeout(() => {
                // Switch to break or focus
                if (currentMode === 'focus') {
                    switchMode('short');
                } else {
                    switchMode('focus');
                }
                startTimer();
            }, 2000);
        }
    }

    function switchMode(mode) {
        currentMode = mode;
        modeTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.mode === mode) {
                tab.classList.add('active');
            }
        });

        let time;
        if (mode === 'focus') {
            time = parseInt(focusDuration.value);
        } else if (mode === 'short') {
            time = parseInt(shortBreak.value);
        } else {
            time = parseInt(longBreak.value);
        }

        timeLeft = time * 60;
        totalTime = time * 60;
        pauseTimer();
        startBtn.innerHTML = '<i class="bi bi-play-fill me-1"></i> Start';
        timerLabel.textContent = mode === 'focus' ? 'Ready to focus?' : 'Time for a break!';
        updateDisplay();
    }

    // Event listeners
    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
    skipBtn.addEventListener('click', function() {
        if (currentMode === 'focus') {
            switchMode('short');
        } else {
            switchMode('focus');
        }
    });

    modeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchMode(this.dataset.mode);
        });
    });

    // Settings sliders
    focusDuration.addEventListener('input', function() {
        focusDurationValue.textContent = this.value + ' min';
        if (currentMode === 'focus' && !timerRunning) {
            timeLeft = this.value * 60;
            totalTime = this.value * 60;
            updateDisplay();
        }
    });

    shortBreak.addEventListener('input', function() {
        shortBreakValue.textContent = this.value + ' min';
        if (currentMode === 'short' && !timerRunning) {
            timeLeft = this.value * 60;
            totalTime = this.value * 60;
            updateDisplay();
        }
    });

    longBreak.addEventListener('input', function() {
        longBreakValue.textContent = this.value + ' min';
        if (currentMode === 'long' && !timerRunning) {
            timeLeft = this.value * 60;
            totalTime = this.value * 60;
            updateDisplay();
        }
    });

    // Initial display
    updateDisplay();
});
