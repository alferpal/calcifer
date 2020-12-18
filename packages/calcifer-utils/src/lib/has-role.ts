import * as CalciferTypes from '@alferpal/calcifer-types'

function hasRole(user: CalciferTypes.User.UserAuth, role: string) {
  const { roles = [] } = user

  if (roles.includes('admin')) {
    return true
  }

  return roles.includes(role)
}

export { hasRole }
