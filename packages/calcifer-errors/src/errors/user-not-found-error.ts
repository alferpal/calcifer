export class UserNotFoundError extends Error {
  static ERROR_CODE: string = 'ERR_USER_NOT_FOUND'

  public code: string

  constructor(message: string) {
    super(message)

    this.name = this.constructor.name

    this.code = UserNotFoundError.ERROR_CODE
  }
}

export default UserNotFoundError
