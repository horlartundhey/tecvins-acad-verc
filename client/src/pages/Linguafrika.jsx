
import { Code, MapPin, User, Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { HiOutlineRocketLaunch } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import HireTalent from './HireTalent'

const Linguafrika = () => {

  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, []);


const teamMembers = {
    productDesign: [{ name: "Abosedde Obajimoh", role: "UI/UX Design" }],
    productDevelopment: [
      { name: "Chiara sei Tem", role: "DevOps" },
      { name: "MaryAnn Nwagor", role: "Cybersecurity" },
      { name: "Oladipupo Olaniyan", role: "DevOps" },
      { name: "Rasheedat Mustapha", role: "DevOps" },
      { name: "Samuel Terungwa", role: "Python Development" },
      { name: "Judah Frank-Oziwo", role: "DevOps" },
    ],
    productManagement: [
      { name: "Bankole Ojo", role: "Scrum Master" },
      { name: "Olayinka Christie Oladimeji", role: "Software Quality" },
      { name: "Oluchukwu Nwaka", role: "Business Analysis" },
      { name: "Oluwabusayo Ayodele", role: "Business Analysis" },
      { name: "Oluwabusola S. Shoneye", role: "Business Analysis" },
      { name: "Tolutope Ajewole", role: "Business Analysis" },
    ],
  }

  return (
    

    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="bg-mint-50 min-h-screen w-full">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
          <nav className="flex flex-col sm:flex-row sm:flex-wrap mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base gap-1 sm:gap-0">
            <Link to="/projects-by-students" className="text-teal-600 hover:text-teal-800 underline break-words">
              Projects by Tecvinson Students
            </Link>
            <span className="hidden sm:inline mx-2 text-gray-500">/</span>
            <span className="text-gray-600 break-words text-xs sm:text-sm lg:text-base">
              Language Learning App – LinguAfrika
            </span>
          </nav>

          {/* Hero Section */}
          <div className="mt-2 sm:mt-4 mb-4 sm:mb-6 relative">
            {/* Background decorations - hidden on mobile for better performance */}
            <div className="absolute inset-0 hidden md:block">
              <div className="absolute top-20 sm:top-44 left-[5%] sm:left-[14%] w-48 sm:w-96 h-48 sm:h-96 bg-[#FF6F611A]/10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/4 right-1/4 w-40 sm:w-80 h-40 sm:h-80 bg-emerald-300/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-1/2 w-36 sm:w-72 h-36 sm:h-72 bg-green-500/5 rounded-full blur-2xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto mb-4 sm:mb-6 lg:mb-8">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Language Learning App – LinguAfrika
              </h1>
            </div>
          </div>
        </div>

        {/* Project Description Section */}
        <div className="bg-white mb-4 sm:mb-6 lg:mb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 order-2 lg:order-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0F2624]">Project Description</h2>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg xl:text-xl font-normal leading-5 sm:leading-6 lg:leading-7 xl:leading-8">
                  LinguAfrika is a platform dedicated to teaching African languages through AI-personalized lessons. It
                  enables users to engage with languages like Yoruba, Igbo, Swahili, and Zulu in interactive, gamified,
                  and culturally rich formats.
                </p>
              </div>
              <div className="order-1 lg:order-2 w-full flex justify-center">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751726040/image_v3co0i.svg"
                  alt="Laptop Screenshot"
                  className="rounded shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
              <div className="w-full flex justify-center lg:order-1">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751807597/image_xzeft8.png"
                  alt="Phone Screenshot"
                  className="rounded shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
                />
              </div>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 lg:order-2">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0F2624]">Problem It Solves</h2>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-[#5E5E5E] text-sm sm:text-base lg:text-lg xl:text-xl font-normal leading-5 sm:leading-6 lg:leading-7 xl:leading-8 pl-2">
                  <li>Dwindling use of African languages</li>
                  <li>Lack of structured, scalable tools to learn African languages</li>
                  <li>Scarcity of localized and engaging language content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tools/Technologies Section */}
        <div className="bg-white mb-4 sm:mb-6 lg:mb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 order-2 lg:order-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Tools/Technologies Used</h2>
                <p className="text-[#5E5E5E] text-sm sm:text-base lg:text-lg xl:text-xl font-normal leading-5 sm:leading-6 lg:leading-7 xl:leading-8">
                  Jira, Confluence, Miro, Microsoft Teams, Slack, GitHub, Figma
                </p>
                <p className="text-[#5E5E5E] text-sm sm:text-base lg:text-lg xl:text-xl font-semibold">
                  <strong>Tech Stack:</strong>
                </p>
                <ul className="list-disc list-inside ml-2 sm:ml-4 space-y-1 sm:space-y-2 text-[#5E5E5E] text-sm sm:text-base lg:text-lg xl:text-xl">
                  <li>Frontend: React</li>
                  <li>Backend: Python</li>
                  <li>AI: GenAI integration for dynamic content</li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 w-full flex justify-center">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751803323/image_ok5dp8.png"
                  alt="Technology Stack"
                  className="rounded shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Screenshots */}
        <div className="mb-6 sm:mb-8 lg:mb-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:grid sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="w-full">
              <img
                src="https://res.cloudinary.com/kamisama/image/upload/v1751808511/image_by2v3k.png"
                alt="Event Screenshot"
                className="rounded shadow-md w-full h-auto"
              />
            </div>
            <div className="w-full">
              <img
                src="https://res.cloudinary.com/kamisama/image/upload/v1751808626/image_ool6z8.png"
                alt="Setup Profile Screenshot"
                className="rounded shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6 sm:mb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Team Members <span className="text-base sm:text-lg font-normal text-gray-500">(Cohort 2024)</span>
            </h2>

            {/* Mobile: Stack vertically, Desktop: Grid layout */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8 lg:divide-x lg:divide-gray-200">
              {/* Product Design */}
              <div className="pb-6 lg:pb-0 border-b lg:border-b-0 border-gray-200">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="bg-red-100 p-2 rounded-lg mr-3">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Product Design</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {teamMembers.productDesign.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{member.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Development */}
              <div className="pb-6 lg:pb-0 lg:px-6 xl:px-8 border-b lg:border-b-0 border-gray-200">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Code className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Product Development</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {teamMembers.productDevelopment.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full mr-2 sm:mr-3 flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{member.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Management */}
              <div className="lg:pl-6 xl:pl-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Product Management</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {teamMembers.productManagement.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full mr-2 sm:mr-3 flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{member.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hire Talent Section */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-[#FFFFEE] mb-6 sm:mb-8 lg:mb-10">
        <HireTalent />
      </div>

      {/* Action Buttons */}
      <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-11">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-2xl mx-auto">
          <Link href="/support" className="w-full sm:w-auto order-2 sm:order-1">
            <button className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors text-base sm:text-lg">
              Support Us
            </button>
          </Link>

          <Link href="/courses" className="w-full sm:w-auto order-1 sm:order-2">
            <button className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-[#3B9790] text-white hover:bg-teal-700 transition-colors flex items-center justify-center font-semibold text-base sm:text-lg">
              Begin your learning journey
              <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Linguafrika