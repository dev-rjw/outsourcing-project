// src/store/kopisStore.js
import { create } from "zustand";
import fetchKopisDataById from "../api/detailApi";

const useKopisStore = create((set) => ({
  data: null,
  error: null,
  fetchData: async (id) => {
    try {
      const data = await fetchKopisDataById(id); // API 호출
      set({ data: data.db, error: null }); // 상태 업데이트
    } catch (error) {
      set({ error: error.message, data: null }); // 상태 업데이트
    }
  },
}));

export default useKopisStore;
