'use client'

import { useState } from 'react'
import Header from '@/components/dashboard/Header'

interface Task {
  id: number
  title: string
  description: string
  course: string
  courseColor: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in-progress' | 'completed'
  tags: string[]
}

const initialTasks: Task[] = [
  { id: 1, title: 'Submit Physics Lab Report', description: 'Complete analysis of pendulum experiment data', course: 'PHY 201', courseColor: '#6366f1', dueDate: '2024-01-15', priority: 'high', status: 'in-progress', tags: ['lab', 'writing'] },
  { id: 2, title: 'Read Chapter 5 - Macroeconomics', description: 'Focus on GDP calculation methods', course: 'ECON 101', courseColor: '#0ea5e9', dueDate: '2024-01-16', priority: 'medium', status: 'todo', tags: ['reading'] },
  { id: 3, title: 'Complete Math Problem Set #4', description: 'Differential equations practice', course: 'MATH 301', courseColor: '#10b981', dueDate: '2024-01-17', priority: 'high', status: 'todo', tags: ['homework'] },
  { id: 4, title: 'Prepare Chemistry Quiz Notes', description: 'Review organic chemistry reactions', course: 'CHEM 102', courseColor: '#f59e0b', dueDate: '2024-01-18', priority: 'low', status: 'todo', tags: ['study', 'quiz'] },
  { id: 5, title: 'Essay Draft - English Literature', description: 'First draft of Shakespeare analysis', course: 'ENG 201', courseColor: '#ec4899', dueDate: '2024-01-19', priority: 'medium', status: 'todo', tags: ['writing', 'essay'] },
  { id: 6, title: 'Code Review - Project Alpha', description: 'Review teammate code for CS project', course: 'CS 201', courseColor: '#8b5cf6', dueDate: '2024-01-15', priority: 'high', status: 'completed', tags: ['coding', 'teamwork'] },
  { id: 7, title: 'Physics Homework #6', description: 'Wave mechanics problems', course: 'PHY 201', courseColor: '#6366f1', dueDate: '2024-01-14', priority: 'medium', status: 'completed', tags: ['homework'] },
  { id: 8, title: 'Group Project Meeting', description: 'Discuss presentation outline', course: 'ECON 101', courseColor: '#0ea5e9', dueDate: '2024-01-13', priority: 'low', status: 'completed', tags: ['meeting', 'teamwork'] },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter === 'all' || task.status === filter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.course.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })

  const todoTasks = filteredTasks.filter(t => t.status === 'todo')
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress')
  const completedTasks = filteredTasks.filter(t => t.status === 'completed')

  const toggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'todo' : 'completed'
        return { ...task, status: newStatus }
      }
      return task
    }))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'var(--nerve-danger)'
      case 'medium': return 'var(--nerve-warning)'
      case 'low': return 'var(--nerve-success)'
      default: return 'var(--muted-foreground)'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div>
      <Header 
        title="Tasks"
        subtitle={`${tasks.filter(t => t.status !== 'completed').length} pending tasks`}
      />

      <div className="p-4">
        {/* Stats */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div 
              className={`nerve-card p-3 cursor-pointer ${filter === 'all' ? 'nerve-glow' : ''}`}
              onClick={() => setFilter('all')}
              style={{ cursor: 'pointer', borderColor: filter === 'all' ? 'var(--nerve-primary)' : 'var(--border)' }}
            >
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(99, 102, 241, 0.1)' }}>
                  <i className="bi bi-list-task" style={{ color: 'var(--nerve-primary)' }}></i>
                </div>
                <div>
                  <div className="fs-5 fw-bold">{tasks.length}</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>All Tasks</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div 
              className={`nerve-card p-3 cursor-pointer ${filter === 'todo' ? 'nerve-glow' : ''}`}
              onClick={() => setFilter('todo')}
              style={{ cursor: 'pointer', borderColor: filter === 'todo' ? 'var(--nerve-secondary)' : 'var(--border)' }}
            >
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(14, 165, 233, 0.1)' }}>
                  <i className="bi bi-circle" style={{ color: 'var(--nerve-secondary)' }}></i>
                </div>
                <div>
                  <div className="fs-5 fw-bold">{tasks.filter(t => t.status === 'todo').length}</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>To Do</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div 
              className={`nerve-card p-3 cursor-pointer ${filter === 'in-progress' ? 'nerve-glow' : ''}`}
              onClick={() => setFilter('in-progress')}
              style={{ cursor: 'pointer', borderColor: filter === 'in-progress' ? '#f59e0b' : 'var(--border)' }}
            >
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(245, 158, 11, 0.1)' }}>
                  <i className="bi bi-arrow-repeat" style={{ color: '#f59e0b' }}></i>
                </div>
                <div>
                  <div className="fs-5 fw-bold">{tasks.filter(t => t.status === 'in-progress').length}</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>In Progress</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div 
              className={`nerve-card p-3 cursor-pointer ${filter === 'completed' ? 'nerve-glow' : ''}`}
              onClick={() => setFilter('completed')}
              style={{ cursor: 'pointer', borderColor: filter === 'completed' ? 'var(--nerve-success)' : 'var(--border)' }}
            >
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: 'rgba(16, 185, 129, 0.1)' }}>
                  <i className="bi bi-check-circle" style={{ color: 'var(--nerve-success)' }}></i>
                </div>
                <div>
                  <div className="fs-5 fw-bold">{tasks.filter(t => t.status === 'completed').length}</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="nerve-card p-3 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="position-relative">
                <i className="bi bi-search position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }}></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as typeof priorityFilter)}
                style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            <div className="col-md-4 text-md-end">
              <button className="btn btn-nerve" onClick={() => setShowAddModal(true)}>
                <i className="bi bi-plus-lg me-2"></i>Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Kanban View */}
        <div className="row g-4">
          {/* To Do Column */}
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="rounded-circle" style={{ width: '12px', height: '12px', background: 'var(--nerve-secondary)' }}></span>
              <h6 className="fw-bold mb-0">To Do</h6>
              <span className="badge rounded-pill" style={{ background: 'var(--secondary)', color: 'var(--muted-foreground)' }}>{todoTasks.length}</span>
            </div>
            <div className="d-flex flex-column gap-3">
              {todoTasks.map(task => (
                <TaskCard key={task.id} task={task} onToggle={toggleTaskStatus} getPriorityColor={getPriorityColor} formatDate={formatDate} />
              ))}
              {todoTasks.length === 0 && (
                <div className="nerve-card p-4 text-center" style={{ borderStyle: 'dashed' }}>
                  <i className="bi bi-inbox fs-2 d-block mb-2" style={{ color: 'var(--muted-foreground)' }}></i>
                  <p className="mb-0 small" style={{ color: 'var(--muted-foreground)' }}>No tasks to do</p>
                </div>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="rounded-circle" style={{ width: '12px', height: '12px', background: '#f59e0b' }}></span>
              <h6 className="fw-bold mb-0">In Progress</h6>
              <span className="badge rounded-pill" style={{ background: 'var(--secondary)', color: 'var(--muted-foreground)' }}>{inProgressTasks.length}</span>
            </div>
            <div className="d-flex flex-column gap-3">
              {inProgressTasks.map(task => (
                <TaskCard key={task.id} task={task} onToggle={toggleTaskStatus} getPriorityColor={getPriorityColor} formatDate={formatDate} />
              ))}
              {inProgressTasks.length === 0 && (
                <div className="nerve-card p-4 text-center" style={{ borderStyle: 'dashed' }}>
                  <i className="bi bi-hourglass fs-2 d-block mb-2" style={{ color: 'var(--muted-foreground)' }}></i>
                  <p className="mb-0 small" style={{ color: 'var(--muted-foreground)' }}>No tasks in progress</p>
                </div>
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="rounded-circle" style={{ width: '12px', height: '12px', background: 'var(--nerve-success)' }}></span>
              <h6 className="fw-bold mb-0">Completed</h6>
              <span className="badge rounded-pill" style={{ background: 'var(--secondary)', color: 'var(--muted-foreground)' }}>{completedTasks.length}</span>
            </div>
            <div className="d-flex flex-column gap-3">
              {completedTasks.map(task => (
                <TaskCard key={task.id} task={task} onToggle={toggleTaskStatus} getPriorityColor={getPriorityColor} formatDate={formatDate} />
              ))}
              {completedTasks.length === 0 && (
                <div className="nerve-card p-4 text-center" style={{ borderStyle: 'dashed' }}>
                  <i className="bi bi-emoji-smile fs-2 d-block mb-2" style={{ color: 'var(--muted-foreground)' }}></i>
                  <p className="mb-0 small" style={{ color: 'var(--muted-foreground)' }}>No completed tasks</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddModal && (
          <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowAddModal(false)}>
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content border-0 shadow-lg" style={{ background: 'var(--card)' }}>
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Add New Task</h5>
                  <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Task Title</label>
                    <input type="text" className="form-control" placeholder="What needs to be done?" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Description</label>
                    <textarea className="form-control" rows={3} placeholder="Add details..." style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}></textarea>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Course</label>
                      <select className="form-select" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
                        <option>PHY 201</option>
                        <option>ECON 101</option>
                        <option>MATH 301</option>
                        <option>CHEM 102</option>
                        <option>ENG 201</option>
                        <option>CS 201</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Priority</label>
                      <select className="form-select" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Due Date</label>
                    <input type="date" className="form-control" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-nerve-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button className="btn btn-nerve">Add Task</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TaskCard({ 
  task, 
  onToggle, 
  getPriorityColor, 
  formatDate 
}: { 
  task: Task
  onToggle: (id: number) => void
  getPriorityColor: (priority: string) => string
  formatDate: (date: string) => string
}) {
  return (
    <div className={`nerve-card p-3 ${task.status === 'completed' ? 'opacity-75' : ''}`}>
      <div className="d-flex gap-3">
        <button 
          onClick={() => onToggle(task.id)}
          className="btn p-0 border-0 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ 
            width: '24px', 
            height: '24px', 
            background: task.status === 'completed' ? 'var(--nerve-success)' : 'transparent',
            border: task.status === 'completed' ? 'none' : '2px solid var(--border)'
          }}
        >
          {task.status === 'completed' && <i className="bi bi-check text-white" style={{ fontSize: '0.875rem' }}></i>}
        </button>
        <div className="flex-grow-1 min-width-0">
          <h6 className={`mb-1 fw-semibold ${task.status === 'completed' ? 'text-decoration-line-through' : ''}`} style={{ color: task.status === 'completed' ? 'var(--muted-foreground)' : 'var(--foreground)' }}>
            {task.title}
          </h6>
          <p className="small mb-2 text-truncate" style={{ color: 'var(--muted-foreground)' }}>{task.description}</p>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="badge small" style={{ background: `${task.courseColor}20`, color: task.courseColor }}>
              {task.course}
            </span>
            <span className="badge small" style={{ background: `${getPriorityColor(task.priority)}15`, color: getPriorityColor(task.priority) }}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top" style={{ borderColor: 'var(--border)' }}>
        <div className="small d-flex align-items-center gap-1" style={{ color: 'var(--muted-foreground)' }}>
          <i className="bi bi-calendar-event"></i>
          {formatDate(task.dueDate)}
        </div>
        <div className="d-flex gap-1">
          {task.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="badge" style={{ background: 'var(--secondary)', color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
