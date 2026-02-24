'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import APDBadge from './APDBadge'
import type { User } from '@supabase/supabase-js'
import type { UserProfile } from '@/types'

interface Props {
  user: User
  profile: UserProfile | null
}

const navItems = [
  { label: 'Dashboard', icon: '⊞', href: '/dashboard', active: true },
  // Add more nav items as features are built
]

export default function DashboardSidebar({ user, profile }: Props) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'Officer'
  const role = profile?.role || 'officer'

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <APDBadge size={44} />
        <div className="logo-text">
          <p className="logo-title">APD</p>
          <p className="logo-sub">Administration</p>
        </div>
      </div>

      <div className="sidebar-divider" />

      {/* Nav */}
      <nav className="sidebar-nav">
        <p className="nav-section-label">NAVIGATION</p>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </a>
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      {/* User */}
      <div className="sidebar-user">
        <div className="user-info">
          <div className="user-avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <p className="user-name">{displayName}</p>
            <p className="user-role">{role.toUpperCase()}</p>
          </div>
        </div>
        <button onClick={handleSignOut} className="sign-out-btn" title="Sign out">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
            <path d="M13 15l4-5-4-5M17 10H7M10 4H5a1 1 0 00-1 1v10a1 1 0 001 1h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 260px;
          background: rgba(10, 15, 30, 0.97);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          z-index: 50;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0 0.5rem;
        }

        .logo-title {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          line-height: 1;
        }

        .logo-sub {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
        }

        .sidebar-divider {
          height: 1px;
          background: var(--border);
          margin: 1.25rem 0;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-section-label {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          padding: 0 0.75rem;
          margin-bottom: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.75rem;
          border-radius: 3px;
          text-decoration: none;
          transition: all 0.15s;
          border: 1px solid transparent;
        }

        .nav-item:hover {
          background: rgba(26, 37, 64, 0.8);
          border-color: var(--border);
        }

        .nav-item.active {
          background: rgba(30, 58, 95, 0.5);
          border-color: rgba(168, 197, 232, 0.2);
        }

        .nav-icon {
          font-size: 1rem;
          width: 20px;
          text-align: center;
        }

        .nav-label {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
        }

        .nav-item.active .nav-label {
          color: var(--ice-light);
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 0.75rem;
          border-radius: 3px;
          border: 1px solid var(--border);
          background: rgba(26, 37, 64, 0.4);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex: 1;
          min-width: 0;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 2px;
          background: linear-gradient(135deg, #1e3a5f, #0a1628);
          border: 1px solid var(--badge-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--badge-gold);
          flex-shrink: 0;
        }

        .user-name {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
        }

        .sign-out-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 2px;
          transition: color 0.15s;
          flex-shrink: 0;
        }

        .sign-out-btn:hover {
          color: #e07060;
        }
      `}</style>
    </aside>
  )
}
