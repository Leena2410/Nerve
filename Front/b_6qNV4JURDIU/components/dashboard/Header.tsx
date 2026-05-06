'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="d-flex align-items-center justify-content-between py-3 px-4 border-bottom" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <div>
        <h1 className="h4 mb-0 fw-bold">{title}</h1>
        {subtitle && <p className="mb-0 small" style={{ color: 'var(--muted-foreground)' }}>{subtitle}</p>}
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Search Bar */}
        <div className="position-relative" style={{ width: '280px' }}>
          <i className="bi bi-search position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }}></i>
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search tasks, courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              background: 'var(--secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem',
              color: 'var(--foreground)'
            }}
          />
          <kbd className="position-absolute" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'var(--card)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', color: 'var(--muted-foreground)', border: '1px solid var(--border)' }}>
            /
          </kbd>
        </div>

        {/* Quick Add Button */}
        <button className="btn btn-nerve d-flex align-items-center gap-2">
          <i className="bi bi-plus-lg"></i>
          <span className="d-none d-md-inline">Add Task</span>
        </button>

        {/* Notifications */}
        <Link href="/dashboard/notifications" className="btn position-relative p-2" style={{ background: 'var(--secondary)', border: 'none', borderRadius: '0.5rem' }}>
          <i className="bi bi-bell fs-5" style={{ color: 'var(--foreground)' }}></i>
          <span 
            className="position-absolute rounded-circle"
            style={{ 
              top: '6px', 
              right: '6px', 
              width: '8px', 
              height: '8px', 
              background: 'var(--nerve-danger)' 
            }}
          ></span>
        </Link>

        {/* Profile */}
        <div className="dropdown">
          <button 
            className="btn p-0 border-0 d-flex align-items-center gap-2"
            type="button"
            data-bs-toggle="dropdown"
            style={{ background: 'none' }}
          >
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
              style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--nerve-primary), var(--nerve-secondary))' }}
            >
              JD
            </div>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <li>
              <Link className="dropdown-item d-flex align-items-center gap-2" href="/dashboard/profile" style={{ color: 'var(--foreground)' }}>
                <i className="bi bi-person"></i> Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item d-flex align-items-center gap-2" href="/dashboard/profile" style={{ color: 'var(--foreground)' }}>
                <i className="bi bi-gear"></i> Settings
              </Link>
            </li>
            <li><hr className="dropdown-divider" style={{ borderColor: 'var(--border)' }} /></li>
            <li>
              <Link className="dropdown-item d-flex align-items-center gap-2" href="/" style={{ color: 'var(--nerve-danger)' }}>
                <i className="bi bi-box-arrow-right"></i> Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
