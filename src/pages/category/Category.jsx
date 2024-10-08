import { useQuery } from "@tanstack/react-query";
import { searchGenreAreaData } from "../../api/playApi";
import { areaCodes, genreCodes } from "../../utils/Kopis-api-common";
import { useEffect, useState } from "react";
import CategorySelect from "./CategorySelect";
import QUERY_KEY from "../../constants/queryKey";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Category = () => {
  const navigate = useNavigate();

  const GENRE = "장르별";
  const AREA = "지역별";

  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 검색 버튼을 눌렀을 때의 값을 저장할 상태
  const [genre, setGenre] = useState(GENRE);
  const [area, setArea] = useState(AREA);
  const [row, setRow] = useState(50);
  const [startDate, setStartDate] = useState(dateFormat(new Date()));
  const [endDate, setEndDate] = useState(dateFormat(new Date()));

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.category],
    queryFn: () => searchGenreAreaData(searchTerm, genre, area, row, startDate.replaceAll("-", ""), endDate.replaceAll("-", "")),
    keepPreviousData: true,
  });

  function dateFormat(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate());
  }

  const handleSearch = () => {
    setSearchTerm(searchValue);
  };

  const handleStartDateChange = (e) => {
    if (e.target.value > endDate) {
      Swal.fire({
        title: "시작일자 확인 필요",
        text: "기간은 시작일자가 종료일자보다 클 수 없습니다.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    if (e.target.value < startDate) {
      Swal.fire({
        title: "종료일자 확인 필요",
        text: "기간은 종료일자가 시작일자보다 작을 수 없습니다.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }
    setEndDate(e.target.value);
  };

  const handleCardClick = (play) => {
    navigate(`/detail/${play.mt20id}`);
  };

  const addList = () => {
    setRow(row + 50);
  };

  useEffect(() => {
    refetch();
  }, [searchTerm, genre, area, row, startDate, endDate, refetch]);

  if (isLoading) {
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
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <input type="text" placeholder="공연 검색" className="border border-pulple-300 rounded-lg px-4 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-purple-500" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <button onClick={handleSearch} className="ml-4 bg-primary text-white px-6 py-2 rounded-lg transition-all cursor-pointer">
          검색
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <div>
            <label className="block text-gray-700 mb-1">시작 날짜</label>
            <input type="date" value={startDate} onChange={handleStartDateChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">종료 날짜</label>
            <input type="date" value={endDate} onChange={handleEndDateChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
        </div>

        <div className="flex space-x-4">
          <CategorySelect state={area} setState={setArea} categoryName={AREA} codes={areaCodes} />
          <CategorySelect state={genre} setState={setGenre} categoryName={GENRE} codes={genreCodes} />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {data.length !== 0 ? (
          data.map((element) => (
            <div className="flex flex-col items-center justify-start cursor-pointer transition-transform transform hover:scale-105" key={element.mt20id} onClick={() => handleCardClick(element)}>
              <img src={element.poster} alt={element.prfnm} className="w-full h-60 object-cover rounded-lg mb-2" />
              <div className="text-center text-lg font-medium">{element.prfnm}</div>
            </div>
          ))
        ) : (
          <div className="col-span-5 text-center text-gray-500">해당 공연이 없습니다.</div>
        )}
      </div>

      {data.length === row && (
        <div className="flex justify-center mt-8">
          <button onClick={addList} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
            더보기
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
