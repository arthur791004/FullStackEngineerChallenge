# Performance Review System

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
$ yarn run dev
```

## Production

Please do `Installation` before running at production mode

```bash
# build website
$ yarn build

# start server
$ yarn run prod

# see demo
$ open http://localhost:3000
```

## Tech Stack

### Libraries

- react v16.8.6
- react-router v5.0.1
- styled-components v4.3.2: for css in js

### Tools

- eslint
- prettier
- storybook
- @svgr/webpack: for easily using svg in react

## Folder Structure

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
│   ├── services     # apis
│   ├── styles       # share utils of styles
│   ├── utils        # share functions for components, services and so on to use
│   ├── App.js       # root component
│   └── index.js     # entry point of client
├── internals/       # for internal use such as configs, scripts and so on
├── server/          # simple express server for serving html in production
├── package.json
├── README.md
└── yarn.lock
```
