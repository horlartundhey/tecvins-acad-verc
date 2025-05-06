import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Award, Globe, Zap, FileText, MessageSquare, Trophy, X, ChevronDown } from "lucide-react"
import one from '../assets/images/1.png'
import two from '../assets/images/2.png'
import three from '../assets/images/3.png'
import four from '../assets/images/4.png'
import chartgo from '../assets/images/ChartGo_20250128115513.png'
import { HiArrowLongRight } from 'react-icons/hi2';

const Donate = () => {

  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, []);

  return (
   <>
   <div className='bg-[#FAFAFA]'>
      <div className="bg-mint-50 min-h-screen">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <nav className="flex">
            <Link to="/support" className="text-teal-600 hover:text-teal-800">
              Support Us
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-600">Donate</span>
          </nav>
        </div>
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Donate to Tecvinson Academy
          </h1>
          <p className="text-base text-gray-600">
          Your donation fuels learning, growth, and brighter futures.
          </p>
        </div>
        
        {/* Three Column Layout */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Decorative Elements */}
          <div className="absolute top-[-20px] left-[5rem] w-0 h-0 z-0" style={{ transform: 'scaleX(-1)' }}>
                  <svg width="91" height="70" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M63.8138 2.26838C40.1743 7.43569 13.3759 22.9858 3.3701 46.9324C1.07162 52.4307 -2.662 62.5968 2.91267 67.6498C8.09003 72.3374 16.9543 68.2165 22.3497 65.7082C22.6177 65.5835 22.8772 65.4629 23.1273 65.3475C44.1395 55.6509 67.0728 39.8631 82.7334 22.1883C82.8322 22.0768 82.9344 21.9616 83.0398 21.843C86.702 17.7199 94.0905 9.40174 89.2886 3.67684C84.2683 -2.30644 71.9109 0.458801 65.1306 1.97603C64.6638 2.08048 64.2235 2.17902 63.8138 2.26838ZM54.0272 13.1553C41.8205 16.0111 27.0844 24.9824 21.4461 36.8733C16.6046 47.0872 23.5988 50.2164 32.5228 47.0447C44.2195 42.8856 58.0198 33.5041 65.4574 23.2325C72.9442 12.8819 62.6179 11.1471 54.0272 13.1553Z"
                      fill="#6ECAC3"
                    />
                  </svg>
                </div>
          
          
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-200 transform -translate-x-1/2"></div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-32">
            {/* Left Image */}
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
                <img 
                  src="https://res.cloudinary.com/kamisama/image/upload/v1746463181/image_azkifq.png" 
                  alt="Group of diverse tech professionals collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Center Text Box */}
            <div className="md:col-span-1 flex items-center">
              <div className=" bg-[#1B8D6C] border-[8px] border-[#00BC85] text-white py-4 px-5 rounded-xl">
                <p className="text-lg">
                At Tecvinson Academy, we are building a global ecosystem to transform lives through free, accessible IT education. We are seeking partnerships with corporations, nonprofit organizations, and tech companies to expand our impact and reach more individuals from underrepresented backgrounds.
                </p>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
                <img 
                  src="https://res.cloudinary.com/kamisama/image/upload/v1746463259/image_hmoftw.png" 
                  alt="Trainer helping students with computer tasks" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>              
        </div>

        {/* Call to Action - Donation */}
        <div className='w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#DBF2F0] mb-10'>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Support Us Financially</h2>
            <p className="text-xl text-gray-600 mb-8 mx-auto">
            Your donation fuels learning, growth, and brighter futures. Donate now!
            </p>
            <button 
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-md transition-colors text-lg"
            >
            Donate Now
            </button>
        </div>        
        </div>
  
        <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-12 ">What We Need Funding For</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trainer Compensation */}
          <div className="bg-gray-50 p-6 rounded-lg relative overflow-hidden">
            <div className="w-3/4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Trainer Compensation</h2>
              <p className="text-gray-600">To attract and retain skilled trainers.</p>
            </div>
            {/* Empty space for custom number image */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 ">
              <img src={one} alt="Custom Number" className="w-full h-full" />
            </div>
          </div>

          {/* Student Support */}
          <div className="bg-gray-50 p-6 rounded-lg relative overflow-hidden">
            <div className="w-3/4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Student Support</h2>
              <p className="text-gray-600">Providing laptops, internet, and learning tools.</p>
            </div>
            {/* Empty space for custom number image */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 ">
                <img src={two} alt="Custom Number" className="w-full h-full" />
            </div>
          </div>

          {/* Licensing Costs */}
          <div className="bg-gray-50 p-6 rounded-lg relative overflow-hidden">
            <div className="w-3/4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Licensing Costs</h2>
              <p className="text-gray-600">Cover tools like Jira, Miro, and design software.</p>
            </div>
            {/* Empty space for custom number image */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 ">
                <img src={three} alt="Custom Number" className="w-full h-full" />
            </div>
          </div>

          {/* Platform Development */}
          <div className="bg-gray-50 p-6 rounded-lg relative overflow-hidden">
            <div className="w-3/4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Platform Development</h2>
              <p className="text-gray-600">Enhance the online learning experience.</p>
            </div>
            {/* Empty space for custom number image */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 ">
                <img src={four} alt="Custom Number" className="w-full h-full" />   
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 '>
          {/* Second Call to Action */}          
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center text-[#1E1E1E] font-medium py-10 text-xl">
            <span>Your donation fuels learning, growth, and brighter futures. Donate now! 🚀</span>
            <HiArrowLongRight className="ml-2 h-8 w-8" />
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 font-semibold rounded-xl transition-colors" >
            Donate Now
          </button>
        </div>
        </div>
        
        
        <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-12">What We Need Funding For</h1>

        <div className="flex justify-center items-center">
          <img
            src={chartgo }
            alt="Funding Allocation Chart"
            className="w-[35rem] h-[35rem] max-w-full"
          />
        </div>
      </div>
    </div>
  

  
        

       {/* Call to Action - Donation */}
       <div className='w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#DBF2F0] mb-10'>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Support Us Financially</h2>
            <p className="text-xl text-gray-600 mb-8 mx-auto">
            Your donation fuels learning, growth, and brighter futures. Donate now!
            </p>
            <button 
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-md transition-colors text-lg"
            >
            Donate Now
            </button>
        </div>        
        </div>
  
      {/* Support Section */}                
        
      </div>
  </div>
  
  </>
  )
}

export default Donate