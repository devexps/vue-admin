import '@devexps/styles'
// import 'ant-design-vue/dist/antd.variable.css'
import 'virtual:svg-icons-register'
import App from './app.vue'
import { createApp } from 'vue'
import { InitRouter } from '@devexps/router'
import { setupRouteGuard } from '@/router/guard'
import { setupI18n } from '@devexps/locale'
import { setupPinia } from '@devexps/stores'
import { initApplication } from './init-application'
import { registerComponents } from '../init-components'
;(async () => {
  const app = createApp(App)

  setupPinia(app)

  await registerComponents(app)

  await initApplication()
  // Register Global Components

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app)
  // Init Router
  const router = InitRouter(import.meta.env.VITE_PUBLIC_PATH)
  app.use(router)
  await setupRouteGuard()
  await router.isReady()
  app.mount('#app')
  // When Closing mock, Tree Shaking `mockjs` dep
  if (__VITE_USE_MOCK__) {
    import('../mock/_mock-server').then(({ setupProdMockServer }) =>
      setupProdMockServer(),
    )
  }
})()
