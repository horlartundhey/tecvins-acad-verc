import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Faq from "../components/Faq";
import { HiArrowLongRight } from "react-icons/hi2";
import { useEffect } from "react";

const Product_manage = () => {

  useEffect(() => {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      }, []);


  const courses = [
    {
      id: 1,
      title: "Product Owner Essentials",
      description:
        "Gain a deep understanding of the Product Owner role in Agile teams. Learn how to define product visions, manage backlogs, prioritize features, and deliver maximum value to stakeholders while maintaining alignment with business goals.",
      image: "https://res.cloudinary.com/kamisama/image/upload/t_crop/v1730724287/productOwner_kzhv7s.png",
    },
    {
      id: 2,
      title: "Scrum Master Training",
      description:
        "Dive into the principles of Agile methodology and master the role of a Scrum Master. This course covers facilitating Scrum ceremonies, managing team dynamics, removing obstacles, and driving project success with an emphasis on collaboration and continuous improvement.",
      image: "https://res.cloudinary.com/kamisama/image/upload/v1747130509/Image_ppjter.png",
    },
    {
      id: 3,
      title: "Business Analysis",
      description:
        "This course equips you with the tools and techniques to analyze business needs, define solutions, and facilitate successful project outcomes. Learn how to gather requirements, communicate with stakeholders, and create effective documentation to bridge the gap between business objectives and technical solutions.",
      image: "https://res.cloudinary.com/kamisama/image/upload/t_crop/v1730724227/Businessanalysis_mih7nt.png",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="text-sm sm:text-base font-medium mb-4 sm:mb-8">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/courses" className="text-teal-600 hover:text-teal-800">
                Courses
              </Link>
              <span className="mx-1 sm:mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-500">Product Management Courses</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/kamisama/image/upload/v1745316781/productscrum_abujod.png"
            alt="Product Management Background"
            className="w-full h-[12rem] sm:h-[16rem] object-cover bannner-posit-mobile sm:bannner-posit"
          />
          <div className="absolute inset-0 bg-black opacity-50 sm:opacity-70 mix-blend-multiply"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-[2.7rem]">
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-full flex items-center justify-center mb-2 sm:mb-4 shadow-lg">
            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.8128 15.2693L10.9075 16.1693C10.9213 16.3299 10.9843 16.4615 11.0965 16.5639C11.2089 16.6666 11.3468 16.7179 11.5102 16.7179H12.4895C12.6528 16.7179 12.7907 16.6666 12.9032 16.5639C13.0154 16.4615 13.0784 16.3299 13.0922 16.1693L13.1868 15.2693C13.4502 15.2026 13.6968 15.1056 13.9268 14.9783C14.1566 14.8507 14.3527 14.6929 14.5152 14.5049L15.3228 14.8743C15.4613 14.9409 15.6033 14.9544 15.7488 14.9146C15.8946 14.8748 16.0091 14.7853 16.0922 14.6459L16.5818 13.8026C16.6623 13.6641 16.6872 13.5234 16.6565 13.3803C16.6261 13.2374 16.5499 13.1149 16.4282 13.0129L15.7025 12.4819C15.7981 12.2101 15.8458 11.9384 15.8458 11.6666C15.8458 11.3948 15.7981 11.123 15.7025 10.8513L16.4282 10.3203C16.5499 10.2183 16.6261 10.0958 16.6565 9.95292C16.6872 9.80981 16.6623 9.66903 16.5818 9.53059L16.0922 8.68725C16.0091 8.54792 15.8946 8.45836 15.7488 8.41859C15.6033 8.37881 15.4613 8.39225 15.3228 8.45892L14.5152 8.82825C14.3527 8.64025 14.1566 8.48248 13.9268 8.35492C13.6968 8.22759 13.4502 8.13059 13.1868 8.06392L13.0922 7.16392C13.0784 7.00325 13.0154 6.8717 12.9032 6.76925C12.7907 6.66659 12.6528 6.61525 12.4895 6.61525H11.5102C11.3468 6.61525 11.2089 6.66659 11.0965 6.76925C10.9843 6.8717 10.9213 7.00325 10.9075 7.16392L10.8128 8.06392C10.5495 8.13059 10.3028 8.22759 10.0728 8.35492C9.84306 8.48248 9.64695 8.64025 9.4845 8.82825L8.67684 8.45892C8.53839 8.39225 8.39639 8.37881 8.25084 8.41859C8.10506 8.45836 7.99062 8.54792 7.9075 8.68725L7.41784 9.53059C7.33739 9.66903 7.3125 9.80981 7.34317 9.95292C7.37361 10.0958 7.44973 10.2183 7.5715 10.3203L8.29717 10.8513C8.20162 11.123 8.15384 11.3948 8.15384 11.6666C8.15384 11.9384 8.20162 12.2101 8.29717 12.4819L7.5715 13.0129C7.44973 13.1149 7.37361 13.2374 7.34317 13.3803C7.3125 13.5234 7.33739 13.6641 7.41784 13.8026L7.9075 14.6459C7.99062 14.7853 8.10506 14.8748 8.25084 14.9146C8.39639 14.9544 8.53839 14.9409 8.67684 14.8743L9.4845 14.5049C9.64695 14.6929 9.84306 14.8507 10.0728 14.9783C10.3028 15.1056 10.5495 15.2026 10.8128 15.2693ZM11.9992 13.9103C11.3756 13.9103 10.8459 13.692 10.4102 13.2556C9.97417 12.8191 9.75617 12.2893 9.75617 11.6659C9.75617 11.0424 9.97439 10.5127 10.4108 10.0769C10.8473 9.64092 11.3772 9.42292 12.0005 9.42292C12.6241 9.42292 13.1537 9.64114 13.5895 10.0776C14.0255 10.514 14.2435 11.0439 14.2435 11.6673C14.2435 12.2908 14.0253 12.8205 13.5888 13.2563C13.1524 13.6923 12.6225 13.9103 11.9992 13.9103ZM4.6665 20.2923C3.39984 19.1367 2.4165 17.8124 1.7165 16.3193C1.0165 14.8259 0.666504 13.2719 0.666504 11.6573C0.666504 8.5117 1.76839 5.83803 3.97217 3.63625C6.17573 1.43425 8.85162 0.333252 11.9998 0.333252C14.5896 0.333252 16.9054 1.10725 18.9472 2.65525C20.9892 4.20303 22.3153 6.21114 22.9255 8.67959L24.4832 14.8323C24.5832 15.2125 24.5126 15.5577 24.2715 15.8679C24.0306 16.1781 23.7093 16.3333 23.3075 16.3333H20.6665V20.5896C20.6665 21.2525 20.4305 21.8199 19.9585 22.2919C19.4865 22.7639 18.9191 22.9999 18.2562 22.9999H15.3332V24.6666C15.3332 24.9499 15.2373 25.1874 15.0455 25.3789C14.8537 25.5707 14.6162 25.6666 14.3328 25.6666C14.0493 25.6666 13.8118 25.5707 13.6205 25.3789C13.4289 25.1874 13.3332 24.9499 13.3332 24.6666V22.2113C13.3332 21.8635 13.4486 21.5747 13.6795 21.3449C13.9106 21.1149 14.1968 20.9999 14.5382 20.9999H18.2562C18.3759 20.9999 18.4743 20.9615 18.5512 20.8846C18.6281 20.8077 18.6665 20.7094 18.6665 20.5896V15.5383C18.6665 15.1969 18.7819 14.9107 19.0128 14.6796C19.2439 14.4487 19.5302 14.3333 19.8715 14.3333H22.2665L20.9998 9.16659C20.4887 7.13592 19.3956 5.48936 17.7205 4.22692C16.0452 2.96447 14.1383 2.33325 11.9998 2.33325C9.42206 2.33325 7.22206 3.23447 5.39984 5.03692C3.57762 6.83936 2.6665 9.03125 2.6665 11.6126C2.6665 12.9439 2.93873 14.2086 3.48317 15.4066C4.02762 16.6046 4.79984 17.6695 5.79984 18.6013L6.6665 19.3999V24.6666C6.6665 24.9499 6.57062 25.1874 6.37884 25.3789C6.18706 25.5707 5.9495 25.6666 5.66617 25.6666C5.38262 25.6666 5.14517 25.5707 4.95384 25.3789C4.76228 25.1874 4.6665 24.9499 4.6665 24.6666V20.2923Z" fill="#0072DF"/>
            </svg>
          </div>
          <h1 className="text-2xl sm:text-4xl font-semibold text-white mb-2 sm:mb-4">Product Management Courses</h1>
          <p className="text-base sm:text-xl text-white font-normal max-w-3xl whitespace-normal">
            Courses that focus on managing product life cycles, stakeholder management, and agile practices.
          </p>
        </div>
      </div>

      {/* Course Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="space-y-6 sm:space-y-12">
          {courses.map((course) => (
            <div key={course.id} className="flex flex-col md:flex-row gap-4 sm:gap-8 items-center border-b border-[#E3E3E3] pb-6 sm:pb-10">
              <div className="w-full md:w-1/4">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-[270px] sm:h-[250px] rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-3/4">
                <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {course.id}. {course.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4 pr-0 sm:pr-20">{course.description}</p>
                <Link
                  to="/enrollment"
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border text-xs sm:text-sm font-medium rounded-lg shadow-sm text-[#3B9790] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Begin your learning journey
                  <HiArrowLongRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-16 flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-10">
          <div className="flex items-center mb-2 sm:mb-0">
            <p className="text-xl sm:text-2xl font-medium text-gray-800 mr-2">Not sure which course is best for you?</p>
            <HiArrowLongRight className="h-8 sm:h-10 w-8 sm:w-10 text-[#1E1E1E]" />
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center px-4 sm:px-5 py-2 rounded-lg text-base font-medium text-teal-600 bg-white border border-[#C8C8C8] hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Reach Out to Us
            <HiArrowLongRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Faq />
      </div>

      <style jsx>{`
        .bannner-posit {
          object-position: center 22%;
        }
        .bannner-posit-mobile {
          object-position: center 30%;
        }
      `}</style>
    </div>
  );
};

export default Product_manage;