import Tabs from "./Tabs";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDetailData } from "../../api/detailApi";

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

  if (detailError || !detailData) {
    return <div>Error</div>;
  }

  // 공연 상세 정보 배열
  const performanceInfo = [
    {
      title: "공연날짜",
      content: `${detailData.prfpdfrom} - ${detailData.prfpdto}`,
    },
    {
      title: "공연일정",
      content: detailData.dtguidance,
    },
    {
      title: "공연장소",
      content: `${detailData.area} ${detailData.fcltynm}`,
    },
    {
      title: "공연상태",
      content: detailData.prfstate,
    },
    {
      title: "티켓가격",
      content: detailData.pcseguidance,
    },
    { title: "공연시간", content: detailData.prfruntime },
    {
      title: "주최사",
      content: `${detailData.entrpsnm} ${detailData.entrpsnmS}`,
    },
    { title: "출연진", content: detailData.prfcast },
  ];

  return (
    <div className="max-w-screen-lg mx-auto flex items-center justify-center p-4 ">
      <div className="w-full p-6 ">
        {/* 공연 기본 정보 */}
        <div className="mb-12 pb-4 border-solid border-2 border-gray-700 border-l-0 border-r-0 border-t-0 ">
          <h2 className="text-sm font-semibold mb-4 ">{detailData.genrenm}</h2>
          <h3 className="text-5xl font-extrabold mb-4">{detailData.prfnm}</h3>
          <p className="text-sm mb-4">
            {detailData.prfpdfrom} - {detailData.prfpdto}
          </p>
        </div>

        {/* 공연 상세 정보 */}
        <div
          className={`flex ${
            detailData.poster ? "gap-4" : ""
          } mb-4 border-solid border-2 border-gray-700 border-l-0 border-r-0 border-t-0 pb-12 `}
        >
          {detailData.poster && (
            <img
              src={detailData.poster}
              alt={detailData.prfnm}
              className="w-full max-w-[430px] h-auto object-cover rounded-lg mr-8"
            />
          )}
          <div className="w-[600px] p-4 bg-soft rounded">
            {performanceInfo.map((info, index) => (
              <div key={index} className="flex items-baseline mb-4">
                <p className="w-20 font-bold flex-shrink-0 mr-4">
                  {info.title}
                </p>
                <p className="flex-grow">{info.content}</p>
              </div>
            ))}
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
