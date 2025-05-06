import React, { useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { HiChevronLeft, HiChevronRight, HiOutlinePlayCircle, HiPlay, HiRocketLaunch, HiArrowLongRight, HiXMark } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const TestimonialModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
      const [showVideoModal, setShowVideoModal] = useState(false);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      image: "./src/assets/images/student-testi.png",
      quote: "Enrolling at Tecvinson Academy was one of the best decisions I've ever made! The instructors were incredibly knowledgeable and always willing to help, making the learning experience truly enjoyable.\n\nAfter completing the course, I landed a job as a junior designer at a top fintech company, and I couldn't have done it without Tecvinson Academy. I'm so grateful for the mentorship, support, and community I found here!",
      name: "Amaka Eze",
      title: "Graduate, Product Design (UI/UX) Program",
      videoUrl: "https://www.example.com/testimonial-video-1.mp4"
    },
    {
      id: 2,
      image: "/student2.jpg",
      quote: "The hands-on approach at Tecvinson Academy gave me practical skills that I use every day in my job. The curriculum is up-to-date with industry standards, and the career support helped me connect with top employers in the field.",
      name: "David Okafor",
      title: "Graduate, Web Development Program",
      videoUrl: "https://www.example.com/testimonial-video-2.mp4"
    },
    {
      id: 3,
      image: "/student3.jpg",
      quote: "Tecvinson Academy's flexible learning options allowed me to balance my full-time job while acquiring new skills. The instructors provided individualized attention that made complex concepts easy to understand. Within two months of graduation, I received three job offers!",
      name: "Sarah Johnson",
      title: "Graduate, Data Science Program",
      videoUrl: "https://www.example.com/testimonial-video-3.mp4"
    },
    {
      id: 4,
      image: "/student4.jpg",
      quote: "As someone transitioning careers, I was nervous about entering tech without prior experience. Tecvinson Academy created a supportive environment where I could learn at my own pace. Now I'm working as a full-stack developer at a startup I admire!",
      name: "Michael Adeyemi",
      title: "Graduate, Software Engineering Program",
      videoUrl: "https://www.example.com/testimonial-video-4.mp4"
    },
    {
      id: 5,
      image: "/student5.jpg",
      quote: "The project-based curriculum at Tecvinson Academy helped me build an impressive portfolio that got me noticed by employers. The career counseling and interview preparation were invaluable in landing my dream role.",
      name: "Priya Sharma",
      title: "Graduate, Digital Marketing Program",
      videoUrl: "https://www.example.com/testimonial-video-5.mp4"
    }
  ];

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

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

  const currentTestimonial = testimonials[currentIndex];

  return (
    <>
      {/* Button to open modal */}
      <div className="mt-8">
        <button 
          onClick={openModal}
          className="inline-flex items-center text-teal-600 font-semibold bg-white px-6 py-3 rounded-lg border border-teal-300 hover:bg-teal-50 transition-colors"
        >
          <HiOutlinePlayCircle className="mr-2 w-5 h-5 text-teal-600" />
          Hear from some beneficiaries
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg w-full max-w-[64rem] mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-medium text-gray-900">Hear from some beneficiaries</h3>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <HiOutlineX className="w-6 h-6" />
              </button>
            </div>

            {/* Testimonial Content */}
            <div className="relative">
                      {/* Main Slider */}
                      <div className="flex flex-col md:flex-row gap-8 items-center p-6">
                        {/* Image/Video Container */}
                        <div className="w-full md:w-1/2 relative">
                          <div className="custom-frame-inverted">
                            {/* Decorative SVG */}
                            <div className="absolute top-0 left-[14rem] w-0 h-0 z-0" style={{ transform: 'scaleX(-1)' }}>
                              <svg width="91" height="70" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M63.8138 2.26838C40.1743 7.43569 13.3759 22.9858 3.3701 46.9324C1.07162 52.4307 -2.662 62.5968 2.91267 67.6498C8.09003 72.3374 16.9543 68.2165 22.3497 65.7082C22.6177 65.5835 22.8772 65.4629 23.1273 65.3475C44.1395 55.6509 67.0728 39.8631 82.7334 22.1883C82.8322 22.0768 82.9344 21.9616 83.0398 21.843C86.702 17.7199 94.0905 9.40174 89.2886 3.67684C84.2683 -2.30644 71.9109 0.458801 65.1306 1.97603C64.6638 2.08048 64.2235 2.17902 63.8138 2.26838ZM54.0272 13.1553C41.8205 16.0111 27.0844 24.9824 21.4461 36.8733C16.6046 47.0872 23.5988 50.2164 32.5228 47.0447C44.2195 42.8856 58.0198 33.5041 65.4574 23.2325C72.9442 12.8819 62.6179 11.1471 54.0272 13.1553Z"
                                  fill="#0d9488"
                                />
                              </svg>
                            </div>
            
                            {/* Image with play button */}
                            <div className="image-container">
                              <img
                                src={testimonials[currentSlide].image}
                                alt={`${testimonials[currentSlide].name} testimonial`}
                                className=" rounded-lg"
                              />
                              <button
                                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                                aria-label="Play testimonial video"
                                onClick={openVideoModal}
                              >
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                                  <HiPlay className="w-6 h-6 text-teal-600 ml-1" />
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
            
                        {/* Quote Container */}
                        <div className="w-full md:w-1/2">
                          <div className="text-[#F4A89A] text-5xl font-serif mb-4">"</div>
                          <div className="text-gray-700 space-y-4">
                            <p>{testimonials[currentSlide].quote}</p>
                          </div>
                          <div className="pt-6">
                            <p className="font-medium text-gray-900">— {testimonials[currentSlide].name}</p>
                            <p className="text-gray-600">{testimonials[currentSlide].title}</p>
                          </div>
                        </div>
                      </div>
            
                      {/* Navigation arrows */}
                      <button 
                        onClick={prevSlide} 
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 focus:outline-none md:-translate-x-20"
                        aria-label="Previous testimonial"
                      >
                        <HiChevronLeft className="w-8 h-8 text-gray-700" />
                      </button>
                      
                      <button 
                        onClick={nextSlide} 
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 focus:outline-none md:translate-x-20"
                        aria-label="Next testimonial"
                      >
                        <HiChevronRight className="w-8 h-8 text-gray-700" />
                      </button>
            
                      {/* Dot indicators */}
                      <div className="flex justify-center gap-2 mt-4 mb-4">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full ${
                              index === currentSlide ? 'bg-teal-600' : 'bg-gray-300'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
          </div>

          {showVideoModal && (
                    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                      <div className="bg-white rounded-xl overflow-hidden w-full max-w-4xl">
                        <div className="p-4 flex justify-between items-center border-b">
                          <h3 className="font-medium">Testimonial from {testimonials[currentSlide].name}</h3>
                          <button 
                            onClick={closeVideoModal}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <HiXMark className="w-6 h-6" />
                          </button>
                        </div>
                        <div className="aspect-video bg-black">
                          <video 
                            className="w-full h-full" 
                            controls 
                            autoPlay
                            src={testimonials[currentSlide].videoUrl}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </div>
                  )}
          
                  <style jsx>{`
                    .custom-frame-inverted {
                      position: relative;
                      width: 100%;
                      height: 320px;
                      border-radius: 24px;
                      background: linear-gradient(
                        90deg, 
                        white 0%, 
                        white 50%, 
                        #0d9488 50%, 
                        #0d9488 100%
                      );
                      padding: 16px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      overflow: visible;
                    }
                    
                    .image-container {
                      position: relative;
                      width: 82%;
                      height: 100%;
                      border-radius: 16px;
                      overflow: hidden;
                      background-color: white;
                      left: 14%;
                    }
          
                    .image-container img {
                        width: 100%;
                        height: 116%;
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
        </div>
      )}
    </>
  );
};

export default TestimonialModal;