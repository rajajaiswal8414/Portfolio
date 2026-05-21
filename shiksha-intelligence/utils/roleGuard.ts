import { UserRole } from '@/types/auth';

/**
 * Returns true if the user holds at least one of the allowedRoles.
 * Used in every (protected) portal _layout.tsx to guard access.
 *
 * Example:
 *   canAccess(['STUDENT'], ['STUDENT'])         → true
 *   canAccess(['TEACHER'], ['PRINCIPAL','ADMIN']) → false
 *   canAccess(['PRINCIPAL','TEACHER'], ['TEACHER']) → true  (multi-role)
 */
export function canAccess(
  userRoles: UserRole[],
  allowedRoles: UserRole[],
): boolean {
  return userRoles.some((r) => allowedRoles.includes(r));
}
