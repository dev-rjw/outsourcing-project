import React, { useEffect } from "react";
import Tabs from "./Tabs";
import useKopisStore from "../../zustand/kopisStore";

const DetailPage = () => {
  const { data, fetchData } = useKopisStore((state) => ({
    data: state.data,
    fetchData: state.fetchData,
  }));
  const id = "PF132236"; // 임시 ID

  useEffect(() => {
    fetchData(id);
    // fetchKopis 호출
  }, [fetchData, id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="w-[1200px] flex flex-col justify-center items-center">
        <div className="flex-col justify-start">
          <h2>{data.genrenm} </h2>
          <h3 className="">{data.prfnm}</h3>
          <p>
            {data.prfpdfrom} - {data.prfpdto}
          </p>
        </div>
        <div className="flex r w-full">
          <img
            src={data.poster}
            alt={data.prfnm}
            className="w-[430px] h-[600px]"
          />
          <div>
            <p>
              공연 장소: {data.area} {data.fcltynm}
            </p>
            <p>가격 안내: {data.pcseguidance}</p>
          </div>
        </div>

        <div className="w-full mt-4">
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
