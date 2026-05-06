'use client'

import { useState } from 'react'
import Header from '@/components/dashboard/Header'

interface Friend {
  id: number
  name: string
  avatar: string
  major: string
  streak: number
  tasksCompleted: number
  studyHours: number
  status: 'online' | 'studying' | 'offline'
  mutualCourses: string[]
}

const friends: Friend[] = [
  { id: 1, name: 'Sarah Chen', avatar: 'SC', major: 'Computer Science', streak: 12, tasksCompleted: 45, studyHours: 32, status: 'studying', mutualCourses: ['CS 201', 'MATH 301'] },
  { id: 2, name: 'Marcus Johnson', avatar: 'MJ', major: 'Pre-Med', streak: 8, tasksCompleted: 38, studyHours: 28, status: 'online', mutualCourses: ['CHEM 102'] },
  { id: 3, name: 'Emily Rodriguez', avatar: 'ER', major: 'Business', streak: 5, tasksCompleted: 52, studyHours: 24, status: 'online', mutualCourses: ['ECON 101'] },
  { id: 4, name: 'Alex Kim', avatar: 'AK', major: 'Physics', streak: 15, tasksCompleted: 67, studyHours: 45, status: 'offline', mutualCourses: ['PHY 201', 'MATH 301'] },
  { id: 5, name: 'Jessica Lee', avatar: 'JL', major: 'Psychology', streak: 3, tasksCompleted: 28, studyHours: 18, status: 'offline', mutualCourses: [] },
  { id: 6, name: 'David Park', avatar: 'DP', major: 'Engineering', streak: 10, tasksCompleted: 55, studyHours: 38, status: 'studying', mutualCourses: ['MATH 301'] },
]

const friendRequests = [
  { id: 1, name: 'Michael Brown', avatar: 'MB', major: 'Chemistry', mutualFriends: 3 },
  { id: 2, name: 'Lisa Wang', avatar: 'LW', major: 'Computer Science', mutualFriends: 5 },
]

