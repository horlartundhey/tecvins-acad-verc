import { Code, MapPin, User, Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { HiOutlineRocketLaunch } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import HireTalent from './HireTalent'

const Studat = () => {
  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, []);

const teamMembers = {
    productDesign: [
      { name: "Oluwafunmilayo Ola", role: "UI/UX Designer" },
      { name: "Daniel Oluwadamilare Oke", role: "UI/UX Designer" },
    ],
    productDevelopment: [
      { name: "Adeyemi Lawal", role: "DevOps" },
      { name: "Chidinma Igboanu", role: "Cybersecurity" },
      { name: "Clifford Tochi", role: "Python Development" },
      { name: "Edafe Idoghor", role: "Cybersecurity" },
      { name: "Emmanuel Adebayo", role: "Cybersecurity" },
      { name: "Eseoghene Merhe", role: "DevOps" },
      { name: "Festus Okagbare", role: "DevOps" },
      { name: "Gloria Ondieki", role: "Python Development" },
      { name: "Joshua Akana", role: "Python Development" },
      { name: "Jude Ehiwario", role: "Python Development" },
      { name: "Sunday-Sonie Odey-Jack", role: "Cybersecurity" },
    ],
    productManagement: [
      { name: "Adewale Lawal", role: "Software Quality" },
      { name: "Akinnike Akinyemi", role: "Software Quality" },
      { name: "Bisola Taiwo", role: "Business Analysis" },
      { name: "Boluwatife Kehinde", role: "Business Analysis" },
      { name: "Bose Osayimwen", role: "Scrum Master" },
      { name: "Daniel Ayodeji Adejumola", role: "Business Analysis" },
      { name: "Bolaji Oladipupo", role: "Business Analysis" },
      { name: "Wumi Ekun", role: "Business Analysis" },
    ],
  }

  return (
    

    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="bg-mint-50 min-h-screen w-full">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          <nav className="flex flex-wrap items-center mb-6 sm:mb-10 text-sm sm:text-base">
            <Link href="/projects-by-students" className="text-teal-600 hover:text-teal-800 underline">
              Projects by Tecvinson Students
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-600 break-words">Learning Management System – Studat</span>
          </nav>

          {/* Hero Section with Background */}
          <div className="relative mt-5 mb-8 sm:mb-12">
            {/* Background Elements - Hidden on mobile for better performance */}
            <div className="absolute inset-0 hidden sm:block overflow-hidden">
              <div className="absolute top-20 sm:top-44 left-[5%] sm:left-[14%] w-48 h-48 sm:w-96 sm:h-96 bg-[#FF6F611A]/10 rounded-full blur-2xl"></div>
              <div className="absolute top-10 sm:top-1/4 right-[10%] sm:right-1/4 w-32 h-32 sm:w-80 sm:h-80 bg-emerald-300/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-green-500/5 rounded-full blur-2xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Learning Management System – Studat
              </h1>
            </div>
          </div>
        </div>

        {/* Project Description Section */}
        <div className="bg-white mb-8 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#0F2624]">
                  Project Description
                </h2>
                <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-7 lg:leading-8">
                  Studat is an LMS built for schools across Nigeria, allowing educators to manage classes, assignments,
                  and resources while enabling students to learn at their own pace. It supports both online and blended
                  learning modes.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751726356/lms-studa_kzloc8.svg"
                  alt="Laptop Screenshot"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full max-w-md sm:max-w-lg lg:max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        <div className="mb-8 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="flex justify-center lg:justify-start">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751815220/image_jpfy7r.svg"
                  alt="Imovelle screenshot"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full max-w-md sm:max-w-lg lg:max-w-full h-auto"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#0F2624]">Problem It Solves</h2>
                <ul className="list-disc list-inside space-y-2 text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-7 lg:leading-8">
                  <li>Lack of structured digital learning environments in many schools</li>
                  <li>Poor classroom engagement and tracking tools</li>
                  <li>No unified system for student–teacher collaboration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tools/Technologies Section */}
        <div className="bg-white mb-8 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold">Tools/Technologies Used</h2>
                <p className="text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-7 lg:leading-8">
                  Microsoft Teams, Confluence, Jira, Miro, Google Workspace, GitHub
                </p>
                <p className="text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-semibold">
                  <strong>Tech Stack:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-[#5E5E5E] text-base sm:text-lg lg:text-xl">
                  <li>Frontend: React</li>
                  <li>Backend: Python</li>
                  <li>Framework: Django</li>
                  <li>Cloud: AWS</li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751803323/image_ok5dp8.png"
                  alt="Technology Stack"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full max-w-md sm:max-w-lg lg:max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Images Section */}
        <div className="mb-8 sm:mb-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-8 sm:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/kamisama/image/upload/v1751815314/image_wakcj7.svg"
                alt="Event"
                width={700}
                height={400}
                className="rounded shadow-md w-full max-w-md sm:max-w-lg md:max-w-full h-auto"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/kamisama/image/upload/v1751815320/image_yqrdyb.svg"
                alt="Setup Profile"
                width={700}
                height={400}
                className="rounded shadow-md w-full max-w-md sm:max-w-lg md:max-w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-white rounded-lg shadow-sm mb-8 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Team Members <span className="text-base sm:text-lg font-normal text-gray-500">(Cohort 2024)</span>
            </h2>

            {/* Mobile: Stack vertically, Desktop: Grid layout */}
            <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:divide-x lg:divide-gray-200">
              {/* Product Design */}
              <div className="lg:pr-8">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5 text-red-600" />
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
              <div className="lg:px-8 border-t lg:border-t-0 pt-8 lg:pt-0">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Code className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Product Development</h3>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {teamMembers.productDevelopment.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{member.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mb-2">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Management */}
              <div className="lg:pl-8 border-t lg:border-t-0 pt-8 lg:pt-0">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Product Management</h3>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {teamMembers.productManagement.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{member.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mb-2">{member.role}</p>
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
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-[#FFFFEE] mb-8 sm:mb-10">
        <HireTalent />
      </div>

      {/* Bottom Action Buttons */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-11">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <Link href="/support" className="w-full sm:w-auto">
            <button className="w-full px-4 sm:px-6 py-3 sm:py-[1.3rem] rounded-xl border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors text-base sm:text-lg">
              Support Us
            </button>
          </Link>

          <Link href="/courses" className="w-full sm:w-auto">
            <button className="w-full px-4 sm:px-6 py-3 sm:py-[1.3rem] rounded-xl bg-[#3B9790] text-white hover:bg-teal-700 transition-colors flex items-center justify-center font-semibold text-base sm:text-lg">
              Begin your learning journey
              <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Studat