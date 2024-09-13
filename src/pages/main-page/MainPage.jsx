import React from 'react'
import RecentPlays from './RecentPlays'
import Genre from './Genre'

const MainPage = () => {

  return (
    <div className='main-body max-w-screen-lg w-full mx-auto flex flex-col items-center'>
      <h3>MainPage</h3>
      <RecentPlays />
      <Genre/>
    </div>
  )
}

export default MainPage