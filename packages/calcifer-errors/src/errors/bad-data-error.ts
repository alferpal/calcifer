export class BadDataError extends Error {
  static ERROR_CODE: string = 'ERR_BAD_DATA'

  public code: string

  constructor(message: string) {
    super(message)

    this.name = this.constructor.name

    this.code = BadDataError.ERROR_CODE
  }
}

export default BadDataError
