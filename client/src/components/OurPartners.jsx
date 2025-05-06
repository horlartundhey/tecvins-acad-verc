import React from 'react';
import redi from "../assets/partners_logo/redi.png";
import zan from "../assets/partners_logo/zan.png";
import afripay from "../assets/partners_logo/afripay.png";
import bm from "../assets/partners_logo/bm.png";
import qualip from "../assets/partners_logo/qualip.png";

const OurPartners = () => {
  const partners = [
    {
      name: "ReDI School of Digital Integration",
      logo: redi,
      alt: "ReDI School of Digital Integration logo"
    },
    {
      name: "Zanerio",
      logo: zan,
      alt: "Zanerio logo"
    },
    {
      name: "BiCom Thighs",
      logo: bm,
      alt: "BiCom Thighs logo"
    },
    {
      name: "AfriPay",
      logo: afripay,
      alt: "AfriPay logo"
    },
    {
      name: "QualiPro",
      logo: qualip,
      alt: "QualiPro logo"
    }
  ];

  // Duplicate the partners array to create a seamless loop
  const slidingPartners = [...partners, ...partners];

  return (
    <section className="py-10 sm:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a2e35] mb-8 sm:mb-12 md:mb-16 text-center md:text-left">
          Our Partners and Supporters
        </h2>
        
        {/* Sliding container */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-slide flex w-max">
            {slidingPartners.map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`} 
                className="flex-shrink-0 px-4 w-[200px] flex items-center justify-center"
              >
                <div className="h-20 w-full flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default OurPartners;