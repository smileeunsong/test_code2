const validatePassword = (password) => {
  const pwValidation = new RegExp(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/); // 최소 1개의 숫자 혹은 특수문자를 포함한 6~20자 영문 대소문자
  if (!pwValidation.test(password)) {
    const err = new Error('INVALID_PASSWORD');
    err.statusCode = 400;
    throw err;
  }
};

const validateEmail = (email) => {
  const emailValidation = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );
  if (!emailValidation.test(email)) {
    const err = new Error('INVALID_EMAIL');
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  validatePassword,
  validateEmail,
};
