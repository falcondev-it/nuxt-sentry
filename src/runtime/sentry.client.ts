import { captureException, init, withScope } from '@sentry/vue'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin({
  enforce: 'pre',
  setup(nuxt) {
    if (process.dev) return

    const dsn = useRuntimeConfig().public.sentry?.dsn
    const { client } = useAppConfig().sentry

    init({
      app: nuxt.vueApp,
      dsn,
      ...client(nuxt.vueApp.$nuxt),
    })

    nuxt.vueApp.config.errorHandler = (err, context) => {
      withScope((scope) => {
        scope.setExtra('context', context)
        captureException(err)
      })
    }

    nuxt.hook('app:error', (err) => {
      captureException(err)
    })
  },
})
