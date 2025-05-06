import { ArrowRight } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { HiArrowLongRight, HiCodeBracket, HiOutlineBriefcase } from "react-icons/hi2";
import Faq from "../components/Faq";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FiPenTool } from "react-icons/fi";
import { useEffect } from "react";

const CourseCard = ({ iconBg, icon, image, title, description, overlayColor, courseLink }) => {
   useEffect(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, []);
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative overflow-hidden flex-grow-0">
        {/* Main course image */}
        <img
          src={image || "/placeholder.svg"}
          alt={`${title} course`}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Color overlay */}
        <div
          className={`absolute inset-0 ${overlayColor} opacity-70 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-75`}
        ></div>
        {/* Icon overlay */}
        <div className="absolute top-4 left-4">
          <div className={`${iconBg} w-10 h-10 rounded-full flex items-center justify-center shadow-md`}>{icon}</div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 pb-10 flex-grow">{description}</p>
        <div className="mt-auto pt-2">
          <Link 
            to={courseLink} 
            className="text-teal-600 font-semibold text-sm flex items-center group"
          >
            Explore Courses
            <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const courseCategories = [
    {
      iconBg: "bg-white",
      icon: (
        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8128 15.2693L10.9075 16.1693C10.9213 16.3299 10.9843 16.4615 11.0965 16.5639C11.2089 16.6666 11.3468 16.7179 11.5102 16.7179H12.4895C12.6528 16.7179 12.7907 16.6666 12.9032 16.5639C13.0154 16.4615 13.0784 16.3299 13.0922 16.1693L13.1868 15.2693C13.4502 15.2026 13.6968 15.1056 13.9268 14.9783C14.1566 14.8507 14.3527 14.6929 14.5152 14.5049L15.3228 14.8743C15.4613 14.9409 15.6033 14.9544 15.7488 14.9146C15.8946 14.8748 16.0091 14.7853 16.0922 14.6459L16.5818 13.8026C16.6623 13.6641 16.6872 13.5234 16.6565 13.3803C16.6261 13.2374 16.5499 13.1149 16.4282 13.0129L15.7025 12.4819C15.7981 12.2101 15.8458 11.9384 15.8458 11.6666C15.8458 11.3948 15.7981 11.123 15.7025 10.8513L16.4282 10.3203C16.5499 10.2183 16.6261 10.0958 16.6565 9.95292C16.6872 9.80981 16.6623 9.66903 16.5818 9.53059L16.0922 8.68725C16.0091 8.54792 15.8946 8.45836 15.7488 8.41859C15.6033 8.37881 15.4613 8.39225 15.3228 8.45892L14.5152 8.82825C14.3527 8.64025 14.1566 8.48248 13.9268 8.35492C13.6968 8.22759 13.4502 8.13059 13.1868 8.06392L13.0922 7.16392C13.0784 7.00325 13.0154 6.8717 12.9032 6.76925C12.7907 6.66659 12.6528 6.61525 12.4895 6.61525H11.5102C11.3468 6.61525 11.2089 6.66659 11.0965 6.76925C10.9843 6.8717 10.9213 7.00325 10.9075 7.16392L10.8128 8.06392C10.5495 8.13059 10.3028 8.22759 10.0728 8.35492C9.84306 8.48248 9.64695 8.64025 9.4845 8.82825L8.67684 8.45892C8.53839 8.39225 8.39639 8.37881 8.25084 8.41859C8.10506 8.45836 7.99062 8.54792 7.9075 8.68725L7.41784 9.53059C7.33739 9.66903 7.3125 9.80981 7.34317 9.95292C7.37361 10.0958 7.44973 10.2183 7.5715 10.3203L8.29717 10.8513C8.20162 11.123 8.15384 11.3948 8.15384 11.6666C8.15384 11.9384 8.20162 12.2101 8.29717 12.4819L7.5715 13.0129C7.44973 13.1149 7.37361 13.2374 7.34317 13.3803C7.3125 13.5234 7.33739 13.6641 7.41784 13.8026L7.9075 14.6459C7.99062 14.7853 8.10506 14.8748 8.25084 14.9146C8.39639 14.9544 8.53839 14.9409 8.67684 14.8743L9.4845 14.5049C9.64695 14.6929 9.84306 14.8507 10.0728 14.9783C10.3028 15.1056 10.5495 15.2026 10.8128 15.2693ZM11.9992 13.9103C11.3756 13.9103 10.8459 13.692 10.4102 13.2556C9.97417 12.8191 9.75617 12.2893 9.75617 11.6659C9.75617 11.0424 9.97439 10.5127 10.4108 10.0769C10.8473 9.64092 11.3772 9.42292 12.0005 9.42292C12.6241 9.42292 13.1537 9.64114 13.5895 10.0776C14.0255 10.514 14.2435 11.0439 14.2435 11.6673C14.2435 12.2908 14.0253 12.8205 13.5888 13.2563C13.1524 13.6923 12.6225 13.9103 11.9992 13.9103ZM4.6665 20.2923C3.39984 19.1367 2.4165 17.8124 1.7165 16.3193C1.0165 14.8259 0.666504 13.2719 0.666504 11.6573C0.666504 8.5117 1.76839 5.83803 3.97217 3.63625C6.17573 1.43425 8.85162 0.333252 11.9998 0.333252C14.5896 0.333252 16.9054 1.10725 18.9472 2.65525C20.9892 4.20303 22.3153 6.21114 22.9255 8.67959L24.4832 14.8323C24.5832 15.2125 24.5126 15.5577 24.2715 15.8679C24.0306 16.1781 23.7093 16.3333 23.3075 16.3333H20.6665V20.5896C20.6665 21.2525 20.4305 21.8199 19.9585 22.2919C19.4865 22.7639 18.9191 22.9999 18.2562 22.9999H15.3332V24.6666C15.3332 24.9499 15.2373 25.1874 15.0455 25.3789C14.8537 25.5707 14.6162 25.6666 14.3328 25.6666C14.0493 25.6666 13.8118 25.5707 13.6205 25.3789C13.4289 25.1874 13.3332 24.9499 13.3332 24.6666V22.2113C13.3332 21.8635 13.4486 21.5747 13.6795 21.3449C13.9106 21.1149 14.1968 20.9999 14.5382 20.9999H18.2562C18.3759 20.9999 18.4743 20.9615 18.5512 20.8846C18.6281 20.8077 18.6665 20.7094 18.6665 20.5896V15.5383C18.6665 15.1969 18.7819 14.9107 19.0128 14.6796C19.2439 14.4487 19.5302 14.3333 19.8715 14.3333H22.2665L20.9998 9.16659C20.4887 7.13592 19.3956 5.48936 17.7205 4.22692C16.0452 2.96447 14.1383 2.33325 11.9998 2.33325C9.42206 2.33325 7.22206 3.23447 5.39984 5.03692C3.57762 6.83936 2.6665 9.03125 2.6665 11.6126C2.6665 12.9439 2.93873 14.2086 3.48317 15.4066C4.02762 16.6046 4.79984 17.6695 5.79984 18.6013L6.6665 19.3999V24.6666C6.6665 24.9499 6.57062 25.1874 6.37884 25.3789C6.18706 25.5707 5.9495 25.6666 5.66617 25.6666C5.38262 25.6666 5.14517 25.5707 4.95384 25.3789C4.76228 25.1874 4.6665 24.9499 4.6665 24.6666V20.2923Z" fill="#0072DF"/>
      </svg>
      ),
      image: "https://res.cloudinary.com/kamisama/image/upload/v1730724263/scrum_tkpb6b.png",
      title: "Product Management",
      description: "Courses that focus on managing product life cycles, stakeholder management, and agile practices.",
      overlayColor: "bg-blue-400",
      courseLink: "/product-management"
    },
    {
      iconBg: "bg-white",
      icon: <FiPenTool className="text-[#FF6F61] w-6 h-6"  />,
      image: "https://res.cloudinary.com/kamisama/image/upload/v1730728313/image_s5r5j7.png",
      title: "Creative Design",
      description: "Courses focused on user experience, user interface design, and creative design tools.",
      overlayColor: "bg-red-400",
      courseLink: "/creative-design" // Add course link
    },
    {
      iconBg: "bg-white",
      icon: <HiCodeBracket className="w-6 h-6 text-[#807CFF]"  />,
      image: `https://res.cloudinary.com/kamisama/image/upload/v1730727270/image_rycdsz.png`,
      title: "Product Development",
      description: "Courses focusing on coding, software development, and technical tools.",
      overlayColor: "bg-purple-400",
      courseLink: "/product-development" // Add course link
    },
    {
      iconBg: "bg-white",
      icon: <HiOutlineBriefcase className="w-6 h-6 text-[#DEA600]"/>,
      image: "https://res.cloudinary.com/kamisama/image/upload/t_crop/v1730728323/image_tp2hyp.png",
      title: "Job Readiness",
      description: "Courses on CV writing, interview preparation, and workplace communication skills.",
      overlayColor: "bg-yellow-400",
      courseLink: "/job-readiness" // Add course link
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Explore Our Free IT Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseCategories.map((course, index) => (
            <CourseCard
              key={index}
              iconBg={course.iconBg}
              icon={course.icon}
              image={course.image}
              title={course.title}
              description={course.description}
              overlayColor={course.overlayColor}
              courseLink={course.courseLink}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between font-semibold">
          <div className="flex items-center mb-4 sm:mb-0">
            <p className="text-2xl font-medium text-[#1E1E1E] mr-2">Not sure which course is best for you?</p>
            <HiArrowLongRight className="w-10 h-10 text-[#1E1E1E]" />
          </div>
          <Link
            to="/contact"
            className="bg-white text-teal-600 border border-[#C8C8C8] hover:bg-teal-50 px-5 py-2 rounded-lg flex items-center transition-colors font-semibold"
          >
            Reach Out to Us
            <HiArrowLongRight  className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </div>      
      <div className="my-14">
        <Faq />
      </div>
    </div>
  );
};

export default Courses;