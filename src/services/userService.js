const userDao = require('../models/userDao');
const { validatePassword, validateEmail } = require('../utils/validators');

const signUp = async (email, password) => {
  validateEmail(email);
  validatePassword(password);

  const emailCheck = await userDao.getUser(email);
  if (emailCheck !== undefined) {
    if (emailCheck.email == email) {
      const err = new Error('DUPLICATED_EMAIL');
      err.statusCode = 409;
      throw err;
    }
  }

  const userId = await userDao.addUser(email, password);
  return userId;
};

module.exports = { signUp };
