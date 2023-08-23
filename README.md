# Nuxt Sentry

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 3 module for Sentry.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/@falcondev-it/nuxt-sentry?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰ &nbsp;Foo
- 🚠 &nbsp;Bar
- 🌲 &nbsp;Baz

## Quick Setup

1. Add `@falcondev-it/nuxt-sentry` dependency to your project

```bash
# Using pnpm
pnpm add -D @falcondev-it/nuxt-sentry

# Using yarn
yarn add --dev @falcondev-it/nuxt-sentry

# Using npm
npm install --save-dev @falcondev-it/nuxt-sentry
```

2. Add `@falcondev-it/nuxt-sentry` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@falcondev-it/nuxt-sentry'
  ]
})
```

That's it! You can now use Nuxt Sentry in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@falcondev-it/nuxt-sentry/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@falcondev-it/nuxt-sentry

[npm-downloads-src]: https://img.shields.io/npm/dm/@falcondev-it/nuxt-sentry.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@falcondev-it/nuxt-sentry

[license-src]: https://img.shields.io/npm/l/@falcondev-it/nuxt-sentry.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@falcondev-it/nuxt-sentry

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
