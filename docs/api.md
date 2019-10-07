# API

## Format

response would be the following format:

```
{
  data    // response data
  message // error message
}
```

## Data Structure

### User

| Field     | Type      | Description |
| --------- | --------- | ----------- |
| id        | uuidv4    |             |
| email     | string    |             |
| role      | string    |             |
| createdAt | timestamp |             |
| updatedAt | timestamp |             |

### Review

| Field      | Type           | Description               |
| ---------- | -------------- | ------------------------- |
| id         | number         |                           |
| reviewerId | uuidv4         |                           |
| revieweeId | uuidv4         |                           |
| rating     | number (0 - 5) | rating to reviewee        |
| content    | string         | text feedback to reviewee |
| createdAt  | timestamp      |                           |
| updatedAt  | timestamp      |                           |

#### Note

- be called as `requiringReview` to reviewer
- be called as `feedback` to reviewee

## Users

### Login

```
POST /users/login
```

Parameters

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| email    | string |             |
| password | string |             |

Response

- return current logged in user

Example

```
{
  data: {
    createdAt: 1570431065384
    email: "admin@fake.com"
    id: "9dee7df5-615d-4b2d-b77a-eb9e1196617f"
    role: 1
    updatedAt: 1570431065384
  }
}
```

### Logout

```
POST /users/logout
```

Parameters

- N/A

Response

- N/A

### Get all users

```
GET /users
```

Parameters

- N/A

Response

- return all of users

### Create a user (admin only)

```
POST /users
```

Parameters

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| email    | string |             |
| password | string |             |
| role     | number | default: 0  |

Response

- return created user

### Get a user

```
GET /users/:userId
```

Parameters

- N/A

Response

- return user with specied userId

### Update a user (admin only)

```
PATCH /users/:userId
```

Parameters

| Field | Type   | Description         |
| ----- | ------ | ------------------- |
| role  | number | 0: normal, 1: admin |

Response

- return updated user

### Delete a user (admin only)

```
DELETE /users/:userId
```

Parameters

- N/A

Response

- return deleted user

## Reviews

### Get all reviews (admin only)

a all of reviews sorting by updatedAt

```
GET /reviews
```

Parameters

- N/A

Response

- return list of review

### Create a user (admin only)

create a review with reviewer and reviewee

```
POST /reviews
```

Parameters

| Field      | Type   | Description |
| ---------- | ------ | ----------- |
| reviewerId | uuidv4 |             |
| revieweeId | uuidv4 |             |

Response

- return created review

### Give or update the Feedback to a review

```
POST /reviews/:reviewId/feedback
```

Parameters

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| rating  | number |             |
| content | string |             |

Response

- return updated review

### Delete a review (admin only)

```
DELETE /reviews/:reviewId
```

Parameters

- N/A

Response

- return deleted review

## Me

### Get current session of user

```
GET /me
```

Parameters

- N/A

Response

- return current logged in user

Example

```
{
  data: {
    createdAt: 1570431065384
    email: "admin@fake.com"
    id: "9dee7df5-615d-4b2d-b77a-eb9e1196617f"
    role: 1
    updatedAt: 1570431065384
  }
}
```

### Get requiring reviews

```
GET /me/requiringReviews
```

Parameters

- N/A

Response

- return requiring reviews for current logged in user

Example

```
{
  data: [
    {
      id: 181,
      content: "",
      rating: 0,
      reviewee: User,
      revieweeId: "e4728d23-d362-43ed-94f7-ec6996d540fc",
      reviewerId: "c2cdee8f-32c7-41b6-9f0a-bfc2cc5b2cd2",
      createdAt: 1570431066585,
      updatedAt: 1570431066585
    }
  ]
}
```

### Get feedbacks

```
GET /me/feedbacks
```

Parameters

- N/A

Response

- return feedback list to current logged in user

Example

```
{
  data: [
    {
      id: 182,
      rating: 2,
      content: "fake feedbacks from user2@fake.com to user1@fake.com",
      reviewer: User,
      revieweeId: "c2cdee8f-32c7-41b6-9f0a-bfc2cc5b2cd2",
      reviewerId: "e4728d23-d362-43ed-94f7-ec6996d540fc",
      createdAt: 1570431066585,
      updatedAt: 1570431066585
    }
  ]
}
```
