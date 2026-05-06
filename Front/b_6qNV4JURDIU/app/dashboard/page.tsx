'use client'

import Header from '@/components/dashboard/Header'
import Link from 'next/link'

const upcomingTasks = [
  { id: 1, title: 'Submit Physics Lab Report', course: 'PHY 201', dueDate: 'Today, 11:59 PM', priority: 'high' },
  { id: 2, title: 'Read Chapter 5 - Macroeconomics', course: 'ECON 101', dueDate: 'Tomorrow, 9:00 AM', priority: 'medium' },
  { id: 3, title: 'Complete Math Problem Set #4', course: 'MATH 301', dueDate: 'Wed, 5:00 PM', priority: 'high' },
  { id: 4, title: 'Prepare Chemistry Quiz Notes', course: 'CHEM 102', dueDate: 'Thu, 10:00 AM', priority: 'low' },
]

const courses = [
  { id: 1, name: 'Physics 201', code: 'PHY 201', progress: 75, color: '#6366f1', nextClass: 'Mon 9:00 AM' },
  { id: 2, name: 'Economics 101', code: 'ECON 101', progress: 60, color: '#0ea5e9', nextClass: 'Tue 11:00 AM' },
  { id: 3, name: 'Mathematics 301', code: 'MATH 301', progress: 85, color: '#10b981', nextClass: 'Wed 2:00 PM' },
  { id: 4, name: 'Chemistry 102', code: 'CHEM 102', progress: 45, color: '#f59e0b', nextClass: 'Thu 10:00 AM' },
]

const recentActivity = [
  { id: 1, action: 'Completed task', item: 'Essay Draft for ENG 201', time: '2 hours ago', icon: 'bi-check-circle-fill', color: 'var(--nerve-success)' },
  { id: 2, action: 'Started timer', item: '25 min focus session', time: '3 hours ago', icon: 'bi-stopwatch-fill', color: 'var(--nerve-primary)' },
  { id: 3, action: 'Added course', item: 'Chemistry 102', time: '1 day ago', icon: 'bi-plus-circle-fill', color: 'var(--nerve-secondary)' },
  { id: 4, action: 'Earned badge', item: '7-day streak!', time: '2 days ago', icon: 'bi-award-fill', color: '#f59e0b' },
]

export default function DashboardPage() {
  const today = new Date()
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div>
      <Header 
        title={`${greeting}, John!`}
        subtitle={today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      />
      
      <div className="p-4">
        {/* Stats Overview */}
        <div className="row g-4 mb-4">
          {[
            { label: 'Tasks Due Today', value: '4', icon: 'bi-check2-square', color: 'var(--nerve-primary)', change: '+2 from yesterday' },
            { label: 'Study Hours This Week', value: '18.5h', icon: 'bi-clock', color: 'var(--nerve-secondary)', change: '+2.5h from last week' },
            { label: 'Current Streak', value: '7 days', icon: 'bi-fire', color: '#f59e0b', change: 'Personal best!' },
            { label: 'Completion Rate', value: '87%', icon: 'bi-graph-up-arrow', color: 'var(--nerve-success)', change: '+5% this month' },
          ].map((stat, i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <div className="nerve-card p-4 h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div 
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: '48px', height: '48px', background: `${stat.color}15` }}
                  >
                    <i className={`bi ${stat.icon} fs-4`} style={{ color: stat.color }}></i>
                  </div>
                </div>
                <div className="fs-3 fw-bold mb-1">{stat.value}</div>
                <div className="small" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</div>
                <div className="small mt-2" style={{ color: 'var(--nerve-success)' }}>
                  <i className="bi bi-arrow-up me-1"></i>{stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Upcoming Tasks */}
          <div className="col-lg-8">
            <div className="nerve-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Upcoming Tasks</h5>
                <Link href="/dashboard/tasks" className="btn btn-sm btn-nerve-outline">View All</Link>
              </div>
              <div className="d-flex flex-column gap-3">
                {upcomingTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`d-flex align-items-center gap-3 p-3 rounded-3 priority-${task.priority}`}
                    style={{ background: 'var(--secondary)' }}
                  >
                    <button 
                      className="btn p-0 border-0 rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '24px', height: '24px', background: 'transparent', border: '2px solid var(--border)' }}
                    >
                    </button>
                    <div className="flex-grow-1">
                      <div className="fw-medium">{task.title}</div>
                      <div className="small d-flex align-items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
                        <span>{task.course}</span>
                        <span>|</span>
                        <span className={task.priority === 'high' ? 'text-danger' : ''}>
                          <i className="bi bi-clock me-1"></i>{task.dueDate}
                        </span>
                      </div>
                    </div>
                    <span 
                      className={`badge rounded-pill px-2 py-1 ${
                        task.priority === 'high' ? '' : task.priority === 'medium' ? '' : ''
                      }`}
                      style={{ 
                        background: task.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : task.priority === 'medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: task.priority === 'high' ? 'var(--nerve-danger)' : task.priority === 'medium' ? 'var(--nerve-warning)' : 'var(--nerve-success)'
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            {/* Quick Timer */}
            <div className="nerve-card p-4 text-center nerve-gradient">
              <div className="text-white">
                <i className="bi bi-stopwatch fs-1 mb-3 d-block"></i>
                <div className="display-4 fw-bold mb-2">25:00</div>
                <p className="mb-3 opacity-75">Ready to focus?</p>
                <Link href="/dashboard/timer" className="btn px-4 py-2" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <i className="bi bi-play-fill me-2"></i>Start Session
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="nerve-card p-4">
              <h5 className="fw-bold mb-4">Recent Activity</h5>
              <div className="d-flex flex-column gap-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="d-flex align-items-start gap-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '36px', height: '36px', background: `${activity.color}15` }}
                    >
                      <i className={`bi ${activity.icon}`} style={{ color: activity.color }}></i>
                    </div>
                    <div className="flex-grow-1 min-width-0">
                      <div className="small fw-medium">{activity.action}</div>
                      <div className="small text-truncate" style={{ color: 'var(--muted-foreground)' }}>{activity.item}</div>
                    </div>
                    <div className="small flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-4">
          <div className="nerve-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Your Courses</h5>
              <Link href="/dashboard/courses" className="btn btn-sm btn-nerve-outline">View All</Link>
            </div>
            <div className="row g-3">
              {courses.map((course) => (
                <div key={course.id} className="col-md-6 col-lg-3">
                  <div 
                    className="p-3 rounded-3 h-100"
                    style={{ background: 'var(--secondary)', borderLeft: `4px solid ${course.color}` }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <div className="fw-semibold">{course.name}</div>
                        <div className="small" style={{ color: 'var(--muted-foreground)' }}>{course.code}</div>
                      </div>
                      <span className="badge" style={{ background: `${course.color}20`, color: course.color }}>
                        {course.progress}%
                      </span>
                    </div>
                    <div className="progress mb-2" style={{ height: '4px', background: 'var(--border)' }}>
                      <div 
                        className="progress-bar" 
                        style={{ width: `${course.progress}%`, background: course.color }}
                      ></div>
                    </div>
                    <div className="small d-flex align-items-center" style={{ color: 'var(--muted-foreground)' }}>
                      <i className="bi bi-calendar-event me-1"></i>
                      Next: {course.nextClass}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
