import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'

function Home() {
  return (
    <div className=' bg-black text-white px-10 py-5'>
      <Hero/>
      <RecentlyAdded/>
    </div>
  )
}

export default Home