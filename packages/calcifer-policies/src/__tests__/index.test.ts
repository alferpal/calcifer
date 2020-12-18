import { describe, expect, it } from '@jest/globals'

import policies from '../index'

describe('canChangeBusy policy', () => {
  const hapiToolkit = { continue: true }

  it('should allow when the credentials are correct', () => {
    expect.assertions(1)

    const request = {
      auth: {
        credentials: {
          roles: ['changeBusy'],
        },
      },
    }

    expect(
      policies.canChangeBusy(request as any, hapiToolkit as any),
    ).toStrictEqual(hapiToolkit.continue)
  })

  it('should throw when the credentials are incorrect', () => {
    expect.assertions(1)

    const request = {
      auth: {
        credentials: {
          roles: [],
        },
      },
    }
    expect(() => {
      policies.canChangeBusy(request as any, hapiToolkit as any)
    }).toThrow('Not enough permissions to perform this action')
  })
})

describe('canWaterPlants policy', () => {
  const hapiToolkit = { continue: true }

  it('should allow when the credentials are correct', () => {
    expect.assertions(1)

    const request = {
      auth: {
        credentials: {
          roles: ['waterPlants'],
        },
      },
    }

    expect(
      policies.canWaterPlants(request as any, hapiToolkit as any),
    ).toStrictEqual(hapiToolkit.continue)
  })

  it('should throw when the credentials are incorrect', () => {
    expect.assertions(1)

    const request = {
      auth: {
        credentials: {
          roles: [],
        },
      },
    }
    expect(() => {
      policies.canWaterPlants(request as any, hapiToolkit as any)
    }).toThrow('Not enough permissions to perform this action')
  })
})

describe('isAdmin policy', () => {
  const hapiToolkit = { continue: true }

  it('should allow when the credentials are correct', () => {
    expect.assertions(1)

    const request = {
      auth: {
        credentials: {
          roles: ['admin'],
        },
      },
    }

    expect(
      policies.isAdmin(request as any, hapiToolkit as any),
    ).toStrictEqual(hapiToolkit.continue)
  })

  it('should throw when the credentials are incorrect', () => {
    expect.assertions(1)

    const request = {
      auth: {
        credentials: {
          roles: [],
        },
      },
    }
    expect(() => {
      policies.isAdmin(request as any, hapiToolkit as any)
    }).toThrow('Not enough permissions to perform this action')
  })
})

describe('isLogged policy', () => {
  const hapiToolkit = { continue: true }

  it('should allow when the user is logged', () => {
    expect.assertions(1)

    const request = {
      auth: {
        isAuthenticated: true,
      },
    }

    expect(
      policies.isLogged(request as any, hapiToolkit as any),
    ).toStrictEqual(hapiToolkit.continue)
  })

  it('should throw when the credentials are incorrect', () => {
    expect.assertions(1)

    const request = {
      auth: {
        isAuthenticated: false,
      },
    }
    expect(() => {
      policies.isLogged(request as any, hapiToolkit as any)
    }).toThrow('This action requires a logged user')
  })
})
