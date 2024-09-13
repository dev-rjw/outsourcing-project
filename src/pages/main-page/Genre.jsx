import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getClassifiedData } from '../../api/playApi';

const Genre = () => {

  const {data:genre, isPending, isError} = useQuery({
    queryKey:['genre'],
    queryFn: getClassifiedData,
  })

  console.log(genre);

  return (
    <div>
      <h3>Genre</h3>


    </div>
  )
}

export default Genre