import { logError } from '../util/logUtil';

const captureStacktrace = false;
const userErrorText = `Unknown error! The error has been logged and the developers will look at it. Feel free to contact us over at https://discord.gg/eCjP4C7vY`;
const spamErrorText = 'Slow down! You have to wait at least 10 seconds between messages.';

export class SpamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    if (captureStacktrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    logError(`threw new ${this.constructor.name}`);
  }
}

export class TypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    if (captureStacktrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    logError(`threw new ${this.constructor.name}`);
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    if (captureStacktrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    logError(`threw new ${this.constructor.name}`);
  }
}

export class MongoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    if (captureStacktrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    logError(`threw new ${this.constructor.name}`);
  }
}

export class CommandoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    if (captureStacktrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    logError(`threw new ${this.constructor.name}`);
  }
}

export { userErrorText, spamErrorText };
