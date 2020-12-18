
import * as Hapi from '@hapi/hapi'
import boom from '@hapi/boom'
import { hasRole } from '@alferpal/calcifer-utils'
import * as CalciferTypes from '@alferpal/calcifer-types'

interface PolicyToGenerate {
  name: string,
  property: string
}

function generatePolicies(policiesToGenerate: PolicyToGenerate[]) {
  const policiesMap: {
    [name: string]: (
      request: CalciferTypes.Server.CalciferAuthenticatedRequest,
      h: Hapi.ResponseToolkit
    ) => symbol;
  } = {}

  policiesToGenerate.forEach(({ name, property }) => {
    policiesMap[name] = policyGenerator(name, property)
  })

  return policiesMap
}

function policyGenerator(name: string, property: string) {
  const placeHolder = {
    [name]: (
      request: CalciferTypes.Server.CalciferAuthenticatedRequest,
      h: Hapi.ResponseToolkit,
    ) => {
      const { credentials } = request.auth

      if (hasRole(credentials, property)) {
        return h.continue
      }

      throw boom.forbidden('Not enough permissions to perform this action')
    },
  }

  return placeHolder[name]
}

function isLogged(
  request: CalciferTypes.Server.CalciferAuthenticatedRequest,
  h: Hapi.ResponseToolkit,
) {
  if (request.auth.isAuthenticated) {
    return h.continue
  }

  throw boom.forbidden('This action requires a logged user')
}

const policiesList = [
  {
    name: 'canChangeBusy',
    property: 'changeBusy',
  }, {
    name: 'canWaterPlants',
    property: 'waterPlants',
  }, {
    name: 'isAdmin',
    property: 'admin',
  },
]

const policies: {
  [name: string]: (
    request: CalciferTypes.Server.CalciferAuthenticatedRequest,
    h: Hapi.ResponseToolkit
  ) => symbol;
} = { ...generatePolicies(policiesList), isLogged }

export default policies

