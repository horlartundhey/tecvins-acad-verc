import React from 'react'

const AboutHeader = () => {
  return (
    <div className="w-full py-16 bg-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Container for text with gradient background */}
        <div className="relative rounded-lg p-8 overflow-hidden">
          {/* Gradient background element */}
          <div className="absolute left-[92px] top-[70%] -translate-y-1/2 w-48 h-48 bg-green-200 opacity-50 rounded-full blur-3xl"></div>
          
          {/* Text content */}
          <h1 className="text-[40px] font-semibold text-gray-900 relative z-10">About Us</h1>
          
          
        </div>
      </div>
    </div>
  )
}

export default AboutHeader