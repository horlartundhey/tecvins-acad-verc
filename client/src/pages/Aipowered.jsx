import { Code, MapPin, User, Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { HiOutlineRocketLaunch } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import HireTalent from './HireTalent'

const Aipowered = () => {

  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, []);

const teamMembers = {
    dataGenAI: [
      { name: "Segun Owen", role: "Data & GenAI" },
      { name: "Angela Omaji", role: "Data & GenAI" },
      { name: "Promise Udeh", role: "Data & GenAI" },
      { name: "Confidence Odalonu", role: "Data & GenAI" },
      { name: "Judith Emmanuel", role: "Data & GenAI" },
      { name: "Mercy Onyinyechi", role: "Data & GenAI" },
      { name: "Favour Vopnu", role: "Data & GenAI" },
      { name: "Timileyin Ayomide Olanipekun", role: "Data & GenAI" },
      { name: "Folasade Amoko", role: "Data & GenAI" },
      { name: "Omolara Grace Olaogun", role: "Data & GenAI" },
      { name: "Tayo Pedro", role: "Data & GenAI" },
      { name: "Friday Odigie", role: "Data & GenAI" },
      { name: "Sodiq Abiola Yusuff", role: "Data & GenAI" },
      { name: "Farouq Yusuf", role: "Data & GenAI" },
      { name: "Kevin Tochukwu Dibia", role: "Data & GenAI" },
      { name: "Pius Emmanuel", role: "Data & GenAI" },
      { name: "Jessica Oharisi", role: "Data & GenAI" },
      { name: "Unity Ekugbe", role: "Data & GenAI" },
      { name: "Oghenekaro Genesis", role: "Data & GenAI" },
    ],
  }

  const splitTeamIntoColumns = (team) => {
    const itemsPerColumn = Math.ceil(team.length / 3)
    return [
      team.slice(0, itemsPerColumn),
      team.slice(itemsPerColumn, itemsPerColumn * 2),
      team.slice(itemsPerColumn * 2),
    ]
  }

  const [column1, column2, column3] = splitTeamIntoColumns(teamMembers.dataGenAI)


  return (    
    <div className="bg-[#FAFAFA]">
      <div className="bg-mint-50 min-h-screen w-full">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          <nav className="flex flex-wrap items-center mb-6 sm:mb-10 text-sm sm:text-base">
            <Link to="/projects-by-students" className="text-teal-600 hover:text-teal-800 underline break-words">
              Projects by Tecvinson Students
            </Link>
            <span className="mx-1 sm:mx-2 text-gray-500">/</span>
            <span className="text-gray-600 break-words">AI-Powered Solutions</span>
          </nav>

          <div className="mt-3 sm:mt-5 mb-5">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-32 sm:top-44 left-[5%] sm:left-[14%] w-48 sm:w-96 h-48 sm:h-96 bg-[#FF6F611A]/10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/4 right-[10%] sm:right-1/4 w-40 sm:w-80 h-40 sm:h-80 bg-emerald-300/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-1/2 w-36 sm:w-72 h-36 sm:h-72 bg-green-500/5 rounded-full blur-2xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto mb-6 sm:mb-10">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                AI-Powered Solutions
              </h1>
            </div>
          </div>
        </div>

        {/* Project Description Section */}
        <div className="bg-white mb-6 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
                <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#0F2624]">Project Description</h2>
                <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-8">
                  This suite includes GenAI chatbots, intelligent tutors, customer support bots, and data analysis tools
                  developed by students using modern AI tools.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751726360/ai-powered_wwtnqa.svg"
                  alt="AI-Powered Solutions Illustration"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full max-w-[500px] lg:max-w-[700px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Problem It Solves Section */}
        <div className="mb-6 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751817002/image_31_rrvltb.png"
                  alt="Problem solving illustration"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full max-w-[500px] lg:max-w-[700px] h-auto"
                />
              </div>
              <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
                <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#0F2624]">Problem It Solves</h2>
                <ul className="list-disc list-inside space-y-2 text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-8">
                  <li>Manual workloads in education and service delivery</li>
                  <li>Lack of AI exposure in local tech ecosystems</li>
                  <li>Inefficiency in repetitive and scalable problem-solving tasks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tools/Technologies Section */}
        <div className="bg-white mb-6 sm:mb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
                <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold">Tools/Technologies Used</h2>
                <p className="text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-8">
                  GenAI APIs, Python, Node.js, React, Jira, GitHub, Figma
                </p>
                <p className="text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-semibold">
                  <strong>Integrated tools:</strong>
                </p>
                <p className="text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-8">
                  LangChain, OpenAI API, Firebase
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <img
                  src="https://res.cloudinary.com/kamisama/image/upload/v1751803323/image_ok5dp8.png"
                  alt="Technologies used illustration"
                  width={700}
                  height={400}
                  className="rounded shadow-md w-full max-w-[500px] lg:max-w-[700px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Images Section */}
        <div className="mb-6 sm:mb-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-6 sm:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/kamisama/image/upload/v1751817071/image_zvz96i.svg"
                alt="Event illustration"
                width={700}
                height={400}
                className="rounded shadow-md w-full max-w-[500px] lg:max-w-[700px] h-auto"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/kamisama/image/upload/v1751817104/image_33_wnvu9e.svg"
                alt="Setup Profile illustration"
                width={700}
                height={400}
                className="rounded shadow-md w-full max-w-[500px] lg:max-w-[700px] h-auto"
              />
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-white rounded-lg p-4 sm:p-8 mb-6 sm:mb-8 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Team Members <span className="text-sm sm:text-lg font-normal text-gray-500">(Cohort 2024)</span>
            </h2>

            {/* Mobile: Single column, Desktop: Three columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
              {/* Column 1 */}
              <div className="space-y-3">
                {column1.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{member.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="space-y-3 lg:px-4">
                {column2.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{member.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 3 */}
              <div className="space-y-3 lg:pl-4">
                {column3.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
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

      {/* Hire Talent Section */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 bg-[#FFFFEE] mb-6 sm:mb-10">
        {/* HireTalent component would go here */}
        <HireTalent />
      </div>

      {/* Action buttons */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-11">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <Link href="/support" className="w-full sm:w-auto">
            <button
              variant="outline"
              className="w-full px-4 sm:px-6 py-3 sm:py-5 rounded-xl border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base bg-transparent"
            >
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

export default Aipowered