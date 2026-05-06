'use client'

import { useState } from 'react'
import Header from '@/components/dashboard/Header'

interface Course {
  id: number
  name: string
  code: string
  instructor: string
  email: string
  schedule: string
  location: string
  progress: number
  grade: string
  color: string
  credits: number
  assignments: number
  completedAssignments: number
}

const initialCourses: Course[] = [
  { 
    id: 1, 
    name: 'Physics 201', 
    code: 'PHY 201', 
    instructor: 'Dr. Sarah Mitchell',
    email: 'smitchell@university.edu',
    schedule: 'Mon, Wed, Fri 9:00 AM - 10:15 AM',
    location: 'Science Building 301',
    progress: 75, 
    grade: 'A-',
    color: '#6366f1',
    credits: 4,
    assignments: 12,
    completedAssignments: 9
  },
  { 
    id: 2, 
    name: 'Economics 101', 
    code: 'ECON 101', 
    instructor: 'Prof. James Wilson',
    email: 'jwilson@university.edu',
    schedule: 'Tue, Thu 11:00 AM - 12:30 PM',
    location: 'Business Hall 205',
    progress: 60, 
    grade: 'B+',
    color: '#0ea5e9',
    credits: 3,
    assignments: 8,
    completedAssignments: 5
  },
  { 
    id: 3, 
    name: 'Mathematics 301', 
    code: 'MATH 301', 
    instructor: 'Dr. Emily Chen',
    email: 'echen@university.edu',
    schedule: 'Mon, Wed 2:00 PM - 3:30 PM',
    location: 'Math Building 102',
    progress: 85, 
    grade: 'A',
    color: '#10b981',
    credits: 4,
    assignments: 15,
    completedAssignments: 13
  },
  { 
    id: 4, 
    name: 'Chemistry 102', 
    code: 'CHEM 102', 
    instructor: 'Dr. Michael Brown',
    email: 'mbrown@university.edu',
    schedule: 'Thu 10:00 AM - 12:00 PM',
    location: 'Chemistry Lab 401',
    progress: 45, 
    grade: 'B',
    color: '#f59e0b',
    credits: 4,
    assignments: 10,
    completedAssignments: 4
  },
  { 
    id: 5, 
    name: 'English 201', 
    code: 'ENG 201', 
    instructor: 'Prof. Lisa Anderson',
    email: 'landerson@university.edu',
    schedule: 'Tue, Thu 2:00 PM - 3:15 PM',
    location: 'Humanities 108',
    progress: 70, 
    grade: 'A-',
    color: '#ec4899',
    credits: 3,
    assignments: 6,
    completedAssignments: 4
  },
  { 
    id: 6, 
    name: 'Computer Science 201', 
    code: 'CS 201', 
    instructor: 'Dr. David Park',
    email: 'dpark@university.edu',
    schedule: 'Mon, Wed, Fri 11:00 AM - 12:00 PM',
    location: 'Tech Center 205',
    progress: 90, 
    grade: 'A+',
    color: '#8b5cf6',
    credits: 4,
    assignments: 14,
    completedAssignments: 13
  },
]

