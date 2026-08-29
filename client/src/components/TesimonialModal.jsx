import { useState, useEffect } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { HiChevronLeft, HiChevronRight, HiPlay, HiXMark } from 'react-icons/hi2';
import { useTestimonials, isYouTubeUrl, getEmbedUrl, toParagraphs } from '../hooks/useTestimonials';

const TestimonialModal = ({ isOpen, onClose, title = 'Hear from some beneficiaries' }) => {
  const { testimonials, currentSlide, nextSlide, prevSlide, goToSlide } = useTestimonials();
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Close on escape and lock background scroll while open
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== 'Escape') return;
      if (showVideoModal) setShowVideoModal(false);
      else onClose?.();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, showVideoModal, onClose]);

  // Never leave the video playing behind a closed modal
  useEffect(() => {
    if (!isOpen) setShowVideoModal(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const current = testimonials[currentSlide];
  if (!current) return null;

  const renderVideoPlayer = (url) => {
    if (isYouTubeUrl(url)) {
      return (
        <iframe
          className="w-full h-full"
          src={getEmbedUrl(url)}
          title={`Testimonial from ${current.name}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }

    return (
      <video className="w-full h-full" controls autoPlay src={url}>
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Modal Content */}
        <div
          className="relative bg-white rounded-lg w-full max-w-[64rem] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900">{title}</h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close">
              <HiOutlineX className="w-6 h-6" />
            </button>
          </div>

          {/* Testimonial Content */}
          <div className="relative px-4 sm:px-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center p-2 sm:p-6">
              {/* Image / video trigger */}
              <div className="w-full md:w-1/2 relative">
                <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-video relative">
                  <img
                    src={current.image}
                    alt={`${current.name} testimonial`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                    aria-label={`Play video testimonial from ${current.name}`}
                    onClick={() => setShowVideoModal(true)}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center">
                      <HiPlay className="w-6 h-6 text-teal-600 ml-1" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Quote */}
              <div className="w-full md:w-1/2">
                <div className="text-[#F4A89A] text-5xl font-serif mb-4 leading-none">&ldquo;</div>
                <div className="text-gray-700 space-y-4 text-sm sm:text-base">
                  {toParagraphs(current.quote).map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">{paragraph}</p>
                  ))}
                </div>
                <div className="pt-6">
                  <p className="font-medium text-gray-900">- {current.name}</p>
                  <p className="text-gray-600">{current.title}</p>
                </div>
              </div>
            </div>

            {/* Navigation arrows - only useful with more than one testimonial */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 focus:outline-none"
                  aria-label="Previous testimonial"
                >
                  <HiChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 focus:outline-none"
                  aria-label="Next testimonial"
                >
                  <HiChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </button>
              </>
            )}
          </div>

          {/* Dot indicators */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-2 mb-6">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial._id || index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-teal-600' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 sm:p-4 flex justify-between items-center border-b">
              <h3 className="font-medium text-sm sm:text-base">Testimonial from {current.name}</h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close video"
              >
                <HiXMark className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              {renderVideoPlayer(current.videoUrl)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialModal;
