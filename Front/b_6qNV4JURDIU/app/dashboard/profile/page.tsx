'use client'

import { useState } from 'react'
import Header from '@/components/dashboard/Header'

const achievements = [
  { id: 1, title: '7-Day Streak', description: 'Studied for 7 days in a row', icon: 'bi-fire', color: '#f59e0b', unlocked: true, date: 'Jan 14, 2024' },
  { id: 2, title: 'Early Bird', description: 'Complete a task before 8 AM', icon: 'bi-sunrise', color: '#6366f1', unlocked: true, date: 'Jan 10, 2024' },
  { id: 3, title: 'Task Master', description: 'Complete 50 tasks', icon: 'bi-check2-all', color: '#10b981', unlocked: true, date: 'Jan 8, 2024' },
  { id: 4, title: 'Focus Champion', description: '10 hours of focused study time', icon: 'bi-trophy', color: '#0ea5e9', unlocked: true, date: 'Jan 5, 2024' },
  { id: 5, title: 'Perfect Week', description: 'Complete all tasks in a week', icon: 'bi-star', color: '#ec4899', unlocked: false, date: null },
  { id: 6, title: 'Night Owl', description: 'Study session after midnight', icon: 'bi-moon-stars', color: '#8b5cf6', unlocked: false, date: null },
]

