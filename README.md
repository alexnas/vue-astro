# Esoteric Astro Charts

Vue 3 application to process astro data by specific manner and display results on the screen.

The Vue 3 app processes natal card data ina special manner. As a result the app create specific tree-like grafical astro charts to show specific influence and interrelation of planetary energies.

Astro data are collected in PosgreSql DB. Apply CRUD operations to process data. Use Pinia as a state manager. Create tree-like structure to display results.

## Used technologies

- Vue 3
- Typescript
- Composition API
- Vite 4
- Pinia
- Vue Router 4
- TailwindCss
- VeeValidate
- Yup
- Axios
- REST API
- PostrgreSql (in backend)

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## License

Under the terms of the MIT license.
