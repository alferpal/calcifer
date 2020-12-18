export class InvalidCredentialsError extends Error {
  static ERROR_CODE: string = 'ERR_INVALID_CREDENTIALS'

  public code: string

  constructor(message: string) {
    super(message)

    this.name = this.constructor.name

    this.code = InvalidCredentialsError.ERROR_CODE
  }
}

export default InvalidCredentialsError
