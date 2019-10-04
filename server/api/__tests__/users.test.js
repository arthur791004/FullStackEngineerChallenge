const { ROLES } = require('../../constants/users');
const db = require('../../db/models');

const api = global.createApi('/api/v1/users');

const generateUser = (name, role = ROLES.NORMAL) => ({
  email: `${name}@test.com`,
  password: name,
  role,
});

const userIds = {
  admin: null,
  normal: null,
};

const cookies = {
  admin: null,
  normal: null,
};

const adminUser = generateUser('admin', ROLES.ADMIN);
const normalUser = generateUser('normal', ROLES.ADMIN);

const login = async user => {
  const { email, password } = user;
  const res = await api.post('/login', { email, password });

  return res;
};

const createUser = async (user, cookie) => {
  const headers = {};
  if (cookie) {
    headers.Cookie = cookie;
  }

  const res = await api.post('/', user, { headers });

  return res;
};

const updateUser = async (userId, user, cookie) => {
  const headers = {};
  if (cookie) {
    headers.Cookie = cookie;
  }

  const res = await api.patch(`/${userId}`, user, { headers });

  return res;
};

const getCookieByUser = async user => {
  const { headers } = await login(user);

  return headers['set-cookie'].join(';');
};

/**
 * Clean and create data for testing
 */
beforeAll(async () => {
  await db.sequelize.sync();
  await db.User.destroy({ truncate: true });

  userIds.admin = (await db.User.create(adminUser)).get('id');
  userIds.normal = (await db.User.create(normalUser)).get('id');

  cookies.admin = await getCookieByUser(adminUser);
  cookies.normal = await getCookieByUser(normalUser);
});

describe('login', () => {
  it('should succeed with correct email and password', async () => {
    const { status, data } = await login(adminUser);

    expect(status).toBe(200);
    expect(data.data).toMatchObject({
      email: adminUser.email,
      role: adminUser.role,
    });
  });

  it('should fail with wrong password', async () => {
    const { email } = adminUser;
    const password = 'wrong password';

    try {
      await login({ email, password });
    } catch ({ response: { status } }) {
      expect(status).toBe(401);
    }
  });
});

describe('logout', () => {
  it('should succeed', async () => {
    const { status } = await api.post('/logout');

    expect(status).toBe(200);
  });
});

describe('get user list', () => {
  it('should succeed', async () => {
    const { status, data } = await api.get('/');
    const emails = data.data.map(user => user.email);

    expect(status).toBe(200);
    expect(emails).toEqual([adminUser.email, normalUser.email]);
  });
});

describe('create a new user', () => {
  const user = generateUser('new');

  it('should succeed with admin user', async () => {
    const { status, data } = await createUser(user, cookies.admin);

    expect(status).toBe(200);
    expect(data.data).toMatchObject({
      email: user.email,
      role: user.role,
    });
  });

  it('should fail with normal user', async () => {
    try {
      await createUser(user, cookies.normal);
    } catch ({ response: { status } }) {
      expect(status).toBe(403);
    }
  });

  it('should fail without login', async () => {
    try {
      await createUser(user);
    } catch ({ response: { status } }) {
      expect(status).toBe(401);
    }
  });
});

describe('get user by id', () => {
  it('should succeed', async () => {
    const { status, data } = await api.get(`/${userIds.admin}`);

    expect(status).toBe(200);
    expect(data.data).toMatchObject({
      email: adminUser.email,
    });
  });
});

describe('update a user by id', () => {
  const user = generateUser('update');
  const attrsToBeUpdated = {
    role: ROLES.ADMIN,
  };

  let userId = null;

  beforeAll(async () => {
    userId = (await db.User.create(user)).get('id');
  });

  afterAll(async () => {
    await db.User.destroy({ where: { id: userId } });
  });

  it('should succeed with admin user', async () => {
    const { status, data } = await updateUser(
      userId,
      attrsToBeUpdated,
      cookies.admin
    );

    expect(status).toBe(200);
    expect(data.data).toMatchObject({
      role: attrsToBeUpdated.role,
    });
  });

  it('should fail with normal user', async () => {
    try {
      await updateUser(userId, attrsToBeUpdated, cookies.normal);
    } catch ({ response: { status } }) {
      expect(status).toBe(403);
    }
  });

  it('should fail without login', async () => {
    try {
      await updateUser(userId, attrsToBeUpdated);
    } catch ({ response: { status } }) {
      expect(status).toBe(401);
    }
  });
});

describe('delete a user by id', () => {
  const user = generateUser('delete');
  let userId = null;

  beforeAll(async () => {
    userId = (await db.User.create(user)).get('id');
  });

  it('should succeed with admin user', async () => {
    const { status } = await api.delete(`/${userId}`, {
      headers: {
        Cookie: cookies.admin,
      },
    });

    expect(status).toBe(200);
  });
});
