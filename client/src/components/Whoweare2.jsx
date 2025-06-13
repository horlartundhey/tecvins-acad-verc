import React from 'react'

import teamworkImage from "../assets/images/teammate.png";
import mission from "../assets/images/mission.png";
import visionImage from "../assets/images/vision-image.png";
import { Link } from 'react-router-dom';

import {HiArrowLongRight, HiOutlineRocketLaunch   } from "react-icons/hi2";

const Whoweare2 = () => {
  return (
    <>
    <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Text content */}
                  <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e35] mb-6">Who Are We?</h2>
    
                    <div className="space-y-4 text-gray-700 text-base md:text-lg">
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
                  
                  {/* Image */}
                  <div className="relative">
                    {/* Custom frame with decorative elements */}
                    <div className="relative w-[300px] md:w-[500px]">
                      {/* Main frame with half-pink, half-white border */}
                      <div className="custom-frame-one">
                        {/* SVG curve in top right - positioned behind the image */}
                        <div className="absolute top-0 right-[68px] w-0 h-0 z-0 hidden sm:block">
                    <svg width="91" height="70" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M63.8138 2.26838C40.1743 7.43569 13.3759 22.9858 3.3701 46.9324C1.07162 52.4307 -2.662 62.5968 2.91267 67.6498C8.09003 72.3374 16.9543 68.2165 22.3497 65.7082C22.6177 65.5835 22.8772 65.4629 23.1273 65.3475C44.1395 55.6509 67.0728 39.8631 82.7334 22.1883C82.8322 22.0768 82.9344 21.9616 83.0398 21.843C86.702 17.7199 94.0905 9.40174 89.2886 3.67684C84.2683 -2.30644 71.9109 0.458801 65.1306 1.97603C64.6638 2.08048 64.2235 2.17902 63.8138 2.26838ZM54.0272 13.1553C41.8205 16.0111 27.0844 24.9824 21.4461 36.8733C16.6046 47.0872 23.5988 50.2164 32.5228 47.0447C44.2195 42.8856 58.0198 33.5041 65.4574 23.2325C72.9442 12.8819 62.6179 11.1471 54.0272 13.1553Z"
                        fill="#F4A89A"
                      />
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
                </div>
                
              </div>
              
            </section>

<section className="py-16 bg-gray-50">
<div className="container mx-auto px-4 max-w-7xl">
  <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-8">
    {/* Text content - now on the right side */}
    <div className="max-w-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e35] mb-6">Our Vision</h2>
      
      <div className="space-y-4 text-gray-700 text-base md:text-lg">
        <p>
          To diversify the tech workforce by delivering tailored, accessible education and ongoing support 
          to learners from underrepresented backgrounds, increasing their representation across all levels 
          of the industry.
        </p>
      </div>
    </div>
    
    {/* Image - now on the left side */}
    <div className="relative">
      {/* Custom frame with decorative elements */}
      <div className="relative w-[300px] md:w-[500px]">
        {/* Main frame with half-teal, half-white border */}
        <div className="custom-frame-vision">
          {/* SVG curve in top left - positioned behind the image */}
          <div
                    className="absolute top-0 left-[5rem] w-0 h-0 z-0 hidden sm:block"
                    style={{ transform: "scaleX(-1)" }}
                  >
                    <svg width="91" height="70" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M63.8138 2.26838C40.1743 7.43569 13.3759 22.9858 3.3701 46.9324C1.07162 52.4307 -2.662 62.5968 2.91267 67.6498C8.09003 72.3374 16.9543 68.2165 22.3497 65.7082C22.6177 65.5835 22.8772 65.4629 23.1273 65.3475C44.1395 55.6509 67.0728 39.8631 82.7334 22.1883C82.8322 22.0768 82.9344 21.9616 83.0398 21.843C86.702 17.7199 94.0905 9.40174 89.2886 3.67684C84.2683 -2.30644 71.9109 0.458801 65.1306 1.97603C64.6638 2.08048 64.2235 2.17902 63.8138 2.26838ZM54.0272 13.1553C41.8205 16.0111 27.0844 24.9824 21.4461 36.8733C16.6046 47.0872 23.5988 50.2164 32.5228 47.0447C44.2195 42.8856 58.0198 33.5041 65.4574 23.2325C72.9442 12.8819 62.6179 11.1471 54.0272 13.1553Z"
                        fill="#919191"
                      />
                    </svg>
                  </div>

          {/* Inner div containing the placeholder image */}
          <div className="image-container-vision">
            <img
              src={visionImage}
              alt="Illustration representing our vision"              
              className="rounded-[16px] object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


</section>

