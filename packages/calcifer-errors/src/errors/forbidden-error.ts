export class ForbiddenError extends Error {
  static ERROR_CODE: string = 'ERR_FORBIDDEN'

  public code: string

  constructor(message: string) {
    super(message)

    this.name = this.constructor.name

    this.code = ForbiddenError.ERROR_CODE
  }
}

export default ForbiddenError
