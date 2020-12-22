import {
  describe, expect, jest, it,
} from '@jest/globals'
import { execFile } from 'child_process'

jest.mock('../jwt-validator')

// eslint-disable-next-line import/first
import { prepareServer, server } from '../server-loader'

const execOptions = [
  '--project',
  'tsconfig-test.json',
]

const execPath = './node_modules/.bin/ts-node'

describe('when importing server as a module', () => {
  it('prepareServer should be defined and be a function', () => {
    expect.assertions(2)

    expect(prepareServer).toBeDefined()
    expect(typeof prepareServer).toStrictEqual('function')
  })

  it('server should be defined and be a hapi server', async () => {
    expect.assertions(6)

    expect(server).toBeDefined()

    expect(server.info).toBeDefined()

    expect(server.stop).toBeDefined()
    expect(typeof server.stop).toStrictEqual('function')

    expect(server.start).toBeDefined()
    expect(typeof server.start).toStrictEqual('function')
  })

  it('prepareServer should throw if no signature is present', async () => {
    expect.assertions(1)

    await expect(prepareServer({
      routesPath: '',
    })).rejects.toThrow('No signature for JWT found in process.env.JWT_SIGNATURE')
  })

  it('server should be able to start and stop via methods', async () => {
    expect.assertions(3)

    process.env.JWT_SIGNATURE = 'test'

    await prepareServer({
      routesPath: '',
    })

    process.env.JWT_SIGNATURE = undefined

    expect(server.info.started).toStrictEqual(0)

    await server.start()

    expect(server.info.started).not.toStrictEqual(0)

    await server.stop()

    expect(server.info.started).toStrictEqual(0)
  }, 16384)
})

describe('when launching server directly', () => {
  it(
    'should start and stop by itself when recieving SIGTERM',
    () => new Promise((done) => {
      expect.assertions(6)

      const child = execFile(
        execPath,
        [
          ...execOptions,
          'src/__tests__/fixtures/server-fixture.ts',
        ],
        { env: { ...process.env, PORT: '0', JWT_SIGNATURE: 'test' } },
        (error, stdout, stderr) => {
          const stdoutLines = stdout.split('\n')
          const lastLine = JSON.parse(stdoutLines[stdoutLines.length - 2])

          expect(error).toBeNull()

          expect(lastLine.msg).toStrictEqual('server stopped')

          expect(stderr).toStrictEqual('')

          setTimeout(done, 64)
        },
      )

      // @ts-ignore
      child.stdout.on('data', (chunk) => {
        if (chunk.includes('Server running')) {
          child.kill('SIGTERM')
        }
      })

      child.on('exit', (code, signal) => {
        expect(child.killed).toStrictEqual(true)
        expect(code).toStrictEqual(0)
        expect(signal).toBeNull()
      })
    }),
    16384,
  )
})
