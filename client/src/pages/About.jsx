import React, { useEffect } from 'react';
import Whoweare2 from '../components/Whoweare2';
import AboutHeader from '../components/AboutHeader';
import SustainableG from '../components/SustainableG';
import Metrics from '../components/Metrics';
import Testimonials from '../components/Testimonials';
import Journey from '../components/Journey';

const About = () => {
  useEffect(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, []);
  return (
    <>
      <AboutHeader />
      <Whoweare2 />
      <Journey />
      <SustainableG />
      <Metrics />
      <Testimonials />
    </>
  );
};

export default About;