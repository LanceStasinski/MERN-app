export class ServerError extends Error {

  __proto__ = Error

  public code?: number

  constructor(message: string, code?: number) {
      super(message);
      this.code = code;

      // See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
      Object.setPrototypeOf(this, ServerError.prototype);
  }
}
export default ServerError;