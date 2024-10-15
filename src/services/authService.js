import bcrypt from 'bcryptjs';
import authRepository from '../repositories/authRepository.js';
import { createCustomError, handleMongoError } from '../utils/errorHandler.js';
import HTTP_STATUS from '../utils/httpStatus.js';

async function signUp(body) {
  try {
    const existingUser = await authRepository.findByEmail(body.email);
    if (existingUser) {
      throw createCustomError(HTTP_STATUS.BAD_REQUEST, 'User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await authRepository.create({ ...body, password: hashedPassword });

    return newUser;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    } else if (error.name === 'MongoServerError') {
      throw handleMongoError(error);
    } else {
      throw createCustomError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'An internal server error occurred.');
    }
  }
}

export default { signUp };
