"use client"
import { useEffect } from "react"
import { HiArrowLongRight, HiGlobeAlt, HiOutlineRocketLaunch } from "react-icons/hi2"
import { TbChartPieFilled } from "react-icons/tb"
import { Link } from "react-router-dom"
import tecv from "../assets/images/tecv.png"
import partic from "../assets/images/partici.png"
import time1 from "../assets/images/timeclock1.png"
import time2 from "../assets/images/timecl2.png"
import binoc from "../assets/images/binoc.png"
import road from "../assets/images/road.png"
import OurPartners from "../components/OurPartners"
import Testimonials from "../components/Testimonials"

const OurJourney = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <div className="bg-[#FAFAFA]">
      <div className="bg-mint-50 min-h-screen">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Journey from Vision to Reality</h1>
        </div>

        {/* Three Column Layout */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
          {/* Content Grid - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative mb-16 sm:mb-32">
            {/* First Image */}
            <div className="lg:col-span-1 order-1">
              <div className="rounded-lg overflow-hidden shadow-lg h-48 sm:h-64 lg:h-80">
                <img
                  src="https://res.cloudinary.com/dwgyu7pr9/image/upload/v1750252706/journ_sg0vza.png"
                  alt="Group of diverse tech professionals collaborating"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Center Text Box - Appears between images on mobile */}
            <div className="lg:col-span-1 flex items-center order-2 lg:order-2">
              <div className="bg-[#FFE6E4] border-8 border-[#FFDBD8] text-[#1E1E1E] py-4 sm:py-6 px-4 sm:px-5 rounded-xl w-full">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  Founded on a clear vision of transforming tech education, Tecvinson Academy evolved from humble
                  beginnings to becoming a global catalyst for tech career transformation. Our journey reflects a
                  passionate commitment to bridging tech skill gaps worldwide, supported by strategic partnerships and
                  community-focused initiatives.
                </p>
              </div>
            </div>
            {/* Second Image */}
            <div className="lg:col-span-1 order-3">
              <div className="rounded-lg overflow-hidden shadow-lg h-48 sm:h-64 lg:h-80">
                <img
                  src="https://res.cloudinary.com/dwgyu7pr9/image/upload/v1750252700/Container_qwgtjz.png"
                  alt="Trainer helping students with computer tasks"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Milestones Timeline Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900 text-center">Milestones</h2>

              <div className="relative w-full h-[800px] mx-auto">
                {/* SVG Container for the curved path and connection lines */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 1000 800"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Main curved timeline path */}
                  <path
                    d="M500 60 C620 140, 380 280, 500 380 C620 480, 380 580, 500 720"
                    stroke="#4ABDB4"
                    strokeWidth="16"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Connection lines */}
                  {/* Line to 2019 (right) */}
                  <line x1="540" y1="180" x2="700" y2="180" stroke="#4ABDB4" strokeWidth="16" />

                  {/* Line to 2020-2022 (left) */}
                  <line x1="480" y1="360" x2="300" y2="360" stroke="#4ABDB4" strokeWidth="16" />

                  {/* Line to 2023 (right) */}
                  <line x1="500" y1="540" x2="700" y2="540" stroke="#4ABDB4" strokeWidth="16" />

                  {/* Line to 2024 (left) */}
                  <line x1="480" y1="680" x2="300" y2="680" stroke="#4ABDB4" strokeWidth="16" />

                  {/* Connection points */}
                  {/* <circle cx="500" cy="80" r="8" fill="#4ABDB4" />
                  <circle cx="540" cy="180" r="8" fill="#4ABDB4" />
                  <circle cx="460" cy="360" r="8" fill="#4ABDB4" />
                  <circle cx="540" cy="540" r="8" fill="#4ABDB4" />
                  <circle cx="460" cy="680" r="8" fill="#4ABDB4" /> */}
                </svg>

                {/* Milestone Cards */}

                {/* 2007-2018 - Top Center */}
                <div className="absolute top-[4%] left-1/2 transform -translate-x-1/2 w-80">
                  <div className="bg-[#E6F7F5] border-2 border-[#4ABDB4] rounded-xl overflow-hidden shadow-sm">
                    <div className="text-center">
                      <div className="bg-[#E6F7F5] py-3 px-5">
                        <h3 className="text-lg font-semibold text-[#0F2624] mb-0">2007-2018</h3>
                      </div>
                      <div className="bg-white py-4 px-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 leading-tight">
                          Individual tutoring in Software Development and Quality
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          This is a placeholder supporting text copy to replace the read more expanded state.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2019 - Right Side */}
                {/* 2019 - Right Side */}
                <div className="absolute top-[18%] right-[6%] w-80">
                  <div className="bg-[#E6F7F5] border-2 border-[#4ABDB4] rounded-xl overflow-hidden shadow-sm">
                    <div className="text-center">
                      <div className="bg-[#E6F7F5] py-3 px-5">
                        <h3 className="text-lg font-bold text-[#4ABDB4] mb-0">2019</h3>
                      </div>
                      <div className="bg-white py-4 px-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 leading-tight">
                          Tecvinson Limited opens in London, United Kingdom
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          This is a placeholder supporting text copy to replace the read more expanded state.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2020-2022 - Left Side */}
                <div className="absolute top-[40%] left-[8%] w-80">
                  <div className="bg-[#E6F7F5] border-2 border-[#4ABDB4] rounded-xl overflow-hidden shadow-sm">
                    <div className="text-center">
                      <div className="bg-[#E6F7F5] py-3 px-5">
                        <h3 className="text-lg font-bold text-[#4ABDB4] mb-0">2020-2022</h3>
                      </div>
                      <div className="bg-white py-4 px-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 leading-tight">
                          Tecvinson Ltd. opens in Marina, Lagos, Nigeria
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          This is a placeholder supporting text copy to replace the read more expanded state.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2023 - Right Side */}
                <div className="absolute top-[59%] right-[15%] w-80">
                  <div className="bg-[#E6F7F5] border-2 border-[#4ABDB4] rounded-xl overflow-hidden shadow-sm">
                    <div className="text-center">
                      <div className="bg-[#E6F7F5] py-3 px-5">
                        <h3 className="text-lg font-bold text-[#4ABDB4] mb-0">2023</h3>
                      </div>
                      <div className="bg-white py-4 px-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 leading-tight">
                          Tecvinson Academy opens in Sweden. 6-month bootcamp started.
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          This is a placeholder supporting text copy to replace the read more expanded state.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2024-Date - Left Side */}
                <div className="absolute top-[77%] left-[14%] w-80">
                  <div className="bg-[#E6F7F5] border-2 border-[#4ABDB4] rounded-xl overflow-hidden shadow-sm">
                    <div className="text-center">
                      <div className="bg-[#E6F7F5] py-3 px-5">
                        <h3 className="text-lg font-bold text-[#4ABDB4] mb-0">2024 - Date</h3>
                      </div>
                      <div className="bg-white py-4 px-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 leading-tight">
                          Significant expansion - 11 month intensive bootcamp
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          This is a placeholder supporting text copy to replace the read more expanded state.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <button className="text-[#3B9790] bg-[#FAFAFA] border-2 border-[#3B9790] rounded-lg px-6 py-3 hover:bg-[#3B9790] hover:text-white transition-colors flex items-center mx-auto">
                  Discover our Graduates' Success Stories <HiArrowLongRight className="ml-2 h-6 w-6" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Support Section */}
      <section className="py-16 px-4 bg-[#C17B5C] w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-4xl font-bold mb-12 text-white">Our Impact</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl">
            {/* First Impact Card */}
            <div className="bg-rose-100 rounded-lg shadow-sm">
              <div className="p-3">
                <div className="flex items-center gap-6 ">
                  <div className="flex-shrink-0 bg-white p-8 rounded-lg">
                    <TbChartPieFilled className="h-24 w-24 text-[#B95F45]" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-1 text-gray-900">90%</div>
                    <p className="text-gray-700 text-sm">Job-seeking success rate</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Second Impact Card */}
            <div className="bg-rose-100 rounded-lg shadow-sm">
              <div className="p-3">
                <div className="flex items-center gap-6 ">
                  <div className="flex-shrink-0 bg-white p-8 rounded-lg">
                    <HiGlobeAlt className="h-24 w-24 text-[#B95F45]" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-1 text-gray-900">2,000+</div>
                    <p className="text-gray-700 text-sm">IT professionals impacted globally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Centered Button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-4 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-orange-600 transition-colors duration-300">
              Discover our Graduates' Success Stories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Academy Description */}
      <section className="py-16 px-4 w-full">
        <div className="max-w-7xl mx-auto bg-[#EDF8F7] p-8">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1">
              <h2 className="text-4xl md:text-3xl font-bold text-teal-700 mb-5">Tecvinson Academy</h2>
              <img src={tecv || "/placeholder.svg"} alt="" />
            </div>
            <div className="md:col-span-2 space-y-6 text-[#0F2624] leading-relaxed">
              <p>
                Tecvinson Academy started on the scene with a mission-driven purpose. From day one, our focus was on
                helping people acquire the right skills for securing jobs in the tech world. Founder Vincent Obi puts it
                this way: "We did not just want to end up being another classroom or training center but aspired to make
                a difference in the tech world by serving as a growth catalyst that makes it possible for individuals to
                restart their careers in digital space."
              </p>
              <p>
                The Academy aimed to bridge the increasing demand for IT professionals with the right skills by offering
                a comprehensive free tech career. This clear sense of purpose guided the development of tailored
                training programmes that aligned with our vision for global learning opportunities.
              </p>
              <p>
                Today, Tecvinson Academy is transforming digitalisation across the globe one employable tech
                professional at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OurPartners />

      {/* Partnerships Section */}
      <section className="py-16 px-4 rounded-2xl mx-4 my-8 ">
        <div className="max-w-7xl mx-auto bg-[#FFE6E4] p-8 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#B95F45]">
                Partnerships, Collaborations, and Strategic Alliances
              </h2>
              <div className="space-y-6">
                <p className="text-[#0F2624] leading-relaxed">
                  We collaborate with approximately <strong>25+ highly skilled IT specialists</strong> across three
                  continents, contributing <strong>500+ hours annually</strong> mentoring, coaching, and guiding our
                  students from academics to practical industry application.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Leading tech companies including <strong>Microsoft, Google, Slack, GitHub, and Figma</strong>{" "}
                  generously support us with free non-profit licenses and subscriptions, while{" "}
                  <strong>Miro, TestPortal, Atlassian, and BubbleIo</strong> provide valuable non-profit discounts.
                  Their support enables our students to gain hands-on experience with industry-standard technologies.
                </p>
              </div>
            </div>
            <div className="relative h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={partic || "/placeholder.svg"} alt="" className=" p-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={time1 || "/placeholder.svg"}
                alt="Clock mechanism representing precision and technical education"
                width={200}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="mt-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                2023 Cohort: A Milestone in Free Tech Education
              </h2>
              <p className="text-gray-700 leading-relaxed">
                In 2023, Tecvinson Academy made the transformative decision to enable possibilities for more aspiring
                tech professionals, by offering free tech education. We launched our initiative with our first free boot
                camp – a comprehensive C# programming training for software development was announced and 90 highly
                motivated learners from Asia, Europe, the Americas, and Africa attended the intense 6-month virtual boot
                camp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2024 Cohort Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={time2 || "/placeholder.svg"}
                alt="Hourglass representing time and transformation"
                width={200}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                2024 Cohort: Expanding Our Global Reach
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We increased the scope of our free tech education programme after the initial boot camp's success rate.
                This time, we registered 400 students from 16 different countries for an 11-month intensive boot camp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 ">
        <div className="max-w-7xl mx-auto bg-[#EDF8F7] p-8 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#3B9790]">A Transformative Vision</h2>
              <p className="text-[#0F2624] leading-relaxed mb-6">
                Tecvinson Academy's founding vision was to enable learning opportunities and career transformation for
                budding tech enthusiasts into new industry roles. This vision has now taken a transformative turn that
                still revolves around skill development and career transformation.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our focus is not just on tech education but with inclusion, diversity, community impact, and the
                Sustainable Development Goals as the key objectives.
              </p>
            </div>
            <div className="flex justify-center">
              <div>
                <img src={binoc || "/placeholder.svg"} alt="Tecvinson Academy logo" className=" object-cover " />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Road Ahead Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto bg-[#EDF8F7] p-8 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#3B9790]">The Road Ahead</h2>
              <p className="text-[#0F2624] leading-relaxed mb-6">
                Our journey has been a remarkable one. Since inception, we have recorded a 90% job-seeking success rate
                and impacted over 2,000 IT professionals worldwide, helping them restart and qualify for tech careers.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                As the tech world continues to evolve, we remain committed to making a meaningful impact through our
                comprehensive free tech education initiative, expert mentorship, and industry partnerships.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Discover how our graduates transformed their careers. Read their success stories here.
              </p>
            </div>
            <div>
              <img
                src={road || "/placeholder.svg"}
                alt="Desert road stretching into the horizon"
                width={500}
                height={500}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
        {/* Call to Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4">
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

      <Testimonials />
    </div>
  )
}

export default OurJourney
