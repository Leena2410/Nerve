'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-vh-100 d-flex" style={{ background: 'var(--background)' }}>
      {/* Left Side - Form */}
      <div className="d-flex flex-column justify-content-center p-5" style={{ width: '50%', minWidth: '500px' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
          {/* Logo */}
          <Link href="/" className="d-flex align-items-center gap-2 mb-5 text-decoration-none">
            <div className="nerve-gradient rounded-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <i className="bi bi-lightning-charge-fill text-white"></i>
            </div>
            <span className="fs-4 fw-bold nerve-gradient-text">Nerve</span>
          </Link>

          <h2 className="fw-bold mb-2">{isLogin ? 'Welcome back!' : 'Create your account'}</h2>
          <p className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Start your journey to academic success'
            }
          </p>

          {/* Social Login */}
          <div className="d-flex gap-3 mb-4">
            <button className="btn flex-grow-1 py-2" style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}>
              <i className="bi bi-google me-2"></i>Google
            </button>
            <button className="btn flex-grow-1 py-2" style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}>
              <i className="bi bi-microsoft me-2"></i>Microsoft
            </button>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <hr className="flex-grow-1" style={{ borderColor: 'var(--border)' }} />
            <span className="small" style={{ color: 'var(--muted-foreground)' }}>or continue with email</span>
            <hr className="flex-grow-1" style={{ borderColor: 'var(--border)' }} />
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label small fw-semibold">First Name</label>
                  <input 
                    type="text" 
                    className="form-control py-2" 
                    placeholder="John"
                    style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold">Last Name</label>
                  <input 
                    type="text" 
                    className="form-control py-2" 
                    placeholder="Doe"
                    style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                  />
                </div>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label small fw-semibold">Email</label>
              <input 
                type="email" 
                className="form-control py-2" 
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label small fw-semibold">Password</label>
                {isLogin && (
                  <a href="#" className="small" style={{ color: 'var(--nerve-primary)' }}>Forgot password?</a>
                )}
              </div>
              <input 
                type="password" 
                className="form-control py-2" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>

            {!isLogin && (
              <div className="mb-3">
                <label className="form-label small fw-semibold">Confirm Password</label>
                <input 
                  type="password" 
                  className="form-control py-2" 
                  placeholder="Confirm your password"
                  style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                />
              </div>
            )}

            {isLogin && (
              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label small" htmlFor="remember">
                  Remember me for 30 days
                </label>
              </div>
            )}

            {!isLogin && (
              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="terms" />
                <label className="form-check-label small" htmlFor="terms">
                  I agree to the <a href="#" style={{ color: 'var(--nerve-primary)' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--nerve-primary)' }}>Privacy Policy</a>
                </label>
              </div>
            )}

            <Link href="/dashboard" className="btn btn-nerve w-100 py-2 mb-4">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Link>
          </form>

          <p className="text-center mb-0" style={{ color: 'var(--muted-foreground)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              className="btn btn-link p-0" 
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: 'var(--nerve-primary)', textDecoration: 'none' }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div 
        className="flex-grow-1 d-none d-lg-flex flex-column justify-content-center align-items-center p-5 neural-bg nerve-gradient"
        style={{ position: 'relative' }}
      >
        <div className="text-center text-white" style={{ maxWidth: '500px', zIndex: 1 }}>
          <div className="mb-4">
            <div 
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
              style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)' }}
            >
              <i className="bi bi-lightning-charge-fill fs-1"></i>
            </div>
          </div>
          <h2 className="display-6 fw-bold mb-4">Stay Connected to Your Goals</h2>
          <p className="lead opacity-75 mb-5">
            Join thousands of students who use Nerve to manage their academic life and achieve their full potential.
          </p>

          {/* Feature highlights */}
          <div className="d-flex flex-column gap-3">
            {[
              { icon: 'bi-check2-square', text: 'Smart Task Management' },
              { icon: 'bi-calendar3', text: 'Intuitive Calendar' },
              { icon: 'bi-stopwatch', text: 'Focus Timer' },
              { icon: 'bi-people', text: 'Study Groups' },
            ].map((feature, i) => (
              <div key={i} className="d-flex align-items-center gap-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)' }}
                >
                  <i className={`bi ${feature.icon}`}></i>
                </div>
                <span className="opacity-90">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-5 p-4 rounded-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <p className="mb-3 fst-italic">&quot;Nerve helped me improve my GPA by 0.5 points in just one semester. The focus timer is a game-changer!&quot;</p>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.3)' }}
              >
                SC
              </div>
              <span className="opacity-75">Sarah Chen, MIT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
