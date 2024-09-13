<<<<<<< HEAD
import React, { useEffect } from "react";
import Tabs from "./Tabs";
import useKopisStore from "../../zustand/kopisStore";

const DetailPage = () => {
  const { data, fetchData, error } = useKopisStore((state) => ({
    data: state.data,
    fetchData: state.fetchData,
    error: state.error,
  }));
  const id = "PF248932"; // 임시 ID

  useEffect(() => {
    fetchData(id);
  }, [fetchData, id]);

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // 데이터가 유효한지 확인
  const {
    genrenm = "정보 없음",
    prfnm = "정보 없음",
    prfpdfrom = "정보 없음",
    prfpdto = "정보 없음",
    poster = "",
    area = "정보 없음",
    fcltynm = "정보 없음",
    prfstate = "정보 없음",
  } = data;

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col flex-grow">
          <h2 className="text-xl font-semibold mb-2">{genrenm}</h2>
          <h3 className="text-2xl font-bold mb-2">{prfnm}</h3>
          <p className="text-lg mb-2">
            {prfpdfrom} - {prfpdto}
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 items-center">
          {poster && (
            <img
              src={poster}
              alt={prfnm}
              className="w-full max-w-[430px] h-auto object-cover mb-4 md:mb-0"
            />
          )}
          <div className="flex flex-col space-y-2">
            <p className="text-lg">
              공연 장소: {area} {fcltynm}
            </p>
            <p className="text-lg">공연 상태: {prfstate}</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <Tabs />
      </div>
    </div>
  );
};

=======
import { useEffect, useState } from "react";
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
>>>>>>> acefaed1ba161affc16499fdb044c33c7c4b4a12
export default DetailPage;
