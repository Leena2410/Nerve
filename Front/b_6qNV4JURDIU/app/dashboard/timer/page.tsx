'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/dashboard/Header'

type TimerMode = 'focus' | 'shortBreak' | 'longBreak'

const timerSettings = {
  focus: { duration: 25 * 60, label: 'Focus', color: 'var(--nerve-primary)' },
  shortBreak: { duration: 5 * 60, label: 'Short Break', color: 'var(--nerve-success)' },
  longBreak: { duration: 15 * 60, label: 'Long Break', color: 'var(--nerve-secondary)' },
}

const recentSessions = [
  { id: 1, date: 'Today', sessions: 4, totalTime: '1h 40m', tasks: ['Physics Lab', 'Math Problems'] },
  { id: 2, date: 'Yesterday', sessions: 6, totalTime: '2h 30m', tasks: ['Chemistry Notes', 'Essay Draft'] },
  { id: 3, date: 'Jan 13', sessions: 3, totalTime: '1h 15m', tasks: ['Economics Reading'] },
  { id: 4, date: 'Jan 12', sessions: 5, totalTime: '2h 5m', tasks: ['CS Project', 'Study Group'] },
]

export default function TimerPage() {
  const [mode, setMode] = useState<TimerMode>('focus')
  const [timeLeft, setTimeLeft] = useState(timerSettings.focus.duration)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [currentTask, setCurrentTask] = useState('')
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((timerSettings[mode].duration - timeLeft) / timerSettings[mode].duration) * 100

  const handleModeChange = useCallback((newMode: TimerMode) => {
    setMode(newMode)
    setTimeLeft(timerSettings[newMode].duration)
    setIsRunning(false)
  }, [])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTimeLeft(timerSettings[mode].duration)
    setIsRunning(false)
  }

  const skipToNext = useCallback(() => {
    if (mode === 'focus') {
      setSessionsCompleted(prev => prev + 1)
      if ((sessionsCompleted + 1) % 4 === 0) {
        handleModeChange('longBreak')
      } else {
        handleModeChange('shortBreak')
      }
    } else {
      handleModeChange('focus')
    }
  }, [mode, sessionsCompleted, handleModeChange])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Timer completed
      setIsRunning(false)
      // Play sound or notification here
      skipToNext()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, skipToNext])

  return (
    <div>
      <Header 
        title="Focus Timer"
        subtitle="Stay focused and productive"
      />

      <div className="p-4">
        <div className="row g-4">
          {/* Main Timer */}
          <div className="col-lg-7">
            <div className="nerve-card p-5 text-center">
              {/* Mode Selector */}
              <div className="d-flex justify-content-center gap-2 mb-5">
                {(Object.keys(timerSettings) as TimerMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className={`btn px-4 py-2 ${mode === m ? 'btn-nerve' : 'btn-nerve-outline'}`}
                  >
                    {timerSettings[m].label}
                  </button>
                ))}
              </div>

              {/* Timer Display */}
              <div className="position-relative d-inline-block mb-4">
                <svg width="300" height="300" viewBox="0 0 300 300">
                  {/* Background circle */}
                  <circle
                    cx="150"
                    cy="150"
                    r="140"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="150"
                    cy="150"
                    r="140"
                    fill="none"
                    stroke={timerSettings[mode].color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 140}
                    strokeDashoffset={2 * Math.PI * 140 * (1 - progress / 100)}
                    transform="rotate(-90 150 150)"
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <div 
                  className="position-absolute top-50 start-50 translate-middle text-center"
                >
                  <div className="display-1 fw-bold" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '-0.05em' }}>
                    {formatTime(timeLeft)}
                  </div>
                  <div className="mt-2" style={{ color: timerSettings[mode].color, fontWeight: 600 }}>
                    {timerSettings[mode].label}
                  </div>
                </div>
              </div>

              {/* Current Task Input */}
              <div className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
                <div className="input-group">
                  <span className="input-group-text border-0" style={{ background: 'var(--secondary)' }}>
                    <i className="bi bi-pencil" style={{ color: 'var(--muted-foreground)' }}></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="What are you working on?"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    style={{ background: 'var(--secondary)', color: 'var(--foreground)' }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="d-flex justify-content-center gap-3">
                <button 
                  className="btn btn-lg px-4"
                  onClick={resetTimer}
                  style={{ background: 'var(--secondary)', border: 'none', color: 'var(--foreground)' }}
                >
                  <i className="bi bi-arrow-counterclockwise fs-4"></i>
                </button>
                <button 
                  className="btn btn-nerve btn-lg px-5"
                  onClick={toggleTimer}
                  style={{ minWidth: '160px' }}
                >
                  <i className={`bi ${isRunning ? 'bi-pause-fill' : 'bi-play-fill'} fs-4 me-2`}></i>
                  {isRunning ? 'Pause' : 'Start'}
                </button>
                <button 
                  className="btn btn-lg px-4"
                  onClick={skipToNext}
                  style={{ background: 'var(--secondary)', border: 'none', color: 'var(--foreground)' }}
                >
                  <i className="bi bi-skip-forward-fill fs-4"></i>
                </button>
              </div>

              {/* Session Counter */}
              <div className="mt-5 pt-4 border-top" style={{ borderColor: 'var(--border)' }}>
                <div className="d-flex justify-content-center gap-2">
                  {[1, 2, 3, 4].map((session) => (
                    <div
                      key={session}
                      className="rounded-circle"
                      style={{
                        width: '16px',
                        height: '16px',
                        background: session <= (sessionsCompleted % 4 || (sessionsCompleted > 0 && sessionsCompleted % 4 === 0 ? 4 : 0)) 
                          ? 'var(--nerve-primary)' 
                          : 'var(--border)'
                      }}
                    ></div>
                  ))}
                </div>
                <p className="mt-2 mb-0 small" style={{ color: 'var(--muted-foreground)' }}>
                  {sessionsCompleted} sessions completed today
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-5">
            {/* Today Stats */}
            <div className="nerve-card p-4 mb-4">
              <h5 className="fw-bold mb-4">Today&apos;s Progress</h5>
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 rounded-3 text-center" style={{ background: 'var(--secondary)' }}>
                    <div className="fs-3 fw-bold" style={{ color: 'var(--nerve-primary)' }}>{sessionsCompleted}</div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Sessions</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 rounded-3 text-center" style={{ background: 'var(--secondary)' }}>
                    <div className="fs-3 fw-bold" style={{ color: 'var(--nerve-success)' }}>
                      {Math.floor((sessionsCompleted * 25) / 60)}h {(sessionsCompleted * 25) % 60}m
                    </div>
                    <div className="small" style={{ color: 'var(--muted-foreground)' }}>Focus Time</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small" style={{ color: 'var(--muted-foreground)' }}>Daily Goal</span>
                  <span className="small fw-semibold">{sessionsCompleted}/8 sessions</span>
                </div>
                <div className="progress" style={{ height: '8px', background: 'var(--border)' }}>
                  <div 
                    className="progress-bar" 
                    style={{ width: `${Math.min((sessionsCompleted / 8) * 100, 100)}%`, background: 'var(--nerve-primary)' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="nerve-card p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Timer Settings</h5>
                <button 
                  className="btn btn-sm btn-nerve-outline"
                  onClick={() => setShowSettingsModal(true)}
                >
                  <i className="bi bi-gear"></i>
                </button>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between p-2 rounded-2" style={{ background: 'var(--secondary)' }}>
                  <span className="small">Focus Duration</span>
                  <span className="small fw-semibold">25 min</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-2" style={{ background: 'var(--secondary)' }}>
                  <span className="small">Short Break</span>
                  <span className="small fw-semibold">5 min</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-2" style={{ background: 'var(--secondary)' }}>
                  <span className="small">Long Break</span>
                  <span className="small fw-semibold">15 min</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-2" style={{ background: 'var(--secondary)' }}>
                  <span className="small">Sessions until Long Break</span>
                  <span className="small fw-semibold">4</span>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="nerve-card p-4">
              <h5 className="fw-bold mb-4">Recent Sessions</h5>
              <div className="d-flex flex-column gap-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                    <div 
                      className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '48px', height: '48px', background: 'rgba(99, 102, 241, 0.1)' }}
                    >
                      <i className="bi bi-stopwatch fs-4" style={{ color: 'var(--nerve-primary)' }}></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-semibold small">{session.date}</div>
                      <div className="small" style={{ color: 'var(--muted-foreground)' }}>
                        {session.sessions} sessions | {session.totalTime}
                      </div>
                    </div>
                    <div className="text-end">
                      <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--nerve-primary)' }}>
                        {session.tasks[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettingsModal && (
          <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowSettingsModal(false)}>
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content border-0 shadow-lg" style={{ background: 'var(--card)' }}>
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Timer Settings</h5>
                  <button className="btn-close" onClick={() => setShowSettingsModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Focus Duration (minutes)</label>
                    <input type="number" className="form-control" defaultValue={25} style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Short Break (minutes)</label>
                    <input type="number" className="form-control" defaultValue={5} style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Long Break (minutes)</label>
                    <input type="number" className="form-control" defaultValue={15} style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Daily Goal (sessions)</label>
                    <input type="number" className="form-control" defaultValue={8} style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="autoStart" defaultChecked />
                    <label className="form-check-label small" htmlFor="autoStart">Auto-start breaks</label>
                  </div>
                  <div className="form-check form-switch mt-2">
                    <input className="form-check-input" type="checkbox" id="soundEnabled" defaultChecked />
                    <label className="form-check-label small" htmlFor="soundEnabled">Sound notifications</label>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-nerve-outline" onClick={() => setShowSettingsModal(false)}>Cancel</button>
                  <button className="btn btn-nerve" onClick={() => setShowSettingsModal(false)}>Save Settings</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
