'use strict'

import { execFile } from 'child_process'
import { prepareServer, server } from '../src/server'

const nycOptions = [
  '--check-coverage',
  'false',
  '--reporter',
  'none',
  '--silent',
  'true',
  './node_modules/.bin/ts-node',
  '--project',
  'test/tsconfig.json',
]

const nycPath = './node_modules/.bin/nyc'

describe('When importing server as a module', () => {
  test('prepareServer should be defined and be a function', () => {
    expect(prepareServer).toBeDefined()
    expect(typeof prepareServer).toEqual('function')
  })

  test('server should be defined and be a hapi server', async () => {
    expect(server).toBeDefined()

    expect(server.info).toBeDefined()

    expect(server.stop).toBeDefined()
    expect(typeof server.stop).toEqual('function')

    expect(server.start).toBeDefined()
    expect(typeof server.start).toEqual('function')
  })

  test('server should be able to start and stop via methods', async () => {
    await prepareServer()

    expect(server.info.started).toEqual(0)

    await server.start()

    expect(server.info.started).not.toEqual(0)

    await server.stop()

    expect(server.info.started).toEqual(0)
  })
})

describe('When launching server directly', () => {
  test(
    'should start by itself and stop when recieving SIGTERM',
    (done) => {
      const child = execFile(
        nycPath, [
          ...nycOptions,
          'src/server.ts',
        ],
        (error, stdout, stderr) => {
          console.dir({ error, stderr, stdout: stdout.split('\n') }, { colors: true, depth: null })

          const stdoutLines = stdout.split('\n')
          const lastLine = JSON.parse(stdoutLines[stdoutLines.length - 2])
          expect(error).toBeNull

          expect(lastLine.msg).toEqual('server stopped')

          expect(stderr).toEqual('')

          setTimeout(done, 64)
        })

      setTimeout(
        () => {
          child.kill()
        },
        4096)

      child.on('exit', (code) => {
        expect(child.killed).toEqual(true)
        expect(code).toEqual(0)
      })
    },
    8192)
})
