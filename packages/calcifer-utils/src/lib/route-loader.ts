'use strict'

import * as Hapi from 'hapi'
import fastGlob = require('fast-glob')

const toFind = ['./**/*.js', './**/*.ts', '!./**/*.d.ts']

async function getRoutes(path: string) {
  const files = await fastGlob(toFind, {
    absolute: true,
    cwd: path,
    deep: true,
    onlyFiles: true,
  })

  const routes: Hapi.ServerRoute[] = []

  files.map((filePath) => {
    require(`${filePath}`).routes.map((route: Hapi.ServerRoute) => {
      routes.push(route)
    })
  })
  return routes
}

export { getRoutes }
