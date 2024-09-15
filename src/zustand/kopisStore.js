import { create } from "zustand";
import fetchKopisDataById from "../api/detailApi";

const useKopisStore = create((set) => ({
  data: null,
  error: null,
  fetchData: async (id) => {
    try {
      const result = await fetchKopisDataById(id); // API 호출
      if (result && result.dbs && result.dbs.db) {
        set({ data: result.dbs.db, error: null }); // 상태 업데이트
      } else {
        set({ error: "No data found", data: null });
      }
    } catch (error) {
      set({ error: error.message, data: null }); // 상태 업데이트
    }
  },
}));

export default useKopisStore;
