import { useQuery } from "@tanstack/react-query";
import { searchGenreAreaData } from "../../api/playApi";
import { areaCodes, genreCodes } from "../../utils/Kopis-api-common";
import { useEffect, useState } from "react";

const Category = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 검색 버튼을 눌렀을 때의 값을 저장할 상태
  const [genre, setGenre] = useState("장르별");
  const [area, setArea] = useState("지역별");
  const [end, setEnd] = useState(50);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["category"],
    queryFn: () => searchGenreAreaData(searchTerm, genre, area, 0, end),
    keepPreviousData: true,
  });

  const handleSearch = () => {
    setSearchTerm(searchValue);
  };

  const addList = () => {
    setEnd(end + 50);
  };

  useEffect(() => {
    refetch();
  }, [searchTerm, genre, area, end, refetch]);

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>에러입니다...</div>;
  }

  return (
    <div>
      <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={handleSearch}>검색</button>
      <div>
        <select value={area} onChange={(e) => setArea(e.target.value)} selected="지역별" name="지역별">
          <option value="지역별">지역별</option>
          {Object.values(areaCodes).map((element, index) => {
            return (
              <option key={index} value={element}>
                {element}
              </option>
            );
          })}
        </select>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} selected="장르별" name="장르별">
          <option value="장르별">장르별</option>
          {Object.values(genreCodes).map((element, index) => {
            return (
              <option key={index} value={element}>
                {element}
              </option>
            );
          })}
        </select>
        {data?.map((element) => {
          return (
            <div key={element.id}>
              <img src={element.poster} width="10%" />
              <div>{element.prfnm}</div>
            </div>
          );
        })}
        {data.length === end && <button onClick={addList}>더보기</button>}
      </div>
    </div>
  );
};

export default Category;
