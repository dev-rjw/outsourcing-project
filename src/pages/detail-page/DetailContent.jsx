import React, { useEffect } from "react";
import useKopisStore from "../../zustand/kopisStore";

const DetailContent = () => {
  const { data, fetchData } = useKopisStore((state) => ({
    data: state.data,
    fetchData: state.fetchData,
  }));
  const id = "PF248932";

  useEffect(() => {
    fetchData(id);
  }, [fetchData, id]);

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  // 데이터 배열의 첫 번째 요소를 가져옴
  const performance = data[0];

  return (
    <div>
      <p>공연명: {performance.prfnm}</p>
      <p>
        공연 기간: {performance.prfpdfrom} ~ {performance.prfpdto}
      </p>
      <p>공연장: {performance.fcltynm}</p>
      <p>장소: {performance.area}</p>
      <p>장르: {performance.genrenm}</p>
      <p>상태: {performance.prfstate}</p>
      <img
        src={performance.poster}
        alt={performance.prfnm}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default DetailContent;
