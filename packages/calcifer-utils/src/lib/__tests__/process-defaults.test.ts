import { execFile } from 'child_process'

import * as exported from '../..'

const execOptions = [
  '--project',
  'tsconfig-test.json',
]

const execPath = './node_modules/.bin/ts-node'

describe('process-defaults', () => {
  describe('when setProcessDefaults is required directly', () => {
    it('setProcessDefaults should be defined and be a function when required', () => {
      expect.assertions(2)

      expect(exported.setProcessDefaults).toBeDefined()
      expect(typeof exported.setProcessDefaults).toStrictEqual('function')
    })
  })

  describe('environment Defaults', () => {
    it('should be set once setProcessDefaults is called', () => new Promise((done) => {
      expect.assertions(4)

      const child = execFile(
        execPath, [
          ...execOptions,
          'src/lib/__tests__/fixtures/process-defaults/environment-defaults.ts',
        ],
        (error, stdout, stderr) => {
          const output = stdout.split('\n')
          expect(error).toBeNull()

          expect(output[0]).toStrictEqual('128')

          expect(stderr).toStrictEqual('')

          setTimeout(done, 64)
        },
      )

      child.on('exit', (code) => {
        expect(code).toStrictEqual(0)
      })
    }))
  })

  describe('uncaught Exception', () => {
    it('should be handled once the handler is installed', () => new Promise((done) => {
      expect.assertions(8)

      const child = execFile(
        execPath, [
          ...execOptions,
          'src/lib/__tests__/fixtures/process-defaults/uncaught-exception-handler.ts',
        ],
        (error, stdout, stderr) => {
          const output = JSON.parse(stdout.split('\n')[0])

          expect(error).not.toBeNull()

          expect(output.calciferService).toBeDefined()

          expect(output.level).toStrictEqual(60)
          expect(output.msg).toContain('Unhandled exception')
          expect(output.stack).toContain('Error: catch this!')
          expect(output.type).toStrictEqual('Error')

          expect(stderr).toStrictEqual('')

          setTimeout(done, 64)
        },
      )

      child.on('exit', (code) => {
        expect(code).toStrictEqual(1)
      })
    }))
  })

  describe('unhandled Rejection', () => {
    it('should be handled once the handler is installed', () => new Promise((done) => {
      expect.assertions(8)

      const child = execFile(
        execPath, [
          ...execOptions,
          'src/lib/__tests__/fixtures/process-defaults/unhandled-rejection-handler.ts',
        ],
        (error, stdout, stderr) => {
          const output = JSON.parse(stdout.split('\n')[0])

          expect(error).not.toBeNull()

          expect(output.calciferService).toBeDefined()

          expect(output.level).toStrictEqual(60)
          expect(output.msg).toContain('Unhandled rejection')
          expect(output.stack).toContain('Error: catch this!')
          expect(output.type).toStrictEqual('Error')

          expect(stderr).toStrictEqual('')

          setTimeout(done, 64)
        },
      )

      child.on('exit', (code) => {
        expect(code).toStrictEqual(1)
      })
    }))
  })

  describe('warnings', () => {
    it('should be handled once the handler is installed', () => new Promise((done) => {
      expect.assertions(7)

      const child = execFile(
        execPath, [
          ...execOptions,
          'src/lib/__tests__/fixtures/process-defaults/warning-handler.ts',
        ],
        (error, stdout, stderr) => {
          const output = JSON.parse(stdout.split('\n')[0])

          expect(error).toBeNull()

          expect(output.calciferService).toBeDefined()

          expect(output.level).toStrictEqual(40)
          expect(output.msg).toContain('Warning')
          expect(output.stack).toContain('Warning: fixtureDesignedWarning')

          expect(stderr).toContain('fixtureDesignedWarning')

          setTimeout(done, 64)
        },
      )

      child.on('exit', (code) => {
        expect(code).toStrictEqual(0)
      })
    }))
  })
})
