
import { useEffect } from "react"
import { BsFillLaptopFill } from "react-icons/bs"
import { FaBriefcase } from "react-icons/fa"
import { HiGlobeAlt, HiUserGroup } from "react-icons/hi2"
import { MdLibraryBooks } from "react-icons/md"
import { PiCursorFill } from "react-icons/pi"
import { Link } from "react-router-dom"

const Difference = () => {

    useEffect(() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }, []);

    const GraduationCap = () => (   
  <svg width="100" height="100" viewBox="0 0 105 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M95 64V34.5L54.75 56.375C53.25 57.2083 51.6667 57.625 50 57.625C48.3333 57.625 46.75 57.2083 45.25 56.375L3 33.375C2.08333 32.875 1.4375 32.25 1.0625 31.5C0.6875 30.75 0.5 29.9167 0.5 29C0.5 28.0833 0.6875 27.25 1.0625 26.5C1.4375 25.75 2.08333 25.125 3 24.625L45.25 1.625C46 1.20833 46.7708 0.895833 47.5625 0.6875C48.3542 0.479167 49.1667 0.375 50 0.375C50.8333 0.375 51.6458 0.479167 52.4375 0.6875C53.2292 0.895833 54 1.20833 54.75 1.625L102.375 27.625C103.208 28.0417 103.854 28.6458 104.312 29.4375C104.771 30.2292 105 31.0833 105 32V64C105 65.4167 104.521 66.6042 103.562 67.5625C102.604 68.5208 101.417 69 100 69C98.5833 69 97.3958 68.5208 96.4375 67.5625C95.4792 66.6042 95 65.4167 95 64ZM45.25 86.375L20.25 72.875C18.5833 71.9583 17.2917 70.7083 16.375 69.125C15.4583 67.5417 15 65.8333 15 64V45L45.25 61.375C46.75 62.2083 48.3333 62.625 50 62.625C51.6667 62.625 53.25 62.2083 54.75 61.375L85 45V64C85 65.8333 84.5417 67.5417 83.625 69.125C82.7083 70.7083 81.4167 71.9583 79.75 72.875L54.75 86.375C54 86.7917 53.2292 87.1042 52.4375 87.3125C51.6458 87.5208 50.8333 87.625 50 87.625C49.1667 87.625 48.3542 87.5208 47.5625 87.3125C46.7708 87.1042 46 86.7917 45.25 86.375Z" fill="#1E4C48"/>
  </svg>  
);

const StarBadge = () => (
  <svg width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M53 65.375L62.625 71.125C63.5417 71.7083 64.4375 71.6875 65.3125 71.0625C66.1875 70.4375 66.5 69.5833 66.25 68.5L63.75 57.625L72.25 50.25C73.0833 49.5 73.3333 48.6042 73 47.5625C72.6667 46.5208 71.9167 45.9583 70.75 45.875L59.625 45L55.25 34.625C54.8333 33.625 54.0833 33.125 53 33.125C51.9167 33.125 51.1667 33.625 50.75 34.625L46.375 45L35.25 45.875C34.0833 45.9583 33.3333 46.5208 33 47.5625C32.6667 48.6042 32.9167 49.5 33.75 50.25L42.25 57.625L39.75 68.5C39.5 69.5833 39.8125 70.4375 40.6875 71.0625C41.5625 71.6875 42.4583 71.7083 43.375 71.125L53 65.375ZM36.25 93H23C20.25 93 17.8958 92.0208 15.9375 90.0625C13.9792 88.1042 13 85.75 13 83V69.75L3.375 60C2.45833 59 1.75 57.8958 1.25 56.6875C0.75 55.4792 0.5 54.25 0.5 53C0.5 51.75 0.75 50.5208 1.25 49.3125C1.75 48.1042 2.45833 47 3.375 46L13 36.25V23C13 20.25 13.9792 17.8958 15.9375 15.9375C17.8958 13.9792 20.25 13 23 13H36.25L46 3.375C47 2.45833 48.1042 1.75 49.3125 1.25C50.5208 0.75 51.75 0.5 53 0.5C54.25 0.5 55.4792 0.75 56.6875 1.25C57.8958 1.75 59 2.45833 60 3.375L69.75 13H83C85.75 13 88.1042 13.9792 90.0625 15.9375C92.0208 17.8958 93 20.25 93 23V36.25L102.625 46C103.542 47 104.25 48.1042 104.75 49.3125C105.25 50.5208 105.5 51.75 105.5 53C105.5 54.25 105.25 55.4792 104.75 56.6875C104.25 57.8958 103.542 59 102.625 60L93 69.75V83C93 85.75 92.0208 88.1042 90.0625 90.0625C88.1042 92.0208 85.75 93 83 93H69.75L60 102.625C59 103.542 57.8958 104.25 56.6875 104.75C55.4792 105.25 54.25 105.5 53 105.5C51.75 105.5 50.5208 105.25 49.3125 104.75C48.1042 104.25 47 103.542 46 102.625L36.25 93Z" 
      fill="#1E4C48"
    />
  </svg>
);

