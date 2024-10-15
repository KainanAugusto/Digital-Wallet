import HTTP_STATUS from './httpStatus.js';

export function createCustomError(statusCode, message) {
  return { statusCode, message };
}

export function handleMongoError(error) {
  switch (error.code) {
    case 11000: {
      const field = Object.keys(error.keyPattern)[0];
      return createCustomError(HTTP_STATUS.BAD_REQUEST, `Duplicate value for the field '${field}'. Please use a different ${field}.`);
    }
    default: {
      return createCustomError(HTTP_STATUS.INTERNAL_SERVER_ERROR, "An unexpected database error occurred.");
    }
  }
}

export function handleValidationError(error) {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((err) => err.message);
    return createCustomError(HTTP_STATUS.BAD_REQUEST, `Validation failed: ${messages.join(', ')}`);
  }
  return createCustomError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'An internal server error occurred.');
}

export function handleAuthError() {
  return createCustomError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required.');
}

export function handleAuthorizationError() {
  return createCustomError(HTTP_STATUS.FORBIDDEN, 'You do not have permission to perform this action.');
}

export function handleNotFoundError(resource = "Resource") {
  return createCustomError(HTTP_STATUS.NOT_FOUND, `${resource} not found.`);
}
