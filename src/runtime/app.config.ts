import { BrowserTracing, Replay, vueRouterInstrumentation } from '@sentry/vue'

export default defineAppConfig({
  sentry: {
    client: (nuxt) => ({
      integrations: [
        new BrowserTracing({
          routingInstrumentation: vueRouterInstrumentation(nuxt.$router, {
            routeLabel: 'path',
          }),
        }),
        new Replay(),
      ],
      tracesSampleRate: 1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1,
    }),
  },
})
