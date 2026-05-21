export type UserRole =
  | 'GUARDIAN'
  | 'STUDENT'
  | 'TEACHER'
  | 'ADMIN'
  | 'PRINCIPAL'
  | 'GUARD';

export interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: UserRole[];       // backend sends roles: ["ADMIN"]
  tokenExpiresAt: number;  // unix ms — calculated at login time
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string | null;
}

// Derive the primary (highest-priority) role from the roles array.
// In multi-role future scenarios the first role wins.
export function getPrimaryRole(user: AuthUser): UserRole {
  return user.roles[0];
}

/**
 * Normalise a raw role string from the backend.
 * Strips the Spring Boot "ROLE_" prefix, upper-cases, then applies
 * any backend-to-app name mappings.
 *
 * Backend DB names → App UserRole:
 *   "ROLE_ADMIN"          → "ADMIN"
 *   "ROLE_SCHOOL_ADMIN"   → "ADMIN"   ← actual DB name for admin users
 *   "ROLE_HR_ADMIN"       → "ADMIN"
 *   "ROLE_FINANCE_ADMIN"  → "ADMIN"
 *   "ROLE_SUPER_ADMIN"    → "ADMIN"
 *   "ROLE_STUDENT"        → "STUDENT"
 *   "ROLE_TEACHER"        → "TEACHER"
 *   "ROLE_GUARDIAN"       → "GUARDIAN"
 *   "ROLE_PRINCIPAL"      → "PRINCIPAL"
 *   "ROLE_SECURITY_GUARD" → "GUARD"
 */
const ROLE_MAP: Record<string, UserRole> = {
  // Admin variants
  ADMIN:          'ADMIN',
  SCHOOL_ADMIN:   'ADMIN',   // ← actual DB name
  HR_ADMIN:       'ADMIN',
  FINANCE_ADMIN:  'ADMIN',
  SUPER_ADMIN:    'ADMIN',
  // Other roles
  STUDENT:        'STUDENT',
  TEACHER:        'TEACHER',
  GUARDIAN:       'GUARDIAN',
  PRINCIPAL:      'PRINCIPAL',
  SECURITY_GUARD: 'GUARD',
};

export function normalizeRole(raw: string): UserRole {
  const stripped = raw.toUpperCase().replace(/^ROLE_/, '');
  return ROLE_MAP[stripped] ?? (stripped as UserRole);
}

/**
 * Filter a mixed array (roles + permissions) to only role strings,
 * then normalize them. The top-level LoginResponse.roles contains
 * BOTH "ROLE_SCHOOL_ADMIN" AND permission strings like "adm:class:manage".
 * Use this when reading from data.roles (top level).
 * For dto.roles (userDetailsDto), it's already clean — just map directly.
 */
export function extractRoles(rawList: string[]): UserRole[] {
  return rawList
    .filter(r => r.startsWith('ROLE_'))   // drop permission strings
    .map(normalizeRole)
    .filter(r => r in ROLE_MAP || Object.values(ROLE_MAP).includes(r as UserRole));
}

// Map backend role strings to display-friendly labels
export const ROLE_LABELS: Record<UserRole, string> = {
  GUARDIAN:  'Guardian',
  STUDENT:   'Student',
  TEACHER:   'Teacher',
  ADMIN:     'Administrator',
  PRINCIPAL: 'Principal',
  GUARD:     'Security Guard',
};

// Map backend role strings to emoji icons
export const ROLE_ICONS: Record<UserRole, string> = {
  GUARDIAN:  '👪',
  STUDENT:   '🎒',
  TEACHER:   '🧑‍🏫',
  ADMIN:     '🏛️',
  PRINCIPAL: '🎓',
  GUARD:     '🛡️',
};
