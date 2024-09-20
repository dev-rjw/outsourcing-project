import React, { useState } from 'react'
import { genreCodes } from '../../utils/Kopis-api-common';
import { useNavigate } from 'react-router-dom';

const Genre = ({data}) => {
  const [clicked, setClicked] = useState(0);
  const genreArray = Object.values(genreCodes);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='h-fit flex flex-col mx-auto'>
        <div className='flex mx-auto mb-5'>
          {
            genreArray.slice(0, 5).map((item, idx) => (
              <GenreButton idx={idx} clicked={clicked} setClicked={setClicked} key={item}>
                {item}
              </GenreButton>
            ))
          }
        </div>
        <div className='flex mx-auto mb-5'>
          {
            genreArray.slice(5).map((item, idx) => (
              <GenreButton idx={idx + 5} clicked={clicked} setClicked={setClicked} key={item}>
                {item}
              </GenreButton>
            ))
          }
        </div>
        <div>
          <GenreDiv plays={data.filter(play => play.genrenm === genreArray[clicked]).slice(0,10)} idx={clicked}/>
        </div>
      </div>

    </div>
  )
}

export default Genre

// =============================
const GenreButton = ({ children, idx, clicked, setClicked }) => {

  const handleGenreClick = (idx) => {
    setClicked(idx);
  }

  if (clicked === idx) {
    return (
      <button className='h-fit w-fit px-4 py-2 mr-5 last:mr-0 bg-primary text-white border border-solid border-primary rounded-3xl cursor-pointer'
        onClick={() => { handleGenreClick(idx) }}
        key={idx}>
        {children}
      </button>
    )
  } else {
    return (
      <button className='h-fit w-fit px-4 py-2 mr-5 last:mr-0 bg-white border border-solid border-gray-300 rounded-3xl cursor-pointer'
        onClick={() => { handleGenreClick(idx) }}
        key={idx}>
        {children}
      </button>
    )
  }
}

const GenreDiv = ({ plays, idx }) => {
  const genreArray = Object.values(genreCodes);
  
  if (plays.length === 0) {
    return (
      <div className='w-full h-[267px] flex justify-center items-center'>
        <p>현재 준비된 공연이 없습니다.</p>
      </div>
    );
  } else {
    const tmp = [...plays];
    while (tmp.length < 5) {
      tmp.push(null);
    }

    return (
      <div className='w-full mb-10' key={genreArray[idx]}>
        <div className='w-full grid grid-cols-[repeat(5,1fr)] gap-10 mt-5'>
          {tmp.map((play, i) => {
            if (play) {
              return <Card play={play} key={i}/>
            } else {
              return (
                <div className='w-[150px] h-fit max-h-[330px] bg-gray-500' key={i} />
              )
            }
          })}
        </div>
      </div>
    )
  }
}

const Card = ({ play }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${play.mt20id}`);
  };
  return (
    <div className='w-full min-w-[150px] h-fit max-h-[330px] cursor-pointer' key={play.prfnm} 
    onClick={handleClick}>
      <img className='w-full h-full max-h-[250px] aspect-[3/4] object-cover' src={play.poster} key={play.prfnm} />
      <p className='genre_title mb-1'>{play.prfnm}</p>
      <p className='genre_place text-[#b1b1b1]'>{play.fcltynm}</p>
    </div>
  );
};
