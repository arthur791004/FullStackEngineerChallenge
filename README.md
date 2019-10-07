# Performance Review System

## Outline

- [Requirements](#Requirements)
- [Environment](#Environment)
- [Installation](#Installation)
- [Development](#Development)
- [Production](#Production)
- [Demo](#Demo)
- [Assumptions](#Assumptions)
- [Designs](#Designs)
  - [Folder Structure](#Folder-Structure)
  - [Backend](#Backend)
  - [Frontend](#Frontend)
  - [Others](#Others)
- [Future Work](#Future-Work)

---

## Requirements

Refer to [requirements](https://github.com/arthur791004/FullStackEngineerChallenge/blob/master/specs/README.md)

### Completed

#### Admin view
- ✅ Add/view employees
- ✅ Update the role of employees
- ✅ Add/view performance reviews
- ❌ Remove employees
- ❌ Assign multiple employees to review another employee's performance review at once.

#### Employee view
- ✅ List of performance reviews requiring feedback
- ✅ Submit feedback
- ✅ View feedback from another employee

Refer to [Assumptions](#Assumptions) to see more detail of assumptions I made

### Demo

You could access this demo sites, or refer to [Production](#Production) to play with local machine
- https://fullstackchallenge.appspot.com

Note that it's **NOT** bug free demo site 😂

### How to use

You could refer to [Guideline](https://github.com/arthur791004/FullStackEngineerChallenge/blob/master/docs/manual.md)

#### Accounts

Run `yarn db:init` or `yarn prod:init` would generate one admin user (admin@fake.com), ten employees (user1@fake.com ~ user10@fake.com) and reviews. The `password` is the same as `local-part` of `email` (ex: the password of `user1@fake.com` is `user1`)


## Environment

- node: v10.16.0 above
- yarn: v1.15.2 above

## Installation

```bash
$ yarn install
```

## Development

Please do `Installation` before development

```bash
$ yarn db:init # generate mock data for development
$ yarn run dev
```

## Production

Please do `Installation` before running at production mode

```bash
$ yarn build
$ yarn prod:init # generate mock data for production
$ yarn run prod

$ open http://localhost:3000
```

## Assumptions

- Assume this performance reviews system would be used by small company with about 50 ~ 100 employee. Therefore, I don't take scalability into consideration (such as shared cookie with multi-server, pagination and so on), but I would deal with it in the future work.
- Assume we only have 2 ~ 3 Frontend focused engineer to develop this system. Therefore, I prefer to use more library for backend to help us to easliy manipulate the database.
- Assume clients only do performace reviews once and each employee could review other once without deadline. Therefore, admin could create a review with reviewer and reviewee, and each review is separated. Besides, every review would not expired which means reviewer could always change the feedback to reviewee.
- Assume clients only do performance reviews via desktop with latest chrome. Therefore, I don't take responsive design into consideration.

## Designs

### Folder Structure

```bash
├── .storybook/      # configs of storybook
├── client/
│   ├── assets       # assets is used by other components, especially for svgs
│   ├── components   # components with data from props
│   ├── constants    # constants values shared between other folders
│   ├── containers   # components with data from redux and props
│   ├── data         # mock data and types of api response
│   ├── html         # html related files, such as index.html, favicon
│   ├── pages        # components for the entry of routing path
│   ├── redux        # define actions, state, thunks and selectors
│   ├── services     # apis
│   ├── styles       # share utils of styles
│   ├── utils        # share functions for components, services and so on to use
│   ├── App.js       # root component
│   └── index.js     # entry point of client
├── internals/       # for internal use such as configs, scripts and so on
├── server/          # simple express server for serving html in production
│   ├── api          # define api endpoint under this folder
│   ├── constants    # constants values shared between other folders
│   ├── db           # define database configs, model, migration, seed
│   ├── middlewares  # custom middlewares for express
│   ├── utils        # constants values shared between other folders
│   └── index.js     # entry point of server
├── app.yaml         # config for deploying to gcp
├── package.json
├── README.md
└── yarn.lock
```

### Backend

- use `bcrypt` to encrypt password of user
- use `express-session` for cookie-based authentication
  - Clients would only use this system via desktop. Therefore, I choose to use cookie instead of token for authentication. Besides, I think cookie with `httpOnly` and `sameSite` is strong enough to prevent security issues.
- use `sequelize` for connecting `express` with `database`
  - I never use `sequelize` before, but I think it has many features, large commutiy support and update frequently. I think it would satisfy the requirements
- use `sqlite3` as database
  - I want to make our system simple and limit the services of this system, so I choose it instead of other database services.

Refer to [API Docs](https://github.com/arthur791004/FullStackEngineerChallenge/blob/master/docs/api.md) for data structure and usage of api.

### Frontend

- use `react-router` to do client route
- use `redux` and `redux-starter-kit` to make global store management simple
  - `redux-starter-kit` has `createSlice` which make us easy to create actions, reducers
- use `reselect` to reduce the component's re-rendering which would enhance performance
- use `redux-thunk` to handle asycn actions and side effects
  - Although I love to use `redux` with `redux-observable` to handle the side effects, but it would need to learn `rxjs` before development. So I keep to use `redux-thunk` because it's simple and also the built-in middlewares of `redux-starter-kit`
- use `styled-components` to use css in js which make us easy to styled any components.

### Others

- use `eslint` and `prettier` to unify the coding styles and ensure readability.
- use `jest` for testing to reduce bugs.

## Future Work

### Scalability

The following our some thoughs about making this system more robust and afford more users.
- introduce `redis` with `express-session` and change `sqlite3` to `mysql` or other database services to make our server do horizontal scaling.
- render large list with `pagination` to enhance performance
