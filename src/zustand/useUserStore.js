import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ suer: null }),
}));

export default useUserStore;
