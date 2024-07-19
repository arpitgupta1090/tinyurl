class BaseError extends Error {
    
    constructor(public name: string, public httpCode: number, description: string, public isOperational: boolean) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
    
      this.name = name;
      this.httpCode = httpCode;
      this.isOperational = isOperational;
    
      Error.captureStackTrace(this);
    }
}
   
export class InternalServerError extends BaseError {
  constructor(description:string="something went wrong", name:string="INTERNAL_SERVER_ERROR", httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true) {
    super(name, httpCode, description, isOperational);
  }
}

export class DBError extends BaseError {
    constructor(description:string, name:string="database_error", httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true) {
      super(name, httpCode, description, isOperational);
    }
}

export class NotFoundError extends BaseError {
  constructor(description:string, name:string="NOT_FOUND", httpCode = HttpStatusCode.NOT_FOUND, isOperational = true) {
    super(name, httpCode, description, isOperational);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(description:string, name:string="UNAUTHORIZED", httpCode = HttpStatusCode.UNAUTHORIZED, isOperational = true) {
    super(name, httpCode, description, isOperational);
  }
}

export class ForbiddenError extends BaseError {
  constructor(description:string, name:string="ACCESS_DENIED", httpCode = HttpStatusCode.ACCESS_DENIED, isOperational = true) {
    super(name, httpCode, description, isOperational);
  }
}

export class UniqueContraintError extends BaseError {
  constructor(description:string, name:string="BAD_REQUEST", httpCode = HttpStatusCode.BAD_REQUEST, isOperational = true) {
    super(name, httpCode, description, isOperational);
  }
}

export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    ACCESS_DENIED = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}