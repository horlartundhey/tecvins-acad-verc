import React from 'react';
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const SustainableG = () => {
  return (
    <div className='bg-gray-50'>
      <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e35] mb-8 sm:mb-12">
          Our Sustainable Development Goals
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Left Card */}
          <div className="w-full lg:w-1/3 bg-[#1B8D6C] border-[8px] border-[#00BC85] text-white p-4 sm:p-6 rounded-xl">
            <p className="text-white text-[16px] sm:text-[18px] font-normal leading-relaxed">
              At Tecvinson Academy, we believe that education is the cornerstone of progress. As a tech academy dedicated to providing free education to men and women from all over the world, we are committed to empowering individuals to reskill or upskill in technology, enabling them to thrive in the digital economy.
            </p>
          </div>
          
          {/* Center Image */}
          <div className="w-full lg:w-1/3 flex items-center justify-center">
            <div className="relative w-full">
              <img 
                src="https://res.cloudinary.com/kamisama/image/upload/v1747130685/image_ahuczi.png" 
                alt="Hands holding a globe" 
                className="rounded-xl w-full object-contain"
              />                
            </div>
          </div>
          
          {/* Right Card */}
          <div className="w-full lg:w-1/3 bg-[#1B8D6C] border-[8px] border-[#00BC85] text-white p-4 sm:p-6 rounded-xl">
            <p className="mb-4 text-white text-[16px] sm:text-[18px] font-normal leading-relaxed">
              Our mission aligns with the United Nations Sustainable Development Goals (SDGs), particularly:
            </p>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-2"></span>
                <span><strong>SDG 4 (Quality Education);</strong></span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-2"></span>
                <span><strong>SDG 5 (Gender Equality);</strong> and</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-2"></span>
                <span><strong>SDG 8 (Decent Work and Economic Growth).</strong></span>
              </li>
            </ul>
            
            <p className='text-white text-[16px] sm:text-[18px] font-normal leading-relaxed'>
              Here's how we're making a difference...🌎
            </p>
          </div>
        </div>
        
        {/* Call to Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4">
          <Link to="/sdgs" className="w-full md:w-auto order-1 md:order-none">
            <button className="w-full px-4 sm:px-6 py-[1.3rem] rounded-xl border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors">
              Learn More About Our SDGs
            </button>
          </Link>
          
          <Link to="/support" className="w-full md:w-auto order-2 md:order-none">
            <button className="w-full px-4 sm:px-6 py-[1.3rem] rounded-xl border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors">
              Support Us
            </button>
          </Link>
          
          <Link to="/courses" className="w-full md:w-auto order-3 md:order-none">
            <button className="w-full px-4 sm:px-6 py-[1.3rem] rounded-xl bg-[#3B9790] text-white hover:bg-teal-700 transition-colors flex items-center justify-center font-semibold">
              Begin your learning journey
              <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SustainableG;