import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
  }),
  actions: {
    setUser(info) {
      this.user = info;
    },
    logout() {
      this.user = {};
    }
  },
});
