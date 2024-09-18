import { useQuery } from "@tanstack/react-query";
import { searchGenreAreaData } from "../../api/playApi";
import { areaCodes, genreCodes } from "../../utils/Kopis-api-common";
import { useState } from "react";

const Category = () => {
    const [searchValue, setSearchValue] = useState("");
    const [genre, setGenre] = useState("장르별");
    const [area, setArea] = useState("지역별");
    const [end, setEnd] = useState(50);

    /* TODO:
    - 카테고리 변경 시 바로 값 바뀌도록 수정
    - css 수정
    */
    const { data, isLoading, isError } = useQuery({
        queryKey: ["category"],
        queryFn: () => searchGenreAreaData(searchValue, genre, area, 0, end),
    });

    const addList = () => {
        setEnd(end + 50);
        searchGenreAreaData(searchValue, genre, area, 0, end);
    };

    if (isLoading) {
        return <div>로딩중입니다...</div>;
    }

    if (isError) {
        return <div>에러입니다...</div>;
    }

    return (
        <div>
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <button onClick={() => searchGenreAreaData(searchValue, genre, area, 0, end)}>검색</button>
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
                {data.length === 50 && <button onClick={addList}>더보기</button>}
            </div>
        </div>
    );
};

export default Category;