const StarBadgeWithArrow = () => (
  <svg width="113" height="113" viewBox="0 0 113 113" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M92.6975 -0.000262602C95.6225 -0.000262602 98 2.37724 98 5.30224V14.9997H107.697C108.746 14.9995 109.772 15.3104 110.644 15.893C111.516 16.4756 112.196 17.3039 112.597 18.2729C112.999 19.242 113.104 20.3083 112.899 21.337C112.694 22.3658 112.189 23.3107 111.447 24.0522L100.497 35.0022C98.8987 36.5975 96.7336 37.4954 94.475 37.4997H83.45L56.975 63.9747C55.9087 64.9683 54.4983 65.5093 53.0411 65.4836C51.5838 65.4578 50.1934 64.8675 49.1628 63.8369C48.1322 62.8063 47.5419 61.4159 47.5162 59.9587C47.4905 58.5014 48.0314 57.0911 49.025 56.0247L75.5 29.5497V18.5247C75.5 16.2672 76.4 14.0997 77.9975 12.4947L88.9475 1.54474C89.4383 1.05005 90.0226 0.657999 90.6664 0.391454C91.3102 0.124909 92.0007 -0.0108005 92.6975 -0.0077626M11.75 59.9997C11.7492 53.8838 13.1084 47.8441 15.7292 42.3181C18.35 36.7921 22.1668 31.9181 26.9032 28.0488C31.6396 24.1795 37.1772 21.4119 43.115 19.9463C49.0528 18.4807 55.2421 18.3538 61.235 19.5747C62.6894 19.8523 64.1946 19.5451 65.424 18.7199C66.6535 17.8948 67.5079 16.6181 67.8021 15.167C68.0963 13.7158 67.8064 12.2072 66.9954 10.9684C66.1844 9.72961 64.9177 8.86054 63.47 8.54974C52.4125 6.30164 40.9249 7.67591 30.7098 12.4689C20.4946 17.2619 12.0955 25.2185 6.75719 35.1595C1.41888 45.1006 -0.574514 56.4971 1.07242 67.66C2.71935 78.8228 7.91898 89.1581 15.9007 97.1339C23.8824 105.11 34.2214 110.302 45.3855 111.941C56.5496 113.579 67.9446 111.578 77.8817 106.232C87.8189 100.886 95.7693 92.4815 100.555 82.2628C105.34 72.0442 106.706 60.5556 104.45 49.4997C104.153 48.0377 103.287 46.7537 102.043 45.9302C100.799 45.1067 99.2783 44.8111 97.8162 45.1085C96.3542 45.4059 95.0702 46.2718 94.2467 47.5159C93.4232 48.76 93.1276 50.2802 93.425 51.7422C93.97 54.4072 94.245 57.1597 94.25 59.9997C94.25 70.9399 89.904 81.432 82.1682 89.1679C74.4323 96.9038 63.9402 101.25 53 101.25C42.0598 101.25 31.5677 96.9038 23.8318 89.1679C16.096 81.432 11.75 70.9399 11.75 59.9997ZM51.98 41.2797C53.4698 41.2002 54.8671 40.532 55.8643 39.4223C56.8615 38.3125 57.3771 36.8521 57.2975 35.3622C57.2179 33.8724 56.5498 32.4752 55.44 31.4779C54.3303 30.4807 52.8699 29.9652 51.38 30.0447C45.6194 30.3552 40.0705 32.32 35.3982 35.7037C30.7258 39.0874 27.1281 43.7465 25.0362 49.1227C22.9443 54.499 22.4469 60.3644 23.6036 66.0162C24.7602 71.668 27.5219 76.8664 31.5577 80.9886C35.5935 85.1109 40.7323 87.982 46.3583 89.2581C51.9843 90.5342 57.859 90.1611 63.2783 88.1835C68.6977 86.206 73.432 82.7078 76.9139 78.1081C80.3958 73.5085 82.4776 68.0024 82.91 62.2497C83.0204 60.7619 82.5352 59.2911 81.5612 58.161C80.5872 57.0308 79.2041 56.3339 77.7162 56.2235C76.2284 56.1131 74.7576 56.5983 73.6275 57.5723C72.4973 58.5463 71.8004 59.9294 71.69 61.4172C71.4164 65.0108 70.113 68.4494 67.9358 71.3213C65.7585 74.1933 62.7997 76.3769 59.4136 77.6108C56.0275 78.8447 52.3574 79.0766 48.8429 78.2787C45.3284 77.4808 42.1183 75.6869 39.5969 73.1118C37.0755 70.5368 35.3497 67.2896 34.626 63.759C33.9023 60.2285 34.2115 56.5642 35.5164 53.2048C36.8214 49.8454 39.0668 46.9332 41.984 44.817C44.9012 42.7007 48.3665 41.47 51.965 41.2722" 
      fill="#1E4C48"
    />
  </svg>
);

const RocketIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M111.947 8.9674C111.904 8.76012 111.803 8.56932 111.656 8.41739C111.508 8.26546 111.321 8.15869 111.115 8.10959C97.3875 4.75334 65.6695 16.7135 48.4851 33.8908C45.4202 36.931 42.626 40.2326 40.1344 43.758C34.8351 43.2893 29.5359 43.6807 25.0195 45.6494C12.2766 51.258 8.5664 65.8924 7.5328 72.1877C7.47418 72.5323 7.49629 72.8858 7.59741 73.2203C7.69852 73.5549 7.87588 73.8615 8.11554 74.1159C8.35519 74.3703 8.65061 74.5656 8.97855 74.6866C9.30649 74.8075 9.65801 74.8507 10.0055 74.8127L30.4687 72.5557C30.4833 74.0985 30.5764 75.6395 30.7477 77.1729C30.8506 78.2377 31.3233 79.2328 32.0836 79.9854L40.0078 87.8908C40.7612 88.65 41.7559 89.1225 42.8203 89.2268C44.3451 89.3972 45.8775 89.4902 47.4117 89.5057L45.1664 109.943C45.1289 110.291 45.1725 110.642 45.2936 110.97C45.4146 111.297 45.61 111.592 45.8643 111.832C46.1186 112.072 46.4249 112.249 46.7593 112.35C47.0936 112.451 47.4469 112.474 47.7914 112.416C54.075 111.408 68.7351 107.698 74.3109 94.9549C76.2797 90.4385 76.6828 85.1651 76.2281 79.8916C79.7621 77.3998 83.0722 74.6048 86.1211 71.5385C103.359 54.3869 115.252 23.3768 111.947 8.9674ZM68.9226 51.0776C67.3486 49.5045 66.2764 47.5 65.8417 45.3175C65.407 43.135 65.6294 40.8726 66.4806 38.8165C67.3319 36.7604 68.7738 35.003 70.6241 33.7665C72.4743 32.53 74.6496 31.87 76.875 31.87C79.1003 31.87 81.2757 32.53 83.1259 33.7665C84.9761 35.003 86.4181 36.7604 87.2693 38.8165C88.1206 40.8726 88.343 43.135 87.9083 45.3175C87.4736 47.5 86.4014 49.5045 84.8273 51.0776C83.7836 52.1228 82.5439 52.9521 81.1794 53.5179C79.8149 54.0836 78.3522 54.3749 76.875 54.3749C75.3978 54.3749 73.9351 54.0836 72.5706 53.5179C71.206 52.9521 69.9664 52.1228 68.9226 51.0776Z" 
      fill="#1E4C48"
    />
    <path 
      d="M39.4687 93.6164C38.1844 94.9031 36.1242 95.4047 33.6445 95.8336C28.0734 96.7828 23.1539 91.9688 24.1547 86.3367C24.5367 84.2016 25.6664 81.2086 26.3695 80.5055C26.5232 80.3548 26.6255 80.1595 26.6619 79.9473C26.6983 79.7351 26.6669 79.5169 26.5722 79.3236C26.4775 79.1303 26.3243 78.9717 26.1343 78.8705C25.9444 78.7692 25.7273 78.7303 25.5141 78.7594C22.3987 79.1406 19.5003 80.553 17.2805 82.7719C11.7703 88.2867 11.25 108.75 11.25 108.75C11.25 108.75 31.725 108.23 37.2352 102.715C39.4608 100.497 40.875 97.594 41.25 94.4742C41.3367 93.4945 40.1437 92.9109 39.4687 93.6164Z" 
      fill="#1E4C48"
    />
  </svg>
);

  const features = [
    {
      icon: GraduationCap,
      title: "100% Free Training",
      description:
        "No upfront fees. No hidden charges. We're committed to removing financial barriers to tech education.",
    },
    {
      icon: FaBriefcase,
      title: "Job-Focused Curriculum",
      description:
        "Courses are built around real market needs. From CV writing to mock interviews, we prepare students to land real jobs.",
    },
    {
      icon: BsFillLaptopFill,
      title: "Practical, Hands-On Learning",
      description:
        "Our students don't just learn theory—they build real-world projects, collaborate in teams, and solve real challenges.",
    },
    {
      icon: StarBadge,
      title: "Volunteer-Led by Industry Experts",
      description:
        "All trainers are experienced IT professionals who volunteer their time to mentor and guide students.",
    },
    {
      icon: HiGlobeAlt,
      title: "Global Access, Local Impact",
      description:
        "Whether you're in Sweden, Nepal, India, or anywhere else—if you have a laptop and internet, you can join.",
    },
    {
      icon: StarBadgeWithArrow,
      title: "Structured Four-Stage Program",
      description:
        "From fundamentals to internship, our learning journey is designed to gradually build confidence and mastery.",
    },
    {
      icon: HiUserGroup,
      title: "Strong Support System",
      description: "Weekly catch-ups, peer support groups, and active dedicated mentors every step of the program.",
    },
    {
      icon: PiCursorFill,
      title: "Tools That Mirror the Workplace",
      description: "Students work with tools like Microsoft Teams, the Confluence of Jira, Slack, Figma, and more.",
    },
    {
      icon: MdLibraryBooks,
      title: "Industry-Driven Curriculum",
      description:
        "Our courses offerings evolve based on emerging trends and employer demand, including AI, DevOps, and Cybersecurity.",
    },
    {
      icon: RocketIcon,
      title: "Mentorship & Career Coaching",
      description:
        "Beyond training, we guide students through job search strategies, portfolio building, and LinkedIn coaching.",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden py-16 px-6 bg-slate-50">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0">
        {/* Large Pink Orb */}
        <div className="absolute w-96 h-96 rounded-full bg-gradient-radial from-pink-300/40 via-rose-200/30 to-transparent blur-3xl animate-float-slow top-10 -left-20"></div>

        {/* Medium Teal Orb */}
        <div className="absolute w-80 h-80 rounded-full bg-gradient-radial from-teal-300/50 via-cyan-200/30 to-transparent blur-2xl animate-float-medium top-1/3 right-10"></div>

        {/* Small Purple Orb */}
        <div className="absolute w-64 h-64 rounded-full bg-gradient-radial from-purple-300/40 via-violet-200/30 to-transparent blur-2xl animate-float-fast bottom-1/4 left-1/4"></div>

        {/* Medium Blue Orb */}
        <div className="absolute w-72 h-72 rounded-full bg-gradient-radial from-blue-300/35 via-sky-200/25 to-transparent blur-3xl animate-float-reverse bottom-10 right-1/4"></div>

        {/* Small Orange Orb */}
        <div className="absolute w-56 h-56 rounded-full bg-gradient-radial from-orange-300/30 via-amber-200/20 to-transparent blur-2xl animate-float-medium top-1/2 left-1/2"></div>

        {/* Large Green Orb */}
        <div className="absolute w-88 h-88 rounded-full bg-gradient-radial from-emerald-300/35 via-green-200/25 to-transparent blur-3xl animate-float-slow bottom-1/3 -right-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">What Makes Tecvinson Academy Unique</h1>
          <p className="text-gray-600 text-sm md:text-base mx-auto">
            At Tecvinson Academy, we believe quality education should be accessible to all. Here's what sets us apart.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {/* Top section with icon */}
                <div className="bg-[#EDF8F7] px-6 py-12 flex justify-center m-3  rounded-xl ">
                  <IconComponent className="w-24 h-24 text-[#1E4C48]" />
                </div>

                {/* Bottom section with text */}
                <div className="bg-white px-6 py-6 text-center space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                to="/support"
                className="px-8 py-[1.3rem] border border-gray-300 text-gray-700 hover:bg-white/60 rounded-lg transition-all duration-300 backdrop-blur-sm font-medium"
                >
                Support Us
                </Link>
                <Link
                to="/courses"
                className="px-8 py-[1.3rem] bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                Begin your learning journey →
                </Link>
            </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }
        
        @keyframes float-medium {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          50% {
            transform: translate(-25px, -25px) rotate(180deg);
          }
        }
        
        @keyframes float-fast {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate(20px, -20px) rotate(90deg);
          }
          50% {
            transform: translate(-15px, -30px) rotate(180deg);
          }
          75% {
            transform: translate(-25px, 15px) rotate(270deg);
          }
        }
        
        @keyframes float-reverse {
          0%, 100% {
            transform: translate(0px, 0px) rotate(360deg);
          }
          50% {
            transform: translate(25px, 25px) rotate(180deg);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 12s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 18s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  )
}

export default Difference
