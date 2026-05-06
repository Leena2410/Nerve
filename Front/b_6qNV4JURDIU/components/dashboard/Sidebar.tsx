'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', icon: 'bi-grid-1x2', label: 'Dashboard' },
  { href: '/dashboard/courses', icon: 'bi-book', label: 'Courses' },
  { href: '/dashboard/tasks', icon: 'bi-check2-square', label: 'Tasks' },
  { href: '/dashboard/calendar', icon: 'bi-calendar3', label: 'Calendar' },
  { href: '/dashboard/timer', icon: 'bi-stopwatch', label: 'Timer' },
  { href: '/dashboard/friends', icon: 'bi-people', label: 'Friends' },
]

const bottomNavItems = [
  { href: '/dashboard/notifications', icon: 'bi-bell', label: 'Notifications', badge: 3 },
  { href: '/dashboard/profile', icon: 'bi-person-circle', label: 'Profile' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="nerve-sidebar d-flex flex-column" style={{ width: '260px', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 1000 }}>
      {/* Logo */}
      <div className="p-4 border-bottom" style={{ borderColor: 'var(--border)' }}>
        <Link href="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <div className="nerve-gradient rounded-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
            <i className="bi bi-lightning-charge-fill text-white"></i>
          </div>
          <span className="fs-4 fw-bold nerve-gradient-text">Nerve</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-grow-1 p-3">
        <div className="mb-2" style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '1rem' }}>
          Main Menu
        </div>
        <ul className="list-unstyled mb-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <li key={item.href} className="mb-1">
                <Link href={item.href} className={`nerve-nav-item ${isActive ? 'active' : ''}`}>
                  <i className={`bi ${item.icon} fs-5`}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-top" style={{ borderColor: 'var(--border)' }}>
        <ul className="list-unstyled mb-0">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href} className="mb-1">
                <Link href={item.href} className={`nerve-nav-item ${isActive ? 'active' : ''}`}>
                  <i className={`bi ${item.icon} fs-5`}></i>
                  <span className="flex-grow-1">{item.label}</span>
                  {item.badge && (
                    <span className="badge rounded-pill" style={{ background: 'var(--nerve-danger)', color: 'white', fontSize: '0.7rem' }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* User Profile Preview */}
        <div className="mt-3 p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
          <div className="d-flex align-items-center gap-3">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
              style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--nerve-primary), var(--nerve-secondary))' }}
            >
              JD
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <div className="fw-semibold text-truncate" style={{ fontSize: '0.875rem' }}>John Doe</div>
              <div className="text-truncate" style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Computer Science</div>
            </div>
            <button className="btn btn-sm p-0 border-0" style={{ background: 'none', color: 'var(--muted-foreground)' }}>
              <i className="bi bi-gear"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
