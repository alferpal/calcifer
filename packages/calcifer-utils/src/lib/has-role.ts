import * as CalciferTypes from '@alferpal/calcifer-types'

/**
 * Checks wether a user has a role, returning true or false as appropiate
 * Always returns true for admin users
 * @param user The UserAuth interface instance to check
 * @param role The role to check
 * @returns boolean
 */
function hasRole(user: CalciferTypes.User.UserAuth, role: string) {
  const { roles = [] } = user

  if (roles.includes('admin')) {
    return true
  }

  return roles.includes(role)
}

export { hasRole }
