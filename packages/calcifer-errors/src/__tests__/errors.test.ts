import * as errors from '../index'

describe('when errors is required', () => {
  it('errors should be an object', () => {
    expect.assertions(3)

    expect(errors).toBeDefined()
    expect(typeof errors).toStrictEqual('object')
    expect(Object.keys(errors).length).toBeGreaterThan(0)
  })
})

describe('errors', () => {
  // eslint-disable-next-line jest/prefer-expect-assertions
  it('all errors should be instantiable and have name and code properties', async () => {
    Object.values(errors).forEach((ErrorClass) => {
      const error = new ErrorClass('testMessage')

      expect(error).toBeDefined()
      expect(error).not.toBeNull()

      expect(error).toBeInstanceOf(Error)

      expect(error.name).toStrictEqual(ErrorClass.name)

      expect(error.code).toStrictEqual(ErrorClass.ERROR_CODE)
    })
  })
})
