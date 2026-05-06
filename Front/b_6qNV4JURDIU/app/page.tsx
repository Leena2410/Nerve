'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg fixed-top" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <Link href="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4" style={{ textDecoration: 'none' }}>
            <div className="nerve-gradient rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
              <i className="bi bi-lightning-charge-fill text-white"></i>
            </div>
            <span className="nerve-gradient-text">Nerve</span>
          </Link>
          
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link px-3" href="#features" style={{ color: 'var(--foreground)' }}>Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#how-it-works" style={{ color: 'var(--foreground)' }}>How It Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#testimonials" style={{ color: 'var(--foreground)' }}>Testimonials</a>
              </li>
            </ul>
            <div className="d-flex gap-2">
              <Link href="/login" className="btn btn-nerve-outline">Log In</Link>
              <Link href="/dashboard" className="btn btn-nerve">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="neural-bg pt-5" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container pt-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge rounded-pill px-3 py-2 mb-4" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--nerve-primary)' }}>
                <i className="bi bi-stars me-1"></i> Your Academic Success Starts Here
              </span>
              <h1 className="display-3 fw-bold mb-4 text-balance" style={{ lineHeight: 1.1 }}>
                Stay <span className="nerve-gradient-text">Connected</span> to Your Goals
              </h1>
              <p className="lead mb-4" style={{ color: 'var(--muted-foreground)', fontSize: '1.25rem', lineHeight: 1.6 }}>
                Nerve is the ultimate student planner that keeps you focused, organized, and ahead of deadlines. 
                Manage courses, track tasks, and collaborate with friends—all in one powerful platform.
              </p>
              <div className="d-flex gap-3 flex-wrap mb-5">
                <Link href="/dashboard" className="btn btn-nerve btn-lg px-5">
                  <i className="bi bi-rocket-takeoff me-2"></i>
                  Start Free
                </Link>
                <a href="#features" className="btn btn-nerve-outline btn-lg px-4">
                  Learn More
                </a>
              </div>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="rounded-circle border border-3 border-white"
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%))`,
                        marginLeft: i > 1 ? '-10px' : '0'
                      }}
                    />
                  ))}
                </div>
                <div>
                  <div className="fw-bold" style={{ color: 'var(--foreground)' }}>10,000+ Students</div>
                  <div style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>Already crushing their goals</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <div className="nerve-card p-4 nerve-glow" style={{ transform: 'rotate(-2deg)' }}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0 fw-semibold">Today&apos;s Tasks</h5>
                    <span className="badge rounded-pill" style={{ background: 'var(--nerve-primary)', color: 'white' }}>4 pending</span>
                  </div>
                  {[
                    { title: 'Complete Physics Lab Report', course: 'PHY 201', priority: 'high', done: true },
                    { title: 'Read Chapter 5 - Economics', course: 'ECON 101', priority: 'medium', done: false },
                    { title: 'Submit Math Assignment', course: 'MATH 301', priority: 'high', done: false },
                    { title: 'Study for Chemistry Quiz', course: 'CHEM 102', priority: 'low', done: false },
                  ].map((task, i) => (
                    <div key={i} className={`d-flex align-items-center gap-3 p-3 rounded-3 mb-2 priority-${task.priority}`} style={{ background: 'var(--secondary)' }}>
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          background: task.done ? 'var(--nerve-success)' : 'transparent',
                          border: task.done ? 'none' : '2px solid var(--border)'
                        }}
                      >
                        {task.done && <i className="bi bi-check text-white"></i>}
                      </div>
                      <div className="flex-grow-1">
                        <div className={`fw-medium ${task.done ? 'text-decoration-line-through' : ''}`} style={{ color: task.done ? 'var(--muted-foreground)' : 'var(--foreground)' }}>
                          {task.title}
                        </div>
                        <small style={{ color: 'var(--muted-foreground)' }}>{task.course}</small>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Floating elements */}
                <div className="position-absolute nerve-card p-3 shadow-lg" style={{ top: '-20px', right: '-20px', transform: 'rotate(5deg)' }}>
                  <div className="d-flex align-items-center gap-2">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: 'rgba(16, 185, 129, 0.1)' }}>
                      <i className="bi bi-clock" style={{ color: 'var(--nerve-success)' }}></i>
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '1.25rem' }}>25:00</div>
                      <small style={{ color: 'var(--muted-foreground)' }}>Focus Timer</small>
                    </div>
                  </div>
                </div>
                <div className="position-absolute nerve-card p-3 shadow-lg" style={{ bottom: '40px', left: '-30px', transform: 'rotate(-5deg)' }}>
                  <div className="d-flex align-items-center gap-2">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.1)' }}>
                      <i className="bi bi-graph-up-arrow" style={{ color: 'var(--nerve-primary)' }}></i>
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '1.25rem' }}>87%</div>
                      <small style={{ color: 'var(--muted-foreground)' }}>Productivity</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5" style={{ background: 'var(--secondary)' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--nerve-primary)' }}>
              Features
            </span>
            <h2 className="display-5 fw-bold mb-3">Everything You Need to <span className="nerve-gradient-text">Succeed</span></h2>
            <p className="lead mx-auto" style={{ maxWidth: '600px', color: 'var(--muted-foreground)' }}>
              Nerve combines powerful tools designed specifically for students to maximize productivity and academic success.
            </p>
          </div>
          
          <div className="row g-4">
            {[
              {
                icon: 'bi-kanban',
                title: 'Task Management',
                description: 'Organize assignments, projects, and daily tasks with smart prioritization. Never miss a deadline again.',
                color: '#6366f1'
              },
              {
                icon: 'bi-book',
                title: 'Course Organizer',
                description: 'Keep all your courses, professors, and class schedules in one place. Track grades and progress effortlessly.',
                color: '#0ea5e9'
              },
              {
                icon: 'bi-calendar3',
                title: 'Smart Calendar',
                description: 'Visualize your week at a glance. Auto-sync with your class schedule and set smart reminders.',
                color: '#22d3ee'
              },
              {
                icon: 'bi-stopwatch',
                title: 'Focus Timer',
                description: 'Boost concentration with Pomodoro-style study sessions. Track your study hours and build consistency.',
                color: '#10b981'
              },
              {
                icon: 'bi-people',
                title: 'Study Groups',
                description: 'Connect with classmates, share notes, and collaborate on group projects seamlessly.',
                color: '#f59e0b'
              },
              {
                icon: 'bi-bell',
                title: 'Smart Notifications',
                description: 'Get timely reminders for upcoming deadlines, exams, and study sessions. Stay ahead of your schedule.',
                color: '#ef4444'
              },
            ].map((feature, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="nerve-card h-100 p-4">
                  <div 
                    className="rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: '56px', height: '56px', background: `${feature.color}15` }}
                  >
                    <i className={`bi ${feature.icon} fs-4`} style={{ color: feature.color }}></i>
                  </div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p style={{ color: 'var(--muted-foreground)', marginBottom: 0 }}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--nerve-primary)' }}>
              How It Works
            </span>
            <h2 className="display-5 fw-bold mb-3">Get Started in <span className="nerve-gradient-text">Minutes</span></h2>
            <p className="lead mx-auto" style={{ maxWidth: '600px', color: 'var(--muted-foreground)' }}>
              Setting up Nerve is quick and easy. Start organizing your academic life in just three simple steps.
            </p>
          </div>
          
          <div className="row g-4 justify-content-center">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up with your email or university credentials. It takes less than a minute.',
                icon: 'bi-person-plus'
              },
              {
                step: '02',
                title: 'Add Your Courses',
                description: 'Input your class schedule, professors, and important dates. Import from your university if available.',
                icon: 'bi-journal-plus'
              },
              {
                step: '03',
                title: 'Start Achieving',
                description: 'Begin tracking tasks, setting goals, and watching your productivity soar.',
                icon: 'bi-trophy'
              },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <div className="text-center position-relative">
                  <div 
                    className="nerve-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-4 nerve-glow"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <i className={`bi ${item.icon} text-white fs-3`}></i>
                  </div>
                  {i < 2 && (
                    <div className="position-absolute d-none d-md-block" style={{ top: '40px', right: '-20%', width: '40%' }}>
                      <div style={{ borderTop: '2px dashed var(--border)' }}></div>
                    </div>
                  )}
                  <div className="nerve-gradient-text fw-bold mb-2" style={{ fontSize: '0.875rem' }}>STEP {item.step}</div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p style={{ color: 'var(--muted-foreground)' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-5" style={{ background: 'var(--secondary)' }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--nerve-primary)' }}>
                Dashboard
              </span>
              <h2 className="display-5 fw-bold mb-4">Your <span className="nerve-gradient-text">Command Center</span></h2>
              <p className="lead mb-4" style={{ color: 'var(--muted-foreground)' }}>
                Get a bird&apos;s eye view of your academic life. Track progress, monitor deadlines, and stay motivated with insightful analytics.
              </p>
              <ul className="list-unstyled">
                {[
                  'Real-time progress tracking',
                  'Weekly productivity insights',
                  'Upcoming deadline alerts',
                  'Study streak tracking'
                ].map((item, i) => (
                  <li key={i} className="d-flex align-items-center gap-3 mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', background: 'var(--nerve-success)' }}>
                      <i className="bi bi-check text-white" style={{ fontSize: '0.875rem' }}></i>
                    </div>
                    <span style={{ color: 'var(--foreground)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-7">
              <div className="nerve-card p-4 nerve-glow">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>Tasks Completed</span>
                        <i className="bi bi-check-circle" style={{ color: 'var(--nerve-success)' }}></i>
                      </div>
                      <div className="fw-bold fs-3">24/30</div>
                      <div className="progress mt-2" style={{ height: '6px' }}>
                        <div className="progress-bar" style={{ width: '80%', background: 'var(--nerve-success)' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>Study Hours</span>
                        <i className="bi bi-clock" style={{ color: 'var(--nerve-primary)' }}></i>
                      </div>
                      <div className="fw-bold fs-3">18.5h</div>
                      <small style={{ color: 'var(--nerve-success)' }}>+2.5h from last week</small>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-semibold">Weekly Activity</span>
                        <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                          <option>This Week</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-end gap-2" style={{ height: '100px' }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                          <div key={day} className="flex-grow-1 text-center">
                            <div 
                              className="rounded-2 mx-auto mb-1"
                              style={{ 
                                width: '100%', 
                                maxWidth: '40px',
                                height: `${[60, 85, 45, 90, 70, 30, 50][i]}%`,
                                background: i === 3 ? 'var(--nerve-primary)' : 'var(--nerve-primary)',
                                opacity: i === 3 ? 1 : 0.3
                              }}
                            ></div>
                            <small style={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>{day}</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--nerve-primary)' }}>
              Testimonials
            </span>
            <h2 className="display-5 fw-bold mb-3">Loved by <span className="nerve-gradient-text">Students</span></h2>
            <p className="lead mx-auto" style={{ maxWidth: '600px', color: 'var(--muted-foreground)' }}>
              See what students from top universities are saying about Nerve.
            </p>
          </div>
          
          <div className="row g-4">
            {[
              {
                name: 'Sarah Chen',
                role: 'Computer Science, MIT',
                quote: 'Nerve completely transformed how I manage my coursework. The focus timer alone helped me increase my study efficiency by 40%.',
                avatar: 'SC'
              },
              {
                name: 'Marcus Johnson',
                role: 'Pre-Med, Stanford',
                quote: 'As a pre-med student, staying organized is crucial. Nerve helps me balance MCAT prep with my regular classes seamlessly.',
                avatar: 'MJ'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Business, NYU',
                quote: 'The study groups feature is amazing! My project team uses it to coordinate everything from meetings to deadlines.',
                avatar: 'ER'
              },
            ].map((testimonial, i) => (
              <div key={i} className="col-md-4">
                <div className="nerve-card h-100 p-4">
                  <div className="d-flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="bi bi-star-fill" style={{ color: '#f59e0b' }}></i>
                    ))}
                  </div>
                  <p className="mb-4" style={{ color: 'var(--foreground)', fontStyle: 'italic' }}>
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                      style={{ width: '48px', height: '48px', background: `linear-gradient(135deg, hsl(${i * 60 + 200}, 70%, 50%), hsl(${i * 60 + 230}, 70%, 60%))` }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="fw-bold">{testimonial.name}</div>
                      <small style={{ color: 'var(--muted-foreground)' }}>{testimonial.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 nerve-gradient">
        <div className="container py-5 text-center text-white">
          <h2 className="display-5 fw-bold mb-4">Ready to Take Control of Your Studies?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px', opacity: 0.9 }}>
            Join thousands of students who are already using Nerve to achieve their academic goals.
          </p>
          <Link 
            href="/dashboard" 
            className="btn btn-lg px-5 py-3 fw-semibold"
            style={{ background: 'white', color: 'var(--nerve-primary)', borderRadius: '0.5rem' }}
          >
            Get Started for Free <i className="bi bi-arrow-right ms-2"></i>
          </Link>
          <p className="mt-3 mb-0" style={{ opacity: 0.8, fontSize: '0.875rem' }}>
            No credit card required. Free forever for basic features.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5" style={{ background: 'var(--foreground)' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="nerve-gradient rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                  <i className="bi bi-lightning-charge-fill text-white"></i>
                </div>
                <span className="fs-4 fw-bold text-white">Nerve</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>
                The ultimate student planner for focused, organized, and successful students.
              </p>
              <div className="d-flex gap-3">
                {['twitter', 'instagram', 'linkedin', 'github'].map((social) => (
                  <a 
                    key={social} 
                    href="#"
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none' }}
                  >
                    <i className={`bi bi-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-bold mb-3">Product</h6>
              <ul className="list-unstyled">
                {['Features', 'Pricing', 'Changelog', 'Roadmap'].map((item) => (
                  <li key={item} className="mb-2">
                    <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-bold mb-3">Company</h6>
              <ul className="list-unstyled">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item} className="mb-2">
                    <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-bold mb-3">Resources</h6>
              <ul className="list-unstyled">
                {['Help Center', 'Community', 'Tutorials', 'API'].map((item) => (
                  <li key={item} className="mb-2">
                    <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-bold mb-3">Legal</h6>
              <ul className="list-unstyled">
                {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                  <li key={item} className="mb-2">
                    <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} className="my-4" />
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <p className="mb-0" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
              2024 Nerve. All rights reserved.
            </p>
            <p className="mb-0" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
              Made with <i className="bi bi-heart-fill" style={{ color: 'var(--nerve-primary)' }}></i> for students everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
