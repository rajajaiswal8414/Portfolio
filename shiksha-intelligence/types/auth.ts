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
  refreshToken: string;
}

// Derive the primary (highest-priority) role from the roles array.
// In multi-role future scenarios the first role wins.
export function getPrimaryRole(user: AuthUser): UserRole {
  return user.roles[0];
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
