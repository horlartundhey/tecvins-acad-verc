import React, { useEffect, useRef, useState } from "react";
import { Rocket } from "lucide-react";

// Placeholders for images
import codingImage from "../assets/images/hero-code.png";
import designerImage from "../assets/images/hero-lady.png";
import vrImage from "../assets/images/hero-vr.png";
import studentImage from "../assets/images/hero-analyst.png";
import { HiCodeBracket, HiOutlineRocketLaunch, HiOutlineSparkles, HiSparkles } from "react-icons/hi2";
import { FiPenTool } from "react-icons/fi";

const Hero = () => {
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Check screen size
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let spheres = [];
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initSpheres();
    };

    // Initialize the gradient spheres - simplified for mobile
    const initSpheres = () => {
      if (!canvas) return;

      spheres = [];
      
      // Reduced number of spheres and smaller sizes for mobile
      const sphereCount = isMobile ? 3 : isTablet ? 4 : 6;
      const sizeFactor = isMobile ? 0.6 : isTablet ? 0.8 : 1;

      // Top left area
      if (sphereCount > 0) {
        spheres.push({
          x: canvas.width * 0.2,
          y: canvas.height * 0.2,
          radius: 180 * sizeFactor,
          color1: "#FBBF24",
          color2: "#FCD34D",
          opacity: 0.25,
          speedX: 0.2,
          speedY: 0.15,
          amplitude: canvas.width * 0.08,
          verticalAmplitude: canvas.height * 0.05,
          phase: 0,
          originalX: canvas.width * 0.2,
          originalY: canvas.height * 0.2,
        });
      }

      // Top right area
      if (sphereCount > 1) {
        spheres.push({
          x: canvas.width * 0.85,
          y: canvas.height * 0.15,
          radius: 160 * sizeFactor,
          color1: "#60A5FA",
          color2: "#93C5FD",
          opacity: 0.2,
          speedX: 0.15,
          speedY: 0.2,
          amplitude: canvas.width * 0.06,
          verticalAmplitude: canvas.height * 0.06,
          phase: 2,
          originalX: canvas.width * 0.85,
          originalY: canvas.height * 0.15,
        });
      }

      // Bottom left area
      if (sphereCount > 2) {
        spheres.push({
          x: canvas.width * 0.25,
          y: canvas.height * 0.8,
          radius: 200 * sizeFactor,
          color1: "#2DD4BF",
          color2: "#5EEAD4",
          opacity: 0.3,
          speedX: 0.1,
          speedY: 0.18,
          amplitude: canvas.width * 0.07,
          verticalAmplitude: canvas.height * 0.04,
          phase: 4,
          originalX: canvas.width * 0.25,
          originalY: canvas.height * 0.8,
        });
      }

      // Center right area
      if (sphereCount > 3) {
        spheres.push({
          x: canvas.width * 0.8,
          y: canvas.height * 0.6,
          radius: 220 * sizeFactor,
          color1: "#A78BFA",
          color2: "#C4B5FD",
          opacity: 0.25,
          speedX: 0.12,
          speedY: 0.1,
          amplitude: canvas.width * 0.05,
          verticalAmplitude: canvas.height * 0.07,
          phase: 1,
          originalX: canvas.width * 0.8,
          originalY: canvas.height * 0.6,
        });
      }

      // Additional spheres for desktop only
      if (sphereCount > 4) {
        spheres.push({
          x: canvas.width * 0.5,
          y: canvas.height * 0.3,
          radius: 150 * sizeFactor,
          color1: "#F87171",
          color2: "#FCA5A5",
          opacity: 0.2,
          speedX: 0.18,
          speedY: 0.13,
          amplitude: canvas.width * 0.09,
          verticalAmplitude: canvas.height * 0.03,
          phase: 3,
          originalX: canvas.width * 0.5,
          originalY: canvas.height * 0.3,
        });

        spheres.push({
          x: canvas.width * 0.6,
          y: canvas.height * 0.7,
          radius: 170 * sizeFactor,
          color1: "#34D399",
          color2: "#6EE7B7",
          opacity: 0.25,
          speedX: 0.14,
          speedY: 0.16,
          amplitude: canvas.width * 0.06,
          verticalAmplitude: canvas.height * 0.05,
          phase: 5,
          originalX: canvas.width * 0.6,
          originalY: canvas.height * 0.7,
        });
      }
    };

    // Draw and animate gradient spheres
    const drawSpheres = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      spheres.forEach((sphere) => {
        sphere.x = sphere.originalX + Math.sin(time * sphere.speedX + sphere.phase) * sphere.amplitude;
        sphere.y = sphere.originalY + Math.cos(time * sphere.speedY + sphere.phase) * sphere.verticalAmplitude;
        
        const pulseAmount = Math.sin(time * 1.5 + sphere.phase) * (isMobile ? 5 : 10);
        const currentRadius = sphere.radius + pulseAmount;
        
        const gradient = ctx.createRadialGradient(sphere.x, sphere.y, 0, sphere.x, sphere.y, currentRadius);
        const opacityAdjust = (Math.sin(time + sphere.phase) * 0.05) + sphere.opacity;
        const alpha1 = Math.floor(opacityAdjust * 255).toString(16).padStart(2, "0");
        
        gradient.addColorStop(0, `${sphere.color1}${alpha1}`);
        gradient.addColorStop(1, `${sphere.color2}00`);
        
        ctx.beginPath();
        ctx.arc(sphere.x, sphere.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
      });

      animationFrameId = window.requestAnimationFrame(drawSpheres);
    };

    // Initialize
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawSpheres();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, isTablet]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const Button = ({ children, className }) => (
    <button className={`inline-flex items-center justify-center ${className}`}>
      {children}
    </button>
  );

  return (
    <section className="bg-[#FAFAFA] py-8 md:py-16 pb-16 md:pb-32 relative overflow-hidden min-h-[600px] md:min-h-[800px]">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }} />

      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        {/* Decorative icons - positioned according to design */}
        {/* Sparkles icon - top left */}
        <div
          className={`absolute ${
            isMobile ? "top-0 left-[30px] -translate-x-1 -translate-y-1" : "top-0 left-1/2 -translate-x-40"
          } text-[#807CFF]`}
          style={{ zIndex: 3 }}
        >
          <HiOutlineSparkles className={`${isMobile ? "w-7 h-7" : "w-8 h-8"}`} />
        </div>

        {/* Code brackets icon - top right */}
        <div
          className={`absolute ${
            isMobile ? "top-0 right-[30px] translate-x-1 -translate-y-1" : "top-0 right-[15%]"
          } text-[#0072DF]`}
          style={{ zIndex: 3 }}
        >
          <HiCodeBracket className={`${isMobile ? "w-7 h-7" : "w-8 h-8"}`} />
        </div>

        {/* Graduation cap icon - bottom left */}
        <div
          className={`absolute ${
            isMobile ? "bottom-[10%] left-[30px] -translate-x-1" : "top-[35%] left-[15%]"
          } text-[#3BC9A0]`}
          style={{ zIndex: 3 }}
        >
          <svg width="30" height="30" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.74046 22.0542C5.24907 21.7809 4.86393 21.412 4.58504 20.9475C4.30615 20.4831 4.16671 19.9621 4.16671 19.3846V12.1538L0.840044 10.3142C0.566433 10.1581 0.365599 9.96822 0.237544 9.74461C0.10921 9.52127 0.0450439 9.27294 0.04573 8.99961C0.0450439 8.72627 0.10921 8.47808 0.237544 8.25502C0.365599 8.03169 0.566433 7.84197 0.840044 7.68586L13.565 0.752523C13.7909 0.626967 14.0235 0.534744 14.263 0.475856C14.5024 0.417244 14.7481 0.387939 15 0.387939C15.252 0.387939 15.4977 0.417244 15.7371 0.475856C15.9766 0.534744 16.2095 0.626828 16.4359 0.752106L30.8075 8.57377C31.0639 8.71266 31.2606 8.90044 31.3975 9.13711C31.5342 9.37405 31.6025 9.62961 31.6025 9.90377V19.7371C31.6025 20.0913 31.4827 20.3882 31.243 20.6279C31.0032 20.8674 30.7063 20.9871 30.3521 20.9871C29.9977 20.9871 29.7009 20.8674 29.4617 20.6279C29.2223 20.3882 29.1025 20.0913 29.1025 19.7371V10.3846L25.8334 12.1538V19.3846C25.8334 19.9621 25.6939 20.4831 25.415 20.9475C25.1362 21.412 24.751 21.7809 24.2596 22.0542L16.4392 26.2821C16.2106 26.4102 15.9766 26.5036 15.7371 26.5625C15.4977 26.6211 15.252 26.6504 15 26.6504C14.7481 26.6504 14.5024 26.6211 14.263 26.5625C14.0235 26.5036 13.7895 26.4102 13.5609 26.2821L5.74046 22.0542ZM14.8075 15.0704C14.8825 15.1132 14.9493 15.1346 15.008 15.1346C15.0668 15.1346 15.1337 15.1132 15.2084 15.0704L26.4009 9.00002L15.2084 2.94544C15.1337 2.90266 15.0668 2.88127 15.008 2.88127C14.9493 2.88127 14.8825 2.90266 14.8075 2.94544L3.59921 9.00002L14.8075 15.0704ZM14.7917 24.1184C14.8664 24.1611 14.9359 24.1825 15 24.1825C15.0642 24.1825 15.1337 24.1611 15.2084 24.1184L23.093 19.8588C23.1785 19.8054 23.2399 19.7441 23.2771 19.6746C23.3146 19.6052 23.3334 19.517 23.3334 19.41V13.4871L16.4646 17.2596C16.236 17.3877 15.9989 17.4811 15.7534 17.54C15.5075 17.5989 15.2564 17.6284 15 17.6284C14.7437 17.6284 14.4925 17.5989 14.2467 17.54C14.0012 17.4811 13.7641 17.3877 13.5355 17.2596L6.66671 13.4871V19.41C6.66671 19.4956 6.68546 19.5785 6.72296 19.6588C6.76018 19.7388 6.82157 19.8054 6.90713 19.8588L14.7917 24.1184Z" fill="#3BC9A0"/>
            </svg>
        </div>

        {/* Pen tool icon - bottom right */}
        <div
          className={`absolute ${
            isMobile ? "bottom-[10%] right-[30px] translate-x-1" : "top-[60%] right-[15%]"
          } text-[#FFA500]`}
          style={{ zIndex: 3 }}
        >
          <FiPenTool className={`${isMobile ? "w-7 h-7" : "w-8 h-8"}`} />
        </div>

        {/* Hero content */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16 pt-10 sm:pt-12">
          <h1 className="text-[1.5rem] xs:text-[1.875rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[3.75rem] font-bold mb-3 sm:mb-4 px-2 leading-tight">
            Ready to Work in <span className="text-amber-500">Tech</span>?
            <br className="hidden sm:block" />
            We'll Get You There.
          </h1>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2 sm:px-0 ">
            You're in the right place to unlock your potential in tech. Join our free training program to acquire
            in-demand skills and launch a fulfilling career in the global tech industry.
          </p>
          <div className="mt-6 md:mt-8">
            <Button className="bg-[#3B9790] hover:bg-teal-600 text-white px-5 py-[1rem] sm:px-6 sm:py-[1.3rem] md:px-8 md:py-[1rem] rounded-xl text-sm sm:text-base md:text-lg font-medium shadow-md transition duration-300 flex items-center mx-auto">
              Begin your learning journey
              <HiOutlineRocketLaunch className="ml-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Career path images with curved line section */}
      <div className="relative mt-12 md:mt-20 mb-8">
        {/* Simplified curved line for mobile */}
        <div className="absolute inset-x-0 w-full" style={{ zIndex: 1 }}>
          <div className="relative w-full left-0 right-0">
            <svg
              className="w-full h-20 md:h-32"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d={isMobile ? "M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60" : "M0,60 C250,-40 350,160 600,60 C850,-40 950,160 1200,60"} 
                stroke="#F87171" 
                strokeWidth={isMobile ? "3" : "4"} 
                fill="none" 
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))"
                }}
              />
            </svg>
          </div>
        </div>

        {/* Images container */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 relative z-10">
            {/* Image 1 - Student (Red) */}
            <div
              className={`w-full aspect-square bg-red-200 rounded-lg md:rounded-xl overflow-hidden transform transition-all duration-3000 ease-in-out relative image-card image-card-red ${
                imagesLoaded ? "translate-y-0" : "translate-y-4 sm:translate-y-8"
              }`}
              style={{
                animation: imagesLoaded ? "float-up 4s ease-in-out infinite" : "none",
                boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={designerImage}
面膜
                alt="Software Developer Student"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 - Coding (Purple) */}
            <div
              className={`w-full aspect-square bg-purple-300 rounded-lg md:rounded-xl overflow-hidden transform transition-all duration-3000 ease-in-out relative image-card image-card-purple ${
                imagesLoaded ? "translate-y-0" : "translate-y-4 sm:translate-y-8"
              }`}
              style={{
                animation: imagesLoaded ? "float-down 4s ease-in-out infinite" : "none",
                boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={codingImage}
                alt="Programming Code"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 3 - Designer (Orange) */}
            <div
              className={`w-full aspect-square bg-orange-200 rounded-lg md:rounded-xl overflow-hidden transform transition-all duration-3000 ease-in-out relative image-card image-card-orange ${
                imagesLoaded ? "translate-y-0" : "translate-y-4 sm:translate-y-8"
              }`}
              style={{
                animation: imagesLoaded ? "float-up 4s ease-in-out infinite" : "none",
                boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={studentImage}
                alt="UI/UX Designer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 4 - VR/AR (Teal) */}
            <div
              className={`w-full aspect-square bg-teal-200 rounded-lg md:rounded-xl overflow-hidden transform transition-all duration-3000 ease-in-out relative image-card image-card-teal ${
                imagesLoaded ? "translate-y-0" : "translate-y-4 sm:translate-y-8"
              }`}
              style={{
                animation: imagesLoaded ? "float-down 4s ease-in-out infinite" : "none",
                boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={vrImage}
                alt="VR Technology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes float-up {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(${isMobile ? '-10px' : '-20px'}); }
          }
          
          @keyframes float-down {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(${isMobile ? '10px' : '20px'}); }
          }

          @keyframes glow-overlay-up {
            0%, 100% { 
              opacity: 0.3;
            }
            50% { 
              opacity: 0.7;
            }
          }

          @keyframes glow-overlay-down {
            0%, 100% { 
              opacity: 0.3;
            }
            50% { 
              opacity: 0.7;
            }
          }

          .image-card {
            position: relative;
          }

          .image-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            z-index: 1;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }

          .image-card-red::before {
            background: linear-gradient(45deg, rgba(239, 68, 68, 0.5), rgba(239, 68, 68, 0.2));
            animation: glow-overlay-up 4s ease-in-out infinite;
          }

          .image-card-purple::before {
            background: linear-gradient(45deg, rgba(167, 139, 250, 0.5), rgba(167, 139, 250, 0.2));
            animation: glow-overlay-down 4s ease-in-out infinite;
          }

          .image-card-orange::before {
            background: linear-gradient(45deg, rgba(251, 146, 60, 0.5), rgba(251, 146, 60, 0.2));
            animation: glow-overlay-up 4s ease-in-out infinite;
          }

          .image-card-teal::before {
            background: linear-gradient(45deg, rgba(45, 212, 191, 0.5), rgba(45, 212, 191, 0.2));
            animation: glow-overlay-down 4s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Hero;