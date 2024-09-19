import { useQuery } from "@tanstack/react-query";
import { searchGenreAreaData } from "../../api/playApi";
import { areaCodes, genreCodes } from "../../utils/Kopis-api-common";
import { useEffect, useState } from "react";
import CategorySelect from "./CategorySelect";

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
      <div className="grid grid-cols-5 w-[1000px]">
        <CategorySelect state={area} setState={setArea} categoryName="지역별" codes={areaCodes} />
        <CategorySelect state={genre} setState={setGenre} categoryName="장르별" codes={genreCodes} />
        {data.length !== 0 ? (
          data.map((element) => {
            return (
              <div className="flex flex-col items-center justify-start h-[300px] " key={element.id}>
                <img src={element.poster} className="w-4/5 h-4/5" />
                <div>{element.prfnm}</div>
              </div>
            );
          })
        ) : (
          <div>해당 공연이 없습니다.</div>
        )}
        {data.length === end && <button onClick={addList}>더보기</button>}
      </div>
    </div>
  );
};

export default Category;
