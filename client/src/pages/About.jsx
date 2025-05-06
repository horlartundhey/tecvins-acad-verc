import React from 'react';
import Whoweare2 from '../components/Whoweare2';
import AboutHeader from '../components/AboutHeader';
import SustainableG from '../components/SustainableG';
import Metrics from '../components/Metrics';
import Testimonials from '../components/Testimonials';

const About = () => {
  return (
    <>
      <AboutHeader />
      <Whoweare2 />
      <SustainableG />
      <Metrics />
      <Testimonials />
    </>
  );
};

export default About;