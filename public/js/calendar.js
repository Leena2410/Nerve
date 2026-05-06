// ===== NERVE - Calendar JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Sample events data
    const events = {
        '2026-05-06': [
            { title: 'Calculus II', type: 'class' },
            { title: 'Assignment Due', type: 'assignment' }
        ],
        '2026-05-07': [
            { title: 'Physics Lab', type: 'class' }
        ],
        '2026-05-08': [
            { title: 'Study Session', type: 'study' }
        ],
        '2026-05-12': [
            { title: 'CS Project Due', type: 'assignment' }
        ],
        '2026-05-15': [
            { title: 'Biology Midterm', type: 'exam' }
        ],
        '2026-05-20': [
            { title: 'Math Quiz', type: 'exam' }
        ],
        '2026-05-22': [
            { title: 'Group Meeting', type: 'study' }
        ]
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        const monthDisplay = document.getElementById('currentMonth');
        
        // Update month display
        monthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        // Clear existing days (keep headers)
        const headers = grid.querySelectorAll('.calendar-header-cell');
        grid.innerHTML = '';
        headers.forEach(h => grid.appendChild(h));

        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        // Get today's date for highlighting
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

        // Add previous month's days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const cell = createDayCell(day, true);
            grid.appendChild(cell);
        }

        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = isCurrentMonth && day === today.getDate();
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events[dateStr] || [];
            const cell = createDayCell(day, false, isToday, dayEvents);
            grid.appendChild(cell);
        }

        // Add next month's days to fill the grid
        const totalCells = grid.children.length - 7; // Subtract headers
        const remainingCells = 42 - totalCells; // 6 rows * 7 days
        for (let day = 1; day <= remainingCells; day++) {
            const cell = createDayCell(day, true);
            grid.appendChild(cell);
        }
    }

    function createDayCell(day, isOtherMonth, isToday = false, events = []) {
        const cell = document.createElement('div');
        cell.className = 'calendar-cell';
        if (isOtherMonth) cell.classList.add('other-month');
        if (isToday) cell.classList.add('today');

        const dayNum = document.createElement('div');
        dayNum.className = 'calendar-day';
        dayNum.textContent = day;
        cell.appendChild(dayNum);

        // Add events
        events.slice(0, 2).forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = `calendar-event ${event.type}`;
            eventDiv.textContent = event.title;
            cell.appendChild(eventDiv);
        });

        if (events.length > 2) {
            const moreDiv = document.createElement('div');
            moreDiv.className = 'calendar-event';
            moreDiv.style.background = 'var(--nerve-surface)';
            moreDiv.style.color = 'var(--nerve-text-secondary)';
            moreDiv.textContent = `+${events.length - 2} more`;
            cell.appendChild(moreDiv);
        }

        return cell;
    }

    // Navigation
    document.getElementById('prevMonth').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Initial render
    renderCalendar();
});
