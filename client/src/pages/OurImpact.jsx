"use client"
import { ArrowRight, Mail, Phone } from "lucide-react"
import { HiArrowLongRight, HiEnvelope, HiOutlineRocketLaunch, HiPhone } from "react-icons/hi2"
import { Link } from "react-router-dom"
import HireTalent from "./HireTalent"
import { useEffect } from "react"
import Ourimpac from "../components/Ourimpac"
import Impactvi from "../components/Impactvi"

const OurImpact = () => {
  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, []);

  const featuredProjects = [
    {
      id: 1,
      title: "Event Management System - D'EventMatcha",
      description:
        "A digital platform that brings together event planners, vendors, and customers to simplify event planning in Nigeria. The system offers comprehensive event management, vendor bookings, and streamline logistics for any event type.",
      image: "https://res.cloudinary.com/kamisama/image/upload/v1751725901/matcha-even_tl2qxl.svg",
      link: "/event-management-system",
      backgroundColor: "bg-white",
    },
    {
      id: 2,
      title: "Language Learning App - LinguAfrika",
      description:
        "LinguAfrika is an AI-powered platform designed to preserve and promote African languages. Offering culturally rooted, personalized learning experiences, ideal for diaspora Africans, tourists, and language enthusiasts.",
      image: "https://res.cloudinary.com/kamisama/image/upload/v1751726040/image_v3co0i.svg",
      link: "/linguafrika",
      backgroundColor: "bg-gray-100",
    },
    {
      id: 3,
      title: "Real Estate Application - Imovelle",
      description:
        "Imovelle is a smart real estate platform built for the Nigerian market. It helps users seamlessly discover, rent, or manage properties while ensuring transparency, verified listings, and easy communication with agents and landlords.",
      image: "https://res.cloudinary.com/kamisama/image/upload/v1751726169/imovelle_tmkc1h.svg",
      link: "/imovelle",
      backgroundColor: "bg-gray-100",
    },
    {
      id: 4,
      title: "Learning Management System - Studat",
      description:
        "Studat is a personalized learning platform for schools across all levels in Nigeria - from Nursery to University. It supports students, tutors, and administrators through AI-driven content, assessments, and classroom management tools.",
      image: "https://res.cloudinary.com/kamisama/image/upload/v1751726356/lms-studa_kzloc8.svg",
      link: "/studat",
      backgroundColor: "bg-white",
    },
    {
      id: 5,
      title: " AI-Powered Solutions",
      description:
        "A suite of AI-driven tools created to solve real-world problems in areas like education, productivity, and customer support. These projects demonstrate how Tecvinson students apply GenAI, machine learning, and automation to create scalable impact.",
      image: "https://res.cloudinary.com/kamisama/image/upload/v1751726360/ai-powered_wwtnqa.svg",
      link: "/ai-powered",
      backgroundColor: "bg-white",
    },
    {
      id: 6,
      title: "",
      description:
        "",
      image: "",
      link: "",
      backgroundColor: "bg-gray-100",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50/50 w-full">
      {/* Header Section with Green Faded Blur */}
      <div className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden container mx-auto">
        {/* Green Faded Blur Background */}
        {/* <div className="absolute inset-0">
          <div className="absolute top-0 left-[10%] sm:left-[14%] w-48 sm:w-80 lg:w-96 h-48 sm:h-80 lg:h-96 bg-green-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-32 sm:w-60 lg:w-80 h-32 sm:h-60 lg:h-80 bg-emerald-300/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-36 sm:w-56 lg:w-72 h-36 sm:h-56 lg:h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        </div> */}

        {/* Content */}
        {/* <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Ideas to Execution: See What Our Students Are Building
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-none lg:max-w-6xl leading-relaxed">
            At Tecvinson Academy, our students don't just learn, they build. Through hands-on learning and real-world
            challenges, they develop practical, impactful solutions that address everyday problems across industries.
            This page showcases the remarkable work being created by our learners across Product Design, Development,
            Management, and beyond.
          </p>
        </div> */}

        <Ourimpac />
      </div>

      {/* Featured Projects Section */}
      <div className=" font-montserrat">
        <div className="w-full mx-auto">
          <div className="container mx-auto px-4 sm:px-2 lg:px-8">
            <h2 className="text-[32px] sm:text-3xl font-semibold text-gray-900 mb-8 sm:mb-12 lg:mb-20">Projects & Stories</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className={` w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-52 py-6 sm:py-8 ${project.backgroundColor}`}
              >
                <div className="mx-auto lg:max-w-none max-w-[96rem]">
                  {/* Project Title */}
                  {project.title && (
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1E1E1E] mb-3 sm:mb-4 leading-tight">
                      {project.title}
                    </h3>
                  )}

                  {/* Project Description */}
                  {project.description && (
                    <p className="text-[#5E5E5E] text-base sm:text-lg lg:text-xl font-normal leading-6 sm:leading-7 mb-6 sm:mb-8 lg:mb-12">
                      {project.description}
                    </p>
                  )}

                  {/* Project Image */}
                  <div className="mb-6 sm:mb-8 flex justify-center lg:justify-start">
                    {project.image && (
                      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-auto object-contain"
                          priority={project.id <= 2}
                        />
                      </div>
                    )}
                  </div>

                  {/* Read More Link */}
                  <div className="flex justify-center lg:justify-start">
                    {project.link && (
                      <Link
                        to={project.link}
                        className="text-[#3B9790] hover:text-[#2d7a74] text-sm font-medium flex border border-[#C8C8C8] bg-[#FAFAFA] px-3 sm:px-4 rounded-2xl py-2.5 sm:py-3 items-center group transition-all duration-200 hover:border-[#3B9790] hover:shadow-sm"
                      >
                        <span className="whitespace-nowrap">Read More About This Solution</span>
                        <HiArrowLongRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>        
      </div>    

      <Impactvi />

      <div className="mb-12 font-montserrat">
        <div className="bg-[#1E4C48] p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#EDF8F7] mb-4">Support Us in Making Impact</h3>
          <p className="text-[#EDF8F7] mb-3 text-sm font-normal">Connect with us through any of these channels.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[4.5rem] max-w-4xl mx-auto px-4">
            {/* Call Us card */}
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-auto md:max-w-none">
              <div className="w-12 h-12 bg-[#DBF2F0] rounded-md flex items-center justify-center mb-4">
                <HiPhone className="w-6 h-6 text-[#3B9790]" />
              </div>
              <div className="text-left">
                <h4 className="text-[20px] font-semibold text-[#0F2624] mb-2">Call Us</h4>
                <a href="tel:+46703699614" className="text-[#2C716C] hover:text-[#00a073] text-left text-[16px] font-medium transition-colors">
                  +46 703 699 614
                </a>
              </div>
            </div>

            {/* Email Us card */}
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-auto md:max-w-none">
              <div className="w-12 h-12 bg-[#DBF2F0] rounded-md flex items-center justify-center mb-4">
                <HiEnvelope className="w-6 h-6 text-[#3B9790]" />
              </div>
              <div className="text-left">
              <h4 className="text-[20px] font-semibold text-[#0F2624] mb-2 text-left">Email Us</h4>
              <a
                href="mailto:info@tecvinsonacademy.com"
                className="text-[#2C716C] hover:text-[#00a073] text-[16px] text-left font-medium transition-colors break-all sm:break-normal"
              >
                info@tecvinsonacademy.com
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
    </>
  )
}

export default OurImpact
