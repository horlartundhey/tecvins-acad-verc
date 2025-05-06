import React, { useEffect } from 'react'
import { ArrowRight} from "lucide-react"
import Metrics from "../components/Metrics";
import { DollarSign, Layout, Briefcase, Monitor, Code, Users } from "lucide-react";
import { HiArrowLongRight, HiBanknotes } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { RiBriefcase4Fill } from 'react-icons/ri';
import { PiCursorFill } from 'react-icons/pi';
import { MdLibraryBooks } from 'react-icons/md';
import { BsFillLaptopFill } from 'react-icons/bs';

const Support = () => {

  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, []);
  

  const collaborationAreas = [
    {
      icon: <HiBanknotes className="h-8 w-8 text-[#4ABDB4]" />,
      title: "Funding Support:",
      description: "Partner with us to fund our programs and help us train more students globally. Your financial support will enable us to scale our efforts, develop new courses, and provide necessary tools and resources to our students."
    },
    {
      icon: <PiCursorFill className="h-8 w-8 text-[#4ABDB4]" />,
      title: "Tools and Software Contributions:",
      description: "Help equip our students with industry-standard tools, software licenses, and platforms such as Jira, Miro, and other essential tech tools. This ensures our students are well-prepared for real-world projects."
    },
    {
      icon: <RiBriefcase4Fill className="h-8 w-8 text-[#4ABDB4]" />,
      title: "Job and Internship Opportunities:",
      description: "Collaborate with us to provide job placements, internships, and mentorship opportunities for our graduates. This not only empowers students but also gives partners access to a pool of skilled, motivated, and job-ready talent."
    },
    {
      icon: <MdLibraryBooks  className="h-8 w-8 text-[#4ABDB4]" />,
      title: "Specialized Training Initiatives:",
      description: "Work with us to design bespoke training programs tailored to your organization's specific talent needs, creating a talent pipeline directly aligned with your objectives."
    },
    {
      icon: <BsFillLaptopFill  className="h-8 w-8 text-[#4ABDB4]" />,
      title: "Technology and Infrastructure Support:",
      description: "Support us with cutting-edge hardware, cloud solutions, or infrastructure enhancements that improve the learning experience for our students."
    },
    {
      icon:<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.916 4.25C17.916 5.258 17.557 6.121 16.839 6.839C16.121 7.557 15.258 7.917 14.249 7.917C13.852 7.917 13.485 7.863 13.149 7.756C12.813 7.649 12.477 7.473 12.141 7.229C11.408 7.473 10.82 7.917 10.376 8.558C9.933 9.2 9.712 9.903 9.712 10.667H31.391C31.941 10.667 32.392 10.881 32.743 11.308C33.095 11.736 33.24 12.225 33.179 12.775L31.895 21.942C31.834 22.4 31.628 22.774 31.276 23.064C30.925 23.355 30.52 23.5 30.062 23.5H26.762L27.083 20.338C27.236 18.84 26.815 17.542 25.822 16.442C24.829 15.342 23.584 14.792 22.087 14.792H11.912C10.415 14.792 9.17 15.342 8.176 16.442C7.183 17.542 6.763 18.84 6.916 20.338L7.237 23.5H3.937C3.479 23.5 3.074 23.355 2.722 23.064C2.371 22.774 2.165 22.4 2.104 21.942L0.82 12.775C0.759 12.225 0.904 11.736 1.255 11.308C1.607 10.881 2.058 10.667 2.608 10.667H6C6 9.169 6.412 7.81 7.237 6.587C8.062 5.365 9.177 4.464 10.583 3.883C10.674 2.936 11.072 2.149 11.774 1.523C12.477 0.897 13.302 0.583 14.249 0.583C15.258 0.583 16.121 0.942 16.839 1.66C17.557 2.378 17.916 3.241 17.916 4.25ZM12.599 33.125H21.399C21.888 33.125 22.301 32.972 22.637 32.667C22.973 32.361 23.172 31.964 23.233 31.475L24.333 20.063C24.394 19.39 24.21 18.802 23.783 18.298C23.355 17.794 22.79 17.542 22.087 17.542H11.912C11.209 17.542 10.644 17.794 10.216 18.298C9.788 18.802 9.605 19.39 9.666 20.063L10.766 31.475C10.827 31.964 11.026 32.361 11.362 32.667C11.698 32.972 12.11 33.125 12.599 33.125Z" fill="#4ABDB4"/>
    </svg>,
      title: "Community Workshops and Hackathons:",
      description: "Sponsor workshops, events, or hackathons that foster creativity and innovation while engaging directly with a diverse and talented group of aspiring tech professionals."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#FAFAFA] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Support Tecvinson Academy
            <span className="text-gray-600 font-semibold ml-2 text-xl">—Transform Lives with IT Education</span>
          </h1>
        </div>


      {/* Banner Images - No gaps between images as shown in screenshot */}
      <div className="flex w-full">
        <div
          className="h-60 flex-1 bg-cover bg-center"
          style={{ backgroundImage: "url('https://res.cloudinary.com/kamisama/image/upload/v1746455842/Image_Container_gjpngs.png')" }}
        >
        </div>       
      </div>

      {/* Support Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Donate */}
          <div className="bg-white rounded-lg p-8 flex flex-col items-center text-center border border-[#E3E3E3]">
            <div className="w-12 h-12 mb-10">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.584 72.75C45.1951 72.9166 45.9034 72.9861 46.709 72.9583C47.5145 72.9305 48.1951 72.8055 48.7507 72.5833L73.334 63.3333C73.334 61.4444 72.6673 59.8611 71.334 58.5833C70.0007 57.3055 68.4451 56.6666 66.6673 56.6666H43.834C43.6673 56.6666 43.4729 56.6527 43.2507 56.625C43.0284 56.5972 42.8618 56.5555 42.7507 56.5L37.834 54.75C37.3895 54.5833 37.084 54.3055 36.9173 53.9166C36.7507 53.5277 36.7229 53.1111 36.834 52.6666C36.9451 52.2777 37.2229 51.9722 37.6673 51.75C38.1118 51.5277 38.5562 51.5 39.0007 51.6666L42.7507 53.0833C42.9729 53.1944 43.1534 53.2638 43.2923 53.2916C43.4312 53.3194 43.6395 53.3333 43.9173 53.3333H52.6673C53.7229 53.3333 54.6534 52.9722 55.459 52.25C56.2645 51.5277 56.6673 50.5833 56.6673 49.4166C56.6673 48.6388 56.4312 47.8888 55.959 47.1666C55.4868 46.4444 54.8618 45.9444 54.084 45.6666L31.0007 37.0833C30.6118 36.9722 30.2229 36.875 29.834 36.7916C29.4451 36.7083 29.0562 36.6666 28.6673 36.6666H23.334V66.75L44.584 72.75ZM3.33398 66.6666C3.33398 68.5 3.98676 70.0694 5.29232 71.375C6.59787 72.6805 8.16732 73.3333 10.0007 73.3333C11.834 73.3333 13.4034 72.6805 14.709 71.375C16.0145 70.0694 16.6673 68.5 16.6673 66.6666V43.3333C16.6673 41.5 16.0145 39.9305 14.709 38.625C13.4034 37.3194 11.834 36.6666 10.0007 36.6666C8.16732 36.6666 6.59787 37.3194 5.29232 38.625C3.98676 39.9305 3.33398 41.5 3.33398 43.3333V66.6666ZM53.334 40.6666C52.5007 40.6666 51.6812 40.5138 50.8757 40.2083C50.0701 39.9027 49.334 39.4444 48.6673 38.8333L39.5007 29.8333C37.7784 28.1666 36.3201 26.3194 35.1257 24.2916C33.9312 22.2638 33.334 20.0555 33.334 17.6666C33.334 14.6111 34.4034 12.0138 36.5423 9.87496C38.6812 7.73607 41.2784 6.66663 44.334 6.66663C46.1118 6.66663 47.7784 7.04163 49.334 7.79163C50.8895 8.54163 52.2229 9.55551 53.334 10.8333C54.4451 9.55551 55.7784 8.54163 57.334 7.79163C58.8895 7.04163 60.5562 6.66663 62.334 6.66663C65.3895 6.66663 67.9868 7.73607 70.1257 9.87496C72.2645 12.0138 73.334 14.6111 73.334 17.6666C73.334 20.0555 72.7507 22.2638 71.584 24.2916C70.4173 26.3194 68.9729 28.1666 67.2507 29.8333L58.0007 38.8333C57.334 39.4444 56.5979 39.9027 55.7923 40.2083C54.9868 40.5138 54.1673 40.6666 53.334 40.6666Z" fill="#00BC85"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4">Donate</h2>
            <p className="text-[#001533] mb-6">Help fund scholarships and expand learning opportunities.</p>
            <div className="mt-auto">
              <button className="inline-flex items-center justify-center border bg-[#FAFAFA] border-gray-300 px-10 py-2 rounded-xl font-semibold text-teal-600 hover:bg-teal-50 transition-colors w-full">
                <Link to="/donate" className="flex items-center">
                  Donate Now <HiArrowLongRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
            </div>
          </div>

          {/* Become a Trainer */}
          <div className="bg-white rounded-xl p-8 flex flex-col items-center text-center border border-[#E3E3E3]">
            <div className="w-12 h-12 mb-10">
              <svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M63 43.3333V23.6666L36.1667 38.25C35.1667 38.8055 34.1111 39.0833 33 39.0833C31.8889 39.0833 30.8333 38.8055 29.8333 38.25L1.66667 22.9166C1.05556 22.5833 0.625 22.1666 0.375 21.6666C0.125 21.1666 0 20.6111 0 20C0 19.3888 0.125 18.8333 0.375 18.3333C0.625 17.8333 1.05556 17.4166 1.66667 17.0833L29.8333 1.74996C30.3333 1.47218 30.8472 1.26385 31.375 1.12496C31.9028 0.98607 32.4444 0.916626 33 0.916626C33.5556 0.916626 34.0972 0.98607 34.625 1.12496C35.1528 1.26385 35.6667 1.47218 36.1667 1.74996L67.9167 19.0833C68.4722 19.3611 68.9028 19.7638 69.2083 20.2916C69.5139 20.8194 69.6667 21.3888 69.6667 22V43.3333C69.6667 44.2777 69.3472 45.0694 68.7083 45.7083C68.0694 46.3472 67.2778 46.6666 66.3333 46.6666C65.3889 46.6666 64.5972 46.3472 63.9583 45.7083C63.3194 45.0694 63 44.2777 63 43.3333ZM29.8333 58.25L13.1667 49.25C12.0556 48.6389 11.1944 47.8055 10.5833 46.75C9.97222 45.6944 9.66667 44.5555 9.66667 43.3333V30.6666L29.8333 41.5833C30.8333 42.1389 31.8889 42.4166 33 42.4166C34.1111 42.4166 35.1667 42.1389 36.1667 41.5833L56.3333 30.6666V43.3333C56.3333 44.5555 56.0278 45.6944 55.4167 46.75C54.8056 47.8055 53.9444 48.6389 52.8333 49.25L36.1667 58.25C35.6667 58.5277 35.1528 58.7361 34.625 58.875C34.0972 59.0139 33.5556 59.0833 33 59.0833C32.4444 59.0833 31.9028 59.0139 31.375 58.875C30.8472 58.7361 30.3333 58.5277 29.8333 58.25Z" fill="#FF6F61"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4">Become a Trainer</h2>
            <p className="text-[#001533] mb-6">Share your expertise and mentor aspiring tech professionals.</p>
            <div className="mt-auto">
              <button className="inline-flex items-center justify-center border bg-[#FAFAFA] border-gray-300 px-10 py-2 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-colors w-full">
                <Link to="/trainer" className="flex items-center">
                    Become a Trainer <HiArrowLongRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
            </div>
          </div>

          {/* Partner With Us */}
          <div className="bg-white rounded-lg p-8 flex flex-col items-center text-center border border-[#E3E3E3]">
            <div className="w-12 h-12 mb-10">
            <svg width="68" height="61" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.333 61C33.389 61 32.597 60.681 31.958 60.042C31.319 59.403 31 58.611 31 57.667C31 57.278 31.083 56.875 31.25 56.458C31.417 56.042 31.667 55.667 32 55.333L46.25 41.083C46.583 40.75 46.75 40.347 46.75 39.875C46.75 39.403 46.583 39 46.25 38.667C45.917 38.333 45.514 38.181 45.042 38.208C44.569 38.236 44.167 38.417 43.833 38.75L29.667 52.917C29.333 53.25 28.972 53.5 28.583 53.667C28.194 53.833 27.778 53.917 27.333 53.917C26.389 53.917 25.597 53.597 24.958 52.958C24.319 52.319 24 51.528 24 50.583C24 50.028 24.083 49.569 24.25 49.208C24.417 48.847 24.639 48.528 24.917 48.25L39.167 34C39.5 33.667 39.667 33.278 39.667 32.833C39.667 32.389 39.5 32 39.167 31.667C38.833 31.333 38.444 31.167 38 31.167C37.556 31.167 37.167 31.333 36.833 31.667L22.583 45.833C22.25 46.167 21.889 46.417 21.5 46.583C21.111 46.75 20.667 46.833 20.167 46.833C19.278 46.833 18.5 46.5 17.833 45.833C17.167 45.167 16.833 44.389 16.833 43.5C16.833 43.056 16.917 42.639 17.083 42.25C17.25 41.861 17.5 41.5 17.833 41.167L32 27C32.333 26.667 32.5 26.264 32.5 25.792C32.5 25.319 32.333 24.917 32 24.583C31.667 24.25 31.278 24.083 30.833 24.083C30.389 24.083 30 24.25 29.667 24.583L15.5 38.833C15.222 39.111 14.889 39.333 14.5 39.5C14.111 39.667 13.639 39.75 13.083 39.75C12.139 39.75 11.347 39.431 10.708 38.792C10.069 38.153 9.75 37.361 9.75 36.417C9.75 35.972 9.833 35.556 10 35.167C10.167 34.778 10.417 34.417 10.75 34.083L27.083 17.75C27.694 17.139 28.458 16.861 29.375 16.917C30.292 16.972 31.056 17.306 31.667 17.917L41.833 28.083C42.444 28.694 43.167 29.181 44 29.542C44.833 29.903 45.667 30.083 46.5 30.083C48.278 30.083 49.833 29.458 51.167 28.208C52.5 26.958 53.167 25.361 53.167 23.417C53.167 22.639 53.028 21.833 52.75 21C52.472 20.167 51.972 19.389 51.25 18.667L39.833 7.25C39.222 6.639 38.819 5.972 38.625 5.25C38.431 4.528 38.528 3.833 38.917 3.167C39.417 2.333 40.056 1.722 40.833 1.333C41.611 0.944 42.472 0.75 43.417 0.75C44.583 0.75 45.778 1.028 47 1.583C48.222 2.139 49.333 2.917 50.333 3.917L64.417 18.083C65.417 19.083 66.153 20.194 66.625 21.417C67.097 22.639 67.333 24.056 67.333 25.667C67.333 26.778 67.083 27.903 66.583 29.042C66.083 30.181 65.361 31.222 64.417 32.167L36.667 60C36.222 60.444 35.833 60.722 35.5 60.833C35.167 60.944 34.778 61 34.333 61ZM3.667 31.417C2.611 30.639 1.819 29.708 1.292 28.625C0.764 27.542 0.5 26.389 0.5 25.167C0.5 23.889 0.764 22.639 1.292 21.417C1.819 20.194 2.583 19.083 3.583 18.083L17.667 3.917C18.611 2.972 19.653 2.25 20.792 1.75C21.931 1.25 23.139 1 24.417 1C25.806 1 27.153 1.25 28.458 1.75C29.764 2.25 30.889 2.972 31.833 3.917L48.917 21C49.194 21.278 49.431 21.625 49.625 22.042C49.819 22.458 49.917 22.889 49.917 23.333C49.917 24.278 49.597 25.069 48.958 25.708C48.319 26.347 47.528 26.667 46.583 26.667C46.139 26.667 45.708 26.569 45.292 26.375C44.875 26.181 44.528 25.944 44.25 25.667L34 15.5C32.722 14.222 31.153 13.583 29.292 13.583C27.431 13.583 25.861 14.222 24.583 15.5L8.917 31.167C8.194 31.889 7.347 32.264 6.375 32.292C5.403 32.319 4.5 32.028 3.667 31.417Z" fill="#807CFF"/>
            </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4">Partner With Us</h2>
            <p className="text-[#001533] mb-6">Collaborate with us to enhance training programs and initiatives.</p>
            <div className="mt-auto">
              <button className="inline-flex items-center justify-center border bg-[#FAFAFA] border-gray-300 px-10 py-2 rounded-xl font-semibold text-purple-600 hover:bg-purple-50 transition-colors w-full">
                <Link to="/partner" className="flex items-center">
                  Partner With Us <HiArrowLongRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Metrics />
      </div>

        <div className=" bg-white w-full">
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>

          
            <h2 className="text-2xl font-bold text-gray-800 mb-10">Key Collaboration Areas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {collaborationAreas.map((area, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {area.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{area.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Donate */}
          <div className="bg-white rounded-lg p-8 flex flex-col items-center text-center border border-[#E3E3E3]">
            <div className="w-12 h-12 mb-10">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.584 72.75C45.1951 72.9166 45.9034 72.9861 46.709 72.9583C47.5145 72.9305 48.1951 72.8055 48.7507 72.5833L73.334 63.3333C73.334 61.4444 72.6673 59.8611 71.334 58.5833C70.0007 57.3055 68.4451 56.6666 66.6673 56.6666H43.834C43.6673 56.6666 43.4729 56.6527 43.2507 56.625C43.0284 56.5972 42.8618 56.5555 42.7507 56.5L37.834 54.75C37.3895 54.5833 37.084 54.3055 36.9173 53.9166C36.7507 53.5277 36.7229 53.1111 36.834 52.6666C36.9451 52.2777 37.2229 51.9722 37.6673 51.75C38.1118 51.5277 38.5562 51.5 39.0007 51.6666L42.7507 53.0833C42.9729 53.1944 43.1534 53.2638 43.2923 53.2916C43.4312 53.3194 43.6395 53.3333 43.9173 53.3333H52.6673C53.7229 53.3333 54.6534 52.9722 55.459 52.25C56.2645 51.5277 56.6673 50.5833 56.6673 49.4166C56.6673 48.6388 56.4312 47.8888 55.959 47.1666C55.4868 46.4444 54.8618 45.9444 54.084 45.6666L31.0007 37.0833C30.6118 36.9722 30.2229 36.875 29.834 36.7916C29.4451 36.7083 29.0562 36.6666 28.6673 36.6666H23.334V66.75L44.584 72.75ZM3.33398 66.6666C3.33398 68.5 3.98676 70.0694 5.29232 71.375C6.59787 72.6805 8.16732 73.3333 10.0007 73.3333C11.834 73.3333 13.4034 72.6805 14.709 71.375C16.0145 70.0694 16.6673 68.5 16.6673 66.6666V43.3333C16.6673 41.5 16.0145 39.9305 14.709 38.625C13.4034 37.3194 11.834 36.6666 10.0007 36.6666C8.16732 36.6666 6.59787 37.3194 5.29232 38.625C3.98676 39.9305 3.33398 41.5 3.33398 43.3333V66.6666ZM53.334 40.6666C52.5007 40.6666 51.6812 40.5138 50.8757 40.2083C50.0701 39.9027 49.334 39.4444 48.6673 38.8333L39.5007 29.8333C37.7784 28.1666 36.3201 26.3194 35.1257 24.2916C33.9312 22.2638 33.334 20.0555 33.334 17.6666C33.334 14.6111 34.4034 12.0138 36.5423 9.87496C38.6812 7.73607 41.2784 6.66663 44.334 6.66663C46.1118 6.66663 47.7784 7.04163 49.334 7.79163C50.8895 8.54163 52.2229 9.55551 53.334 10.8333C54.4451 9.55551 55.7784 8.54163 57.334 7.79163C58.8895 7.04163 60.5562 6.66663 62.334 6.66663C65.3895 6.66663 67.9868 7.73607 70.1257 9.87496C72.2645 12.0138 73.334 14.6111 73.334 17.6666C73.334 20.0555 72.7507 22.2638 71.584 24.2916C70.4173 26.3194 68.9729 28.1666 67.2507 29.8333L58.0007 38.8333C57.334 39.4444 56.5979 39.9027 55.7923 40.2083C54.9868 40.5138 54.1673 40.6666 53.334 40.6666Z" fill="#00BC85"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4">Donate</h2>
            <p className="text-[#001533] mb-6">Help fund scholarships and expand learning opportunities.</p>
            <div className="mt-auto">
              <button className="inline-flex items-center justify-center border bg-[#FAFAFA] border-gray-300 px-10 py-2 rounded-xl font-semibold text-teal-600 hover:bg-teal-50 transition-colors w-full">
                <Link to="/donate" className="flex items-center">
                  Donate Now <HiArrowLongRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
            </div>
          </div>

          {/* Become a Trainer */}
          <div className="bg-white rounded-xl p-8 flex flex-col items-center text-center border border-[#E3E3E3]">
            <div className="w-12 h-12 mb-10">
              <svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M63 43.3333V23.6666L36.1667 38.25C35.1667 38.8055 34.1111 39.0833 33 39.0833C31.8889 39.0833 30.8333 38.8055 29.8333 38.25L1.66667 22.9166C1.05556 22.5833 0.625 22.1666 0.375 21.6666C0.125 21.1666 0 20.6111 0 20C0 19.3888 0.125 18.8333 0.375 18.3333C0.625 17.8333 1.05556 17.4166 1.66667 17.0833L29.8333 1.74996C30.3333 1.47218 30.8472 1.26385 31.375 1.12496C31.9028 0.98607 32.4444 0.916626 33 0.916626C33.5556 0.916626 34.0972 0.98607 34.625 1.12496C35.1528 1.26385 35.6667 1.47218 36.1667 1.74996L67.9167 19.0833C68.4722 19.3611 68.9028 19.7638 69.2083 20.2916C69.5139 20.8194 69.6667 21.3888 69.6667 22V43.3333C69.6667 44.2777 69.3472 45.0694 68.7083 45.7083C68.0694 46.3472 67.2778 46.6666 66.3333 46.6666C65.3889 46.6666 64.5972 46.3472 63.9583 45.7083C63.3194 45.0694 63 44.2777 63 43.3333ZM29.8333 58.25L13.1667 49.25C12.0556 48.6389 11.1944 47.8055 10.5833 46.75C9.97222 45.6944 9.66667 44.5555 9.66667 43.3333V30.6666L29.8333 41.5833C30.8333 42.1389 31.8889 42.4166 33 42.4166C34.1111 42.4166 35.1667 42.1389 36.1667 41.5833L56.3333 30.6666V43.3333C56.3333 44.5555 56.0278 45.6944 55.4167 46.75C54.8056 47.8055 53.9444 48.6389 52.8333 49.25L36.1667 58.25C35.6667 58.5277 35.1528 58.7361 34.625 58.875C34.0972 59.0139 33.5556 59.0833 33 59.0833C32.4444 59.0833 31.9028 59.0139 31.375 58.875C30.8472 58.7361 30.3333 58.5277 29.8333 58.25Z" fill="#FF6F61"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4">Become a Trainer</h2>
            <p className="text-[#001533] mb-6">Share your expertise and mentor aspiring tech professionals.</p>
            <div className="mt-auto">
              <button className="inline-flex items-center justify-center border bg-[#FAFAFA] border-gray-300 px-10 py-2 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-colors w-full">
                <Link to="/trainer" className="flex items-center">
                    Become a Trainer <HiArrowLongRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
            </div>
          </div>

          {/* Partner With Us */}
          <div className="bg-white rounded-lg p-8 flex flex-col items-center text-center border border-[#E3E3E3]">
            <div className="w-12 h-12 mb-10">
            <svg width="68" height="61" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.333 61C33.389 61 32.597 60.681 31.958 60.042C31.319 59.403 31 58.611 31 57.667C31 57.278 31.083 56.875 31.25 56.458C31.417 56.042 31.667 55.667 32 55.333L46.25 41.083C46.583 40.75 46.75 40.347 46.75 39.875C46.75 39.403 46.583 39 46.25 38.667C45.917 38.333 45.514 38.181 45.042 38.208C44.569 38.236 44.167 38.417 43.833 38.75L29.667 52.917C29.333 53.25 28.972 53.5 28.583 53.667C28.194 53.833 27.778 53.917 27.333 53.917C26.389 53.917 25.597 53.597 24.958 52.958C24.319 52.319 24 51.528 24 50.583C24 50.028 24.083 49.569 24.25 49.208C24.417 48.847 24.639 48.528 24.917 48.25L39.167 34C39.5 33.667 39.667 33.278 39.667 32.833C39.667 32.389 39.5 32 39.167 31.667C38.833 31.333 38.444 31.167 38 31.167C37.556 31.167 37.167 31.333 36.833 31.667L22.583 45.833C22.25 46.167 21.889 46.417 21.5 46.583C21.111 46.75 20.667 46.833 20.167 46.833C19.278 46.833 18.5 46.5 17.833 45.833C17.167 45.167 16.833 44.389 16.833 43.5C16.833 43.056 16.917 42.639 17.083 42.25C17.25 41.861 17.5 41.5 17.833 41.167L32 27C32.333 26.667 32.5 26.264 32.5 25.792C32.5 25.319 32.333 24.917 32 24.583C31.667 24.25 31.278 24.083 30.833 24.083C30.389 24.083 30 24.25 29.667 24.583L15.5 38.833C15.222 39.111 14.889 39.333 14.5 39.5C14.111 39.667 13.639 39.75 13.083 39.75C12.139 39.75 11.347 39.431 10.708 38.792C10.069 38.153 9.75 37.361 9.75 36.417C9.75 35.972 9.833 35.556 10 35.167C10.167 34.778 10.417 34.417 10.75 34.083L27.083 17.75C27.694 17.139 28.458 16.861 29.375 16.917C30.292 16.972 31.056 17.306 31.667 17.917L41.833 28.083C42.444 28.694 43.167 29.181 44 29.542C44.833 29.903 45.667 30.083 46.5 30.083C48.278 30.083 49.833 29.458 51.167 28.208C52.5 26.958 53.167 25.361 53.167 23.417C53.167 22.639 53.028 21.833 52.75 21C52.472 20.167 51.972 19.389 51.25 18.667L39.833 7.25C39.222 6.639 38.819 5.972 38.625 5.25C38.431 4.528 38.528 3.833 38.917 3.167C39.417 2.333 40.056 1.722 40.833 1.333C41.611 0.944 42.472 0.75 43.417 0.75C44.583 0.75 45.778 1.028 47 1.583C48.222 2.139 49.333 2.917 50.333 3.917L64.417 18.083C65.417 19.083 66.153 20.194 66.625 21.417C67.097 22.639 67.333 24.056 67.333 25.667C67.333 26.778 67.083 27.903 66.583 29.042C66.083 30.181 65.361 31.222 64.417 32.167L36.667 60C36.222 60.444 35.833 60.722 35.5 60.833C35.167 60.944 34.778 61 34.333 61ZM3.667 31.417C2.611 30.639 1.819 29.708 1.292 28.625C0.764 27.542 0.5 26.389 0.5 25.167C0.5 23.889 0.764 22.639 1.292 21.417C1.819 20.194 2.583 19.083 3.583 18.083L17.667 3.917C18.611 2.972 19.653 2.25 20.792 1.75C21.931 1.25 23.139 1 24.417 1C25.806 1 27.153 1.25 28.458 1.75C29.764 2.25 30.889 2.972 31.833 3.917L48.917 21C49.194 21.278 49.431 21.625 49.625 22.042C49.819 22.458 49.917 22.889 49.917 23.333C49.917 24.278 49.597 25.069 48.958 25.708C48.319 26.347 47.528 26.667 46.583 26.667C46.139 26.667 45.708 26.569 45.292 26.375C44.875 26.181 44.528 25.944 44.25 25.667L34 15.5C32.722 14.222 31.153 13.583 29.292 13.583C27.431 13.583 25.861 14.222 24.583 15.5L8.917 31.167C8.194 31.889 7.347 32.264 6.375 32.292C5.403 32.319 4.5 32.028 3.667 31.417Z" fill="#807CFF"/>
            </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4">Partner With Us</h2>
            <p className="text-[#001533] mb-6">Collaborate with us to enhance training programs and initiatives.</p>
            <div className="mt-auto">
              <button className="inline-flex items-center justify-center border bg-[#FAFAFA] border-gray-300 px-10 py-2 rounded-xl font-semibold text-purple-600 hover:bg-purple-50 transition-colors w-full">
                <Link to="/partner" className="flex items-center">
                  Partner With Us <HiArrowLongRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Support