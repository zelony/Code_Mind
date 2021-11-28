import {HttpStatusCode} from "./enums";
// import {logger} from "firebase-functions";


class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    // await logger.error(
    //     "Error message from the centralized error-handling component",
    //     err,
    // );
    // todo:: await sendMailToAdminIfCritical();
    // todo:: await sendEventsToSentry();
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();
export class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: HttpStatusCode, isOperational: boolean, description: string) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = name;
      this.httpCode = httpCode;
      this.isOperational = isOperational;
      Error.captureStackTrace(this);
    }
}
export class APIError extends BaseError {
  constructor(name:string, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = "internal server error") {
    super(name, httpCode, isOperational, description);
  }
}
export class HTTP400Error extends BaseError {
  constructor(description = "bad request") {
    super("NOT FOUND", HttpStatusCode.BAD_REQUEST, true, description);
  }
}
export class HTTP404Error extends BaseError {
  constructor(description = "not found") {
    super("NOT FOUND", HttpStatusCode.NOT_FOUND, true, description);
  }
}
export class HTTP401Error extends BaseError {
  constructor(description = "not-authenticated") {
    super("NOT AUTHENTICATED", HttpStatusCode.NOT_AUTHENTICATED, true, description);
  }
}

