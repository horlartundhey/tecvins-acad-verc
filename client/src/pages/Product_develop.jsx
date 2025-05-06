import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Faq from "../components/Faq"
import { HiArrowLongRight, HiCodeBracket } from "react-icons/hi2"

const Product_develop = () => {
    const courses = [
        {
          id: 1,
          title: "Backend Development (Python)",
          description:
            "Learn Python from the ground up in this hands-on course designed for beginners and aspiring developers. Master the fundamentals of programming, data structures, and problem-solving while exploring Python's versatility in web development, data analysis, and automation.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321860/pytho_qk9q5v.png",
        },
        {
          id: 2,
          title: "Frontend Development",
          description:
            "Build stunning, responsive web interfaces with this course on frontend development. Gain expertise in HTML, CSS, JavaScript, and modern frameworks like React, empowering you to craft engaging and interactive user experiences.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321948/fronte_amgl20.png",
        },        
        {
          id: 3,
          title: "API Development",
          description:
            "Unlock the power of APIs to enable seamless communication between systems. This course covers designing, building, and securing robust RESTful APIs, focusing on real-world applications and best practices for backend integration.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321947/Api_yb6p0z.png",
        },        
        {
          id: 4,
          title: "Mobile Software Development",
          description:
            "Learn how to build innovative, user-friendly mobile applications for Android and iOS platforms. This course covers essential programming languages, frameworks, and best practices for creating responsive and high-performing mobile apps.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321948/html_ytx9pb.png",
        },        
        {
          id: 5,
          title: "Backend Development (Java)",
          description:
            "Master the art of building robust and scalable server-side applications using Java. This course covers core backend concepts, frameworks like Spring, database integration, and RESTful API development.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321946/jav_krjo3g.png",
        },        
        {
          id: 6,
          title: "Backend Development (C#)",
          description:
            "Dive into the world of backend development with C# and .NET. Gain hands-on experience creating efficient, secure, and scalable applications while learning about database integration and API design.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321946/c_back_nymme1.png",
        },        
        {
          id: 7,
          title: "DevOps",
          description:
            "Learn the principles and tools of DevOps to streamline software delivery and improve collaboration between development and operations teams. This course covers CI/CD pipelines, containerization, automation, and monitoring techniques.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321945/devopss_h00nob.png",
        },        
        {
          id: 8,
          title: "Manual Software Testing",
          description:
            "Gain expertise in ensuring software quality through manual testing techniques. Learn how to design test cases, identify bugs, and work with developers to enhance product performance and reliability.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321944/manua_hwep47.png",
        },        
        {
          id: 9,
          title: "Automated Software Testing",
          description:
            "Become proficient in automated testing tools and frameworks to improve testing efficiency and accuracy. This course covers scripting, integration, and maintenance of automated test cases for software applications.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321883/automa_utoo2t.png",
        },        
        {
          id: 10,
          title: "Data Analysis",
          description:
            "Unlock the power of data to make informed decisions. This course teaches data visualization, statistical analysis, and tools like Excel, SQL, and Python to extract actionable insights from datasets.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321861/dataanalysis_swwicx.png",
        },        
        {
          id: 11,
          title: "Cybersecurity (Offensive and Defensive)",
          description:
            "Explore both offensive and defensive strategies to protect digital systems and networks. Learn ethical hacking, penetration testing, and incident response, along with risk assessment and preventive measures.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321860/cybers_fz9ebw.png",
        },        
        {
          id: 12,
          title: "Data Science and Machine Learning",
          description:
            "Master the skills to analyze data and build predictive models using machine learning algorithms. This course covers Python, data wrangling, visualization, and advanced techniques like deep learning.",
          image: "https://res.cloudinary.com/kamisama/image/upload/v1745321883/automa_utoo2t.png",
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
          <li className="text-gray-500">Product Development Courses</li>
        </ol>
      </nav>
    </div>

    {/* Hero Section */}
    <div className="relative">
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/kamisama/image/upload/v1745321516/product-deve_ljext3.png"
          alt="Product Development Courses"
          className="w-full h-[14rem] object-cover bannner-posit"
        />
        <div className="absolute inset-0 bg-black opacity-70 mix-blend-multiply"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[2.7rem]">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
          <HiCodeBracket className="w-6 h-6 text-[#807CFF]"  />
        </div>
        <h1 className="text-4xl font-semibold text-white mb-4">Product Development Courses</h1>
        <p className="text-xl text-white max-w-3xl">
            Courses focusing on coding, software development, and technical tools.
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
                        href='/enrollment'
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

export default Product_develop