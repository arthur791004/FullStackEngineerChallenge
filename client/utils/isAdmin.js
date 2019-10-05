const ROLES = {
  NORMAL: 0,
  ADMIN: 1,
};

const isAdmin = user => user && user.role === ROLES.ADMIN;

export default isAdmin;
