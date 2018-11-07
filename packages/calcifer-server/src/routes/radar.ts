'use strict'

import { IRequestScanPayload } from '../interfaces/scan-payload'
import { ResponseToolkit } from 'hapi'

import { radar } from '../lib/radar'

const routes = [
  {
    method: ['POST'],
    path: '/radar',
    async handler(request: IRequestScanPayload, h: ResponseToolkit) {
      return radar(request.payload.protocols, request.payload.scan)
    },
  },
]

export { routes }
