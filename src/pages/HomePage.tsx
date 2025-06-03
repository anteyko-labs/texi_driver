import React from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Features from '../components/home/Features';
import PopularRoutes from '../components/home/PopularRoutes';
import CallToAction from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <PopularRoutes />
      <CallToAction />
    </>
  );
};

export default HomePage;