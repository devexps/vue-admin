import { useUserStoreWithout } from '@/store/user'
import { useAuthStoreWithout } from '@/store/auth'
import {
  initGuard,
  createBasicGuard,
  createAuthGuard,
  createTabsGuard,
  createParamMenuGuard,
} from '@devexps/router'
import { setRouteChange } from '@devexps/router'
import { useLockStore } from '@/store/lock'

async function setupRouteGuard() {
  const userStore = useUserStoreWithout()
  const lockStore = useLockStore()
  const authStore = useAuthStoreWithout()
  const stores = {
    userStore,
    lockStore,
    authStore,
  }
  initGuard(stores)
  createBasicGuard()
  createAuthGuard()
  createTabsGuard(setRouteChange)
  // must after createPermissionGuard (menu has been built.)
  createParamMenuGuard()
}

export { setupRouteGuard }
