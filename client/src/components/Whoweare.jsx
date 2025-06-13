import React from "react";
import { Link } from "react-router-dom";
import teamworkImage from "../assets/images/teammate.png";
import { HiArrowLongRight } from "react-icons/hi2";

const Whoweare = () => {
    return (
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Text content with blurs underneath */}
              <div className="max-w-xl relative">
                {/* Green animated blur - smaller and under text */}
                <div className="absolute -left-10 bottom-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                <div className="absolute left-10 bottom-10 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                
                <div className="relative z-10 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-[#0F2624] mb-4 md:mb-6">Who Are We?</h2>

                  <div className="space-y-3 md:space-y-4 text-[#5E5E5E] text-sm md:text-lg">
                    <p>
                      Tecvinson Academy is a Swedish-based global IT education platform revolutionizing tech education. We
                      focus on project-based learning, industry mentorship, and real-world assignments tailored for learners
                      from underrepresented backgrounds.
                    </p>

                    <p>
                      Students work in small groups, guided by experienced instructors, to gain practical skills and
                      confidently transition into tech roles.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative w-full max-w-[300px] md:max-w-[500px]">
            {/* Custom frame with decorative elements */}
            <div className="custom-frame-who">
              {/* SVG curve in top right - scaled for mobile */}
              <div className="absolute top-0 right-[40px] md:right-[68px] w-0 h-0 z-0 scale-75 md:scale-100">
                <svg width="91" height="70" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M63.8138 2.26838C40.1743 7.43569 13.3759 22.9858 3.3701 46.9324C1.07162 52.4307 -2.662 62.5968 2.91267 67.6498C8.09003 72.3374 16.9543 68.2165 22.3497 65.7082C22.6177 65.5835 22.8772 65.4629 23.1273 65.3475C44.1395 55.6509 67.0728 39.8631 82.7334 22.1883C82.8322 22.0768 82.9344 21.9616 83.0398 21.843C86.702 17.7199 94.0905 9.40174 89.2886 3.67684C84.2683 -2.30644 71.9109 0.458801 65.1306 1.97603C64.6638 2.08048 64.2235 2.17902 63.8138 2.26838ZM54.0272 13.1553C41.8205 16.0111 27.0844 24.9824 21.4461 36.8733C16.6046 47.0872 23.5988 50.2164 32.5228 47.0447C44.2195 42.8856 58.0198 33.5041 65.4574 23.2325C72.9442 12.8819 62.6179 11.1471 54.0272 13.1553Z" fill="#F4A89A"/>
                </svg>
              </div>

              {/* Inner div containing the placeholder image */}
              <div className="image-container-who">
                <img
                  src={teamworkImage}
                  alt="Students collaborating at Tecvinson Academy"
                  className="rounded-[16px] object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
            </div>

            {/* Links on the same line */}
            <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            to="/about"
            className="flex items-center text-[#1E1E1E] font-medium text-base md:text-xl hover:text-gray-600 transition-colors"
          >
            Get to know the vision that drives us forward!
            <HiArrowLongRight className="w-6 md:w-9 h-6 md:h-9 ml-3 md:ml-5" />
          </Link>

          <Link
            to="/about"
            className="inline-flex items-center px-4 md:px-6 py-[1.3rem] rounded-xl border border-[#C8C8C8] text-[#3B9790] hover:bg-teal-50 transition-colors font-semibold text-sm md:text-base"
          >
            Learn more about us
            <HiArrowLongRight className="w-4 md:w-5 h-4 md:h-5 ml-2 md:ml-3" />
          </Link>
        </div>
          </div>
          {/* CSS for the custom frame and image container */}
          <style jsx global>{`
        .custom-frame-who {
          position: relative;
          width: 100%;
          height: 180px;
          border-radius: 16px;
          background: linear-gradient(
            90deg, 
            #F4A89A 0%, 
            #F4A89A 50%, 
            white 50%, 
            white 100%
          );
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }
        
        @media (min-width: 768px) {
          .custom-frame-who {
            height: 250px;
            border-radius: 24px;
            padding: 16px;
          }
        }

        .image-container-who {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          background-color: white;
          z-index: 5;
        }
        
        .image-container-who img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Animation for the green blobs */
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(20px, -20px) scale(1.05);
          }
          66% {
            transform: translate(-10px, 10px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}
      </style>
        </section>
      );
}

export default Whoweare;