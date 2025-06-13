import React from 'react';
import { HiSparkles, HiGlobeAlt, HiUserGroup, HiArrowLongRight, HiOutlineRocketLaunch } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const WhyTecvinson = () => {
  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <h2 className="text-2xl md:text-4xl font-bold text-[#1a2e35] mb-8 md:mb-12 text-left">
          Why Tecvinson Academy?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Free Tech Training */}
          <div className="space-y-3 p-4 md:p-6 bg-white rounded-lg shadow-sm">
            <div className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-[#FF6F61]">
              <HiSparkles size={28} className="md:w-36 md:h-36" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-[#1a2e35]">Free Tech Training</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Access comprehensive, career-focused training programs at zero cost.
            </p>
          </div>

          {/* Global Opportunities */}
          <div className="space-y-3 p-4 md:p-6 bg-white rounded-lg shadow-sm">
            <div className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-[#00BC85]">
              <HiGlobeAlt size={28} className="md:w-36 md:h-36" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-[#1a2e35]">Global Opportunities</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Connect with worldwide tech careers through our networks.
            </p>
          </div>

          {/* Supportive Community */}
          <div className="space-y-3 p-4 md:p-6 bg-white rounded-lg shadow-sm">
            <div className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-[#DEA600]">
              <HiUserGroup size={28} className="md:w-36 md:h-36" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-[#1a2e35]">Supportive Community</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Learn alongside peers and receive mentorship from industry experts.
            </p>
          </div>
        </div>

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
    </section>
  );
}

export default WhyTecvinson;