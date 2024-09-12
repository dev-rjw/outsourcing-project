import React from 'react'
import styled from 'styled-components'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const RecentPlays = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false })]);

  const recentPlays = [];

  return (
    <div className='recent-plays w-full'>
      <h5>RecentPlays</h5>
      <div className='embla overflow-hidden' ref={emblaRef}>

        <div className='embla__container grid grid-flow-col auto-cols-fr'>
          {recentPlays?.map(play => {

            return <RecentPlay play={play} key={`Post${play.id}`} />
          })}


        </div>
      </div>

    </div>
  )
}

export default RecentPlays

const RecentPlay = ({ play }) => {
  return (
    <div className='recent-play min-w-0 h-[300px] grow-0 shrink-0 basis-full'>
      <PostCard className='embla__slide'>

      </PostCard>
    </div>
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

    font-family: 'GmarketSansMedium';

    img {
        width: 70%;
        height: 100%;
        object-fit: cover;
    }
`;

const CardContent = styled.div`
  width: 30%;
  height: 100%;

  background-color: #fcebce;
  /* display: flex;
  flex-direction: column;
  justify-content: space-around; */

  padding: 20px;

  position: relative;
`;