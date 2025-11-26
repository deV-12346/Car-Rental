import BestCars from '@/components/BestCars'
import Categories from '@/components/Categories'
import HeroSection from '@/components/HeroSection'
import Testimonials from '@/components/Testimonial'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full px-4 md:px-8 bg-gray-50'>
    <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 pt-6">
      Elevate Your Travel Experience
    </h1>
    <p className="text-center text-indigo-500 font-semibold mt-2 md:text-lg">
     Rent Premium Cars. Pay Less. Drive More.
    </p>
      <HeroSection/>
      <Categories/>
      <BestCars />
      <Testimonials/>
      </div>
  )
}

export default Home
