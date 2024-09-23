import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (userData) => set({ user: userData }),
      setToken: (accessToken) => set({ accessToken }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "userStorage",
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
