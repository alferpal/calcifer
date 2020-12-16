
import * as Hapi from '@hapi/hapi'

import fastGlob = require('fast-glob')

/*
 * This has to include both .js and .ts files
 * due to how testing doesn't actually emit the files and so it needs the .ts ones,
 * but running code requires .js files
 */

const toFind = ['./**/*-controller.(js|ts)', '!./**/*.d.ts']

async function getRoutes(routesPath: string, baseApiPath: string = '') {
  const files = await fastGlob(toFind, {
    absolute: true,
    cwd: routesPath,
    onlyFiles: true,
  })

  const routes: Hapi.ServerRoute[] = []

  files.forEach((filePath) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(`${filePath}`).routes.forEach((route: Hapi.ServerRoute) => {
      routes.push(route)
    })
  })

  if (baseApiPath) {
    routes.forEach((route) => {
      // eslint-disable-next-line no-param-reassign
      route.path = baseApiPath + route.path
    })
  }

  return routes
}

export { getRoutes }
