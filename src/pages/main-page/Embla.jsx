import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import styled from 'styled-components';
import { getData } from '../../api/playApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// const BASE_URL = "http://kopis.or.kr/openApi/restful/pblprfr";
// const API_KEY = import.meta.env.VITE_KOPIS_KEY;

const Embla = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false })]);

  // const recentPlays = [];
  // const [data, setData] = useState(null);

  const queryClient = useQueryClient();
  const { data: carousel, isPending, isError } = useQuery({
    queryKey: ['main-carousel'],
    queryFn: getData,
    select: useCallback(value => {
      const indices = []; // 랜덤 인덱스 저장
      while (indices.length < 8) {
        let tmp = Math.floor(300 * Math.random())
        if (indices.includes(tmp)) {
          continue;
        } else {
          indices.push(tmp);
        }
      }
      return indices.map(ele => value[ele]);
    })
  })

  // console.log('carousel :', carousel)
  if (isPending) {
    return (
      <div className='w-full h-[400px] flex items-center'>
        <p className='m-auto'>로딩중입니다.</p>
      </div>
    )
  }
  if (isError) {
    return (
      <div className='w-full h-[400px] flex items-center'>
        <p className='m-auto'>데이터 조회 중 오류가 발생했습니다.</p>
      </div>
    )
  }

  return (
    <div className='main-embla w-full mb-20'>
      <div className='embla min-w-[900px] overflow-hidden' ref={emblaRef}>
        <div className='embla__container'> {/*  grid grid-flow-col auto-cols-[100%] gap-x-20 */}
          {carousel && [0, 2, 4, 6].map((i) => (
            // <div key={i}>
            <Slide play={[carousel[i], carousel[i + 1]]} key={`slide-${i}`} />
            // </div>
          )
          )}
        </div>
      </div>
    </div >
  )
}

export default Embla


//===============================================
const Slide = ({ play }) => {
  const { mt20id:id1, prfnm: title1, poster: poster1, fcltynm:place1, prfpdfrom: from1, prfpdto:to1 } = play[0];
  const { mt20id:id2, prfnm: title2, poster: poster2, fcltynm:place2, prfpdfrom: from2, prfpdto:to2 } = play[1];

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/detail/${id}`)
  }
  return (
    // <div className='recent-play min-w-0'> {/*h-[300px] grow-0 shrink-0 basis-full*/}
    <div className='embla__slide'> {/*grid*/}
      {/* <div className='cards w-full h-[400px] grid grid-cols-[1fr 1fr] bg-gray-300'> */}
      <div className='cards w-full h-[400px] flex gap-x-10'>
        {/* <img src={poster} /> */}
        <div className='card cursor-pointer' onClick={() =>{handleClick(id1)}}>
          <img src={poster1} />
          <div className='card-content'>
            <h3>{title1}</h3>
            <p>{place1}</p>
            <p>{from1 === to1 ? from1 : `${from1} - ${to1}`}</p>
          </div>
        </div>
        <div className='card cursor-pointer' onClick={() =>{handleClick(id2)}}>
          <img src={poster2} />
          <div className='card-content'>
            <h3>{title2}</h3>
            <p>{place2}</p>
            <p>{from2 === to2 ? from2 : `${from2} - ${to2}`}</p>
          </div>
        </div>


      </div>
    </div>
    // </div>
  )
}

const Card = styled.div`
  width: 50%;
  height: 100%;

  background-color: #fcebce;
  /* display: flex;
  flex-direction: column;
  justify-content: space-around; */

  padding: 20px;
`;