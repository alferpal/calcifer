export class ServerError extends Error {
  static ERROR_CODE: string = 'ERR_SERVER'

  public code: string

  constructor(message: string) {
    super(message)

    this.name = this.constructor.name

    this.code = ServerError.ERROR_CODE
  }
}

export default ServerError
