const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

const ERROR_MESSAGES = {
  LOGIN_FAILED: 'email or password is not correct',
  PERMISSION_DENIED: 'permission denied',
};

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGES,
};
