const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const userId = await userService.signUp(email, password);

  res.status(201).json({
    message: 'SUCCESS',
    userId: userId,
  });
});

module.exports = { signUp };
