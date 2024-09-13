import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getData } from '../../api/playApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Embla from './Embla';


const BASE_URL = "http://kopis.or.kr/openApi/restful/pblprfr";
const API_KEY = import.meta.env.VITE_KOPIS_KEY;

const RecentPlays = () => {

  const recentPlays = [];
  const [data, setData] = useState(null);

  const queryClient = useQueryClient();
  const { data: carousel, isPending: isDataPending, isError: isDataError } = useQuery({
    queryKey: ['carousel'],
    queryFn: getData,
    select: useCallback(value => {
      const indices = [];
      while (indices.length < 4) {
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

  console.log('carousel :', carousel)



  return (
    <div className='recent-plays w-full'>
      <h5>RecentPlays</h5>
      <Embla carousel={carousel}/>

    </div>
  )
}

export default RecentPlays