const { users, reviews } = require('../../db/mockData');
const { initMockData, getCookieByUser } = require('./utils');

const api = global.createApi('/api/v1/me');

const currentUser = users[0];

beforeAll(async () => {
  /**
   * Create data for test
   */
  await initMockData();

  /**
   * Get cookies
   */
  currentUser.cookie = await getCookieByUser(currentUser);
});

describe('get me', () => {
  it('should succeed', async () => {
    const { status, data } = await api.get('/', {
      headers: {
        Cookie: currentUser.cookie,
      },
    });

    expect(status).toBe(200);
    expect(data.data).toMatchObject({
      id: currentUser.id,
      email: currentUser.email,
    });
  });
});

describe('get requiring reviews', () => {
  it('should succeed', async () => {
    const requiringReviews = reviews
      .filter(review => review.reviewerId === currentUser.id)
      .map(({ reviewerId, revieweeId, ...review }) =>
        expect.objectContaining({
          ...review,
          reviewee: users.find(user => user.id === revieweeId).email,
        })
      );

    const { status, data } = await api.get('/requiringReviews', {
      headers: {
        Cookie: currentUser.cookie,
      },
    });

    expect(status).toBe(200);
    expect(data.data).toEqual(expect.arrayContaining(requiringReviews));
  });
});

describe('get feedbacks', () => {
  it('should succeed', async () => {
    const feedbacks = reviews
      .filter(review => review.revieweeId === currentUser.id)
      .map(({ reviewerId, revieweeId, ...review }) =>
        expect.objectContaining({
          ...review,
          reviewer: users.find(user => user.id === reviewerId).email,
        })
      );

    const { status, data } = await api.get('/feedbacks', {
      headers: {
        Cookie: currentUser.cookie,
      },
    });

    expect(status).toBe(200);
    expect(data.data).toEqual(expect.arrayContaining(feedbacks));
  });
});
