const Excellence = () => {
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
          {/* First Award */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center flex-1">
            <div className="w-full max-w-sm h-48 sm:h-56 md:h-64 flex items-center justify-center mb-4">
              <img
                src="https://res.cloudinary.com/kamisama/image/upload/v1751678742/image_fx7h9r.png"
                alt="Afrocommunity Magazine award"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm font-medium underline">Afrocommunity Magazine</p>
          </div>

          {/* Second Award */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center flex-1">
            <div className="w-full max-w-sm h-48 sm:h-56 md:h-64 flex items-center justify-center mb-4">
              <img
                src="https://res.cloudinary.com/kamisama/image/upload/v1751678858/image_bbkkx5.png"
                alt="African Fusion award"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm font-medium underline">African Fusion</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Excellence
