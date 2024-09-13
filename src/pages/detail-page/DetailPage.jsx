import React, { useEffect, useState } from "react";
import fetchKopisData from "../../api/kopisApi";
const DetailPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const kopisData = await fetchKopisData();
        setData(kopisData.dbs.db); // 가져온 JSON 데이터의 공연 정보 배열 저장
      } catch (error) {
        setError(error);
      }
    };
    getData();
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {data.map((show) => (
        <div key={show.mt20id}>
          <h1>{show.prfnm}</h1>
          <p>
            {show.prfpdfrom} - {show.prfpdto}
          </p>
          <p>{show.fcltynm}</p>
        </div>
      ))}
    </div>
  );
};
export default DetailPage;