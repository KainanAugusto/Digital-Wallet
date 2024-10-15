import User from '../models/Users.js';

function create(body) {
  return User.create(body);
}
function findByEmail(email) {
  return User.findOne({ email });
}

export default { create, findByEmail };
