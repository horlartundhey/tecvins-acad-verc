import React, { useState } from 'react';
import { HiPlay, HiRocketLaunch, HiArrowLongRight, HiXMark } from 'react-icons/hi2';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Link } from 'react-router-dom';

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Testimonial data array
  const testimonials = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dwgyu7pr9/image/upload/v1749836961/gloria_pon7wq.png",
      quote: [
        "The hands-on approach at Tecvinson Academy gave me practical skills that I use every day.",
        "The curriculum is up-to-date with industry standards, and the career support helped me connect with top employers in the field."
      ],
      name: "Gloria Ondieki",
      title: "Graduate, Web Development Program",
      videoUrl: "https://res.cloudinary.com/dwgyu7pr9/video/upload/v1749835087/Tecvinson_Academy_Gloria_Ondieki_szuhrc.mp4" 
      // YouTube video
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dwgyu7pr9/image/upload/v1749836961/clifford_yifuaq.png",
      quote: [
        "Enrolling at Tecvinson Academy was one of the best decisions I've ever made! The instructors were incredibly knowledgeable and always willing to help, making the learning experience truly enjoyable."      
      ],
      name: "Clifford Tochi",
      title: "Student at Tecvinson Academy",
      videoUrl: "https://res.cloudinary.com/dwgyu7pr9/video/upload/v1749835078/Tecvinson_Academy_Clifford_Tochi_jb9lx9.mp4"  // Cloudinary video URL
    },
    // {
    //   id: 3,
    //   image: "/student3.jpg",
    //   quote: ["Tecvinson Academy's flexible learning options allowed me to balance my full-time job while acquiring new skills. The instructors provided individualized attention that made complex concepts easy to understand. Within two months of graduation, I received three job offers!"],
    //   name: "Sarah Johnson",
    //   title: "Graduate, Data Science Program",
    //   videoUrl: "https://www.youtube.com/watch?v=another-youtube-id" // YouTube video
    // },
    // {
    //   id: 4,
    //   image: "/student4.jpg",
    //   quote: ["As someone transitioning careers, I was nervous about entering tech without prior experience. Tecvinson Academy created a supportive environment where I could learn at my own pace. Now I'm working as a full-stack developer at a startup I admire!"],
    //   name: "Michael Adeyemi",
    //   title: "Graduate, Software Engineering Program",
    //   videoUrl: "https://res.cloudinary.com/your-cloud-name/video/upload/v1234567890/testimonial4.mp4" // Cloudinary video URL
    // },
    // {
    //   id: 5,
    //   image: "/student5.jpg",
    //   quote: ["The project-based curriculum at Tecvinson Academy helped me build an impressive portfolio that got me noticed by employers. The career counseling and interview preparation were invaluable in landing my dream role."],
    //   name: "Priya Sharma",
    //   title: "Graduate, Digital Marketing Program",
    //   videoUrl: "https://www.youtube.com/watch?v=another-youtube-id-2" // YouTube video
    // }
  ];

  // Functions to navigate slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to check if URL is a YouTube URL
  const isYouTubeUrl = (url) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
  };

  // Function to get embed URL
  const getEmbedUrl = (url) => {
    if (isYouTubeUrl(url)) {
      const videoId = getYouTubeVideoId(url);
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
    }
    return url;
  };

  // Function to render video player based on URL type
  const renderVideoPlayer = (url) => {
    if (isYouTubeUrl(url)) {
      return (
        <iframe
          className="w-full h-full"
          src={getEmbedUrl(url)}
          title={`Testimonial from ${testimonials[currentSlide].name}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      return (
        <video
          className="w-full h-full"
          controls
          autoPlay
          src={url}
        >
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <section className="py-8 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-center md:text-left">
        Real Stories, Real Impacts
      </h2>

      <div className="relative">
        {/* Main Slider */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-10 md:mb-12">
          {/* Image/Video Container */}
          <div className="w-full md:w-1/2 relative">
            <div className="custom-frame-inverted">
              {/* Decorative SVG - scaled for mobile */}
              <div className="absolute top-0 left-[8rem] md:left-[14rem] w-0 h-0 z-0 scale-75 md:scale-100" style={{ transform: 'scaleX(-1)' }}>
                <svg width="91" height="70" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M63.8138 2.26838C40.1743 7.43569 13.3759 22.9858 3.3701 46.9324C1.07162 52.4307 -2.662 62.5968 2.91267 67.6498C8.09003 72.3374 16.9543 68.2165 22.3497 65.7082C22.6177 65.5835 22.8772 65.4629 23.1273 65.3475C44.1395 55.6509 67.0728 39.8631 82.7334 22.1883C82.8322 22.0768 82.9344 21.9616 83.0398 21.843C86.702 17.7199 94.0905 9.40174 89.2886 3.67684C84.2683 -2.30644 71.9109 0.458801 65.1306 1.97603C64.6638 2.08048 64.2235 2.17902 63.8138 2.26838ZM54.0272 13.1553C41.8205 16.0111 27.0844 24.9824 21.4461 36.8733C16.6046 47.0872 23.5988 50.2164 32.5228 47.0447C44.2195 42.8856 58.0198 33.5041 65.4574 23.2325C72.9442 12.8819 62.6179 11.1471 54.0272 13.1553Z"
                    fill="#6ECAC3"
                  />
                </svg>
              </div>

              {/* Image with play button */}
              <div className="image-container">
                <img
                  src={testimonials[currentSlide].image}
                  alt={`${testimonials[currentSlide].name} testimonial`}
                  className="rounded-lg"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                  aria-label="Play testimonial video"
                  onClick={openVideoModal}
                >
                  <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-white flex items-center justify-center">
                    <HiPlay className="w-5 md:w-6 h-5 md:h-6 text-teal-600 ml-1" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quote Container */}
          <div className="w-full md:w-1/2">
            <div className="text-teal-600 text-4xl md:text-5xl font-serif mb-3 md:mb-4">
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.98001 0.52002L6.43265 14.0978L5.45407 9.51074C6.88117 9.51074 8.06362 9.95926 9.00143 10.8563C9.93924 11.7533 10.4081 12.9562 10.4081 14.4648C10.4081 15.9735 9.93924 17.1967 9.00143 18.1345C8.06362 19.0315 6.90156 19.48 5.51523 19.48C4.04736 19.48 2.84452 19.0111 1.90671 18.0733C0.968904 17.1355 0.5 15.9327 0.5 14.4648C0.5 13.9755 0.520387 13.527 0.561161 13.1193C0.64271 12.6707 0.78542 12.1407 0.989291 11.5291C1.19316 10.9175 1.47858 10.1427 1.84555 9.20493L5.0871 0.52002H9.98001ZM22.9462 0.52002L19.3989 14.0978L18.4203 9.51074C19.8474 9.51074 21.0298 9.95926 21.9676 10.8563C22.9054 11.7533 23.3743 12.9562 23.3743 14.4648C23.3743 15.9735 22.9054 17.1967 21.9676 18.1345C21.0298 19.0315 19.8678 19.48 18.4814 19.48C17.0136 19.48 15.8107 19.0111 14.8729 18.0733C13.9351 17.1355 13.4662 15.9327 13.4662 14.4648C13.4662 13.9755 13.4866 13.527 13.5274 13.1193C13.6089 12.6707 13.7516 12.1407 13.9555 11.5291C14.1594 10.9175 14.4448 10.1427 14.8118 9.20493L18.0533 0.52002H22.9462Z" fill="#F4A89A"/>
              </svg>
            </div>
            <div className="text-gray-700 space-y-4 md:space-y-6">
              {testimonials[currentSlide].quote.map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="pt-4 md:pt-6">
              <p className="font-medium text-gray-900 text-sm md:text-base">— {testimonials[currentSlide].name}</p>
              <p className="text-gray-600 text-sm md:text-base">{testimonials[currentSlide].title}</p>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={prevSlide} 
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-2 md:-translate-x-20 bg-white rounded-full shadow-lg p-2 md:p-3 hover:bg-gray-100 focus:outline-none"
          aria-label="Previous testimonial"
        >
          <SlArrowLeft className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
        </button>
        
        <button 
          onClick={nextSlide} 
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 md:translate-x-20 bg-white rounded-full shadow-lg p-2 md:p-3 hover:bg-gray-100 focus:outline-none"
          aria-label="Next testimonial"
        >
          <SlArrowRight className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
        </button>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3.5 md:w-4 h-3.5 md:h-4 rounded-full ${
                index === currentSlide ? 'bg-teal-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10 md:mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center">
            <p className="text-base md:text-xl font-medium text-[#1a2e35] text-center md:text-left">
              Join thousands who have transformed their careers with us.
            </p>
            <HiArrowLongRight className="h-8 md:h-10 w-8 md:w-10 ml-2 text-[#1a2e35]" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
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
              <HiRocketLaunch className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 md:p-4">
          <div className="bg-white rounded-xl overflow-hidden w-full max-w-[90%] md:max-w-4xl">
            <div className="p-3 md:p-4 flex justify-between items-center border-b">
              <h3 className="font-medium text-sm md:text-base">Testimonial from {testimonials[currentSlide].name}</h3>
              <button 
                onClick={closeVideoModal}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <HiXMark className="w-5 md:w-6 h-5 md:h-6" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              {renderVideoPlayer(testimonials[currentSlide].videoUrl)}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-frame-inverted {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: 16px;
          background: linear-gradient(
            90deg, 
            white 0%, 
            white 50%, 
            #6ECAC3 50%, 
            #6ECAC3 100%
          );
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }
        
        @media (min-width: 768px) {
          .custom-frame-inverted {
            height: 320px;
            border-radius: 24px;
            padding: 16px;
          }
        }

        .image-container {
          position: relative;
          width: 72%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          background-color: white;
          left: 14%;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 48%;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
      `}</style>
    </section>
  );
}