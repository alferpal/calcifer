
import { execFile } from 'child_process'
import { prepareServer, server } from '../src/server'

const execOptions = [
  '--project',
  'test/tsconfig.json',
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

  it('server should be able to start and stop via methods', async () => {
    expect.assertions(3)

    await prepareServer()

    expect(server.info.started).toStrictEqual(0)

    await server.start()

    expect(server.info.started).not.toStrictEqual(0)

    await server.stop()

    expect(server.info.started).toStrictEqual(0)
  })
})

describe('when launching server directly', () => {
  it(
    'should start by itself and stop when recieving SIGTERM',
    (done) => {
      expect.assertions(6)

      const child = execFile(
        execPath,
        [
          ...execOptions,
          'src/server.ts',
        ],
        (error, stdout, stderr) => {
          const stdoutLines = stdout.split('\n')
          const lastLine = JSON.parse(stdoutLines[stdoutLines.length - 2])

          expect(error).toBeNull()

          expect(lastLine.msg).toStrictEqual('server stopped')

          expect(stderr).toStrictEqual('')

          // eslint-disable-next-line @typescript-eslint/no-implied-eval
          setTimeout(done, 64)
        },
      )

      // @ts-ignore
      child.stdout.on('data', (chunk) => {
        if (chunk.includes('server started')) {
          child.kill()
        }
      })

      child.on('exit', (code, signal) => {
        expect(child.killed).toStrictEqual(true)
        expect(code).toStrictEqual(0)
        expect(signal).toBeNull()
      })
    },
    8192,
  )
})
