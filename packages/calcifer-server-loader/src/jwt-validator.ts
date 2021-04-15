import type * as CalciferTypes from '@alferpal/calcifer-types'
import { getClient, logger } from '@alferpal/calcifer-utils'
import type{ Got } from 'got'
import { clearIntervalAsync } from 'set-interval-async'
import { setIntervalAsync, SetIntervalAsyncTimer } from 'set-interval-async/dynamic'

const { AUTH_PASSWORD, AUTH_URL, AUTH_USER } = process.env

let client: Got
let invalid: string[] = []
let interval: SetIntervalAsyncTimer

async function logInAuth(): Promise<string> {
  const clientToUse = client ?? getClient()

  const { token }: CalciferTypes.AuthService.LoginResponseBody = await clientToUse.post(`${AUTH_URL}/login`, {
    json: {
      password: AUTH_PASSWORD,
      user: AUTH_USER,
    },
  }).json()

  return token
}

// * Missing got cache option due to https://github.com/sindresorhus/got/issues/1567

/**
* Inits periodic get of invalid tokens from auth service
*/
async function init() {
  let token = ''

  if (!client) {
    try {
      token = await logInAuth()
    } catch (error) {
      logger.error(error)
    }

    client = getClient({
      headers: {
        authorization: token,
      },
      hooks: {
        afterResponse: [
          async function gotAfterResponseAuth(response, retryWithMergedOptions) {
            if (response.statusCode === 401) {
              const auth = await logInAuth()

              const updatedOptions = {
                headers: {
                  authorization: auth,
                },
              }

              client.defaults.options.headers.authorization = auth

              return retryWithMergedOptions(updatedOptions)
            }

            return response
          },
        ],
      },
      mutableDefaults: true,
    })
  }

  await loadInvalid()

  console.dir({ interval })

  if (interval) {
    await clearIntervalAsync(interval)
  }

  interval = setIntervalAsync(loadInvalid, 65536)
}

async function loadInvalid() {
  try {
    const { invalidTokens }: CalciferTypes.AuthService.InvalidTokensResponseBody = await client.get(`${AUTH_URL}/invalid-tokens`).json()

    invalid = invalidTokens
  } catch (error) {
    logger.error(error, 'failed to load invalid tokens')
  }
}

/**
* Validates a decoded JWT
*/
function validateJWTHandler(
  decoded: CalciferTypes.Server.CalciferHapiDecodedCredentials,
): { isValid: boolean, } {
  return decoded.tokenId
  && decoded.tokenId.length
  && !invalid.includes(decoded.tokenId)
    ? { isValid: true }
    : { isValid: false }
}

export { init, validateJWTHandler }
