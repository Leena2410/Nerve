'use client'

import { useState } from 'react'
import Header from '@/components/dashboard/Header'

interface CalendarEvent {
  id: number
  title: string
  course: string
  courseColor: string
  date: string
  startTime: string
  endTime: string
  type: 'class' | 'assignment' | 'exam' | 'study' | 'meeting'
  location?: string
}

const events: CalendarEvent[] = [
  { id: 1, title: 'Physics Lecture', course: 'PHY 201', courseColor: '#6366f1', date: '2024-01-15', startTime: '09:00', endTime: '10:15', type: 'class', location: 'Science Building 301' },
  { id: 2, title: 'Lab Report Due', course: 'PHY 201', courseColor: '#6366f1', date: '2024-01-15', startTime: '23:59', endTime: '23:59', type: 'assignment' },
  { id: 3, title: 'Economics Lecture', course: 'ECON 101', courseColor: '#0ea5e9', date: '2024-01-16', startTime: '11:00', endTime: '12:30', type: 'class', location: 'Business Hall 205' },
  { id: 4, title: 'Math Problem Set Due', course: 'MATH 301', courseColor: '#10b981', date: '2024-01-17', startTime: '17:00', endTime: '17:00', type: 'assignment' },
  { id: 5, title: 'Chemistry Quiz', course: 'CHEM 102', courseColor: '#f59e0b', date: '2024-01-18', startTime: '10:00', endTime: '11:00', type: 'exam', location: 'Chemistry Lab 401' },
  { id: 6, title: 'Study Group - CS Project', course: 'CS 201', courseColor: '#8b5cf6', date: '2024-01-15', startTime: '14:00', endTime: '16:00', type: 'study' },
  { id: 7, title: 'Team Meeting', course: 'ECON 101', courseColor: '#0ea5e9', date: '2024-01-19', startTime: '15:00', endTime: '16:00', type: 'meeting' },
  { id: 8, title: 'Physics Lecture', course: 'PHY 201', courseColor: '#6366f1', date: '2024-01-17', startTime: '09:00', endTime: '10:15', type: 'class', location: 'Science Building 301' },
  { id: 9, title: 'English Essay Due', course: 'ENG 201', courseColor: '#ec4899', date: '2024-01-19', startTime: '23:59', endTime: '23:59', type: 'assignment' },
  { id: 10, title: 'Math Lecture', course: 'MATH 301', courseColor: '#10b981', date: '2024-01-15', startTime: '14:00', endTime: '15:30', type: 'class', location: 'Math Building 102' },
]

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15)) // January 2024
  const [view, setView] = useState<'month' | 'week'>('month')
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 0, 15))
  const [showEventModal, setShowEventModal] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
  const goToToday = () => {
    const today = new Date(2024, 0, 15) // Mock "today"
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(e => e.date === dateStr)
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const h = parseInt(hours)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hour12 = h % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'class': return 'bi-book'
      case 'assignment': return 'bi-file-earmark-text'
      case 'exam': return 'bi-pencil-square'
      case 'study': return 'bi-people'
      case 'meeting': return 'bi-camera-video'
      default: return 'bi-calendar-event'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'var(--nerve-primary)'
      case 'assignment': return 'var(--nerve-warning)'
      case 'exam': return 'var(--nerve-danger)'
      case 'study': return 'var(--nerve-success)'
      case 'meeting': return 'var(--nerve-secondary)'
      default: return 'var(--muted-foreground)'
    }
  }

  // Generate calendar days
  const calendarDays = []
  
  // Add empty cells for days before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1)
    calendarDays.push({ date: prevMonthDay, isCurrentMonth: false })
  }
  
  // Add days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({ date: new Date(year, month, day), isCurrentMonth: true })
  }
  
  // Add remaining days to complete the grid (6 rows)
  const remainingDays = 42 - calendarDays.length
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div>
      <Header 
        title="Calendar"
        subtitle={currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />

      <div className="p-4">
        <div className="row g-4">
          {/* Calendar Grid */}
          <div className="col-lg-8">
            <div className="nerve-card p-4">
              {/* Calendar Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                  <button className="btn p-2" onClick={prevMonth} style={{ background: 'var(--secondary)', border: 'none' }}>
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <h4 className="mb-0 fw-bold">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h4>
                  <button className="btn p-2" onClick={nextMonth} style={{ background: 'var(--secondary)', border: 'none' }}>
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-nerve-outline btn-sm" onClick={goToToday}>Today</button>
                  <div className="btn-group">
                    <button 
                      className={`btn btn-sm ${view === 'month' ? 'btn-nerve' : 'btn-nerve-outline'}`}
                      onClick={() => setView('month')}
                    >
                      Month
                    </button>
                    <button 
                      className={`btn btn-sm ${view === 'week' ? 'btn-nerve' : 'btn-nerve-outline'}`}
                      onClick={() => setView('week')}
                    >
                      Week
                    </button>
                  </div>
                </div>
              </div>

              {/* Days of Week Header */}
              <div className="row g-0 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="col text-center">
                    <div className="py-2 small fw-semibold" style={{ color: 'var(--muted-foreground)' }}>
                      {day}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="row g-0">
                {calendarDays.map(({ date, isCurrentMonth }, index) => {
                  const dayEvents = getEventsForDate(date)
                  const isToday = date.toDateString() === new Date(2024, 0, 15).toDateString()
                  const isSelected = selectedDate?.toDateString() === date.toDateString()

                  return (
                    <div key={index} className="col" style={{ width: '14.28%' }}>
                      <div 
                        className={`p-2 border position-relative ${isSelected ? 'nerve-glow' : ''}`}
                        onClick={() => setSelectedDate(date)}
                        style={{ 
                          minHeight: '100px', 
                          cursor: 'pointer',
                          background: isSelected ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                          borderColor: isSelected ? 'var(--nerve-primary)' : 'var(--border)',
                          opacity: isCurrentMonth ? 1 : 0.4
                        }}
                      >
                        <div 
                          className={`d-inline-flex align-items-center justify-content-center rounded-circle mb-1 ${isToday ? 'text-white' : ''}`}
                          style={{ 
                            width: '28px', 
                            height: '28px',
                            background: isToday ? 'var(--nerve-primary)' : 'transparent',
                            fontWeight: isToday ? '600' : '400'
                          }}
                        >
                          {date.getDate()}
                        </div>
                        <div className="d-flex flex-column gap-1">
                          {dayEvents.slice(0, 3).map(event => (
                            <div 
                              key={event.id}
                              className="px-1 rounded small text-truncate"
                              style={{ 
                                background: `${event.courseColor}20`,
                                color: event.courseColor,
                                fontSize: '0.65rem',
                                lineHeight: '1.4'
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="small text-center" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Events for Selected Date */}
          <div className="col-lg-4">
            <div className="nerve-card p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </h5>
                <button className="btn btn-nerve btn-sm" onClick={() => setShowEventModal(true)}>
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>

              {selectedDateEvents.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className="p-3 rounded-3" style={{ background: 'var(--secondary)', borderLeft: `4px solid ${event.courseColor}` }}>
                      <div className="d-flex align-items-start gap-2 mb-2">
                        <div 
                          className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: '32px', height: '32px', background: `${getTypeColor(event.type)}15` }}
                        >
                          <i className={`bi ${getTypeIcon(event.type)}`} style={{ color: getTypeColor(event.type) }}></i>
                        </div>
                        <div className="flex-grow-1 min-width-0">
                          <h6 className="mb-0 fw-semibold text-truncate">{event.title}</h6>
                          <span className="badge small" style={{ background: `${event.courseColor}20`, color: event.courseColor }}>
                            {event.course}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3 small" style={{ color: 'var(--muted-foreground)' }}>
                        <span>
                          <i className="bi bi-clock me-1"></i>
                          {event.type === 'assignment' ? 'Due ' : ''}{formatTime(event.startTime)}
                          {event.startTime !== event.endTime && ` - ${formatTime(event.endTime)}`}
                        </span>
                      </div>
                      {event.location && (
                        <div className="small mt-1" style={{ color: 'var(--muted-foreground)' }}>
                          <i className="bi bi-geo-alt me-1"></i>{event.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-calendar-x fs-1 d-block mb-2" style={{ color: 'var(--muted-foreground)' }}></i>
                  <p className="mb-0" style={{ color: 'var(--muted-foreground)' }}>No events scheduled</p>
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="nerve-card p-4">
              <h5 className="fw-bold mb-3">Upcoming This Week</h5>
              <div className="d-flex flex-column gap-2">
                {events
                  .filter(e => {
                    const eventDate = new Date(e.date)
                    const weekEnd = new Date(2024, 0, 21)
                    return eventDate >= new Date(2024, 0, 15) && eventDate <= weekEnd
                  })
                  .slice(0, 5)
                  .map(event => (
                    <div key={event.id} className="d-flex align-items-center gap-3 p-2 rounded-2" style={{ background: 'var(--secondary)' }}>
                      <div 
                        className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: `${event.courseColor}20` }}
                      >
                        <i className={`bi ${getTypeIcon(event.type)}`} style={{ color: event.courseColor }}></i>
                      </div>
                      <div className="flex-grow-1 min-width-0">
                        <div className="fw-medium small text-truncate">{event.title}</div>
                        <div className="small" style={{ color: 'var(--muted-foreground)' }}>
                          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Legend */}
            <div className="nerve-card p-4 mt-4">
              <h6 className="fw-bold mb-3">Event Types</h6>
              <div className="d-flex flex-wrap gap-2">
                {[
                  { type: 'class', label: 'Class' },
                  { type: 'assignment', label: 'Assignment' },
                  { type: 'exam', label: 'Exam' },
                  { type: 'study', label: 'Study' },
                  { type: 'meeting', label: 'Meeting' },
                ].map(item => (
                  <span 
                    key={item.type}
                    className="badge d-flex align-items-center gap-1"
                    style={{ background: `${getTypeColor(item.type)}15`, color: getTypeColor(item.type) }}
                  >
                    <i className={`bi ${getTypeIcon(item.type)}`}></i>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Event Modal */}
        {showEventModal && (
          <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowEventModal(false)}>
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content border-0 shadow-lg" style={{ background: 'var(--card)' }}>
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Add Event</h5>
                  <button className="btn-close" onClick={() => setShowEventModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Event Title</label>
                    <input type="text" className="form-control" placeholder="Event name" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Type</label>
                      <select className="form-select" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
                        <option value="class">Class</option>
                        <option value="assignment">Assignment</option>
                        <option value="exam">Exam</option>
                        <option value="study">Study Session</option>
                        <option value="meeting">Meeting</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Course</label>
                      <select className="form-select" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
                        <option>PHY 201</option>
                        <option>ECON 101</option>
                        <option>MATH 301</option>
                        <option>CHEM 102</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Date</label>
                    <input type="date" className="form-control" defaultValue={selectedDate?.toISOString().split('T')[0]} style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Start Time</label>
                      <input type="time" className="form-control" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">End Time</label>
                      <input type="time" className="form-control" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Location (optional)</label>
                    <input type="text" className="form-control" placeholder="Room or building" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-nerve-outline" onClick={() => setShowEventModal(false)}>Cancel</button>
                  <button className="btn btn-nerve">Add Event</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
