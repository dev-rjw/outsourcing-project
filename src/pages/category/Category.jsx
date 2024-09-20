import { useQuery } from "@tanstack/react-query";
import { searchGenreAreaData } from "../../api/playApi";
import { areaCodes, genreCodes } from "../../utils/Kopis-api-common";
import { useEffect, useState } from "react";
import CategorySelect from "./CategorySelect";
import QUERY_KEY from "../../constants/queryKey";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const GENRE = "장르별";
  const AREA = "지역별";

  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 검색 버튼을 눌렀을 때의 값을 저장할 상태
  const [genre, setGenre] = useState(GENRE);
  const [area, setArea] = useState(AREA);
  const [row, setRow] = useState(50);
  const [startDate, setStartDate] = useState("2024-09-23");
  const [endDate, setEndDate] = useState("2024-09-23");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.category],
    queryFn: () => searchGenreAreaData(searchTerm, genre, area, row, startDate, endDate),
    keepPreviousData: true,
  });

  const handleSearch = () => {
    setSearchTerm(searchValue);
  };

  const handleStartDateChange = (e) => {
    if (e.target.value > endDate) {
      alert("기간은 시작일자가 종료일자보다 클 수 없습니다.");
      return;
    }
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    if (e.target.value < startDate) {
      alert("기간은 종료일자가 시작일자보다 작을 수 없습니다.");
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
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>에러입니다...</div>;
  }

  return (
    <div className="max-w-screen-lg">
      <div>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <div>
        <CategorySelect state={area} setState={setArea} categoryName={AREA} codes={areaCodes} />
        <CategorySelect state={genre} setState={setGenre} categoryName={GENRE} codes={genreCodes} />
      </div>
      <div className="grid grid-cols-5 w-[1000px]">
        {data.length !== 0 ? (
          data.map((element) => {
            return (
              <div className="flex flex-col items-center justify-start h-[300px] cursor-pointer" key={element.mt20id} onClick={() => handleCardClick(element)}>
                <img src={element.poster} className="w-4/5 h-4/5" />
                <div>{element.prfnm}</div>
              </div>
            );
          })
        ) : (
          <div>해당 공연이 없습니다.</div>
        )}
        {data.length === row && <button onClick={addList}>더보기</button>}
      </div>
    </div>
  );
};

export default Category;
