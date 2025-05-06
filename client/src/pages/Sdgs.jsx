import React, { useEffect, useState } from 'react'
import SustainableG from '../components/SustainableG'
import { HiOutlineRocketLaunch   } from "react-icons/hi2";

import { HiOutlinePlayCircle } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import Metrics from '../components/Metrics';
import Testimonials from '../components/Testimonials';
import TestimonialModal from '../components/TesimonialModal';

const Sdgs = () => {

    useEffect(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, []);

    const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  return (
    <>    

        <div className='bg-gray-50'>
        <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto ">
        <h2 className="text-3xl font-bold text-[#1a2e35] mb-12">
            Our Sustainable Development Goals
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Card */}
            <div className="lg:w-1/3 bg-[#1B8D6C] border-[8px] border-[#00BC85] text-white p-6 rounded-xl">
            <p className="text-white">
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
            <p className="mb-4">
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
            
            <p>
                Here's how we're making a difference...🌎
            </p>
            </div>
        </div>
                
        </section>        
    </div>
    {/* second section in sdg page */}
    <div className='w-full bg-[#EDF8F7]'>
        <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column with Title and Image */}
            <div className="lg:w-5/12">
            <h3 className="text-[40px] text-[#7DBBB5] font-semibold">1. SDG 4:</h3>
            <h2 className="text-[80px] font-semibold text-[#0F2624] mb-4">
                Quality<br />Education
            </h2>
            
            <div className="rounded-xl overflow-hidden h-[346px]">
                <img 
                src="/src/assets/images/sdg-education.png" 
                alt="Students collaborating around a table with books and learning materials" 
                className="w-full object-cover"
                />
            </div>
            </div>
            
            {/* Right Column with Details */}
            <div className="lg:w-7/12">
            <div className="space-y-6">
                {/* UN Definition */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    UN Definition:
                </h4>
                <p className="text-[#0F2624] italic ml-4">
                    "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all."
                </p>
                </div>
                
                {/* Our Commitment */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    Our Commitment:
                </h4>
                <p className="text-[#0F2624] ml-4">
                    We provide free, high-quality tech education to individuals worldwide, breaking down barriers to learning and ensuring that everyone has access to the skills needed for the future.
                </p>
                </div>
                
                {/* How We Contribute */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-3">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    How We Contribute:
                </h4>
                <div className="space-y-4 ml-4">
                    <p className="flex items-start text-[#0F2624]">
                    <span className="inline-block w-1 h-1 bg-gray-600 rounded-full mt-2 mr-2"></span>
                    Free Courses: Offering a wide range of tech courses, from coding and data science to cybersecurity and AI, at no cost.
                    </p>
                    <p className="flex items-start text-[#0F2624]">
                    <span className="inline-block w-1 h-1 bg-gray-600 rounded-full mt-2 mr-2"></span>
                    Inclusive Learning: Ensuring that our programs are accessible to people from all backgrounds, regardless of their financial situation.
                    </p>
                    <p className="flex items-start text-[#0F2624]">
                    <span className="inline-block w-1 h-1 bg-gray-600 rounded-full mt-2 mr-2"></span>
                    Lifelong Learning: Encouraging continuous education and skill development to keep pace with the rapidly evolving tech industry.
                    </p>
                </div>
                </div>
                
                {/* Impact */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    Impact:
                </h4>
                <p className="text-[#0F2624] font-normal ml-4">
                    By equipping individuals with in-demand tech skills, we are helping to bridge the global digital divide and fostering a culture of lifelong learning.
                </p>
                </div>
            </div>
            
            {/* Testimonial Button */}
            <div className="mt-8">
            {/* <button 
                onClick={() => setIsTestimonialModalOpen(true)}
                className="inline-flex items-center text-[#3B9790] font-semibold bg-white px-6 py-3 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <HiOutlinePlayCircle className="mr-2 w-5 h-5 text-[#3B9790]" />
                Hear from some beneficiaries
              </button> */}

              {/* Testimonial Modal - placed at the top level */}
                <TestimonialModal 
                    isOpen={isTestimonialModalOpen}
                    onClose={() => setIsTestimonialModalOpen(false)}
                />
            </div>
            </div>
        </div>
        </section>
    </div>
    {/* Third section in sdg page */}
    <div className='w-full bg-[#FFFFEE]'>
        <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column with Title and Image */}
            <div className="lg:w-5/12">
            <h3 className="text-[40px] text-[#BDBD9B] font-semibold">1. SDG 5:</h3>
            <h2 className="text-[80px] font-semibold text-[#626100] mb-4">
                Gender <br/> Equality 
            </h2>
            
            <div className="rounded-xl overflow-hidden h-[346px]">
                <img 
                src="/src/assets/images/gender-equali.png" 
                alt="Students collaborating around a table with books and learning materials" 
                className="w-full object-cover"
                />
            </div>
            </div>
            
            {/* Right Column with Details */}
            <div className="lg:w-7/12">
            <div className="space-y-6">
                {/* UN Definition */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    UN Definition:
                </h4>
                <p className="text-[#0F2624] italic ml-4">
                    "Achieve gender equality and empower all women and girls." 
                </p>
                </div>
                
                {/* Our Commitment */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    Our Commitment:
                </h4>
                <p className="text-[#0F2624] ml-4">
                We are dedicated to empowering women in tech by providing equal opportunities for education and career advancement. 
                </p>
                </div>
                
                {/* How We Contribute */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-3">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    How We Contribute:
                </h4>
                <div className="space-y-4 ml-4">
                    <p className="flex items-start text-[#0F2624]">
                    <span className="inline-block w-1 h-1 bg-gray-600 rounded-full mt-2 mr-2"></span>
                    Women in Tech Initiatives: Offering scholarships, mentorship programs, and networking opportunities specifically for women.                    
                    </p>
                    <p className="flex items-start text-[#0F2624]">
                    <span className="inline-block w-1 h-1 bg-gray-600 rounded-full mt-2 mr-2"></span>
                    Inclusive Environment: Creating a safe and supportive learning environment where women feel empowered to pursue tech careers. 
                    </p>
                    <p className="flex items-start text-[#0F2624]">
                    <span className="inline-block w-1 h-1 bg-gray-600 rounded-full mt-2 mr-2"></span>
                    Breaking Stereotypes: Challenging gender stereotypes in tech by showcasing successful women in the industry and encouraging female participation.
                    </p>
                </div>
                </div>
                
                {/* Impact */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    Impact:
                </h4>
                <p className="text-[#0F2624] font-normal ml-4">
                By empowering women with tech skills, we are helping to close the gender gap in the tech industry and promoting gender equality worldwide.
                </p>
                </div>
            </div>
            
            {/* Testimonial Button */}
            <div className="mt-8">
                <button className="inline-flex items-center text-[#3B9790] font-semibold bg-white px-6 py-3 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors">
                <HiOutlinePlayCircle className="mr-2 w-5 h-5 text-[#3B9790]" />
                Hear from some beneficiaries
                </button>
            </div>
            </div>
        </div>
        </section>
    </div>
    {/* Fourth section in SDG */}
    <div className='w-full bg-[#FFF7EA]'>
        <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column with Title and Image */}
            <div className="lg:w-5/12">
            <h3 className="text-[40px] text-[#B6A78E] font-semibold">1. SDG 8:</h3>
            <h2 className="text-[80px] font-semibold text-[#0F2624] mb-4 m-0 p-0">
                Decent <br/> Work & <br/> Economic <br/>Growth 
            </h2>
            
            <div className="rounded-xl overflow-hidden h-[120px]">
                <img 
                src="/src/assets/images/economic.png" 
                alt="Students collaborating around a table with books and learning materials" 
                className="w-full object-cover"
                />
            </div>
            </div>
            
            {/* Right Column with Details */}
            <div className="lg:w-7/12">
            <div className="space-y-6">
                {/* UN Definition */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    UN Definition:
                </h4>
                <p className="text-[#0F2624] italic ml-4">
                "Promote sustained, inclusive, and sustainable economic growth, full and productive employment, and decent work for all." 
                </p>
                </div>
                
                {/* Our Commitment */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    Our Commitment:
                </h4>
                <p className="text-[#0F2624] ml-4">
                We aim to create economic opportunities for individuals by equipping them with the skills needed to secure decent work in the tech sector. 
                </p>
                </div>
                
                {/* How We Contribute */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-3">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    How We Contribute:
                </h4>
                <div className="space-y-4 ml-4">
                    <p className="flex items-start text-[#0F2624]">
                    <span className="inline-block w-1 h-1 bg-gray-600 rounded-full mt-2 mr-2"></span>
                    Job-Ready Skills: Providing practical, industry-relevant training that prepares learners for high-demand tech jobs.
                    </p>
                    <p className="flex items-start text-[#0F2624]">
                    <span className="inline-block w-1 h-1 bg-gray-600 rounded-full mt-2 mr-2"></span>
                    Career Support: Offering career counselling, resume building, and job placement assistance to help graduates secure employment. 
                    </p>
                    <p className="flex items-start text-[#0F2624]">
                    <span className="inline-block w-1 h-1 bg-gray-600 rounded-full mt-2 mr-2"></span>
                    Entrepreneurship Programs: Encouraging innovation and entrepreneurship by teaching skills like app development, digital marketing, and business planning.         
                    </p>
                </div>
                </div>
                
                {/* Impact */}
                <div>
                <h4 className="flex items-center text-lg font-semibold text-[#0F2624] mb-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full mr-2"></span>
                    Impact:
                </h4>
                <p className="text-[#0F2624] font-normal ml-4">
                By empowering women with tech skills, we are helping to close the gender gap in the tech industry and promoting gender equality worldwide.
                </p>
                </div>
            </div>
            
            {/* Testimonial Button */}
            <div className="mt-8">
                <button className="inline-flex items-center text-[#3B9790] font-semibold bg-white px-6 py-3 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors">
                <HiOutlinePlayCircle className="mr-2 w-5 h-5 text-[#3B9790]" />
                Hear from some beneficiaries
                </button>
            </div>
            </div>
        </div>
        </section>        
    </div>    
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-20 bg-gray-50">
            <Link to="/courses" className="flex">
                <button className="px-6 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors flex items-center font-semibold">
                Begin your learning journey
                <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
                </button>
            </Link>
            
            <Link to="/support" className="flex">
                <button className="px-6 py-3 rounded-lg border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors">
                Support Us
                </button>
            </Link>
                        
        </div>

        <Metrics />
        <Testimonials />
    </>
  )
}

export default Sdgs