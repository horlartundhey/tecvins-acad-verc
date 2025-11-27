"use client"

import { useState, useEffect } from "react"
import { FaRegHandPointRight } from "react-icons/fa6"
import { HiBell } from "react-icons/hi2"

const Banner = ({
  title = "Tecvinson Academy 5-Month Frontend Training",
  description = "HTML, CSS, JavaScript",
  startDate = "Tue, 2nd Sept 2025",
  schedule = "Tue & Thu (18:00-20:00 WAT)",
  endDate = "2025-08-22T23:59:59Z", // Application deadline
  onApply,
  onDismiss,
  dismissible = true,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const targetDate = new Date(endDate).getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  const handleDismiss = () => {
    setIsVisible(false)
    if (onDismiss) {
      onDismiss()
    }
  }

  const handleApply = () => {
    // Open the application form in a new tab
    window.open("https://forms.office.com/e/A5YFCVrNtT", "_blank")

    if (onApply) {
      onApply()
    }
  }

  if (!isVisible) return null

  const formatTime = (value) => value.toString().padStart(2, "0")

  return (
    <div className={`bg-[#B7E5E1] text-[#1E1E1E] pt-3 sm:py-4 shadow-sm border-b ${className}`}>
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0 py-2 ">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex-shrink-0 mt-1 sm:mt-0">
              <HiBell className="h-5 w-5 sm:h-4 sm:w-[14.68px] text-[#1E4C48]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm sm:text-[14px] text-gray-800 font-inter">
                <div className="font-medium mb-1 sm:mb-0 sm:inline">{title}</div>
                <div className="flex flex-col sm:inline sm:space-x-0 space-y-1 sm:space-y-0">
                  <span className="sm:hidden">📚 {description}</span>
                  <span className="sm:hidden">📅 Starts: {startDate}</span>
                  <span className="sm:hidden">⏰ {schedule}</span>

                  <span className="hidden sm:inline">
                    <span className="mx-2">|</span>
                    <span>{description}</span>
                    <span className="mx-2">|</span>
                    <span>Starts: {startDate}</span>
                    <span className="mx-2">|</span>
                    <span>{schedule}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="border-2 border-[#4ABDB4] rounded-lg px-3 py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs sm:text-xs text-[#1E1E1E] font-medium font-inter">Application ends in</span>
                <FaRegHandPointRight className="h-4 w-4 text-[#1E1E1E]" />
              </div>

              <div className="bg-teal-50 px-3 py-2 sm:px-2 sm:py-1 rounded text-lg sm:text-xl font-inter font-bold text-[#0F2624] text-center">
                {formatTime(timeLeft.days)}d:{formatTime(timeLeft.hours)}h:{formatTime(timeLeft.minutes)}m:
                {formatTime(timeLeft.seconds)}s
              </div>
            </div>

            <button
              onClick={handleApply}
              className="bg-white text-[#3B9790] hover:bg-gray-50 active:bg-gray-100 border border-[#C8C8C8] px-6 py-3 sm:px-4 sm:py-2 rounded-[16px] text-sm sm:text-[14px] font-semibold font-montserrat transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:ring-offset-2 w-full sm:w-auto min-h-[44px] sm:min-h-0"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
