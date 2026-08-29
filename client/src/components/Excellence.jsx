import { useEffect, useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

const AWARDS = [
  {
    src: 'https://res.cloudinary.com/kamisama/image/upload/v1751678742/image_fx7h9r.png',
    alt: 'Afrocommunity Magazine award',
    label: 'Afrocommunity Magazine',
  },
  {
    src: 'https://res.cloudinary.com/kamisama/image/upload/v1751678858/image_bbkkx5.png',
    alt: 'African Fusion award',
    label: 'African Fusion',
  },
]

const Excellence = () => {
  const [activeAward, setActiveAward] = useState(null)

  // Close lightbox on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setActiveAward(null)
    }

    if (activeAward) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [activeAward])

  return (
    <section className="py-16 px-4 bg-[#FFF0EE]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-4xl text-[#B95F45] mb-6">
            Recognized for Excellence in Tech Education
          </h2>
          <p className="text-gray-700 max-w-4xl leading-relaxed text-sm">
            At Tecvinson Academy, our commitment to delivering top-tier tech training hasn't gone unnoticed. From local
            accolades to global recognitions, our impact in empowering the next generation of digital talent continues
            to earn trust and applause. These awards reflect the quality, innovation, and dedication that define our
            mission and the success of our students.
          </p>
        </div>

        {/* Awards Display */}
        <div className="flex flex-col sm:flex-row gap-6 md:gap-12">
          {AWARDS.map((award) => (
            <button
              key={award.label}
              type="button"
              onClick={() => setActiveAward(award)}
              aria-label={`View larger image of the ${award.label} award`}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center flex-1 cursor-zoom-in transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B95F45] focus-visible:ring-offset-2"
            >
              <div className="relative w-full max-w-sm h-48 sm:h-56 md:h-64 flex items-center justify-center mb-4">
                <img
                  src={award.src}
                  alt={award.alt}
                  className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <span className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>
              <p className="text-gray-600 text-sm font-medium underline group-hover:text-[#B95F45]">{award.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeAward && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[70] p-4"
          onClick={() => setActiveAward(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeAward.label}
        >
          <button
            onClick={() => setActiveAward(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex flex-col items-center max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeAward.src}
              alt={activeAward.alt}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-md bg-white"
            />
            <p className="text-white text-sm mt-4">{activeAward.label}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Excellence
