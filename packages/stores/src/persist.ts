import { PersistedStateFactoryOptions } from 'pinia-plugin-persistedstate'

export function persistGlobalConfig(
  keyPrefix: string,
): PersistedStateFactoryOptions {
  return {
    storage: localStorage,
    key: (id) => `${keyPrefix}__${id}`,
  }
}
