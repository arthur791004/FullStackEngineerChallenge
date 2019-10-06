import { ROLES } from '@/constants/users';

const isAdmin = user => user && user.role === ROLES.ADMIN;

export default isAdmin;
