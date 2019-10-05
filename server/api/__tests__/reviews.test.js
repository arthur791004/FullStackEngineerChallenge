const db = require('../../db/models');
const { admin, users } = require('../../db/mockData');
const generateReview = require('../../db/utils/generateReview');
const { initMockData, getCookieByUser } = require('./utils');

const api = global.createApi('/api/v1/reviews');

const currentUser = users[0];

beforeAll(async () => {
  await initMockData();

  /**
   * Get cookies
   */
  admin.cookie = await getCookieByUser(admin);
  currentUser.cookie = await getCookieByUser(currentUser);
});

describe('create a review', () => {
  let reviewId;

  beforeEach(() => {
    reviewId = null;
  });

  afterEach(async () => {
    if (reviewId) {
      await db.Reviews.destroy({ where: { id: reviewId } });
    }
  });

  it('should succeed with admin user', async () => {
    const review = {
      reviewerId: currentUser.id,
      revieweeId: admin.id,
    };

    const { status, data } = await api.post('/', review, {
      headers: {
        Cookie: admin.cookie,
      },
    });

    reviewId = data.data.id;

    expect(status).toBe(200);
    expect(data.data).toMatchObject(review);
  });
});

describe('upsert a feedback for target review', () => {
  const review = generateReview(admin, currentUser);
  let reviewId;

  beforeEach(async () => {
    reviewId = (await db.Reviews.create(review)).get('id');
  });

  afterEach(async () => {
    if (reviewId) {
      await db.Reviews.destroy({ where: { id: reviewId } });
      reviewId = null;
    }
  });

  it('should succeed with reviewer', async () => {
    const feedback = {
      rating: 5,
      content: 'fake feedback',
    };

    const { status, data } = await api.post(`/${reviewId}/feedback`, feedback, {
      headers: {
        Cookie: admin.cookie,
      },
    });

    expect(status).toBe(200);
    expect(data.data).toMatchObject(feedback);
  });
});

describe('delete a review', () => {
  const review = generateReview(admin, currentUser);
  let reviewId;

  beforeEach(async () => {
    reviewId = (await db.Reviews.create(review)).get('id');
  });

  afterEach(async () => {
    if (reviewId) {
      await db.Reviews.destroy({ where: { id: reviewId } });
    }
  });

  it('should succeed with admin user', async () => {
    const { status } = await api.delete(`/${reviewId}`, {
      headers: {
        Cookie: admin.cookie,
      },
    });

    expect(status).toBe(200);
  });
});
