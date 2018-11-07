'use strict'
import * as Hapi from 'hapi'
import glob from 'fast-glob'

async function getRoutes(path: string) {
  const files = await glob(`${path}/.js`, {
    deep: true,
    onlyFiles: true,
  })

  const routes: Hapi.ServerRoute[] = []

  files.map((filePath: string) => {
    require(filePath).routes.map((route: Hapi.ServerRoute) => {
      routes.push(route)
    })
  })

  return routes
}

export { getRoutes }