<section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Text content */}
                  <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e35] mb-6">Our Mission</h2>
    
                    <div className="space-y-4 text-gray-700 text-base md:text-lg">
                      <p>
                      Tecvinson Academy is a Swedish-based global IT education platform revolutionizing tech education. We focus on project-based learning, industry mentorship, and real-world assignments tailored for learners from underrepresented backgrounds.
                      Students work in small groups, guided by experienced instructors, to gain practical skills and confidently transition into tech roles.
                      </p>
    
                     
                    </div>
    
                    
                  </div>
                  
                  {/* Image */}
                  <div className="relative">
                    {/* Custom frame with decorative elements */}
                    <div className="relative w-[300px] md:w-[500px]">
                      {/* Main frame with half-pink, half-white border */}
                      <div className="custom-frame">
                        {/* SVG curve in top right - positioned behind the image */}
                        <div className="absolute top-0 right-[68px] w-0 h-0 z-0 hidden sm:block">
                          <svg width="91" height="70" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M63.8138 2.26838C40.1743 7.43569 13.3759 22.9858 3.3701 46.9324C1.07162 52.4307 -2.662 62.5968 2.91267 67.6498C8.09003 72.3374 16.9543 68.2165 22.3497 65.7082C22.6177 65.5835 22.8772 65.4629 23.1273 65.3475C44.1395 55.6509 67.0728 39.8631 82.7334 22.1883C82.8322 22.0768 82.9344 21.9616 83.0398 21.843C86.702 17.7199 94.0905 9.40174 89.2886 3.67684C84.2683 -2.30644 71.9109 0.458801 65.1306 1.97603C64.6638 2.08048 64.2235 2.17902 63.8138 2.26838ZM54.0272 13.1553C41.8205 16.0111 27.0844 24.9824 21.4461 36.8733C16.6046 47.0872 23.5988 50.2164 32.5228 47.0447C44.2195 42.8856 58.0198 33.5041 65.4574 23.2325C72.9442 12.8819 62.6179 11.1471 54.0272 13.1553Z"
                              fill="#6ECAC3"
                            />
                          </svg>
                        </div>
    
                        {/* Inner div containing the placeholder image */}
                        <div className="image-container-mission">
                          <img
                            src={mission}
                            alt="mission"
                            
                            className="rounded-[16px] object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              {/* CSS for the custom frame and image container */}
              <style jsx global>{`
        .custom-frame-one,
        .custom-frame-vision,
        .custom-frame {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 54%; /* Maintain aspect ratio */
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .custom-frame-one {
          background: linear-gradient(
            90deg, 
            #F4A89A 0%, 
            #F4A89A 50%, 
            white 50%, 
            white 100%
          );
        }

        .custom-frame-vision {
          background: linear-gradient(
            90deg, 
            white 0%, 
            white 50%, 
            #919191 50%, 
            #919191 100%
          );
        }

        .custom-frame {
          background: linear-gradient(
            90deg, 
            #6ECAC3 0%, 
            #6ECAC3 50%, 
            white 50%, 
            white 100%
          );
        }
        
        .image-container-who,
        .image-container-vision,
        .image-container-mission {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          bottom: 16px;
          border-radius: 16px;
          overflow: hidden;
          z-index: 5;
        }

        @media (max-width: 640px) {
          .custom-frame-one,
          .custom-frame-vision,
          .custom-frame {
            padding-bottom: 60%; /* Slightly taller on mobile */
          }
          
          .image-container-who,
          .image-container-vision,
          .image-container-mission {
            top: 12px;
            left: 12px;
            right: 12px;
            bottom: 12px;
          }
        }
      `}</style>
            </section>
            <div className="container mx-auto px-4 max-w-7xl mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                        <div className="flex items-center">
                          <p className="text-base md:text-xl font-medium text-[#1a2e35] text-center md:text-left">
                            Unlock your potentials with training that stands out!
                          </p>
                          <HiArrowLongRight className="h-8 md:h-10 w-8 md:w-10 ml-2 text-[#1a2e35]" />
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-3 md:gap-4 font-semibold w-full md:w-auto">
                          <Link
                            to="/support"
                            className="px-4 md:px-6 py-[1.3rem] rounded-lg border border-gray-300 text-[#3B9790] hover:bg-gray-50 transition-colors text-center"
                          >
                            Support Us
                          </Link>
                          <Link
                            to="/courses"
                            className="px-4 md:px-6 py-[1.3rem] rounded-lg bg-[#3B9790] text-white hover:bg-[#3dbdb5] transition-colors flex items-center justify-center"
                          >
                            Begin your learning journey
                            <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
            </div>
</>
  )
}

export default Whoweare2