'use strict'

import * as Hapi from 'hapi'
import fastGlob from 'fast-glob'

async function getRoutes(path: string) {
  const files = await fastGlob(`${path}/.js`, {
    deep: true,
    onlyFiles: true,
  })

  const routes: Hapi.ServerRoute[] = []

  files.map((filePath) => {
    console.dir(filePath, { colors: true, depth: null })

    /*     require(filePath).routes.map((route: Hapi.ServerRoute) => {
          routes.push(route)
        }) */
  })
  return routes
}

getRoutes('../../')
export { getRoutes }
