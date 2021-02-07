import * as Hapi from '@hapi/hapi'
import * as Pino from 'pino'
import { UserAuth } from './user'

export interface CalciferHapiDecodedCredentials extends Hapi.AuthCredentials, UserAuth{}

export interface CalciferServerOptionsApp extends Hapi.ServerApplicationState {
  REQUEST_ID_HEADER: string,
}

export interface CalciferServerOptions extends Hapi.ServerOptions {
  app: CalciferServerOptionsApp,
}

export interface CalciferHapiServer extends Hapi.Server {
  logger: Pino.Logger,
  settings: CalciferServerOptions,
}

export interface CalciferHapiRequest extends Hapi.Request {
  id: string,
  logger: Pino.Logger,
}

export interface CalciferDecodedRequestAuth extends Omit<Hapi.RequestAuth, 'credentials'> {
  credentials: UserAuth,
}

export interface CalciferAuthenticatedRequest extends Omit<CalciferHapiRequest, 'auth'> {
  readonly auth: CalciferDecodedRequestAuth,
}

export interface CalciferGetServerOptions {
  baseApiPath?: string,
  extraPolicies?: {
    [name: string]: (
      request: CalciferAuthenticatedRequest,
      h: Hapi.ResponseToolkit
    ) => symbol,
  },
  initTokenValidation?: boolean,
  plugins?: Array<Hapi.ServerRegisterPluginObject<unknown>>,
  routesPath: string,
  port? : string | number,
}
