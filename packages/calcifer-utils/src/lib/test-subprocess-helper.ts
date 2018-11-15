'use strict'

import { execFile, fork, spawn, ChildProcess } from 'child_process'

const nycOptions = [
  '--check-coverage',
  'false',
  './node_modules/.bin/ts-node',
  '--project',
  'test/tsconfig.json',
]

const nycPath = './node_modules/.bin/nyc'

function execFileHelper(
  file: string,
  callback: (error: Error | null, stdout: string, stderr: string) => void,
): ChildProcess {
  const child = execFile(nycPath, [...nycOptions, file, '__execFileHelper'], callback)

  return child
}

function forkHelper(file: string): ChildProcess {
  const child = fork(file, ['__forkHelper'], {
    execPath: nycPath,
    execArgv: nycOptions,
  })

  return child
}

function spawnHelper(file: string): ChildProcess {
  const child = spawn(nycPath, [...nycOptions, file, '__spawnHelper'])

  return child
}

export { execFileHelper, forkHelper, spawnHelper }