export default function CoursesPage() {
  const [courses] = useState<Course[]>(initialCourses)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showAddModal, setShowAddModal] = useState(false)

  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0)
  const averageProgress = Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)

  return (
    <div>
      <Header 
        title="My Courses"
        subtitle={`${courses.length} courses | ${totalCredits} credits`}
      />

      <div className="p-4">
        {/* Stats Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="nerve-card p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: 'rgba(99, 102, 241, 0.1)' }}>
                  <i className="bi bi-book fs-4" style={{ color: 'var(--nerve-primary)' }}></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold">{courses.length}</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>Active Courses</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="nerve-card p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)' }}>
                  <i className="bi bi-mortarboard fs-4" style={{ color: 'var(--nerve-success)' }}></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold">{totalCredits}</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>Total Credits</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="nerve-card p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: 'rgba(14, 165, 233, 0.1)' }}>
                  <i className="bi bi-graph-up fs-4" style={{ color: 'var(--nerve-secondary)' }}></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold">{averageProgress}%</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>Avg. Progress</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="nerve-card p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: 'rgba(245, 158, 11, 0.1)' }}>
                  <i className="bi bi-award fs-4" style={{ color: '#f59e0b' }}></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold">3.7</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>Current GPA</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-2">
            <button 
              className={`btn ${viewMode === 'grid' ? 'btn-nerve' : 'btn-nerve-outline'}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="bi bi-grid-3x3-gap"></i>
            </button>
            <button 
              className={`btn ${viewMode === 'list' ? 'btn-nerve' : 'btn-nerve-outline'}`}
              onClick={() => setViewMode('list')}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
          <button className="btn btn-nerve" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-plus-lg me-2"></i>Add Course
          </button>
        </div>

        {/* Courses Grid/List */}
        {viewMode === 'grid' ? (
          <div className="row g-4">
            {courses.map((course) => (
              <div key={course.id} className="col-md-6 col-lg-4">
                <div 
                  className="nerve-card p-4 h-100 cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div 
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{ width: '48px', height: '48px', background: `${course.color}20` }}
                    >
                      <i className="bi bi-book fs-4" style={{ color: course.color }}></i>
                    </div>
                    <span className="badge fs-6 fw-bold" style={{ background: `${course.color}20`, color: course.color }}>
                      {course.grade}
                    </span>
                  </div>
                  <h5 className="fw-bold mb-1">{course.name}</h5>
                  <p className="small mb-3" style={{ color: 'var(--muted-foreground)' }}>{course.code} | {course.credits} credits</p>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="small" style={{ color: 'var(--muted-foreground)' }}>Progress</span>
                      <span className="small fw-semibold">{course.progress}%</span>
                    </div>
                    <div className="progress" style={{ height: '6px', background: 'var(--border)' }}>
                      <div 
                        className="progress-bar" 
                        style={{ width: `${course.progress}%`, background: course.color }}
                      ></div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 small" style={{ color: 'var(--muted-foreground)' }}>
                    <i className="bi bi-person"></i>
                    <span>{course.instructor}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 small mt-1" style={{ color: 'var(--muted-foreground)' }}>
                    <i className="bi bi-clock"></i>
                    <span>{course.schedule.split(' ').slice(0, 3).join(' ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="nerve-card">
            <div className="table-responsive">
              <table className="table table-hover mb-0" style={{ color: 'var(--foreground)' }}>
                <thead style={{ background: 'var(--secondary)' }}>
                  <tr>
                    <th className="border-0 py-3 px-4">Course</th>
                    <th className="border-0 py-3">Instructor</th>
                    <th className="border-0 py-3">Schedule</th>
                    <th className="border-0 py-3">Progress</th>
                    <th className="border-0 py-3">Grade</th>
                    <th className="border-0 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} onClick={() => setSelectedCourse(course)} style={{ cursor: 'pointer' }}>
                      <td className="py-3 px-4">
                        <div className="d-flex align-items-center gap-3">
                          <div 
                            className="rounded-2 d-flex align-items-center justify-content-center"
                            style={{ width: '40px', height: '40px', background: `${course.color}20` }}
                          >
                            <i className="bi bi-book" style={{ color: course.color }}></i>
                          </div>
                          <div>
                            <div className="fw-semibold">{course.name}</div>
                            <div className="small" style={{ color: 'var(--muted-foreground)' }}>{course.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">{course.instructor}</td>
                      <td className="py-3 small" style={{ color: 'var(--muted-foreground)' }}>{course.schedule.split(' ').slice(0, 3).join(' ')}</td>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div className="progress flex-grow-1" style={{ height: '6px', width: '100px', background: 'var(--border)' }}>
                            <div 
                              className="progress-bar" 
                              style={{ width: `${course.progress}%`, background: course.color }}
                            ></div>
                          </div>
                          <span className="small">{course.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="badge" style={{ background: `${course.color}20`, color: course.color }}>
                          {course.grade}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="btn btn-sm p-1 border-0" style={{ background: 'none', color: 'var(--muted-foreground)' }}>
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setSelectedCourse(null)}>
            <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content border-0 shadow-lg" style={{ background: 'var(--card)' }}>
                <div className="modal-header border-0 pb-0">
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{ width: '56px', height: '56px', background: `${selectedCourse.color}20` }}
                    >
                      <i className="bi bi-book fs-3" style={{ color: selectedCourse.color }}></i>
                    </div>
                    <div>
                      <h4 className="mb-0 fw-bold">{selectedCourse.name}</h4>
                      <p className="mb-0" style={{ color: 'var(--muted-foreground)' }}>{selectedCourse.code} | {selectedCourse.credits} credits</p>
                    </div>
                  </div>
                  <button className="btn-close" onClick={() => setSelectedCourse(null)}></button>
                </div>
                <div className="modal-body pt-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                        <h6 className="fw-semibold mb-3"><i className="bi bi-person me-2"></i>Instructor</h6>
                        <p className="mb-1 fw-medium">{selectedCourse.instructor}</p>
                        <p className="mb-0 small" style={{ color: 'var(--nerve-primary)' }}>{selectedCourse.email}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                        <h6 className="fw-semibold mb-3"><i className="bi bi-clock me-2"></i>Schedule</h6>
                        <p className="mb-1">{selectedCourse.schedule}</p>
                        <p className="mb-0 small" style={{ color: 'var(--muted-foreground)' }}>{selectedCourse.location}</p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="fw-semibold mb-0"><i className="bi bi-graph-up me-2"></i>Progress</h6>
                          <span className="badge fs-6" style={{ background: `${selectedCourse.color}20`, color: selectedCourse.color }}>
                            Grade: {selectedCourse.grade}
                          </span>
                        </div>
                        <div className="progress mb-2" style={{ height: '12px', background: 'var(--border)' }}>
                          <div 
                            className="progress-bar" 
                            style={{ width: `${selectedCourse.progress}%`, background: selectedCourse.color }}
                          ></div>
                        </div>
                        <div className="d-flex justify-content-between small" style={{ color: 'var(--muted-foreground)' }}>
                          <span>{selectedCourse.completedAssignments} of {selectedCourse.assignments} assignments completed</span>
                          <span>{selectedCourse.progress}% complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-nerve-outline" onClick={() => setSelectedCourse(null)}>Close</button>
                  <button className="btn btn-nerve">
                    <i className="bi bi-pencil me-2"></i>Edit Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Course Modal */}
        {showAddModal && (
          <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowAddModal(false)}>
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content border-0 shadow-lg" style={{ background: 'var(--card)' }}>
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Add New Course</h5>
                  <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Course Name</label>
                    <input type="text" className="form-control" placeholder="e.g., Introduction to Psychology" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Course Code</label>
                      <input type="text" className="form-control" placeholder="e.g., PSY 101" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Credits</label>
                      <input type="number" className="form-control" placeholder="3" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Instructor</label>
                    <input type="text" className="form-control" placeholder="Professor name" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Schedule</label>
                    <input type="text" className="form-control" placeholder="e.g., Mon, Wed 10:00 AM - 11:30 AM" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Color</label>
                    <div className="d-flex gap-2">
                      {['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'].map((color) => (
                        <button
                          key={color}
                          className="btn p-0 rounded-circle border-2"
                          style={{ width: '32px', height: '32px', background: color, border: 'none' }}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-nerve-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button className="btn btn-nerve">Add Course</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
