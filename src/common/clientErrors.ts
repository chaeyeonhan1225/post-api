export class BadRequestError extends Error {
  private code: number;
  constructor(message: string) {
    super(message);
    this.name = 'ClientError';
    this.code = 400;
  }
}

export class NotFoundError extends Error {
  private code: number;
  constructor(message: string) {
    super(message);
    this.name = 'ClientError';
    this.code = 404;
  }
}

export class ForbiddenError extends Error {
  private code: number;
  constructor(message: string) {
    super(message);
    this.name = 'ClientError';
    this.code = 403;
  }
}

export class ConflictError extends Error {
  private code: number;
  constructor(message: string) {
    super(message);
    this.name = 'ClientError';
    this.code = 409;
  }
}
