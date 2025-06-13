import { ArrowRight, ChevronDown } from 'lucide-react'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { HiArrowLongRight, HiGlobeAlt, HiOutlineRocketLaunch } from 'react-icons/hi2'
import { TbChartPieFilled } from "react-icons/tb";

import { Link } from 'react-router-dom'

import tecv from '../assets/images/tecv.png'
import partic from '../assets/images/partici.png'
import time1 from '../assets/images/timeclock1.png'
import time2 from '../assets/images/timecl2.png'
import binoc from '../assets/images/binoc.png'
import road from '../assets/images/road.png'

import OurPartners from '../components/OurPartners'
import Testimonials from '../components/Testimonials'

const OurJourney = () => {


    const milestones = [
    {
      year: "2007-2018",
      title: "Founder begins",
      description: "Founder begins tutoring individuals in programming and web development.",
      details:
        "Starting with one-on-one mentoring sessions, laying the foundation for what would become a global movement.",
    },
    {
      year: "2019",
      title: "Launch of Tecvinson",
      description: "Launch of Tecvinson Limited in London, United Kingdom.",
      details: "Official establishment of the company with a mission to democratize tech education worldwide.",
    },
    {
      year: "2020-2022",
      title: "Tecvinson Ltd",
      description: "Tecvinson Ltd established in Marina Lagos, Nigeria.",
      details: "Expanding operations to Africa, bringing world-class tech education to emerging markets.",
    },
    {
      year: "2023",
      title: "Official establishment",
      description: "Official establishment of Tecvinson Academy in Nigeria.",
      details: "Launching our flagship academy with comprehensive curriculum and industry partnerships.",
    },
    {
      year: "2023",
      title: "Significant expansion",
      description: "Significant expansion with an 11-month intensive boot camp.",
      details: "Introducing our most comprehensive program, transforming careers across multiple continents.",
    },
  ]

  return (
    <div className='bg-[#FAFAFA]'>
      <div className="bg-mint-50 min-h-screen">

        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Our Journey from Vision to Reality
          </h1>
          
        </div>
        
        {/* Three Column Layout */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">                

        {/* Vertical Line - Hidden on Mobile */}
           

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
            <div className="bg-[#FFE6E4] border-8 border-[#FFDBD8]  text-[#1E1E1E] py-4 sm:py-6 px-4 sm:px-5 rounded-xl w-full">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Founded on a clear vision of transforming tech education, Tecvinson Academy evolved from humble beginnings to becoming a global catalyst for tech career transformation. Our journey reflects a passionate commitment to bridging tech skill gaps worldwide, supported by strategic partnerships and community-focused initiatives.
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

        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Milestones</h2>

            <div className="relative">
                {/* Timeline connector */}
                <div
                className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 hidden md:block"
                style={{ transform: "translateY(-50%)" }}
                ></div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                    {/* Timeline connector dots */}
                    {index > 0 && (
                        <div
                        className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-gray-300 hidden md:block"
                        style={{ transform: "translateY(-50%)" }}
                        ></div>
                    )}

                    <div className="border-[#1E1E1E] border-4 rounded-lg bg-white p-4 h-full flex flex-col">
                        <div className="mb-4 text-center">
                        <span className="bg-[#1E1E1E] text-white text-lg font-bold px-10 py-2 rounded-full inline-block">
                            {milestone.year}
                        </span>
                        </div>
                        <p className="text-sm mb-4 flex-grow text-center">{milestone.description}</p>
                        <div className="text-center">
                        <button className="text-[#3B9790] text-sm flex items-center justify-center mx-auto bg-[#EDF8F7] px-7 py-3 rounded">
                            Show more <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            <div className="text-center mt-8">
                <button variant="link" className="text-[#3B9790] bg-[#FAFAFA] border-2 rounded-lg p-3 hover:text-blue-800 flex items-center mx-auto">
                Discover our Graduates' Success Stories <HiArrowLongRight className="ml-2 h-6 w-6" />
                </button>
            </div>
            </div>
      </section>      
      </div>


       
  
      {/* Support Section */}                
        
      </div>

      <section className="py-16 px-4 bg-[#C17B5C] w-full">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-xl md:text-4xl font-bold mb-12 text-white">Our Impact</h2>

    <div className="grid md:grid-cols-2 gap-8  max-w-7xl">
      {/* First Impact Card */}
      <div className="bg-rose-100 rounded-lg shadow-sm">
        <div className="p-3">
          <div className="flex items-center gap-6 ">
            <div className="flex-shrink-0 bg-white p-8 rounded-lg">
              <TbChartPieFilled
                className="h-24 w-24 text-[#B95F45]"
              />
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
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
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
              <img src={tecv} alt=""  />
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
                <img src={partic} alt="" className=" p-20" />
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
                src={time1}
                alt="Clock mechanism representing precision and technical education"
                width={200}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className='mt-0'>
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
                src={time2}
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
              <div >
                <img
                  src={binoc}
                  alt="Tecvinson Academy logo"                 
                  className=" object-cover "
                />
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
                src={road}
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