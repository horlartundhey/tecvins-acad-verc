import React from 'react'
import Hero from '../components/Hero'
import Whoweare from '../components/Whoweare'
import WhyTecvinson from '../components/WhyTecvinson'
import OurPartners from '../components/OurPartners'
import Metrics from '../components/Metrics'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import Excellence from '../components/Excellence'

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Whoweare />
      <WhyTecvinson />
      <Excellence />
      <OurPartners />
      <Metrics />
      <Testimonials />
      <Faq />
    </div>
  )
}

export default Home