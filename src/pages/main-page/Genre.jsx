import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getClassifiedData } from "../../api/playApi";
import { genreCodes } from "../../utils/Kopis-api-common";
import { useNavigate } from "react-router-dom";

const Genre = () => {
  const genreArray = Object.values(genreCodes);

  const {
    data: genre,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["main-genre"],
    queryFn: getClassifiedData,
  });

  // console.log(genre);

  if (isPending) {
    return (
      <div className="w-full h-[400px] flex items-center">
        <p className="m-auto">로딩중입니다.</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-[400px] flex items-center">
        <p className="m-auto">데이터 조회 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* <h3>Genre</h3> */}
      {genre?.map((plays, idx) => {
        if (plays.length === 0) {
          return null;
        } else {
          const tmp = [...plays];
          while (tmp.length < 5) {
            tmp.push(null);
          }
          // console.log(genreArray[idx], tmp)

          return (
            <div className="w-full mb-10" key={genreArray[idx]}>
              <p className="text-primary">{genreArray[idx]}</p>
              <div className="w-full grid grid-cols-[repeat(5,1fr)] gap-x-10">
                {tmp.map((play, i) => {
                  console.log(genreArray[idx], i);
                  console.log(Boolean(play));
                  if (play) {
                    return <Card play={play} />;
                  } else {
                    return (
                      <div
                        className="w-[150px] h-fit max-h-[330px] bg-gray-500"
                        key={i}
                      />
                    );
                  }
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Genre;

// =============================
const Card = ({ play }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${play.mt20id}`);
  };
  return (
    <div
      className="w-full min-w-[150px] h-fit max-h-[330px] cursor-pointer"
      key={play.prfnm}
      onClick={handleClick}
    >
      <img
        className="w-full h-full max-h-[250px] aspect-[3/4] object-cover"
        src={play.poster}
        key={play.prfnm}
      />
      <p className="genre_title mb-1">{play.prfnm}</p>
      <p className="genre_place text-[#b1b1b1]">{play.fcltynm}</p>
    </div>
  );
};
