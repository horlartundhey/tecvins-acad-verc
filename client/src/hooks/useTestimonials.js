import { useState, useEffect } from 'react';
import api from '../services/api';

// Fallback data used while loading or if the API is unavailable
export const FALLBACK_TESTIMONIALS = [
  {
    _id: 'fallback-1',
    image: "https://res.cloudinary.com/dwgyu7pr9/image/upload/v1749836961/gloria_pon7wq.png",
    quote: [
      "The hands-on approach at Tecvinson Academy gave me practical skills that I use every day.",
      "The curriculum is up-to-date with industry standards, and the career support helped me connect with top employers in the field."
    ],
    name: "Gloria Ondieki",
    title: "Graduate, Web Development Program",
    videoUrl: "https://res.cloudinary.com/dwgyu7pr9/video/upload/v1749835087/Tecvinson_Academy_Gloria_Ondieki_szuhrc.mp4"
  },
  {
    _id: 'fallback-2',
    image: "https://res.cloudinary.com/dwgyu7pr9/image/upload/v1749836961/clifford_yifuaq.png",
    quote: [
      "Enrolling at Tecvinson Academy was one of the best decisions I've ever made! The instructors were incredibly knowledgeable and always willing to help, making the learning experience truly enjoyable."
    ],
    name: "Clifford Tochi",
    title: "Student at Tecvinson Academy",
    videoUrl: "https://res.cloudinary.com/dwgyu7pr9/video/upload/v1749835078/Tecvinson_Academy_Clifford_Tochi_jb9lx9.mp4"
  }
];

export const isYouTubeUrl = (url) => url?.includes('youtube.com') || url?.includes('youtu.be');

export const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const getEmbedUrl = (url) => {
  if (isYouTubeUrl(url)) {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  }
  return url;
};

// The API stores `quote` as an array of paragraphs, but older/manual records
// may hold a single string - always hand back an array so callers can map
export const toParagraphs = (quote) => {
  if (Array.isArray(quote)) return quote;
  return quote ? [quote] : [];
};

// Shared by the Testimonials section and the "Hear from some beneficiaries"
// modal so both always show the same real data
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/testimonials');
        const data = res.data.data;
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
          setCurrentSlide(0);
        }
      } catch {
        // Keep fallback data - no visible error needed on public pages
      }
    };
    fetchTestimonials();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => setCurrentSlide(index);

  return { testimonials, currentSlide, nextSlide, prevSlide, goToSlide };
};
