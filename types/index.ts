export type UserRole = 'admin' | 'officer' | 'dispatcher' | 'supervisor'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  badge_number?: string
  role: UserRole
  department: string
  created_at: string
  last_login?: string
}
