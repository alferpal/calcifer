import * as Hapi from '@hapi/hapi'
import * as Pino from 'pino'
import { UserAuth } from './user'

export interface CalciferHapiDecodedCredentials extends Hapi.AuthCredentials, UserAuth{}

export interface CalciferHapiServer extends Hapi.Server {
  logger: Pino.Logger,
}

export interface CalciferHapiRequest extends Hapi.Request {
  logger: Pino.Logger
}

export interface CalciferDecodedRequestAuth extends Omit<Hapi.RequestAuth, 'credentials'> {
  credentials: UserAuth
}

export interface CalciferAuthenticatedRequest extends Omit<CalciferHapiRequest, 'auth'> {
  readonly auth: CalciferDecodedRequestAuth
}

export interface CalciferServerOptions {
  baseApiPath?: string,
  extraPolicies?: {
    [name: string]: (
      request: CalciferAuthenticatedRequest,
      h: Hapi.ResponseToolkit
    ) => symbol
  },
  plugins?: Array<Hapi.ServerRegisterPluginObject<unknown>>
  routesPath: string,
  validateJWTHandler: (decoded: CalciferHapiDecodedCredentials) => {isValid: boolean}
}
