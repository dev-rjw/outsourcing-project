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
    return <div className="text-red-500">에러 발생: {error}</div>;
  }

  if (!data) {
    return <div className="text-gray-500">Loading...</div>;
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
    pcseguidance = "정보 없음",
    prfcast = "정보 없음",
    entrpsnmH = "정보 없음",
    entrpsnmS = "정보 없음",
    prfruntime = "정보 없음",
  } = data;

  return (
    <div className="w-full min-h-screen  flex items-center justify-center p-4 ">
      <div className="w-[1200px] p-6  ">
        <div className="mb-12 border-b border-gray-800 pb-4 ">
          <h2 className="text-sm font-semibold mb-4">{genrenm}</h2>
          <h3 className="text-5xl font-extrabold mb-4">{prfnm}</h3>
          <p className="text-sm mb-4">
            {prfpdfrom} - {prfpdto}
          </p>
          <p>{show.fcltynm}</p>
        </div>

        <div className={`flex ${poster ? "gap-4" : ""} mb-4 `}>
          {poster && (
            <img
              src={poster}
              alt={prfnm}
              className="w-full max-w-[430px] h-auto object-cover rounded-lg mr-8"
            />
          )}
          <div className=" w-[600px] ">
            <div className="flex items-baseline mb-4 ">
              <p className="w-20 font-bold flex-shrink-0 mr-4">출연진: </p>
              <p className="flex-grow">{prfcast}</p>
            </div>
            <div className="flex items-baseline  mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">공연 장소: </p>
              <p className="flex-grow">
                {area} {fcltynm}
              </p>
            </div>
            <div className="flex items-baseline mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">공연 상태: </p>
              <p className="flex-grow">{prfstate}</p>
            </div>
            <div className="flex items-baseline mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">티켓 가격: </p>
              <p className="flex-grow">{pcseguidance}</p>
            </div>
            <div className="flex items-baseline mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">공연시간: </p>
              <p className="flex-grow">{prfruntime}</p>
            </div>
            <div className="flex items-baseline mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">주최사: </p>
              <p className="flex-grow">
                {entrpsnmH},{entrpsnmS}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-16">
          <Tabs />
        </div>
      </div>
    </div>
  );
};
export default DetailPage;
