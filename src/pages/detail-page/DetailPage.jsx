import Tabs from "./Tabs";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDetailData, fetchMapData } from "../../api/detailApi";

const DetailPage = () => {
  const { id } = useParams();

  // 공연 상세 정보 불러오기
  const {
    data,
    isLoading: detailLoading,
    isError: detailError,
  } = useQuery({
    queryKey: ["performanceDetail", id],
    queryFn: () => fetchDetailData(id),
  });
  const detailData = data?.dbs?.db;

  if (detailLoading) {
    return <div>Loading...</div>;
  }
  if (detailError) {
    return <div>Error</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto flex items-center justify-center p-4">
      <div className="w-full p-6">
        <div className="mb-12 pb-4  ">
          <h2 className="text-sm font-semibold mb-4 ">{detailData.genrenm}</h2>
          <h3 className="text-5xl font-extrabold mb-4">{detailData.prfnm}</h3>
          <p className="text-sm mb-4">
            {detailData.prfpdfrom} - {detailData.prfpdto}
          </p>
        </div>

        <div className={`flex ${detailData.poster ? "gap-4" : ""} mb-4 `}>
          {detailData.poster && (
            <img
              src={detailData.poster}
              alt={detailData.prfnm}
              className="w-full max-w-[430px] h-auto object-cover rounded-lg mr-8"
            />
          )}
          <div className="w-[600px]  border-solid border-gray-400 p-4 rounded">
            <div className="flex items-baseline mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">출연진: </p>
              <p className="flex-grow">{detailData.prfcast}</p>
            </div>
            <div className="flex items-baseline mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">공연 장소: </p>
              <p className="flex-grow">
                {detailData.area} {detailData.fcltynm}
              </p>
            </div>
            <div className="flex items-baseline mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">공연 상태: </p>
              <p className="flex-grow">{detailData.prfstate}</p>
            </div>
            <div className="flex items-baseline mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">티켓 가격: </p>
              <p className="flex-grow">{detailData.pcseguidance}</p>
            </div>
            <div className="flex items-baseline mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">공연시간: </p>
              <p className="flex-grow">{detailData.prfruntime}</p>
            </div>
            <div className="flex items-baseline mb-4">
              <p className="w-20 font-bold flex-shrink-0 mr-4">주최사: </p>
              <p className="flex-grow">
                {detailData.entrpsnmH}
                {detailData.entrpsnmS}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-16">
          <Tabs id={id} detailData={detailData} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
