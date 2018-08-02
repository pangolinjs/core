# Pangolin

Framework for componentized front end development with Nunjucks, Sass, and JavaScript.


## Install dependencies

```bash
# Yarn
yarn

# npm
npm install
```

## Tasks

### Development

```bash
yarn dev
# or
npm run dev
```

### Testing

```bash
# Linting
yarn lint:css
yarn lint:js
# or
npm run lint:css
npm run lint:js

# Unit test
yarn test:unit
# or
npm run test:unit
```

### Build

Generate production-ready files (output to `dist`).

```bash
yarn build
# or
npm run build
```

Generate HTML for static file server (output to `dev`).

```bash
yarn build:dev
# or
npm run build:dev
```

Take a look at the [full documentation](https://pangolinjs.org).
