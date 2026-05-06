'use client'

import { useState } from 'react'
import Header from '@/components/dashboard/Header'

interface Notification {
  id: number
  type: 'deadline' | 'achievement' | 'friend' | 'reminder' | 'system'
  title: string
  message: string
  time: string
  read: boolean
  actionUrl?: string
}

const initialNotifications: Notification[] = [
  { id: 1, type: 'deadline', title: 'Deadline Approaching', message: 'Physics Lab Report is due in 3 hours', time: '10 min ago', read: false, actionUrl: '/dashboard/tasks' },
  { id: 2, type: 'achievement', title: 'Achievement Unlocked!', message: 'You earned "7-Day Streak" badge!', time: '2 hours ago', read: false },
  { id: 3, type: 'friend', title: 'New Friend Request', message: 'Michael Brown wants to connect with you', time: '3 hours ago', read: false, actionUrl: '/dashboard/friends' },
  { id: 4, type: 'reminder', title: 'Study Reminder', message: 'Time for your scheduled Economics study session', time: '5 hours ago', read: true },
  { id: 5, type: 'deadline', title: 'Assignment Due Tomorrow', message: 'Math Problem Set #4 is due tomorrow at 5:00 PM', time: '1 day ago', read: true, actionUrl: '/dashboard/tasks' },
  { id: 6, type: 'friend', title: 'Friend Activity', message: 'Sarah Chen completed a 10-day streak!', time: '1 day ago', read: true },
  { id: 7, type: 'system', title: 'Welcome to Nerve!', message: 'Get started by adding your courses and setting up your first tasks.', time: '3 days ago', read: true },
  { id: 8, type: 'achievement', title: 'Achievement Unlocked!', message: 'You earned "Task Master" - Complete 50 tasks', time: '5 days ago', read: true },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read)

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline': return 'bi-clock'
      case 'achievement': return 'bi-trophy'
      case 'friend': return 'bi-people'
      case 'reminder': return 'bi-bell'
      case 'system': return 'bi-info-circle'
      default: return 'bi-bell'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deadline': return 'var(--nerve-danger)'
      case 'achievement': return '#f59e0b'
      case 'friend': return 'var(--nerve-primary)'
      case 'reminder': return 'var(--nerve-secondary)'
      case 'system': return 'var(--muted-foreground)'
      default: return 'var(--muted-foreground)'
    }
  }

  return (
    <div>
      <Header 
        title="Notifications"
        subtitle={`${unreadCount} unread`}
      />

      <div className="p-4">
        {/* Controls */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-2">
            <button 
              className={`btn ${filter === 'all' ? 'btn-nerve' : 'btn-nerve-outline'}`}
              onClick={() => setFilter('all')}
            >
              All ({notifications.length})
            </button>
            <button 
              className={`btn ${filter === 'unread' ? 'btn-nerve' : 'btn-nerve-outline'}`}
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button className="btn btn-nerve-outline" onClick={markAllAsRead}>
              <i className="bi bi-check-all me-2"></i>Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="nerve-card">
          {filteredNotifications.length > 0 ? (
            <div className="d-flex flex-column">
              {filteredNotifications.map((notification, index) => (
                <div 
                  key={notification.id}
                  className={`p-4 d-flex gap-3 ${index < filteredNotifications.length - 1 ? 'border-bottom' : ''}`}
                  style={{ 
                    borderColor: 'var(--border)',
                    background: notification.read ? 'transparent' : 'rgba(99, 102, 241, 0.03)'
                  }}
                >
                  <div 
                    className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: `${getTypeColor(notification.type)}15`
                    }}
                  >
                    <i className={`bi ${getTypeIcon(notification.type)} fs-5`} style={{ color: getTypeColor(notification.type) }}></i>
                  </div>
                  <div className="flex-grow-1 min-width-0">
                    <div className="d-flex align-items-start justify-content-between gap-2">
                      <div>
                        <h6 className={`mb-1 ${notification.read ? '' : 'fw-bold'}`}>
                          {notification.title}
                          {!notification.read && (
                            <span 
                              className="ms-2 rounded-circle d-inline-block"
                              style={{ width: '8px', height: '8px', background: 'var(--nerve-primary)' }}
                            ></span>
                          )}
                        </h6>
                        <p className="mb-1" style={{ color: notification.read ? 'var(--muted-foreground)' : 'var(--foreground)' }}>
                          {notification.message}
                        </p>
                        <div className="small" style={{ color: 'var(--muted-foreground)' }}>{notification.time}</div>
                      </div>
                      <div className="d-flex gap-2 flex-shrink-0">
                        {!notification.read && (
                          <button 
                            className="btn btn-sm p-1"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                            style={{ background: 'none', border: 'none', color: 'var(--muted-foreground)' }}
                          >
                            <i className="bi bi-check2"></i>
                          </button>
                        )}
                        <button 
                          className="btn btn-sm p-1"
                          onClick={() => deleteNotification(notification.id)}
                          title="Delete"
                          style={{ background: 'none', border: 'none', color: 'var(--muted-foreground)' }}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    </div>
                    {notification.actionUrl && (
                      <a 
                        href={notification.actionUrl}
                        className="btn btn-sm btn-nerve-outline mt-2"
                      >
                        View Details
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5 text-center">
              <i className="bi bi-bell-slash fs-1 d-block mb-3" style={{ color: 'var(--muted-foreground)' }}></i>
              <h5>No notifications</h5>
              <p style={{ color: 'var(--muted-foreground)' }}>
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."
                }
              </p>
            </div>
          )}
        </div>

        {/* Notification Settings Card */}
        <div className="nerve-card p-4 mt-4">
          <h5 className="fw-bold mb-4">Notification Preferences</h5>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(239, 68, 68, 0.1)' }}>
                    <i className="bi bi-clock" style={{ color: 'var(--nerve-danger)' }}></i>
                  </div>
                  <div>
                    <div className="fw-semibold">Deadline Alerts</div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Get notified before deadlines</div>
                  </div>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(245, 158, 11, 0.1)' }}>
                    <i className="bi bi-trophy" style={{ color: '#f59e0b' }}></i>
                  </div>
                  <div>
                    <div className="fw-semibold">Achievement Alerts</div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Celebrate your wins</div>
                  </div>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(99, 102, 241, 0.1)' }}>
                    <i className="bi bi-people" style={{ color: 'var(--nerve-primary)' }}></i>
                  </div>
                  <div>
                    <div className="fw-semibold">Friend Activity</div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Updates from your friends</div>
                  </div>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(14, 165, 233, 0.1)' }}>
                    <i className="bi bi-bell" style={{ color: 'var(--nerve-secondary)' }}></i>
                  </div>
                  <div>
                    <div className="fw-semibold">Study Reminders</div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Scheduled session alerts</div>
                  </div>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
