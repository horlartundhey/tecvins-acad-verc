import { HiOutlineRocketLaunch } from "react-icons/hi2"
import { Link } from "react-router-dom"
import journ from "../assets/images/journ.png"


const Journey = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Top Section - Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Humble Beginnings */}
        <div className="bg-[#FFE6E4] border-8 border-[#FFDBD8] p-4 rounded-2xl">
          <p className="text-[#1E1E1E] text-xl leading-relaxed">
            Our humble beginnings can be traced back to 2007, an interesting time in the global digital transformation
            journey. A quick throwback to that period brings back memories of consumer led demands for more convenient
            and connected societies, intense rivalry between companies, innovative agility as the main strategy to fend
            off competition in order to retain market share.
          </p>
        </div>

        {/* Center Column - Hero Image */}
        <div className="relative h-80 lg:h-auto rounded-2xl overflow-hidden">
          <img
            src={journ}
            alt="Silhouette of person against sunset sky"
            fill
            className="object-cover"
            crossOrigin="anonymous"
          />
        </div>

        {/* Right Column - Business Agility */}
        <div className="bg-[#FFE6E4] border-8 border-[#FFDBD8] p-4 rounded-2xl">
          <p className="text-[#1E1E1E] text-xl leading-relaxed">
            For most businesses, being agile meant focusing on key priorities like R&D as well as attracting and
            retaining a highly skilled tech workforce. This was such a bright strategy, until HR departments had to
            start searching for tech talents like they were trying to find needles in haystacks. The tech skill gap was
            a major challenge for HR departments globally.
          </p>
        </div>
      </div>

      {/* Bottom Section - Tecvinson Story */}
      <div className="bg-[#FFE6E4] border-8 border-[#FFDBD8] p-8 rounded-2xl">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#B95F45] mb-6">
          Tecvinson: Unlocking Career Possibilities in Tech for Everyone
        </h2>
        <p className="text-gray-700 leading-relaxed">
          It was during this transformative period that Vincent Oke began training people, helping them acquire tech
          skills and establishing the foundation for what would become Tecvinson Academy. Despite undergoing various
          phases of growth and change, Tecvinson's mission has remained clear: unlocking career possibilities in tech
          for everyone.
        </p>
      </div>

      {/* Call to Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4">

            <Link to="/courses" className="w-full md:w-auto order-3 md:order-none">
            <button className="w-full px-4 sm:px-6 py-[1.3rem] rounded-xl bg-[#3B9790] text-white hover:bg-teal-700 transition-colors flex items-center justify-center font-semibold">
              Begin your learning journey
              <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
            </button>
          </Link>

          
          <Link to="/support" className="w-full md:w-auto order-2 md:order-none">
            <button className="w-full px-4 sm:px-6 py-[1.3rem] rounded-xl border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors">
              Support Us
            </button>
          </Link>

          <Link to="/our-journey" className="w-full md:w-auto order-1 md:order-none">
            <button className="w-full px-4 sm:px-6 py-[1.3rem] rounded-xl border border-gray-300 text-[#3B9790] font-semibold hover:bg-gray-50 transition-colors">
              Learn More About Our Journey
            </button>
          </Link>
          
                    
        </div>
    </div>
  )
}

export default Journey