export class NotFoundError extends Error {
  static ERROR_CODE: string = 'ERR_NOT_FOUND'

  public code: string

  constructor(message: string) {
    super(message)

    this.name = this.constructor.name

    this.code = NotFoundError.ERROR_CODE
  }
}

export default NotFoundError
