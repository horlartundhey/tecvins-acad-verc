import React, { useState } from 'react'
import { HiOutlineRocketLaunch } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const Impactvi = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoUrl = "https://www.youtube.com/embed/0CWeD3uB9qc"; // Update this with your actual video URL

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };
  return (
    <>
    <div className='relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden container mx-auto font-montserrat'>
    <div className=''>    
        {/* Heading */}
      <div className="mb-16">
        <p className="text-[32px] text-[#0F2624] font-semibold">
          Watch this short video to see our journey, the impact so far, and why your contribution matters.
        </p>
      </div>

      {/* Layout */}
      <div className="relative flex items-center justify-center mb-16 sm:mb-20 lg:mb-28 px-4 sm:px-6">
        {/* Left teal - Hidden on mobile */}
        <div className="hidden lg:block absolute left-0 h-[554px] w-[313px] bg-teal-400 rounded-l-2xl"></div>

        {/* Right teal - Hidden on mobile */}
        <div className="hidden lg:block absolute right-0 h-[554px] w-[313px] bg-teal-400 rounded-r-2xl"></div>

        {/* Video container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl shadow-lg aspect-video w-full cursor-pointer" onClick={openVideoModal}>
            <img
              src="https://res.cloudinary.com/kamisama/image/upload/v1758856494/cropp-tecv_b3twji.jpg" // replace with your thumbnail
              alt="Impact Video"
              className="w-full h-full object-cover"
            />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l4.5-2.5a.5.5 0 0 0 0-.814l-4.5-2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div>
        <h2 className="text-[32px] font-semibold text-[#0F2624] mb-6">
        2026 Cohort: The Ask (what we’ll do with your funding)
      </h2>

      {/* Top row: 2 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">
        {/* At a glance */}
        <div className="flex rounded-xl overflow-hidden shadow border-[#4ABDB4] border-4">
          {/* Icon panel */}
          <div className="bg-[#DBF2F0] flex items-center justify-center w-[140px]">
            {/* Example icon (Heroicons) */}
            <svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M93.0021 27.9812C98.2058 38.8646 99.1937 51.2899 95.775 62.8588C92.3564 74.4278 84.7735 84.3204 74.49 90.6272C64.2064 96.9341 51.9512 99.2083 40.0895 97.0107C28.2278 94.8131 17.6006 88.2997 10.2589 78.7275C2.91722 69.1552 -0.618515 57.2028 0.334106 45.1769C1.28673 33.1511 6.66018 21.9044 15.4174 13.6074C24.1746 5.31045 35.6947 0.551401 47.7545 0.248769C59.8142 -0.0538623 71.5585 4.12138 80.7209 11.9687L91.3474 1.33741C92.0511 0.63376 93.0054 0.238453 94.0005 0.238453C94.9957 0.238453 95.95 0.63376 96.6537 1.33741C97.3573 2.04107 97.7526 2.99542 97.7526 3.99054C97.7526 4.98565 97.3573 5.94001 96.6537 6.64366L67.563 35.739L49.8865 53.4155L38.6599 64.6421C41.5623 66.5618 44.9417 67.6359 48.4198 67.7443C51.898 67.8526 55.3377 66.9909 58.3539 65.2556C61.3702 63.5203 63.844 60.9798 65.4986 57.9185C67.1532 54.8572 67.9232 51.3958 67.7224 47.9218C67.6665 46.9272 68.0079 45.9512 68.6716 45.2084C69.3353 44.4655 70.2669 44.0168 71.2615 43.9609C72.2561 43.9049 73.2321 44.2463 73.9749 44.91C74.7177 45.5738 75.1665 46.5054 75.2224 47.4999C75.5249 52.8099 74.2072 58.0866 71.4439 62.631C68.6806 67.1754 64.602 70.7733 59.7484 72.948C54.8947 75.1228 49.4949 75.7718 44.2641 74.8092C39.0333 73.8467 34.2183 71.3179 30.4568 67.5577C25.7786 62.862 23.05 56.5703 22.8189 49.9459C22.5879 43.3215 24.8715 36.855 29.2112 31.8447C33.5509 26.8344 39.6254 23.6514 46.2149 22.9348C52.8045 22.2181 59.4212 24.0209 64.7365 27.9812L75.3912 17.3077C67.5762 10.8193 57.6395 7.44692 47.4895 7.83839C37.3396 8.22986 27.6922 12.3575 20.4002 19.4287C13.1082 26.4998 8.68573 36.0157 7.98231 46.1488C7.27888 56.2819 10.3441 66.3176 16.5891 74.3284C22.8342 82.3393 31.8187 87.7604 41.8172 89.5505C51.8157 91.3407 62.123 89.3736 70.7596 84.0272C79.3962 78.6808 85.7529 70.332 88.609 60.5843C91.465 50.8366 90.619 40.3774 86.2334 31.2155C85.8045 30.3179 85.7497 29.2867 86.0811 28.3488C86.4125 27.4108 87.103 26.6429 88.0005 26.214C88.8981 25.7851 89.9294 25.7303 90.8673 26.0617C91.8053 26.3931 92.5732 27.0836 93.0021 27.9812Z" fill="#2C716C"/>
            </svg>
          </div>
          {/* Text panel */}
          <div className="bg-white p-6 flex-1">
            <h3 className="font-semibold text-[24px] mb-4 text-[#1E4C48]">
              At a glance
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[#1E4C48]">
              <li>Train <span className="font-semibold">500 learners</span>  across <span className="font-semibold">14 tracks </span>(8–9 months)</li>
              <li><span className="font-semibold">≤ 1:15 </span>mentor ratio</li>
              <li><span className="font-semibold">≥ 45% </span>women</li>
              <li>Need-based <span className="font-semibold">laptops/data</span></li>
              <li>Career support: mock interviews, portfolio/CV, employer sessions</li>
            </ul>
          </div>
        </div>

        {/* KPIs */}
        <div className="flex rounded-xl overflow-hidden shadow border-[#B6A78E] border-4">
          {/* Icon panel */}
          <div className="bg-[#FFF2D9] flex items-center justify-center w-[140px]">
            <svg width="98" height="87" viewBox="0 0 98 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M97.75 82.5C97.75 83.4946 97.3549 84.4484 96.6517 85.1517C95.9484 85.8549 94.9946 86.25 94 86.25H4C3.00544 86.25 2.05161 85.8549 1.34835 85.1517C0.645088 84.4484 0.25 83.4946 0.25 82.5C0.25 81.5054 0.645088 80.5516 1.34835 79.8483C2.05161 79.1451 3.00544 78.75 4 78.75H7.75V48.75C7.75 47.7554 8.14509 46.8016 8.84835 46.0983C9.55161 45.3951 10.5054 45 11.5 45H22.75C23.7446 45 24.6984 45.3951 25.4016 46.0983C26.1049 46.8016 26.5 47.7554 26.5 48.75V78.75H34V26.25C34 25.2554 34.3951 24.3016 35.0984 23.5984C35.8016 22.8951 36.7554 22.5 37.75 22.5H52.75C53.7446 22.5 54.6984 22.8951 55.4017 23.5984C56.1049 24.3016 56.5 25.2554 56.5 26.25V78.75H64V3.75C64 2.75544 64.3951 1.80161 65.0983 1.09835C65.8016 0.395089 66.7554 0 67.75 0H86.5C87.4946 0 88.4484 0.395089 89.1517 1.09835C89.8549 1.80161 90.25 2.75544 90.25 3.75V78.75H94C94.9946 78.75 95.9484 79.1451 96.6517 79.8483C97.3549 80.5516 97.75 81.5054 97.75 82.5Z" fill="#BE7700"/>
                </svg>
          </div>
          {/* Text panel */}
          <div className="bg-white p-6 flex-1">
            <h3 className="font-semibold text-[24px] mb-4 text-[#875400]">
              KPIs we commit to
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[#875400]">
              <li>Retention ≥ <span className="font-semibold">80%</span> (S1–2),<span className="font-semibold"> ≥ 70% </span> (S2–3), ≥ <span className="font-semibold"> 60%</span> graduate</li>
              <li><span className="font-semibold">60+ </span> capstone projects (demo/POC)</li>
              <li><span className="font-semibold">150+ </span> internships/job offers within <span className="font-semibold">6–12 months</span></li>
              <li>NPS ≥ <span className="font-semibold">60</span></li>
              <li>≥ <span className="font-semibold">45%</span> women participation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

       {/* Title */}
      

      {/* Budget card */}
      <div className="flex rounded-xl overflow-hidden shadow border-[#A9A7FF] border-4 mb-16">
        {/* Icon panel */}
        <div className="bg-purple-100 flex items-center justify-center w-[140px]">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60.0422 26.8971C60.2523 23.9869 61.2134 21.1809 62.8317 18.753C64.4499 16.3251 66.6701 14.3583 69.2753 13.0446C71.8806 11.7309 74.782 11.1151 77.6963 11.2574C80.6106 11.3997 83.4382 12.2952 85.9031 13.8565C86.1849 14.0408 86.4119 14.2977 86.5601 14.6001C86.7084 14.9025 86.7724 15.2393 86.7456 15.575C86.7187 15.9107 86.6019 16.233 86.4075 16.5079C86.2131 16.7829 85.9482 17.0005 85.6406 17.1377C81.3557 19.0655 77.7184 22.1894 75.1657 26.1341C72.6129 30.0788 71.2533 34.6766 71.25 39.3752C71.25 39.9236 71.25 40.4721 71.3063 41.0111C71.3321 41.3519 71.2643 41.6932 71.1103 41.9982C70.9563 42.3032 70.7218 42.5603 70.4323 42.7418C70.1427 42.9232 69.8091 43.0221 69.4675 43.0277C69.1258 43.0333 68.7891 42.9455 68.4938 42.7736C65.7313 41.1935 63.4719 38.8644 61.9765 36.0552C60.4811 33.246 59.8105 30.0711 60.0422 26.8971ZM112.5 75.2861C112.507 77.429 111.913 79.5308 110.786 81.3535C109.66 83.1762 108.045 84.6468 106.125 85.5986L105.919 85.6924L87.7172 93.4455C87.5373 93.5247 87.3506 93.5875 87.1594 93.633L57.1594 101.133C56.8623 101.209 56.5568 101.249 56.25 101.25H7.5C5.51088 101.25 3.60322 100.46 2.1967 99.0535C0.790176 97.647 0 95.7393 0 93.7502V75.0002C0 73.0111 0.790176 71.1034 2.1967 69.6969C3.60322 68.2904 5.51088 67.5002 7.5 67.5002H20.9484L31.5516 56.8924C32.9419 55.4958 34.5952 54.3886 36.4159 53.6348C38.2367 52.8809 40.1887 52.4953 42.1594 52.5002H65.625C67.6058 52.5 69.561 52.9481 71.344 53.811C73.1269 54.6739 74.6915 55.9291 75.9204 57.4827C77.1492 59.0362 78.0105 60.8478 78.4397 62.7815C78.8688 64.7153 78.8547 66.7211 78.3984 68.6486L98.0109 64.1393C99.7183 63.6871 101.507 63.6331 103.238 63.9813C104.97 64.3295 106.598 65.0706 107.998 66.1476C109.398 67.2246 110.532 68.6086 111.313 70.193C112.093 71.7774 112.499 73.5199 112.5 75.2861ZM105 75.2861C104.999 74.6661 104.856 74.0545 104.581 73.4989C104.306 72.9433 103.906 72.4585 103.413 72.0822C102.921 71.7059 102.348 71.4482 101.739 71.3291C101.131 71.2101 100.503 71.2328 99.9047 71.3955L99.7594 71.433L68.3531 78.6565C68.0777 78.718 67.7963 78.7494 67.5141 78.7502H52.5C51.5054 78.7502 50.5516 78.3551 49.8484 77.6519C49.1451 76.9486 48.75 75.9948 48.75 75.0002C48.75 74.0056 49.1451 73.0518 49.8484 72.3486C50.5516 71.6453 51.5054 71.2502 52.5 71.2502H65.625C67.1168 71.2502 68.5476 70.6576 69.6025 69.6027C70.6574 68.5478 71.25 67.1171 71.25 65.6252C71.25 64.1334 70.6574 62.7026 69.6025 61.6477C68.5476 60.5928 67.1168 60.0002 65.625 60.0002H42.1594C41.1741 59.9971 40.198 60.1898 39.2879 60.5672C38.3778 60.9446 37.5517 61.4992 36.8578 62.1986L26.25 72.8018V93.7502H55.7813L85.0453 86.433L102.858 78.8486C103.506 78.5071 104.049 77.9945 104.426 77.3664C104.804 76.7384 105.002 76.019 105 75.2861ZM78.75 39.3752C78.75 42.7128 79.7397 45.9754 81.594 48.7505C83.4482 51.5255 86.0837 53.6884 89.1672 54.9657C92.2507 56.2429 95.6437 56.5771 98.9172 55.926C102.191 55.2748 105.197 53.6676 107.557 51.3076C109.917 48.9476 111.525 45.9408 112.176 42.6674C112.827 39.3939 112.493 36.0009 111.215 32.9174C109.938 29.8339 107.775 27.1984 105 25.3442C102.225 23.4899 98.9626 22.5002 95.625 22.5002C91.1495 22.5002 86.8573 24.2781 83.6926 27.4428C80.5279 30.6075 78.75 34.8997 78.75 39.3752Z" fill="#3F3ACB"/>
            </svg>
        </div>
        {/* Text panel */}
        <div className="bg-white p-6 flex-1">
          <h3 className="font-semibold text-[24px] mb-4 text-[#040093]">
            Budget (USD) — total: $271,800
          </h3>
          <ul className="list-disc list-inside space-y-1 text-[#040093]">
            <li>Instruction & mentors <span className="font-semibold">$100,800</span></li>
            <li>Data stipends <span className="font-semibold">$40,000</span></li>
            <li>Laptops <span className="font-semibold">$45,000</span></li>
            <li>Platforms <span className="font-semibold">$15,000</span></li>
            <li>Career services <span className="font-semibold">$12,000</span></li>
            <li>Ops <span className="font-semibold">$25,000</span></li>
            <li>M&E <span className="font-semibold">$10,000</span></li>
            <li>Contingency <span className="font-semibold">$24,000</span></li>
          </ul>
          <p className="mt-4 text-sm text-[#040093]">
            <span className="font-semibold">Unit economics: ≈ $544/learner</span>, ≈{" "}
            <span className="font-semibold">$906/graduate</span> (60%)
          </p>
        </div>
      </div>

      <div className="mb-12 ">
        <h3 className="text-[32px] font-bold text-[#0F2624] mb-8">Ways to Partner</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Tier 1 */}
          <div className="bg-white border-4 border-[#F1F1F1] rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#1E4C48] rounded-full flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-4">
              1
            </div>
            <div className="space-y-2">
                <div className="text-xl font-semibold text-[#001533]">$5k
                    <span className="font-normal"> data for</span><span className="font-semibold"> 100 <br /> learners</span>
                </div>
              <div className="text-[#001533] text-xl">(1 month)</div>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="bg-white border-4 border-[#F1F1F1]  rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#1E4C48] rounded-full flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-4">
              2
            </div>
            <div className="space-y-2">
                <div className="text-xl font-semibold text-[#001533]">$25k              
                    <span className="font-semibold"> 50 laptops</span>
                </div>
              <div className="text-[#001533] text-xl">(need-based)</div>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="bg-white border-4 border-[#F1F1F1] rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#1E4C48] rounded-full flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-4">
              3
            </div>
            <div className="space-y-2">
              <div className="text-xl font-semibold text-[#001533]">$50k              
                <span className="font-semibold"> Track sponsor</span>
              </div>
              <div className="text-[#001533] text-xl">(trainers, tooling, showcase)</div>
            </div>
          </div>

          {/* Tier 4 */}
          <div className="bg-white border-4 border-[#F1F1F1] rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#1E4C48] rounded-full flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-4">
              4
            </div>
            <div className="space-y-2">
              <div className="text-xl font-semibold text-[#001533]">$100k+              
                <span className="font-semibold"> Title partner</span>
              </div>
              <div className="text-[#001533] text-xl">(named cohort, quarterly impact, talent pipeline)</div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom CTA Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-11 mb-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-2xl mx-auto">
          <Link to="/courses" className="w-full sm:w-auto order-2 sm:order-1">
            <button className="w-full px-4 sm:px-6 py-2 sm:py-[1.3rem] rounded-xl border border-gray-300 text-[#3B9790] font-semibold flex items-center justify-center hover: transition-colors text-base sm:text-lg">
              Begin your learning journey 
              <HiOutlineRocketLaunch className="ml-2 h-4 w-4 flex-shrink-0" />
            </button>
          </Link>
          <Link to="/support" className="w-full sm:w-auto order-1 sm:order-2">
            <button className="w-full px-4 sm:px-6 py-2 sm:py-[1.3rem] rounded-xl bg-[#3B9790] text-white hover:bg-teal-700 transition-colors  font-semibold text-base sm:text-lg">
              Support Us              
            </button>
          </Link>
        </div>
      </div>
    </div>    

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeVideoModal}>
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={closeVideoModal}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 z-10"
            >
              ✕
            </button>
            <div className="relative pb-[56.25%] h-0"> {/* 16:9 aspect ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`${videoUrl}?autoplay=1`}
                title="Tecvinson Academy Impact Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    
    </>
  )
}

export default Impactvi