import boom from '@hapi/boom'

import { execFile } from 'child_process'

// eslint-disable-next-line import/first
import { getServer } from '../server-loader'

jest.mock('../jwt-validator')

const execOptions = [
  '--project',
  'tsconfig-test.json',
]

const execPath = './node_modules/.bin/ts-node'

describe('when importing server-loader as a module', () => {
  it('getServer should be defined and be a function', () => {
    expect.assertions(2)

    expect(getServer).toBeDefined()
    expect(typeof getServer).toStrictEqual('function')
  })

  it('getServer should throw if no signature is present', async () => {
    expect.assertions(1)

    await expect(getServer({
      routesPath: '',
    })).rejects.toThrow('No signature for JWT found in process.env.JWT_SIGNATURE')
  })

  describe('a server returned by getServer', () => {
    it('a server returned by getServer should be able to start and stop via methods', async () => {
      expect.assertions(3)

      process.env.JWT_SIGNATURE = 'test'

      const server = await getServer({
        routesPath: '',
      })

      process.env.JWT_SIGNATURE = undefined

      expect(server.info.started).toStrictEqual(0)

      await server.start()

      expect(server.info.started).not.toStrictEqual(0)

      await server.stop()

      expect(server.info.started).toStrictEqual(0)
    }, 8192)

    it('a server returned by getServer should generate a request id if not present in the request', async () => {
      expect.assertions(1)

      process.env.JWT_SIGNATURE = 'test'

      const server = await getServer({
        routesPath: '',
      })

      process.env.JWT_SIGNATURE = undefined

      server.route({
        method: 'GET',
        path: '/test',
        handler() {
          throw boom.teapot()
        },
      })

      const { headers } = await server.inject({
        url: '/test',
      })

      expect(headers).toHaveProperty('x-request-id', '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
    }, 8192)

    it('a server returned by getServer should propagate request id header', async () => {
      expect.assertions(1)

      process.env.JWT_SIGNATURE = 'test'

      const server = await getServer({
        routesPath: '',
      })

      process.env.JWT_SIGNATURE = undefined

      server.route({
        method: 'GET',
        path: '/test',
        handler() {
          return 'hello, world'
        },
      })

      const { headers } = await server.inject({
        url: '/test',
        headers: {
          'x-request-id': 'test',
        },
      })

      expect(headers).toHaveProperty('x-request-id', 'test')
    }, 8192)

    describe('when launched as its own process', () => {
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
  })
})