const weeklyData = [
  { day: 'Mon', hours: 3.5 },
  { day: 'Tue', hours: 4.2 },
  { day: 'Wed', hours: 2.8 },
  { day: 'Thu', hours: 5.0 },
  { day: 'Fri', hours: 3.0 },
  { day: 'Sat', hours: 1.5 },
  { day: 'Sun', hours: 2.5 },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'achievements'>('overview')

  const maxHours = Math.max(...weeklyData.map(d => d.hours))

  return (
    <div>
      <Header 
        title="Profile"
        subtitle="Manage your account and view your progress"
      />

      <div className="p-4">
        {/* Profile Header */}
        <div className="nerve-card p-4 mb-4">
          <div className="row align-items-center g-4">
            <div className="col-auto">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center text-white"
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  background: 'linear-gradient(135deg, var(--nerve-primary), var(--nerve-secondary))',
                  fontSize: '2.5rem',
                  fontWeight: 'bold'
                }}
              >
                JD
              </div>
            </div>
            <div className="col">
              <h2 className="fw-bold mb-1">John Doe</h2>
              <p className="mb-2" style={{ color: 'var(--muted-foreground)' }}>Computer Science | Class of 2026</p>
              <div className="d-flex gap-2 flex-wrap">
                <span className="badge px-3 py-2" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--nerve-primary)' }}>
                  <i className="bi bi-fire me-1"></i>7 Day Streak
                </span>
                <span className="badge px-3 py-2" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--nerve-success)' }}>
                  <i className="bi bi-check-circle me-1"></i>87% Completion Rate
                </span>
                <span className="badge px-3 py-2" style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--nerve-secondary)' }}>
                  <i className="bi bi-trophy me-1"></i>4 Achievements
                </span>
              </div>
            </div>
            <div className="col-auto">
              <button className="btn btn-nerve-outline">
                <i className="bi bi-pencil me-2"></i>Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-pills mb-4 gap-2">
          {(['overview', 'achievements', 'settings'] as const).map((tab) => (
            <li key={tab} className="nav-item">
              <button 
                className={`nav-link ${activeTab === tab ? 'btn-nerve' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ 
                  background: activeTab === tab ? undefined : 'var(--secondary)',
                  color: activeTab === tab ? 'white' : 'var(--foreground)'
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="row g-4">
            {/* Stats */}
            <div className="col-lg-8">
              <div className="nerve-card p-4 mb-4">
                <h5 className="fw-bold mb-4">This Week&apos;s Study Time</h5>
                <div className="d-flex align-items-end gap-3" style={{ height: '200px' }}>
                  {weeklyData.map((day) => (
                    <div key={day.day} className="flex-grow-1 text-center">
                      <div 
                        className="rounded-2 mx-auto mb-2 transition-all"
                        style={{ 
                          width: '100%',
                          maxWidth: '60px',
                          height: `${(day.hours / maxHours) * 160}px`,
                          background: day.day === 'Thu' ? 'var(--nerve-primary)' : 'rgba(99, 102, 241, 0.3)',
                          minHeight: '20px'
                        }}
                      ></div>
                      <div className="small fw-semibold">{day.hours}h</div>
                      <div className="small" style={{ color: 'var(--muted-foreground)' }}>{day.day}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="nerve-card p-4 h-100">
                    <h5 className="fw-bold mb-4">Study Stats</h5>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(99, 102, 241, 0.1)' }}>
                            <i className="bi bi-clock" style={{ color: 'var(--nerve-primary)' }}></i>
                          </div>
                          <span>Total Study Time</span>
                        </div>
                        <span className="fw-bold">127.5h</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(16, 185, 129, 0.1)' }}>
                            <i className="bi bi-check-circle" style={{ color: 'var(--nerve-success)' }}></i>
                          </div>
                          <span>Tasks Completed</span>
                        </div>
                        <span className="fw-bold">156</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(245, 158, 11, 0.1)' }}>
                            <i className="bi bi-fire" style={{ color: '#f59e0b' }}></i>
                          </div>
                          <span>Longest Streak</span>
                        </div>
                        <span className="fw-bold">12 days</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(14, 165, 233, 0.1)' }}>
                            <i className="bi bi-stopwatch" style={{ color: 'var(--nerve-secondary)' }}></i>
                          </div>
                          <span>Focus Sessions</span>
                        </div>
                        <span className="fw-bold">306</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="nerve-card p-4 h-100">
                    <h5 className="fw-bold mb-4">Course Performance</h5>
                    <div className="d-flex flex-column gap-3">
                      {[
                        { course: 'CS 201', grade: 'A+', color: '#8b5cf6' },
                        { course: 'MATH 301', grade: 'A', color: '#10b981' },
                        { course: 'PHY 201', grade: 'A-', color: '#6366f1' },
                        { course: 'ECON 101', grade: 'B+', color: '#0ea5e9' },
                      ].map((course) => (
                        <div key={course.course} className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-2">
                            <div 
                              className="rounded-2"
                              style={{ width: '8px', height: '32px', background: course.color }}
                            ></div>
                            <span>{course.course}</span>
                          </div>
                          <span className="badge" style={{ background: `${course.color}20`, color: course.color }}>
                            {course.grade}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-top" style={{ borderColor: 'var(--border)' }}>
                      <div className="d-flex justify-content-between">
                        <span style={{ color: 'var(--muted-foreground)' }}>Current GPA</span>
                        <span className="fw-bold fs-4" style={{ color: 'var(--nerve-primary)' }}>3.7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="nerve-card p-4 mb-4">
                <h5 className="fw-bold mb-4">Quick Info</h5>
                <div className="d-flex flex-column gap-3">
                  <div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Email</div>
                    <div>john.doe@university.edu</div>
                  </div>
                  <div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Student ID</div>
                    <div>2024-CS-1234</div>
                  </div>
                  <div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Major</div>
                    <div>Computer Science</div>
                  </div>
                  <div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Year</div>
                    <div>Junior (3rd Year)</div>
                  </div>
                  <div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Member Since</div>
                    <div>September 2023</div>
                  </div>
                </div>
              </div>

              <div className="nerve-card p-4">
                <h5 className="fw-bold mb-4">Recent Achievements</h5>
                <div className="d-flex flex-column gap-3">
                  {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: '44px', height: '44px', background: `${achievement.color}20` }}
                      >
                        <i className={`bi ${achievement.icon}`} style={{ color: achievement.color }}></i>
                      </div>
                      <div>
                        <div className="fw-semibold small">{achievement.title}</div>
                        <div className="small" style={{ color: 'var(--muted-foreground)' }}>{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="row g-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="col-md-6 col-lg-4">
                <div 
                  className={`nerve-card p-4 h-100 ${!achievement.unlocked ? 'opacity-50' : ''}`}
                  style={{ position: 'relative' }}
                >
                  {!achievement.unlocked && (
                    <div className="position-absolute top-0 end-0 m-3">
                      <i className="bi bi-lock" style={{ color: 'var(--muted-foreground)' }}></i>
                    </div>
                  )}
                  <div 
                    className="rounded-3 d-flex align-items-center justify-content-center mb-3"
                    style={{ 
                      width: '64px', 
                      height: '64px', 
                      background: achievement.unlocked ? `${achievement.color}20` : 'var(--secondary)'
                    }}
                  >
                    <i 
                      className={`bi ${achievement.icon} fs-3`} 
                      style={{ color: achievement.unlocked ? achievement.color : 'var(--muted-foreground)' }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-1">{achievement.title}</h5>
                  <p className="small mb-2" style={{ color: 'var(--muted-foreground)' }}>{achievement.description}</p>
                  {achievement.unlocked && achievement.date && (
                    <div className="small" style={{ color: 'var(--nerve-success)' }}>
                      <i className="bi bi-check-circle me-1"></i>Unlocked {achievement.date}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="nerve-card p-4 mb-4">
                <h5 className="fw-bold mb-4">Personal Information</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">First Name</label>
                    <input type="text" className="form-control" defaultValue="John" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Last Name</label>
                    <input type="text" className="form-control" defaultValue="Doe" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Email</label>
                    <input type="email" className="form-control" defaultValue="john.doe@university.edu" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Student ID</label>
                    <input type="text" className="form-control" defaultValue="2024-CS-1234" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Bio</label>
                    <textarea className="form-control" rows={3} defaultValue="Computer Science student passionate about AI and web development." style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}></textarea>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="btn btn-nerve">Save Changes</button>
                </div>
              </div>

              <div className="nerve-card p-4">
                <h5 className="fw-bold mb-4">Notification Preferences</h5>
                <div className="d-flex flex-column gap-3">
                  {[
                    { id: 'deadline', label: 'Deadline Reminders', desc: 'Get notified about upcoming deadlines', checked: true },
                    { id: 'task', label: 'Task Notifications', desc: 'Notifications for new tasks and updates', checked: true },
                    { id: 'friend', label: 'Friend Activity', desc: 'When friends complete tasks or achievements', checked: false },
                    { id: 'email', label: 'Email Digest', desc: 'Weekly summary of your activity', checked: true },
                  ].map((setting) => (
                    <div key={setting.id} className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                      <div>
                        <div className="fw-semibold">{setting.label}</div>
                        <div className="small" style={{ color: 'var(--muted-foreground)' }}>{setting.desc}</div>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" defaultChecked={setting.checked} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="nerve-card p-4 mb-4">
                <h5 className="fw-bold mb-4">Account Actions</h5>
                <div className="d-flex flex-column gap-2">
                  <button className="btn btn-nerve-outline text-start">
                    <i className="bi bi-key me-2"></i>Change Password
                  </button>
                  <button className="btn btn-nerve-outline text-start">
                    <i className="bi bi-download me-2"></i>Export Data
                  </button>
                  <button className="btn text-start" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--nerve-danger)', border: 'none' }}>
                    <i className="bi bi-trash me-2"></i>Delete Account
                  </button>
                </div>
              </div>

              <div className="nerve-card p-4">
                <h5 className="fw-bold mb-4">Connected Accounts</h5>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-google fs-5"></i>
                      <span>Google</span>
                    </div>
                    <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--nerve-success)' }}>Connected</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-calendar3 fs-5"></i>
                      <span>Calendar</span>
                    </div>
                    <button className="btn btn-sm btn-nerve-outline">Connect</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