const leaderboard = [
  { rank: 1, name: 'Alex Kim', avatar: 'AK', streak: 15, points: 2450 },
  { rank: 2, name: 'Sarah Chen', avatar: 'SC', streak: 12, points: 2180 },
  { rank: 3, name: 'David Park', avatar: 'DP', streak: 10, points: 1920 },
  { rank: 4, name: 'John Doe', avatar: 'JD', streak: 7, points: 1650, isMe: true },
  { rank: 5, name: 'Marcus Johnson', avatar: 'MJ', streak: 8, points: 1580 },
]

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'leaderboard'>('friends')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredFriends = friends.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.major.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'var(--nerve-success)'
      case 'studying': return 'var(--nerve-primary)'
      case 'offline': return 'var(--muted-foreground)'
      default: return 'var(--muted-foreground)'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return 'Online'
      case 'studying': return 'Studying'
      case 'offline': return 'Offline'
      default: return 'Unknown'
    }
  }

  return (
    <div>
      <Header 
        title="Friends"
        subtitle={`${friends.length} connections`}
      />

      <div className="p-4">
        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="nerve-card p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px', background: 'rgba(99, 102, 241, 0.1)' }}>
                  <i className="bi bi-people fs-5" style={{ color: 'var(--nerve-primary)' }}></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold">{friends.length}</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>Friends</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="nerve-card p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px', background: 'rgba(16, 185, 129, 0.1)' }}>
                  <i className="bi bi-circle-fill fs-5" style={{ color: 'var(--nerve-success)' }}></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold">{friends.filter(f => f.status !== 'offline').length}</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>Online</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="nerve-card p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px', background: 'rgba(139, 92, 246, 0.1)' }}>
                  <i className="bi bi-book fs-5" style={{ color: '#8b5cf6' }}></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold">{friends.filter(f => f.status === 'studying').length}</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>Studying</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="nerve-card p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px', background: 'rgba(245, 158, 11, 0.1)' }}>
                  <i className="bi bi-envelope fs-5" style={{ color: '#f59e0b' }}></i>
                </div>
                <div>
                  <div className="fs-4 fw-bold">{friendRequests.length}</div>
                  <div className="small" style={{ color: 'var(--muted-foreground)' }}>Requests</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <ul className="nav nav-pills gap-2">
            {(['friends', 'requests', 'leaderboard'] as const).map((tab) => (
              <li key={tab} className="nav-item">
                <button 
                  className={`nav-link position-relative ${activeTab === tab ? 'btn-nerve' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    background: activeTab === tab ? undefined : 'var(--secondary)',
                    color: activeTab === tab ? 'white' : 'var(--foreground)'
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'requests' && friendRequests.length > 0 && (
                    <span 
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                      style={{ background: 'var(--nerve-danger)', fontSize: '0.65rem' }}
                    >
                      {friendRequests.length}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2">
            <div className="position-relative">
              <i className="bi bi-search position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }}></i>
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)', width: '250px' }}
              />
            </div>
            <button className="btn btn-nerve" onClick={() => setShowAddModal(true)}>
              <i className="bi bi-person-plus me-2"></i>Add Friend
            </button>
          </div>
        </div>

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div className="row g-4">
            {filteredFriends.map((friend) => (
              <div key={friend.id} className="col-md-6 col-lg-4">
                <div className="nerve-card p-4 h-100">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="position-relative">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ 
                          width: '56px', 
                          height: '56px', 
                          background: `linear-gradient(135deg, hsl(${friend.id * 50}, 70%, 50%), hsl(${friend.id * 50 + 30}, 70%, 60%))`
                        }}
                      >
                        {friend.avatar}
                      </div>
                      <span 
                        className="position-absolute rounded-circle border border-2 border-white"
                        style={{ 
                          width: '14px', 
                          height: '14px', 
                          background: getStatusColor(friend.status),
                          bottom: '2px',
                          right: '2px'
                        }}
                      ></span>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-bold">{friend.name}</h6>
                      <div className="small" style={{ color: 'var(--muted-foreground)' }}>{friend.major}</div>
                      <div className="small d-flex align-items-center gap-1 mt-1" style={{ color: getStatusColor(friend.status) }}>
                        <span className="rounded-circle d-inline-block" style={{ width: '6px', height: '6px', background: getStatusColor(friend.status) }}></span>
                        {getStatusLabel(friend.status)}
                      </div>
                    </div>
                    <button className="btn btn-sm p-1" style={{ background: 'none', border: 'none', color: 'var(--muted-foreground)' }}>
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                  </div>

                  <div className="d-flex gap-2 mb-3">
                    <div className="flex-grow-1 p-2 rounded-2 text-center" style={{ background: 'var(--secondary)' }}>
                      <div className="fw-bold" style={{ color: '#f59e0b' }}>{friend.streak}</div>
                      <div className="small" style={{ color: 'var(--muted-foreground)' }}>Streak</div>
                    </div>
                    <div className="flex-grow-1 p-2 rounded-2 text-center" style={{ background: 'var(--secondary)' }}>
                      <div className="fw-bold" style={{ color: 'var(--nerve-success)' }}>{friend.tasksCompleted}</div>
                      <div className="small" style={{ color: 'var(--muted-foreground)' }}>Tasks</div>
                    </div>
                    <div className="flex-grow-1 p-2 rounded-2 text-center" style={{ background: 'var(--secondary)' }}>
                      <div className="fw-bold" style={{ color: 'var(--nerve-primary)' }}>{friend.studyHours}h</div>
                      <div className="small" style={{ color: 'var(--muted-foreground)' }}>Study</div>
                    </div>
                  </div>

                  {friend.mutualCourses.length > 0 && (
                    <div className="d-flex flex-wrap gap-1">
                      <span className="small" style={{ color: 'var(--muted-foreground)' }}>Shared:</span>
                      {friend.mutualCourses.map((course) => (
                        <span key={course} className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--nerve-primary)', fontSize: '0.7rem' }}>
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="row g-4">
            {friendRequests.length > 0 ? (
              friendRequests.map((request) => (
                <div key={request.id} className="col-md-6">
                  <div className="nerve-card p-4">
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ 
                          width: '56px', 
                          height: '56px', 
                          background: `linear-gradient(135deg, hsl(${request.id * 80}, 70%, 50%), hsl(${request.id * 80 + 30}, 70%, 60%))`
                        }}
                      >
                        {request.avatar}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0 fw-bold">{request.name}</h6>
                        <div className="small" style={{ color: 'var(--muted-foreground)' }}>{request.major}</div>
                        <div className="small" style={{ color: 'var(--nerve-primary)' }}>
                          {request.mutualFriends} mutual friends
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-nerve btn-sm">Accept</button>
                        <button className="btn btn-nerve-outline btn-sm">Decline</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="nerve-card p-5 text-center">
                  <i className="bi bi-envelope-open fs-1 d-block mb-3" style={{ color: 'var(--muted-foreground)' }}></i>
                  <h5>No pending requests</h5>
                  <p style={{ color: 'var(--muted-foreground)' }}>When someone sends you a friend request, it will appear here.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="nerve-card">
            <div className="p-4 border-bottom" style={{ borderColor: 'var(--border)' }}>
              <h5 className="fw-bold mb-1">Weekly Leaderboard</h5>
              <p className="mb-0 small" style={{ color: 'var(--muted-foreground)' }}>See how you rank against your friends</p>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0" style={{ color: 'var(--foreground)' }}>
                <thead style={{ background: 'var(--secondary)' }}>
                  <tr>
                    <th className="border-0 py-3 px-4" style={{ width: '80px' }}>Rank</th>
                    <th className="border-0 py-3">Student</th>
                    <th className="border-0 py-3 text-center">Streak</th>
                    <th className="border-0 py-3 text-end px-4">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry) => (
                    <tr 
                      key={entry.rank} 
                      style={{ background: entry.isMe ? 'rgba(99, 102, 241, 0.05)' : 'transparent' }}
                    >
                      <td className="py-3 px-4">
                        {entry.rank <= 3 ? (
                          <div 
                            className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                            style={{ 
                              width: '32px', 
                              height: '32px',
                              background: entry.rank === 1 ? '#f59e0b' : entry.rank === 2 ? '#94a3b8' : '#cd7c3a',
                              color: 'white'
                            }}
                          >
                            {entry.rank}
                          </div>
                        ) : (
                          <span className="ps-2">{entry.rank}</span>
                        )}
                      </td>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{ 
                              width: '40px', 
                              height: '40px', 
                              background: entry.isMe 
                                ? 'linear-gradient(135deg, var(--nerve-primary), var(--nerve-secondary))'
                                : `linear-gradient(135deg, hsl(${entry.rank * 50}, 70%, 50%), hsl(${entry.rank * 50 + 30}, 70%, 60%))`
                            }}
                          >
                            {entry.avatar}
                          </div>
                          <div>
                            <div className="fw-semibold">
                              {entry.name}
                              {entry.isMe && <span className="badge ms-2" style={{ background: 'var(--nerve-primary)', fontSize: '0.65rem' }}>You</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-center">
                        <span className="d-inline-flex align-items-center gap-1">
                          <i className="bi bi-fire" style={{ color: '#f59e0b' }}></i>
                          {entry.streak}
                        </span>
                      </td>
                      <td className="py-3 text-end px-4 fw-bold" style={{ color: 'var(--nerve-primary)' }}>
                        {entry.points.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Friend Modal */}
        {showAddModal && (
          <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowAddModal(false)}>
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content border-0 shadow-lg" style={{ background: 'var(--card)' }}>
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Add Friend</h5>
                  <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p style={{ color: 'var(--muted-foreground)' }}>
                    Enter your friend&apos;s email or username to send them a friend request.
                  </p>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Email or Username</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="friend@university.edu" 
                      style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }} 
                    />
                  </div>
                  <div className="p-3 rounded-3" style={{ background: 'var(--secondary)' }}>
                    <div className="small fw-semibold mb-2">Or share your profile link:</div>
                    <div className="d-flex gap-2">
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        value="nerve.app/u/johndoe" 
                        readOnly 
                        style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }} 
                      />
                      <button className="btn btn-sm btn-nerve-outline">
                        <i className="bi bi-clipboard"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-nerve-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button className="btn btn-nerve">Send Request</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
