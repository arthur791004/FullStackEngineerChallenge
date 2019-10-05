const { ROLES } = require('../../constants/users');
const db = require('../../db/models');
const { admin, users } = require('../../db/mockData');
const generateUser = require('../../db/utils/generateUser');
const { initMockData, login, getCookieByUser } = require('./utils');

const api = global.createApi('/api/v1/users');

const normalUser = users[0];

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

beforeAll(async () => {
  await initMockData();

  /**
   * Get cookies
   */
  admin.cookie = await getCookieByUser(admin);
  normalUser.cookie = await getCookieByUser(normalUser);
});

describe('login', () => {
  it('should succeed with correct email and password', async () => {
    const { status, data } = await login(admin);

    expect(status).toBe(200);
    expect(data.data).toMatchObject({
      email: admin.email,
      role: admin.role,
    });
  });

  it('should fail with wrong password', async () => {
    const { email } = admin;
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
    const mapToId = user => user.id;
    const ids = data.data.map(mapToId);

    expect(status).toBe(200);
    expect(ids).toEqual([admin, ...users].map(mapToId));
  });
});

describe('create a new user', () => {
  const user = generateUser('new');

  afterEach(async () => {
    await db.Users.destroy({ where: { id: user.id } });
  });

  it('should succeed with admin user', async () => {
    const { status, data } = await createUser(user, admin.cookie);

    expect(status).toBe(200);
    expect(data.data).toMatchObject({
      email: user.email,
      role: user.role,
    });
  });

  it('should fail with normal user', async () => {
    try {
      await createUser(user, normalUser.cookie);
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
    const { status, data } = await api.get(`/${admin.id}`);

    expect(status).toBe(200);
    expect(data.data).toMatchObject({
      id: admin.id,
      email: admin.email,
    });
  });
});

describe('update a user by id', () => {
  const user = generateUser('update');
  const attrsToBeUpdated = {
    role: ROLES.ADMIN,
  };

  beforeEach(async () => {
    await db.Users.create(user);
  });

  afterEach(async () => {
    await db.Users.destroy({ where: { id: user.id } });
  });

  it('should succeed with admin user', async () => {
    const { status, data } = await updateUser(
      user.id,
      attrsToBeUpdated,
      admin.cookie
    );

    expect(status).toBe(200);
    expect(data.data).toMatchObject({
      role: attrsToBeUpdated.role,
    });
  });

  it('should fail with normal user', async () => {
    try {
      await updateUser(user.id, attrsToBeUpdated, normalUser.cookie);
    } catch ({ response: { status } }) {
      expect(status).toBe(403);
    }
  });

  it('should fail without login', async () => {
    try {
      await updateUser(user.id, attrsToBeUpdated);
    } catch ({ response: { status } }) {
      expect(status).toBe(401);
    }
  });
});

describe('delete a user by id', () => {
  const user = generateUser('delete');

  beforeEach(async () => {
    await db.Users.create(user);
  });

  afterEach(async () => {
    await db.Users.destroy({ where: { id: user.id } });
  });

  it('should succeed with admin user', async () => {
    const { status } = await api.delete(`/${user.id}`, {
      headers: {
        Cookie: admin.cookie,
      },
    });

    expect(status).toBe(200);
  });
});
