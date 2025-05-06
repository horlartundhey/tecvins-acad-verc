import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Faq from "../components/Faq"
import { FiPenTool } from "react-icons/fi"
import { HiArrowLongRight } from "react-icons/hi2"

const Creative_des = () => {
    const courses = [
        {
          id: 1,
          title: "UI/UX Fundamentals",
          description:
            "Explore the core principles of user interface and user experience design in this foundational course. Learn how to create intuitive, visually appealing designs that prioritize usability, accessibility, and user satisfaction, using industry-standard tools and techniques.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745320493/uiux_wv40sp.png",
        },
        {
          id: 2,
          title: "Graphic Design",
          description:
            "Unleash your creativity with this comprehensive course on graphic design. Master essential design principles, typography, color theory, and visual storytelling to craft compelling visuals for print and digital platforms, using leading design software.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745320494/graphicdes_eqmzqb.png",
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
          <li className="text-gray-500">Creative Design Courses</li>
        </ol>
      </nav>
    </div>

    {/* Hero Section */}
    <div className="relative">
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/kamisama/image/upload/v1730728313/image_s5r5j7.png"
          alt="Creative Design Courses"
          className="w-full h-[16rem] object-cover bannner-posit"
        />
        <div className="absolute inset-0 bg-black opacity-70 mix-blend-multiply"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[2.7rem]">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
          <FiPenTool className="text-[#FF6F61] w-6 h-6"  />
        </div>
        <h1 className="text-4xl font-semibold text-white mb-4">Creative Design Courses</h1>
        <p className="text-xl text-white font-normal max-w-3xl">
            Courses focused on user experience, user interface design, and <br /> creative design tools.
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
          object-position: center 42%;
     }
     `}</style> 

     <Faq />
  </div>
  )
}

export default Creative_des