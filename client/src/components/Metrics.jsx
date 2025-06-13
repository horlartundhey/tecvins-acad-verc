import { Briefcase } from "lucide-react"
import { HiOutlineArrowRight, HiOutlineRocketLaunch, HiCalendarDays  , HiGlobeAlt, HiArrowLongRight } from "react-icons/hi2"
import { IoCalendarOutline } from "react-icons/io5"
import { IoEarthOutline } from "react-icons/io5"
import { IoBriefcaseOutline } from "react-icons/io5"
import { FaBriefcase } from "react-icons/fa";


const Metrics = () => {
  return (
    <section className="py-16 bg-[#1a4741]">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Our Success Metrics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Years */}
          <div className="bg-white p-8 rounded-lg flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <HiCalendarDays className="h-10 w-10 text-[#0072DF]" />
            </div>
            <p className="text-4xl font-bold text-[#1a4741] mb-2">6 Years</p>
            <p className="text-gray-600 text-center">of driving innovation and growth.</p>
          </div>

          {/* Students */}
          <div className="bg-white p-8 rounded-lg flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <HiGlobeAlt className="h-10 w-10 text-[#00BC85]" />
            </div>
            <p className="text-4xl font-bold text-[#1a4741] mb-2">500+</p>
            <p className="text-gray-600 text-center">Students empowered across 11 countries worldwide.</p>
          </div>

          {/* Graduates */}
          <div className="bg-white p-8 rounded-lg flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <FaBriefcase className="h-9 w-9 text-red-500" />
            </div>
            <p className="text-4xl font-bold text-[#1a4741] mb-2">85%</p>
            <p className="text-gray-600 text-center">of graduates secure employment or advance their careers.</p>
          </div>

          {/* Partners */}
          <div className="bg-white p-8 rounded-lg flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <svg width="35" height="35" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.657 7.87431L11.1693 5.36597C10.9304 5.12708 10.811 4.84697 10.811 4.52564C10.811 4.20431 10.9315 3.92309 11.1723 3.68197L13.663 1.17364C13.9001 0.934752 14.1818 0.815308 14.508 0.815308C14.8345 0.815308 15.12 0.935862 15.3647 1.17697L17.8527 3.68531C18.0916 3.9242 18.211 4.20431 18.211 4.52564C18.211 4.84697 18.0905 5.1282 17.8493 5.36931L15.359 7.87764C15.1219 8.11653 14.8401 8.23597 14.5137 8.23597C14.1875 8.23597 13.9019 8.11542 13.657 7.87431ZM1.71867 23.2563C1.37712 23.2563 1.09089 23.1409 0.860005 22.91C0.629116 22.6789 0.513672 22.3926 0.513672 22.0513V18.2563C0.513672 17.6119 0.732005 17.0662 1.16867 16.6193C1.60534 16.1722 2.13478 15.9401 2.75701 15.923H6.86734C7.26912 15.923 7.65078 16.0213 8.01234 16.218C8.37367 16.4146 8.66812 16.689 8.89567 17.041C9.55701 17.9503 10.377 18.658 11.3557 19.164C12.3343 19.67 13.3827 19.923 14.5007 19.923C15.6333 19.923 16.6909 19.67 17.6733 19.164C18.6558 18.658 19.4709 17.9503 20.1187 17.041C20.3733 16.689 20.6771 16.4146 21.03 16.218C21.3829 16.0213 21.7509 15.923 22.134 15.923H26.2443C26.8801 15.9401 27.4151 16.1722 27.8493 16.6193C28.2836 17.0662 28.5007 17.6119 28.5007 18.2563V22.0513C28.5007 22.3926 28.3851 22.6789 28.154 22.91C27.9231 23.1409 27.6369 23.2563 27.2953 23.2563H21.039C20.6977 23.2563 20.4115 23.1409 20.1803 22.91C19.9495 22.6789 19.834 22.3926 19.834 22.0513V20.1203C19.0733 20.7016 18.2399 21.1474 17.3337 21.4576C16.4274 21.7679 15.4821 21.923 14.4977 21.923C13.5357 21.923 12.602 21.7663 11.6967 21.453C10.7916 21.1396 9.95267 20.6929 9.18001 20.1126V22.0513C9.18001 22.3926 9.06456 22.6789 8.33367 22.91C8.60278 23.1409 8.31656 23.2563 7.97501 23.2563H1.71867ZM4.22034 14.077C3.21078 14.077 2.34701 13.718 1.62901 13C0.911005 12.282 0.552005 11.4182 0.552005 10.4086C0.552005 9.37886 0.911005 8.51064 1.62901 7.80397C2.34701 7.09708 3.21078 6.74364 4.22034 6.74364C5.24989 6.74364 6.11812 7.09708 6.82501 7.80397C7.53189 8.51064 7.88534 9.37886 7.88534 10.4086C7.88534 11.4182 7.53189 12.282 6.82501 13C6.11812 13.718 5.24989 14.077 4.22034 14.077ZM24.7843 14.077C23.7748 14.077 22.911 13.718 22.193 13C21.475 12.282 21.116 11.4182 21.116 10.4086C21.116 9.37886 21.475 8.51064 22.193 7.80397C22.911 7.09708 23.7748 6.74364 24.7843 6.74364C25.8139 6.74364 26.6821 7.09708 27.389 7.80397C28.0959 8.51064 28.4493 9.37886 28.4493 10.4086C28.4493 11.4182 28.0959 12.282 27.389 13C26.6821 13.718 25.8139 14.077 24.7843 14.077Z" fill="#807CFF"/>
            </svg>
            </div>
            <p className="text-4xl font-bold text-[#1a4741] mb-2">8</p>
            <p className="text-gray-600 text-center">
              Organizations partnered with to expand learning opportunities and impact.
            </p>
          </div>
        </div>

        {/* Mobile-optimized bottom section */}
        <div className="flex flex-col space-y-6">
          {/* Text with arrow - hidden on mobile, shown on desktop */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center text-white">
              <p className="text-xl font-medium">Numbers don't lie—be a part of our success story!</p>
              <HiArrowLongRight className="w-9 h-9 ml-5" />
            </div>
            <div className="flex gap-4 font-semibold">
              <a
                href="/support"
                className="px-6 py-[1.3rem] rounded-xl border border-white text-white hover:bg-white hover:text-[#1a4741] transition-colors"
              >
                Support Us
              </a>
              <a
                href="/courses"
                className="px-6 py-[1.3rem] rounded-xl bg-white text-[#1a4741] hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Begin your learning journey
                <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Mobile-optimized layout */}
          <div className="md:hidden">
            {/* Text section for mobile */}
            <div className="text-center mb-6">
              <p className="text-lg font-medium text-white leading-relaxed">
                Numbers don't lie—be a part of our success story!
              </p>
            </div>
            
            {/* Buttons for mobile - stacked */}
            <div className="flex flex-col space-y-4 font-semibold">
              <a
                href="/courses"
                className="w-full px-6 py-4 rounded-xl bg-white text-[#1a4741] hover:bg-gray-100 transition-colors flex items-center justify-center text-center"
              >
                Begin your learning journey
                <HiOutlineRocketLaunch className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/support"
                className="w-full px-6 py-4 rounded-xl border border-white text-white hover:bg-white hover:text-[#1a4741] transition-colors text-center"
              >
                Support Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Metrics
