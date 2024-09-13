import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getClassifiedData } from '../../api/playApi';
import { genreCodes } from '../../utils/Kopis-api-common';

const Genre = () => {
  const genreArray = Object.values(genreCodes);

  const { data: genre, isPending, isError } = useQuery({
    queryKey: ['genre'],
    queryFn: getClassifiedData,
  })

  // console.log(genre);

  return (
    <div className='w-full flex flex-col items-center'>
      <h3>Genre</h3>
      {genre?.map((plays, idx) => {
        if (plays.length === 0) {
          return null;
        } else {
          return (
            <div className='mb-10' key={genreArray[idx]}>
              <p>{genreArray[idx]}</p>
              <div className='w-full grid grid-cols-[repeat(5,1fr)] gap-x-10'>
                {plays.map((play, idx) => (
                  <div className='w-full min-w-[150px] h-fit max-h-[330px]' key={play.prfnm}>
                    <img className='w-full h-full max-h-[250px] aspect-[3/4] object-cover' src={play.poster} key={play.prfnm}/>
                    <p className='genre_title'>{play.prfnm}</p>
                    <p className='genre_place'>{play.fcltynm}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      })}

    </div>
  )
}

export default Genre

