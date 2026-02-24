import { createServerSupabaseClient } from '@/lib/supabase-server'
import DashboardTabs from '@/components/DashboardTabs'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Officer'
  const role = profile?.role || 'officer'
  const badgeNumber = profile?.badge_number || '—'
  const isAdmin = role === 'admin'

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'2rem', maxWidth:'1400px' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.7rem', letterSpacing:'0.3em', color:'#c8972a', marginBottom:'0.3rem' }}>COMMAND CENTER</p>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'2.2rem', fontWeight:700, color:'#e8eef7', letterSpacing:'0.02em' }}>
            Welcome back, {displayName}
          </h1>
          <p style={{ fontSize:'0.85rem', color:'#4a6080', marginTop:'0.25rem' }}>
            {new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
          </p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.5rem 1rem', border:'1px solid rgba(200,151,42,0.4)', borderRadius:'2px', fontFamily:"'Rajdhani',sans-serif", fontSize:'0.8rem', letterSpacing:'0.15em', color:'#e8b84b' }}>
          <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
          {role.toUpperCase()}
        </div>
      </div>

      {/* Main two-column layout */}
      <div style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap:'1.5rem', alignItems:'start' }}>

        {/* LEFT — Welcome & Info */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

          {/* Welcome card */}
          <div style={{ padding:'1.75rem', background:'rgba(26,37,64,0.6)', border:'1px solid rgba(168,197,232,0.12)', borderRadius:'3px' }}>
            <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color:'#4a6080', marginBottom:'1rem' }}>OFFICER PROFILE</p>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.25rem' }}>
              <div style={{ width:'48px', height:'48px', borderRadius:'3px', background:'linear-gradient(135deg,#1e3a5f,#0a1628)', border:'1px solid #c8972a', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:'1.3rem', color:'#c8972a', flexShrink:0 }}>
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'1.1rem', fontWeight:700, color:'#e8eef7', lineHeight:1 }}>{displayName}</p>
                <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.7rem', letterSpacing:'0.15em', color:'#c8972a', marginTop:'0.25rem' }}>{role.toUpperCase()}</p>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
              {[
                { label:'DEPARTMENT', value:'Abilene Police Dept.' },
                { label:'BADGE NO.', value:badgeNumber },
                { label:'ACCESS LEVEL', value: isAdmin ? 'Administrator' : 'Standard' },
              ].map(row => (
                <div key={row.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'0.6rem', borderBottom:'1px solid rgba(168,197,232,0.06)' }}>
                  <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.65rem', letterSpacing:'0.15em', color:'#4a6080' }}>{row.label}</span>
                  <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.82rem', fontWeight:600, color:'#8fa3be' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick info card */}
          <div style={{ padding:'1.5rem', background:'rgba(26,37,64,0.6)', border:'1px solid rgba(168,197,232,0.12)', borderRadius:'3px' }}>
            <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color:'#4a6080', marginBottom:'1rem' }}>QUICK INFO</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {[
                { icon:'🕐', label:'Shift Start', value:'07:00 AM' },
                { icon:'📍', label:'District', value:'Central' },
                { icon:'📡', label:'System Status', value:'Online' },
              ].map(item => (
                <div key={item.label} style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <span style={{ fontSize:'1rem', width:'20px', textAlign:'center' }}>{item.icon}</span>
                  <div style={{ flex:1, display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontSize:'0.82rem', color:'#4a6080' }}>{item.label}</span>
                    <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.82rem', fontWeight:600, color:'#8fa3be' }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin badge if applicable */}
          {isAdmin && (
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.9rem 1.2rem', background:'rgba(200,151,42,0.05)', border:'1px solid rgba(200,151,42,0.3)', borderRadius:'3px' }}>
              <span style={{ fontSize:'1.1rem' }}>⚡</span>
              <div>
                <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.65rem', letterSpacing:'0.2em', color:'#c8972a' }}>ADMIN ACCESS ACTIVE</p>
                <p style={{ fontSize:'0.78rem', color:'#8fa3be', marginTop:'0.15rem' }}>Full administrative privileges.</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — Tabs */}
        <DashboardTabs />
      </div>
    </div>
  )
}
