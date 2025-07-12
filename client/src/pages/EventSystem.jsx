import { Code, MapPin, User, Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { HiOutlineRocketLaunch, HiRocketLaunch } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import HireTalent from './HireTalent'

const EventSystem = () => {

  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, []);

const teamMembers = {
    productDesign: [{ name: "Student Name", role: "UX/UI Designer" }],
    productDevelopment: [
      { name: "Benjamin Isa", role: "Developer" },
      { name: "Blessed Kemka", role: "Developer" },
      { name: "Christian Ebokankwo", role: "Developer" },
      { name: "Daniel Abraham", role: "Developer" },
      { name: "Eseoghene Efenakpo", role: "Developer" },
      { name: "Thomas Andor", role: "Developer" },
      { name: "Nkereawanji Luke", role: "Developer" },
      { name: "Sunday Amaka", role: "Developer" },
    ],
    productManagement: [
      { name: "Abiodun Samson Fagiye", role: "Software Quality" },
      { name: "Ann Nkem", role: "Business Analyst" },
      { name: "Ehighemesue Dobby Osayimwen", role: "Quality Analyst" },
      { name: "Odilon Ehimiaghe", role: "Software Quality" },
      { name: "Oke Odubunmi", role: "Business Analyst" },
      { name: "Oladele Olusegun Festus", role: "Scrum Master" },
      { name: "Yusuff Aminat", role: "Business Analyst" },
    ],
}

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="bg-mint-50 min-h-screen w-full">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          <nav className="flex flex-wrap items-center mb-6 sm:mb-10 text-sm sm:text-base">
            <Link to="/projects-by-students" className="text-teal-600 hover:text-teal-800 underline">
              Projects by Tecvinson Students
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-600 break-words">Event Management System – D'EventMatcha</span>
          </nav>

          <div className="mt-5 mb-5 relative">
            {/* Background Elements - Hidden on mobile for better performance */}
            <div className="absolute inset-0 hidden lg:block">
              <div className="absolute top-44 left-[14%] w-96 h-96 bg-[#FF6F611A]/10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-emerald-300/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-green-500/5 rounded-full blur-2xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto mb-6 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Event Management System – D'EventMatcha
              </h1>
            </div>
          </div>
        </div>

        {/* Project Description Section */}
        <div className="bg-white mb-6 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#0F2624]">
                  Project Description
                </h2>
                <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-7 lg:leading-8">
                  D'EventMatcha is an event service aggregation platform tailored to the Nigerian market. It helps users
                  discover event vendors, compare services, manage logistics, and streamline bookings. It provides a
                  one-stop digital solution to planning weddings, parties, and corporate functions.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751725901/matcha-even_tl2qxl.svg"
                  alt="Event Management System Interface"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full h-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Problem It Solves Section */}
        <div className="mb-6 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751802387/problem-it-solves_tqomrw.svg"
                  alt="Problems the system solves"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full h-auto max-w-full"
                />
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#0F2624]">Problem It Solves</h2>
                <ul className="list-disc list-inside space-y-2 text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-7 lg:leading-8">
                  <li>Lack of centralized vendor marketplace</li>
                  <li>Difficulty in finding reliable and verified vendors</li>
                  <li>Unstructured booking and payment processes</li>
                  <li>Low visibility for event service providers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tools/Technologies Section */}
        <div className="bg-white mb-6 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                <h2 className="text-[#5E5E5E] text-lg sm:text-xl font-semibold">Tools/Technologies Used</h2>
                <p className="text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-7 lg:leading-8">
                  Jira, Confluence, Miro, Microsoft Teams, Google Workspace, GitHub, Postman
                </p>
                <p className="text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-semibold">
                  <strong>Tech Stack:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-normal">
                  <li>Frontend: React</li>
                  <li>Backend: C# (.NET)</li>
                  <li>Cloud: Azure</li>
                </ul>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751803323/image_ok5dp8.png"
                  alt="Technology stack visualization"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full h-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots Section */}
        <div className="mb-6 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751803888/Section_oq9a00.png"
                  alt="Event interface screenshot"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full h-auto max-w-full"
                />
              </div>
              <div>
                <img src="https://res.cloudinary.com/kamisama/image/upload/v1751803967/image_ywnyk3.png"
                  alt="Setup Profile interface"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full h-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6 sm:mb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Team Members <span className="text-base sm:text-lg font-normal text-gray-500">(Cohort 2024)</span>
            </h2>

            <div className="space-y-6 sm:space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:divide-x lg:divide-gray-200">
              {/* Product Design */}
              <div className="lg:pr-8">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-2 rounded-lg mr-3">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Product Design</h3>
                </div>
                <div className="space-y-3">
                  {teamMembers.productDesign.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{member.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Development */}
              <div className="lg:px-8 pt-6 sm:pt-8 lg:pt-0 border-t lg:border-t-0 border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Code className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Product Development</h3>
                </div>
                <div className="space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
                  {teamMembers.productDevelopment.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{member.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Management */}
              <div className="lg:pl-8 pt-6 sm:pt-8 lg:pt-0 border-t lg:border-t-0 border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Product Management</h3>
                </div>
                <div className="space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
                  {teamMembers.productManagement.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                      </div>
                      <div className="min-w-0">
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
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-[#FFFFEE] mb-6 sm:mb-10">
        <HireTalent />
      </div>

      {/* Footer Buttons */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-11">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-2xl mx-auto">
          <Link href="/support" className="w-full sm:w-auto order-2 sm:order-1">
            <button className="w-full px-4 sm:px-6 py-3 sm:py-[1.3rem] rounded-xl border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors text-base sm:text-lg">
              Support Us
            </button>
          </Link>

          <Link href="/courses" className="w-full sm:w-auto order-1 sm:order-2">
            <button className="w-full px-4 sm:px-6 py-3 sm:py-[1.3rem] rounded-xl bg-[#3B9790] text-white hover:bg-teal-700 transition-colors flex items-center justify-center font-semibold text-base sm:text-lg">
              Begin your learning journey
              <HiRocketLaunch className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventSystem