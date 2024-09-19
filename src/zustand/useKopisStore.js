import { create } from "zustand";
import { fetchDetailData, fetchMapData } from "../api/detailApi";

const useKopisStore = create((set, get) => ({
  data: null,
  mapData: null,
  error: null,

  // 공연 상세 정보 가져오는 함수
  fetchData: async (id) => {
    try {
      const result = await fetchDetailData(id);
      if (result && result.dbs && result.dbs.db) {
        set({ data: result.dbs.db, error: null });
      } else {
        set({ error: "No data found", data: null });
      }
    } catch (error) {
      set({ error: `Error fetching details: ${error.message}`, data: null });
    }
  },

  // 공연장소 데이터를 가져와 상태에 저장
  fetchMapData: async (id) => {
    try {
      const result = await fetchMapData(id); // API 호출
      console.log(result);
      if (result && result.dbs && result.dbs.db) {
        set({ mapData: result.dbs.db, error: null }); // 상태에 저장
        console.log(get().mapData);
      } else {
        set({ error: "No map data found", mapData: null });
      }
    } catch (error) {
      set({
        error: `Error fetching map data: ${error.message}`,
        mapData: null,
      });
    }
  },
}));

export default useKopisStore;
