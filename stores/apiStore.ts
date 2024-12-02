import { defineStore } from 'pinia'

/**
 * This is a very basic store that is used to cache data from an API.
 */
export const useApiStore = defineStore('api', {
  state: () => ({
    responses: {} as Record<string, { data: any, timestamp: number }>,
  }),
  actions: {
    addResponse(key: string, data: any) {
      this.responses[key] = { data, timestamp: Date.now() }
    },
    getResponse(key: string) {
      return this.responses[key]
    },
    clearStore() {
      this.responses = {}
    },
  },
  persist: true,
})