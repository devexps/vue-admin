import type {
  RouteLocationNormalized,
  RouteRecordNormalized,
  RouteRecordRaw,
} from 'vue-router'
export function getRawRoute(
  route: RouteLocationNormalized,
): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  }
}

/**
 * Load route configurations from modules and add them to a route collection
 */
export function loadRoutesFromModules(
  modules: Record<string, { default: any }>,
): RouteRecordRaw[] {
  // Create an empty array to store route configurations
  const routeModuleList: RouteRecordRaw[] = []
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    // If the default export of the current module is an array, expand it and add it to the route configuration array; otherwise, add it directly to the array
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList)
  })

  // Return the route configuration array
  return routeModuleList
}
