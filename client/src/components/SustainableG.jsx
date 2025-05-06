import React from 'react';
import { HiOutlineRocketLaunch   } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const SustainableG = () => {
  return (
    <div className='bg-gray-50'>
        <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto ">
        <h2 className="text-3xl font-bold text-[#1a2e35] mb-12">
            Our Sustainable Development Goals
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Card */}
            <div className="lg:w-1/3 bg-[#1B8D6C] border-[8px] border-[#00BC85] text-white p-6 rounded-xl">
            <p className="text-white text-[18px] font-normal">
                At Tecvinson Academy, we believe that education is the cornerstone of progress. As a tech academy dedicated to providing free education to men and women from all over the world, we are committed to empowering individuals to reskill or upskill in technology, enabling them to thrive in the digital economy.
            </p>
            </div>
            
            {/* Center Image */}
            <div className="lg:w-1/3 flex items-center justify-center">
            <div className="relative">
                <img 
                src="./src/assets/images/sdg.png" 
                alt="Hands holding a globe" 
                className="rounded-xl"
                />                
            </div>
            </div>
            
            {/* Right Card */}
            <div className="lg:w-1/3 bg-[#1B8D6C] border-[8px] border-[#00BC85] text-white p-6 rounded-xl">
            <p className="mb-4 text-white text-[18px] font-normal" >
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
            
            <p className='text-white text-[18px] font-normal'>
                Here's how we're making a difference...🌎
            </p>
            </div>
        </div>
        
        {/* Call to Action Buttons */}
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
            <Link to="/courses" className="flex">
                <button className="px-6 py-3 rounded-xl bg-[#3B9790] text-white hover:bg-teal-700 transition-colors flex items-center font-semibold">
                Begin your learning journey
                <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
                </button>
            </Link>
            
            <Link to="/support" className="flex">
                <button className="px-6 py-3 rounded-xl border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors">
                Support Us
                </button>
            </Link>
            
            <Link to="/sdgs" className="flex">
                <button className="px-6 py-3 rounded-xl border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors">
                Learn More About Our SDGs
                </button>
            </Link>
        </div>
        </section>
    </div>
  );
};

export default SustainableG;