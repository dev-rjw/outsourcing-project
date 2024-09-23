import React from "react";
import Genre from "./Genre";
import Embla from "./Embla";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../api/playApi";

const MainPage = () => {
  const {
    data: mainData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["main-data"],
    queryFn: getData,
  });

  if (isPending) {
    return (
      <div className="w-full h-[calc(100%-67px-128px)] flex items-center">
        <p className="m-auto">로딩중입니다.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[calc(100%-67px-128px)] flex items-center">
        <p className="m-auto">데이터 조회 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="main-body max-w-screen-lg w-full mx-auto flex flex-col items-center">
      <Embla data={mainData} />
      <Genre data={mainData} />
    </div>
  );
};

export default MainPage;
