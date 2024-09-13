import React from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import styled from 'styled-components';

const Embla = ({ carousel }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false })]);

  return (
    <div className='embla overflow-hidden' ref={emblaRef}>

      <div className='embla__container grid grid-flow-col auto-cols-[100%] gap-x-20'>
        
        {carousel?.map((play, i) => {

          return <RecentPlay play={play} key={i} />
        })}


      </div>
    </div>
  )
}

export default Embla


//===============================================
const RecentPlay = ({ play }) => {
  const { prfnm: title, poster } = play;
  return (
    // <div className='recent-play min-w-0'> {/*h-[300px] grow-0 shrink-0 basis-full*/}
    <div className='embla__slide grid last:mr-20'>
      {/* <div className='cards w-full h-[400px] grid grid-cols-[1fr 1fr] bg-gray-300'> */}
      <div className='cards w-full h-[400px] flex gap-x-20 bg-gray-300'>
        {/* <img src={poster} /> */}
        <CardContent>
          <h3>{title}</h3>
        </CardContent>


        <CardContent>
          <h3>{title}</h3>
        </CardContent>


      </div>
    </div>
    // </div>
  )
}


const PostCard = styled.div`
    width: 100%;
    height: 400px;

    display: flex;
    justify-content: space-around;

    background-color: gray;
    /* border: 1px solid lightgray; */
    border-radius: 30px;
    overflow: hidden;

    img {
        width: 70%;
        height: 100%;
        object-fit: cover;
    }
`;

const CardContent = styled.div`
  width: 50%;
  height: 100%;

  background-color: #fcebce;
  /* display: flex;
  flex-direction: column;
  justify-content: space-around; */

  padding: 20px;
`;