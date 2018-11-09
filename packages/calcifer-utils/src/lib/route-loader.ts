'use strict'

import * as Hapi from 'hapi'
import { async as fastGlob } from 'fast-glob'

async function getRoutes(path: string, regex: string) {
  const files = await fastGlob(regex, {
    cwd: path,
    deep: true,
    onlyFiles: true,
  })

  const routes: Hapi.ServerRoute[] = []

  files.map((filePath) => {
    require(`${path}/${filePath}`).routes.map((route: Hapi.ServerRoute) => {
      routes.push(route)
    })
  })
  return routes
}

export { getRoutes }
