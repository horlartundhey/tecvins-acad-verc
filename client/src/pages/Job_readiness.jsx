import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Faq from "../components/Faq"
import { HiArrowLongRight, HiOutlineBriefcase } from "react-icons/hi2"

const Job_readiness = () => {
    const courses = [
        {
          id: 1,
          title: "Job Application Strategies",
          description:
            "This course equips you with the skills to create standout resumes, cover letters, and portfolios that get noticed by hiring managers. Learn how to tailor your applications for different roles, maximize your chances of getting interviews, and build a compelling personal brand.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745323241/job-application_ne1fyg.png",
        },
        {
          id: 2,
          title: "Interview Techniques",
          description:
            "Master the art of acing job interviews with practical strategies and tips. From preparing for common questions to managing interview anxiety, this course teaches you how to confidently communicate your skills and experience to impress potential employers.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745323242/intervi_buulyh.png",
        },
        {
          id: 3,
          title: "Professional Communication",
          description:
            "Develop strong communication skills crucial for success in any professional environment. This course covers written and verbal communication techniques, including email etiquette, presentations, and effective collaboration, helping you build meaningful relationships and thrive in the workplace.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745323242/inter_bnnepy.png",
        },
      ]
    
      return (
        <div className="bg-white min-h-screen">
          {/* Breadcrumb Navigation */}
          <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="text-sm font-medium mb-8">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link to="/courses" className="text-teal-600 hover:text-teal-800">
                    Courses
                  </Link>
                  <span className="mx-2 text-gray-400">/</span>
                </li>
                <li className="text-gray-500">Job Readiness Courses</li>
              </ol>
            </nav>
          </div>
    
          {/* Hero Section */}
          <div className="relative">
            <div className="absolute inset-0">
              <img
                src="https://res.cloudinary.com/kamisama/image/upload/t_crop/v1730728323/image_tp2hyp.png"
                alt="Job Readiness Courses"
                className="w-full h-[16rem] object-cover bannner-posit"
              />
              <div className="absolute inset-0 bg-black opacity-70 mix-blend-multiply"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[2.7rem]">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                <HiOutlineBriefcase className="w-6 h-6 text-[#DEA600]"/>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Job Readiness Courses</h1>
              <p className="text-xl text-white max-w-3xl">
              Courses on CV writing, interview preparation, and workplace communication skills.
              </p>
            </div>
          </div>
    
          {/* Course Listings */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
            <div className="space-y-12 ">
              {courses.map((course) => (
                        <div key={course.id} className="flex flex-col md:flex-row gap-8 items-center border-b border-[#E3E3E3] pb-10">
                          <div className="md:w-1/4">
                            <img
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="w-full h-[250px] rounded-lg shadow-md"
                            />
                          </div>
                          <div className="md:w-3/4">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                              {course.id}. {course.title}
                            </h2>
                            <p className="text-gray-600 mb-4 pr-20">{course.description}</p>
                            <Link
                              to='/enrollment'
                              className="inline-flex items-center px-4 py-2 border  text-sm font-medium rounded-lg shadow-sm text-[#3B9790] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                              Begin your learning journey
                              <HiArrowLongRight className="ml-2 h-6 w-6 " />
                            </Link>
                          </div>
                        </div>
                      ))}
            </div>
    
            {/* Bottom CTA */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-between  pt-10">
                    <div className="flex items-center mb-4 sm:mb-0">
                      <p className="text-2xl font-medium text-gray-800 mr-2">Not sure which course is best for you?</p>
                      <HiArrowLongRight className="h-10 w-10 text-[#1E1E1E]" />
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center px-5 py-2 border border-[#C8C8C8] text-base font-medium rounded-lg text-teal-600 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Reach Out to Us
                      <HiArrowLongRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
          </div>
           <style jsx>{`
            .bannner-posit{
                object-position: center 14%;
           }
           `}</style> 
    
           <Faq />
        </div>
      )
}

export default Job_readiness