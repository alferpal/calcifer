'use strict'

import * as Hapi from '@hapi/hapi'
import fastGlob = require('fast-glob')

const toFind = [
  './**/*.js',
  './**/*.ts',
  '!./**/*.d.ts',
]

async function getRoutes(path: string) {
  const files = await fastGlob(toFind, {
    absolute: true,
    cwd: path,
    onlyFiles: true,
  })

  const routes: Hapi.ServerRoute[] = []

  files.forEach((filePath) => {
    require(`${filePath}`).routes.forEach((route: Hapi.ServerRoute) => {
      routes.push(route)
    })
  })

  return routes
}

export { getRoutes }
