import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Award, Globe, Zap, FileText, MessageSquare, Trophy, X, ChevronDown } from "lucide-react"
import one from '../assets/images/1.png'
import two from '../assets/images/2.png'
import three from '../assets/images/3.png'
import four from '../assets/images/4.png'
// import chartgo from '../assets/images/ChartGo_20250128115513.png'
import { HiArrowLongRight } from 'react-icons/hi2';
import { PieChart, Pie, Cell, LabelList } from "recharts";
import DonationModal from '../components/DonationModal';

const data = [
  { name: "Trainer Compensation", value: 35, fullName: "Trainer Compensation (35%)" },
  { name: "Licensing Costs", value: 30, fullName: "Licensing Costs (30%)" },
  { name: "Student Support", value: 20, fullName: "Student Support (20%)" },
  { name: "Platform Development", value: 15, fullName: "Platform Development (15%)" },
]

const COLORS = ["#807CFF", "#00BC85", "#FF6F61", "#0082FF"]

const Donate = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, []);

  const handleDonateClick = () => {
    setIsDonationModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
  };

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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
        {/* Decorative Elements - Optimized for Mobile */}
        <div
          className="absolute top-[-10px] sm:top-[-20px] left-[3rem] sm:left-[5rem] w-0 h-0 z-0"
          style={{ transform: "scaleX(-1)" }}
        >
          <svg
            width="60"
            height="46"
            viewBox="0 0 91 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-[91px] sm:h-[70px]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M63.8138 2.26838C40.1743 7.43569 13.3759 22.9858 3.3701 46.9324C1.07162 52.4307 -2.662 62.5968 2.91267 67.6498C8.09003 72.3374 16.9543 68.2165 22.3497 65.7082C22.6177 65.5835 22.8772 65.4629 23.1273 65.3475C44.1395 55.6509 67.0728 39.8631 82.7334 22.1883C82.8322 22.0768 82.9344 21.9616 83.0398 21.843C86.702 17.7199 94.0905 9.40174 89.2886 3.67684C84.2683 -2.30644 71.9109 0.458801 65.1306 1.97603C64.6638 2.08048 64.2235 2.17902 63.8138 2.26838ZM54.0272 13.1553C41.8205 16.0111 27.0844 24.9824 21.4461 36.8733C16.6046 47.0872 23.5988 50.2164 32.5228 47.0447C44.2195 42.8856 58.0198 33.5041 65.4574 23.2325C72.9442 12.8819 62.6179 11.1471 54.0272 13.1553Z"
              fill="#6ECAC3"
            />
          </svg>
        </div>

        <div className="absolute top-[614px] sm:top-[250px] right-[4rem] sm:right-[6rem] w-0 h-0 z-0">
          <svg
            width="60"
            height="46"
            viewBox="0 0 91 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-[91px] sm:h-[70px]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M63.8138 68.2028C40.1743 63.0355 13.3759 47.4854 3.3701 23.5388C1.07162 18.0405 -2.662 7.87436 2.91267 2.8214C8.09003 -1.86623 16.9543 2.25474 22.3497 4.76303C22.6177 4.88766 22.8772 5.0083 23.1273 5.12368C44.1395 14.8203 67.0728 30.6081 82.7334 48.2829C82.8322 48.3944 82.9344 48.5096 83.0398 48.6282C86.702 52.7512 94.0905 61.0694 89.2886 66.7944C84.2683 72.7776 71.9109 70.0124 65.1306 68.4952C64.6638 68.3907 64.2235 68.2922 63.8138 68.2028ZM54.0272 57.3159C41.8205 54.4601 27.0844 45.4888 21.4461 33.5979C16.6046 23.384 23.5988 20.2548 32.5228 23.4265C44.2195 27.5856 58.0198 36.9671 65.4574 47.2387C72.9442 57.5893 62.6179 59.3241 54.0272 57.3159Z"
              fill="#F4A89A"
            />
          </svg>
        </div>

        {/* Vertical Line - Hidden on Mobile */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-200 transform -translate-x-1/2 hidden lg:block"></div>

        {/* Content Grid - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative mb-16 sm:mb-32">
          {/* First Image */}
          <div className="lg:col-span-1 order-1">
            <div className="rounded-lg overflow-hidden shadow-lg h-48 sm:h-64 lg:h-80">
              <img
                src="https://res.cloudinary.com/kamisama/image/upload/v1746463181/image_azkifq.png"
                alt="Group of diverse tech professionals collaborating"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center Text Box - Appears between images on mobile */}
          <div className="lg:col-span-1 flex items-center order-2 lg:order-2">
            <div className="bg-[#1B8D6C] border-4 sm:border-[8px] border-[#00BC85] text-white py-4 sm:py-3 px-4 sm:px-5 rounded-xl w-full">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                At Tecvinson Academy, we are building a global ecosystem to transform lives through free, accessible IT
                education. We are seeking partnerships with corporations, nonprofit organizations, and tech companies to
                expand our impact and reach more individuals from underrepresented backgrounds.
              </p>
            </div>
          </div>

          {/* Second Image */}
          <div className="lg:col-span-1 order-3">
            <div className="rounded-lg overflow-hidden shadow-lg h-48 sm:h-64 lg:h-80">
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
            onClick={handleDonateClick}
            className="bg-[#3B9790] hover:bg-teal-700 text-white font-semibold px-8 py-[1.3rem] rounded-xl transition-colors text-lg"
            >
            Donate Now
            </button>
        </div>        
        </div>
  
         <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-12 text-center sm:text-left">
          What We Need Funding For
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Trainer Compensation */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg relative overflow-hidden min-h-[120px] sm:min-h-[140px]">
            <div className="relative z-10 pr-12 sm:pr-16 md:pr-20">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 leading-tight">
                Trainer Compensation
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                To attract and retain skilled trainers.
              </p>
            </div>
            {/* Number image */}
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2">
              <img
                src={one}
                alt="1"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
          </div>

          {/* Student Support */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg relative overflow-hidden min-h-[120px] sm:min-h-[140px]">
            <div className="relative z-10 pr-12 sm:pr-16 md:pr-20">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 leading-tight">
                Student Support
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Providing laptops, internet, and learning tools.
              </p>
            </div>
            {/* Number image */}
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2">
              <img
                src={two}
                alt="2"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
          </div>

          {/* Licensing Costs */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg relative overflow-hidden min-h-[120px] sm:min-h-[140px]">
            <div className="relative z-10 pr-12 sm:pr-16 md:pr-20">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 leading-tight">
                Licensing Costs
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Cover tools like Jira, Miro, and design software.
              </p>
            </div>
            {/* Number image */}
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 ">
              <img
                src={three}
                alt="3"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
          </div>

          {/* Platform Development */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg relative overflow-hidden min-h-[120px] sm:min-h-[140px]">
            <div className="relative z-10 pr-12 sm:pr-16 md:pr-20">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 leading-tight">
                Platform Development
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Enhance the online learning experience.
              </p>
            </div>
            {/* Number image */}
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2">
              <img
                src={four}
                alt="4"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 '>
          {/* Second Call to Action */}          
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Text content */}
          <div className="flex flex-col sm:flex-row sm:items-center text-[#1E1E1E] font-medium py-4 sm:py-6 lg:py-10">
            <span className="text-base sm:text-lg lg:text-xl leading-relaxed mb-2 sm:mb-0">
              Your donation fuels learning, growth, and brighter futures. Donate now! 🚀
            </span>
            <HiArrowLongRight className="hidden sm:block ml-2 h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0" />
          </div>

          {/* Donate button */}
          <button 
            onClick={handleDonateClick}
            className="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-xl transition-colors w-full sm:w-auto lg:flex-shrink-0 text-base sm:text-lg"
          >
            Donate Now
          </button>
        </div>
        </div>

        <div className="bg-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                What We Need Funding For
              </h1>

              <div className="flex justify-center items-center">
                <PieChart width={1000} height={560} style={{width:'100%', height: '30%',}}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={true}
                    label={({ name }) => name}                    
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
          </div>
        </div>

       {/* Call to Action - Donation */}
       <div className='w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#DBF2F0]'>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Support Us Financially</h2>
            <p className="text-xl text-gray-600 mb-8 mx-auto">
            Your donation fuels learning, growth, and brighter futures. Donate now!
            </p>
            <button 
            onClick={handleDonateClick}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-md transition-colors text-lg"
            >
            Donate Now
            </button>
        </div>        
        </div>
  
      {/* Support Section */}                
        
      </div>
  </div>
  
  {/* Donation Modal */}
  <DonationModal 
    isOpen={isDonationModalOpen} 
    onClose={closeDonationModal} 
  />
  
  </>
  )
}

export default Donate