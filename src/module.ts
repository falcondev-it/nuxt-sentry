import { type NuxtApp } from '#app/nuxt'
import { type SentryVitePluginOptions, sentryVitePlugin } from '@sentry/vite-plugin'
import { type Options as SentryVueOptions } from '@sentry/vue/types/types'
import defu from 'defu'
import {
  addPlugin,
  addVitePlugin,
  createResolver,
  defineNuxtModule,
  resolvePath,
  useLogger,
} from 'nuxt/kit'
import { type Plugin } from 'vite'

export interface ModuleOptions {
  /** @default true */
  deleteSourcemapsAfterUpload?: boolean

  vitePlugin: SentryVitePluginOptions
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    sentry:
      | undefined
      | {
          dsn?: string
        }
  }
  interface NuxtConfig {
    sentry?: ModuleOptions
  }
  interface AppConfigInput {
    sentry?: {
      client?: (app: NuxtApp) => Partial<Omit<SentryVueOptions, 'Vue' | 'app' | 'dsn'>>
    }
  }
}

const logger = useLogger('nuxt:sentry')

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@falcondev-it/nuxt-sentry',
    configKey: 'sentry',
  },

  async setup(_moduleOptions, nuxt) {
    if (!nuxt.options.runtimeConfig.public.sentry?.dsn) {
      logger.warn('No Sentry DSN provided. Provide it in `runtimeConfig.public.sentry.dsn`')
      return
    }

    const moduleOptions = defu(_moduleOptions, {
      deleteSourcemapsAfterUpload: true,
      vitePlugin: {
        disable: process.env.NODE_ENV !== 'production' || !process.env.CI,
        release: {
          deploy: {
            env: process.env.NODE_ENV ?? 'development',
          },
        },
      },
    } satisfies Partial<ModuleOptions>)

    const resolver = createResolver(import.meta.url)

    const appConfigFile = await resolvePath(resolver.resolve('./runtime/app.config.ts'))
    nuxt.hook('app:resolve', (app) => {
      app.configs.push(appConfigFile)
    })

    nuxt.options.sourcemap.client = true

    const defaults: SentryVitePluginOptions = {}
    if (moduleOptions.deleteSourcemapsAfterUpload) {
      defaults.sourcemaps = {
        filesToDeleteAfterUpload: ['.output/**/*.map'],
      }
    }

    nuxt.options.build.transpile.push('@sentry/vue')

    addVitePlugin(() => sentryVitePlugin(defu(moduleOptions.vitePlugin, defaults)) as Plugin)

    addPlugin(resolver.resolve('./runtime/sentry.client.ts'))
  },
})
