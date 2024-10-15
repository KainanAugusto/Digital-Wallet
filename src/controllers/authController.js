import authService from '../services/authService.js';
import HTTP_STATUS from '../utils/httpStatus.js';

async function signUp(req, res) {
  try {
    const newUser = await authService.signUp(req.body);
    

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'User created successfully',
      user: newUser
    });
  } catch (error) {
    return res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'An unexpected error occurred.'
    });
  }
}

export default { signUp };
