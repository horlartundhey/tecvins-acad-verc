import React from 'react'

import { HiSparkles , HiGlobeAlt , HiUserGroup, HiArrowLongRight , HiArrowLongLeft, HiOutlineRocketLaunch   } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const WhyTecvinson = () => {
  return (
    <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4 max-w-7xl">
    <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e35] mb-12 text-left">Why Tecvinson Academy?</h2>

    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {/* Free Tech Training */}
      <div className="space-y-4 p-6 ">
        <div className="w-10 h-10 flex items-center justify-center text-[#FF6B6B]">
          <HiSparkles size={34} />
        </div>
        <h3 className="text-xl font-semibold text-[#1a2e35]">Free Tech Training</h3>
        <p className="text-gray-600">Access comprehensive, career-focused training programs at zero cost.</p>
      </div>

      {/* Global Opportunities */}
      <div className="space-y-4 p-6">
        <div className="w-10 h-10 flex items-center justify-center text-[#4ECDC4]">
          <HiGlobeAlt size={34} />
        </div>
        <h3 className="text-xl font-semibold text-[#1a2e35]">Global Opportunities</h3>
        <p className="text-gray-600">Connect with worldwide tech careers through our networks.</p>
      </div>

      {/* Supportive Community */}
      <div className="space-y-4 p-6 rounded-lg">
        <div className="w-10 h-10 flex items-center justify-center text-[#FFD166]">
          <HiUserGroup size={34} />
        </div>
        <h3 className="text-xl font-semibold text-[#1a2e35]">Supportive Community</h3>
        <p className="text-gray-600">Learn alongside peers and receive mentorship from industry experts.</p>
      </div>
    </div>

    <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <p className="text-xl font-medium text-[#1a2e35]">
              Unlock your potentials with training that stands out!
            </p>
            <HiArrowLongRight className="h-10 w-10 ml-2 text-[#1a2e35]" />
          </div>
          
          <div className="flex gap-4 font-semibold">
            <Link
              to="/support"
              className="px-6 py-2 rounded-lg border  border-gray-300 text-[#3B9790] hover:bg-gray-50 transition-colors"
            >
              Support Us
            </Link>
            <Link
              to="/courses"
              className="px-6 py-2 rounded-lg bg-[#3B9790] text-white hover:bg-[#3dbdb5] transition-colors flex items-center justify-center"
            >
              Begin your learning journey
              <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
  </div>
</section>
  )
}

export default WhyTecvinson