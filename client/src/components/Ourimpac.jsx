import React from 'react'
import { Calendar, Users, GraduationCap, Code, Users2, Monitor, Clock, Flag, ArrowRight } from "lucide-react"
import { HiOutlineRocketLaunch } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { PiArrowFatRightFill } from 'react-icons/pi'


const Ourimpac = () => {
  return (
    <>
    <div className=" font-montserrat">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Impact</h2>
        <div className="text-[#5E5E5E] text-[16px] leading-relaxed space-y-2 mb-6">
          <p>
            Tecvinson Academy delivers{" "}
            <span className="font-semibold text-[#5E5E5E]">free, career-focused tech training</span> with mentorship and
            real product builds. Since 2023,
          </p>
          <p>
            we've engaged <span className="font-semibold text-[#5E5E5E]">400+ learners</span>, progressed{" "}
            <span className="font-semibold text-[#5E5E5E]">223</span> into team projects, and shipped demo-ready
            products.
          </p>
          <p>
            In <span className="font-semibold text-[#5E5E5E]">2026</span>, we aim to train{" "}
            <span className="font-semibold text-[#5E5E5E]">500 learners</span> across{" "}
            <span className="font-semibold text-[#5E5E5E]">14 tracks</span>, with need-based{" "}
            <span className="font-semibold text-[#5E5E5E]">laptops/data</span> and strong internship pathways.
          </p>
        </div>
      </div>

      {/* Stats Box */}
      <div className="gradient-animate border-4 rounded-2xl p-8 mb-12" style={{ borderColor: "#00BC85", backgroundColor: "#EDF8F7" }}>
        {/* Top Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 2 Cohorts */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3">
                <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33 3.5H28.5V2C28.5 1.60218 28.342 1.22064 28.0607 0.93934C27.7794 0.658035 27.3978 0.5 27 0.5C26.6022 0.5 26.2206 0.658035 25.9393 0.93934C25.658 1.22064 25.5 1.60218 25.5 2V3.5H10.5V2C10.5 1.60218 10.342 1.22064 10.0607 0.93934C9.77936 0.658035 9.39782 0.5 9 0.5C8.60218 0.5 8.22064 0.658035 7.93934 0.93934C7.65804 1.22064 7.5 1.60218 7.5 2V3.5H3C2.20435 3.5 1.44129 3.81607 0.87868 4.37868C0.31607 4.94129 0 5.70435 0 6.5V36.5C0 37.2957 0.31607 38.0587 0.87868 38.6213C1.44129 39.1839 2.20435 39.5 3 39.5H33C33.7957 39.5 34.5587 39.1839 35.1213 38.6213C35.6839 38.0587 36 37.2957 36 36.5V6.5C36 5.70435 35.6839 4.94129 35.1213 4.37868C34.5587 3.81607 33.7957 3.5 33 3.5ZM33 12.5H3V6.5H7.5V8C7.5 8.39782 7.65804 8.77936 7.93934 9.06066C8.22064 9.34196 8.60218 9.5 9 9.5C9.39782 9.5 9.77936 9.34196 10.0607 9.06066C10.342 8.77936 10.5 8.39782 10.5 8V6.5H25.5V8C25.5 8.39782 25.658 8.77936 25.9393 9.06066C26.2206 9.34196 26.6022 9.5 27 9.5C27.3978 9.5 27.7794 9.34196 28.0607 9.06066C28.342 8.77936 28.5 8.39782 28.5 8V6.5H33V12.5Z" fill="#1E4C48"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#1E4C48] mb-1 font-montserrat">2 Cohorts</h3>
                <p className="text-[#1E4C48] text-base font-medium ">(2023, 2024)</p>
              </div>
            </div>
          </div>

          {/* 400+ Learners */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3">
                <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6876 28.2128C12.6926 28.3144 12.677 28.416 12.6416 28.5113C12.6062 28.6067 12.5518 28.6939 12.4816 28.7675C12.4114 28.8412 12.327 28.8998 12.2335 28.9398C12.14 28.9798 12.0393 29.0004 11.9376 29.0003H3.66506C3.3265 29.0008 2.99773 28.8868 2.7322 28.6767C2.46667 28.4667 2.28 28.173 2.20256 27.8434C2.15434 27.6178 2.15656 27.3844 2.20907 27.1597C2.26158 26.9351 2.36308 26.7249 2.50631 26.544C3.8297 24.789 5.5856 23.4071 7.60256 22.5334C6.71705 21.726 6.03788 20.7182 5.62195 19.5944C5.20602 18.4706 5.06543 17.2635 5.21196 16.0741C5.35849 14.8848 5.78787 13.7479 6.46413 12.7586C7.1404 11.7694 8.04387 10.9565 9.09886 10.3883C10.1539 9.81996 11.3297 9.51273 12.5278 9.4923C13.726 9.47187 14.9116 9.73884 15.9853 10.2708C17.0591 10.8028 17.9897 11.5844 18.6993 12.55C19.4089 13.5157 19.8768 14.6373 20.0638 15.8209C20.088 15.9801 20.0594 16.1428 19.9826 16.2843C19.9058 16.4257 19.7848 16.5382 19.6382 16.6047C17.5577 17.5665 15.7957 19.1034 14.5601 21.0339C13.3246 22.9645 12.667 25.2082 12.6651 27.5003C12.6651 27.7403 12.6651 27.9765 12.6876 28.2128ZM46.8126 26.5422C45.4922 24.7892 43.7403 23.4081 41.7276 22.5334C42.6131 21.726 43.2922 20.7182 43.7082 19.5944C44.1241 18.4706 44.2647 17.2635 44.1182 16.0741C43.9716 14.8848 43.5423 13.7479 42.866 12.7586C42.1897 11.7694 41.2863 10.9565 40.2313 10.3883C39.1763 9.81996 38.0004 9.51273 36.8023 9.4923C35.6041 9.47187 34.4185 9.73884 33.3448 10.2708C32.271 10.8028 31.3404 11.5844 30.6308 12.55C29.9212 13.5157 29.4533 14.6373 29.2663 15.8209C29.2422 15.9801 29.2707 16.1428 29.3475 16.2843C29.4243 16.4257 29.5453 16.5382 29.6919 16.6047C31.7724 17.5665 33.5344 19.1034 34.77 21.0339C36.0055 22.9645 36.6631 25.2082 36.6651 27.5003C36.6651 27.7403 36.6651 27.9765 36.6426 28.2128C36.6375 28.3144 36.6531 28.416 36.6885 28.5113C36.7239 28.6067 36.7784 28.6939 36.8485 28.7675C36.9187 28.8412 37.0031 28.8998 37.0966 28.9398C37.1901 28.9798 37.2908 29.0004 37.3926 29.0003H45.6651C46.0036 29.0008 46.3324 28.8868 46.5979 28.6767C46.8634 28.4667 47.0501 28.173 47.1276 27.8434C47.1761 27.6174 47.1738 27.3835 47.121 27.1584C47.0681 26.9334 46.966 26.7229 46.8219 26.5422H46.8126ZM30.1251 34.6384C31.6186 33.4946 32.7162 31.9115 33.2635 30.1117C33.8108 28.3119 33.7805 26.3858 33.1766 24.6041C32.5727 22.8225 31.4258 21.2748 29.8969 20.1787C28.368 19.0826 26.5341 18.4931 24.6529 18.4931C22.7717 18.4931 20.9377 19.0826 19.4089 20.1787C17.88 21.2748 16.733 22.8225 16.1292 24.6041C15.5253 26.3858 15.4949 28.3119 16.0422 30.1117C16.5896 31.9115 17.6872 33.4946 19.1807 34.6384C16.5304 35.7867 14.3174 37.7533 12.8657 40.2503C12.734 40.4783 12.6647 40.737 12.6647 41.0004C12.6647 41.2637 12.7341 41.5224 12.8658 41.7504C12.9975 41.9785 13.1869 42.1678 13.4149 42.2994C13.643 42.4311 13.9017 42.5003 14.1651 42.5003H35.1651C35.4284 42.5003 35.6871 42.4311 35.9152 42.2994C36.1432 42.1678 36.3327 41.9785 36.4643 41.7504C36.596 41.5224 36.6654 41.2637 36.6654 41.0004C36.6654 40.737 36.5961 40.4783 36.4644 40.2503C35.0096 37.7517 32.7924 35.7849 30.1382 34.6384H30.1251Z" fill="#1E4C48"/>
                    </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#1E4C48] mb-1 font-montserrat">400+ Learners</h3>
                <p className="text-[#1E4C48] text-base font-medium">Engaged</p>
              </div>
            </div>
          </div>

          {/* 223 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3">
                <svg width="46" height="34" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.8953 19.5609L38.8953 25.5609C38.756 25.7004 38.5906 25.811 38.4085 25.8865C38.2264 25.962 38.0312 26.0009 37.834 26.0009C37.6369 26.0009 37.4417 25.962 37.2596 25.8865C37.0775 25.811 36.9121 25.7004 36.7728 25.5609L33.7728 22.5609C33.4913 22.2795 33.3332 21.8977 33.3332 21.4997C33.3332 21.1016 33.4913 20.7199 33.7728 20.4384C34.0543 20.157 34.436 19.9989 34.834 19.9989C35.2321 19.9989 35.6138 20.157 35.8953 20.4384L37.834 22.3791L42.7728 17.4384C43.0543 17.157 43.436 16.9989 43.834 16.9989C44.2321 16.9989 44.6138 17.157 44.8953 17.4384C45.1768 17.7199 45.3349 18.1016 45.3349 18.4997C45.3349 18.8977 45.1768 19.2795 44.8953 19.5609ZM24.334 24.0647C26.6855 22.6001 28.4959 20.4096 29.4915 17.8245C30.4871 15.2393 30.6137 12.4003 29.8521 9.73679C29.0905 7.07332 27.4821 4.73037 25.2703 3.0624C23.0585 1.39442 20.3636 0.492188 17.5934 0.492188C14.8232 0.492187 12.1283 1.39442 9.91655 3.0624C7.70477 4.73037 6.09639 7.07332 5.33477 9.73679C4.57314 12.4003 4.6997 15.2393 5.6953 17.8245C6.6909 20.4096 8.50137 22.6001 10.8528 24.0647C6.98092 25.3322 3.49717 27.7003 0.695924 31.0341C0.512532 31.2521 0.395006 31.5178 0.357094 31.8001C0.319182 32.0824 0.362452 32.3697 0.481842 32.6284C0.601232 32.887 0.791806 33.1063 1.03127 33.2606C1.27073 33.4149 1.54918 33.4978 1.83405 33.4997H33.334C33.6199 33.5 33.8998 33.4186 34.141 33.2651C34.3821 33.1117 34.5743 32.8925 34.6951 32.6334C34.8159 32.3744 34.8601 32.0862 34.8226 31.8029C34.7851 31.5195 34.6674 31.2528 34.4834 31.0341C31.6803 27.7003 28.1965 25.3322 24.334 24.0647Z" fill="#1E4C48"/>
                    </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#1E4C48] mb-1 font-montserrat">223</h3>
                <p className="text-[#1E4C48] text-base font-medium ">Reached Stage 3 (2024)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* 14 Tracks */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39 6H9C8.20435 6 7.44129 6.31607 6.87868 6.87868C6.31607 7.44129 6 8.20435 6 9V39C6 39.7957 6.31607 40.5587 6.87868 41.1213C7.44129 41.6839 8.20435 42 9 42H39C39.7957 42 40.5587 41.6839 41.1213 41.1213C41.6839 40.5587 42 39.7957 42 39V9C42 8.20435 41.6839 7.44129 41.1213 6.87868C40.5587 6.31607 39.7957 6 39 6ZM12 13.5H36C36.3978 13.5 36.7794 13.658 37.0607 13.9393C37.342 14.2206 37.5 14.6022 37.5 15C37.5 15.3978 37.342 15.7794 37.0607 16.0607C36.7794 16.342 36.3978 16.5 36 16.5H12C11.6022 16.5 11.2206 16.342 10.9393 16.0607C10.658 15.7794 10.5 15.3978 10.5 15C10.5 14.6022 10.658 14.2206 10.9393 13.9393C11.2206 13.658 11.6022 13.5 12 13.5ZM12 22.5H18C18.3978 22.5 18.7794 22.658 19.0607 22.9393C19.342 23.2206 19.5 23.6022 19.5 24C19.5 24.3978 19.342 24.7794 19.0607 25.0607C18.7794 25.342 18.3978 25.5 18 25.5H12C11.6022 25.5 11.2206 25.342 10.9393 25.0607C10.658 24.7794 10.5 24.3978 10.5 24C10.5 23.6022 10.658 23.2206 10.9393 22.9393C11.2206 22.658 11.6022 22.5 12 22.5ZM19.5 34.5H12C11.6022 34.5 11.2206 34.342 10.9393 34.0607C10.658 33.7794 10.5 33.3978 10.5 33C10.5 32.6022 10.658 32.2206 10.9393 31.9393C11.2206 31.658 11.6022 31.5 12 31.5H19.5C19.8978 31.5 20.2794 31.658 20.5607 31.9393C20.842 32.2206 21 32.6022 21 33C21 33.3978 20.842 33.7794 20.5607 34.0607C20.2794 34.342 19.8978 34.5 19.5 34.5ZM37.2281 26.8669L33.8794 29.625L34.8994 33.75C34.935 33.8934 34.9275 34.044 34.8778 34.1831C34.8281 34.3222 34.7384 34.4435 34.62 34.5319C34.4902 34.6276 34.3332 34.6795 34.1719 34.68C34.04 34.6792 33.9106 34.6436 33.7969 34.5769L30 32.3512L26.2087 34.5844C26.0815 34.6592 25.935 34.6948 25.7876 34.6867C25.6402 34.6786 25.4984 34.6272 25.3801 34.5389C25.2618 34.4507 25.1721 34.3294 25.1224 34.1904C25.0727 34.0514 25.0651 33.9008 25.1006 33.7575L26.1206 29.6325L22.7719 26.8669C22.6568 26.7716 22.5727 26.6442 22.5305 26.5009C22.4883 26.3576 22.4899 26.2049 22.535 26.0625C22.5801 25.92 22.6667 25.7943 22.7838 25.7015C22.9008 25.6086 23.0429 25.5528 23.1919 25.5413L27.6131 25.2L29.3119 21.2625C29.37 21.1283 29.4662 21.0141 29.5884 20.9338C29.7107 20.8536 29.8538 20.8108 30 20.8108C30.1462 20.8108 30.2893 20.8536 30.4116 20.9338C30.5338 21.0141 30.63 21.1283 30.6881 21.2625L32.3869 25.2L36.8081 25.5413C36.9571 25.5528 37.0992 25.6086 37.2162 25.7015C37.3333 25.7943 37.4199 25.92 37.465 26.0625C37.5101 26.2049 37.5117 26.3576 37.4695 26.5009C37.4273 26.6442 37.3432 26.7716 37.2281 26.8669Z" fill="#1E4C48"/>
                    </svg>
                </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#1E4C48] mb-1 font-montserrat">14</h3>
                <p className="text-[#1E4C48] text-base font-medium ">Tracks</p>
                <a href="/courses" className="text-teal-600 hover:text-teal-700 underline text-sm">
                  Explore Our Courses
                </a>
              </div>
            </div>
          </div>

          {/* 18 Teams */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3">
               <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.2 41.0978C43.3677 41.3206 43.4699 41.5858 43.4952 41.8636C43.5205 42.1413 43.4679 42.4206 43.3433 42.6701C43.2186 42.9196 43.0269 43.1293 42.7896 43.2759C42.5523 43.4224 42.2789 43.4999 42 43.4997H6C5.72143 43.4997 5.44837 43.4221 5.2114 43.2757C4.97444 43.1292 4.78294 42.9197 4.65836 42.6705C4.53378 42.4213 4.48104 42.1424 4.50606 41.865C4.53108 41.5875 4.63286 41.3225 4.8 41.0997C6.12822 39.3189 7.89942 37.9168 9.9375 37.0328C8.82033 36.0132 8.03755 34.6796 7.69191 33.2071C7.34626 31.7346 7.45389 30.192 8.00068 28.7818C8.54748 27.3716 9.50787 26.1597 10.7558 25.3051C12.0038 24.4505 13.4809 23.9932 14.9934 23.9932C16.5059 23.9932 17.9831 24.4505 19.2311 25.3051C20.479 26.1597 21.4394 27.3716 21.9862 28.7818C22.533 30.192 22.6406 31.7346 22.295 33.2071C21.9493 34.6796 21.1665 36.0132 20.0494 37.0328C21.5198 37.6684 22.856 38.5776 23.9869 39.7122C25.1178 38.5776 26.454 37.6684 27.9244 37.0328C26.8072 36.0132 26.0244 34.6796 25.6788 33.2071C25.3331 31.7346 25.4408 30.192 25.9876 28.7818C26.5343 27.3716 27.4947 26.1597 28.7427 25.3051C29.9906 24.4505 31.4678 23.9932 32.9803 23.9932C34.4928 23.9932 35.97 24.4505 37.2179 25.3051C38.4659 26.1597 39.4263 27.3716 39.9731 28.7818C40.5199 30.192 40.6275 31.7346 40.2818 33.2071C39.9362 34.6796 39.1534 36.0132 38.0363 37.0328C40.0838 37.9122 41.8645 39.3139 43.2 41.0978ZM5.1 23.6997C5.25759 23.8179 5.43691 23.9039 5.62773 23.9527C5.81855 24.0016 6.01713 24.0125 6.21213 23.9846C6.40714 23.9567 6.59474 23.8907 6.76424 23.7904C6.93374 23.69 7.08181 23.5573 7.2 23.3997C8.10818 22.1888 9.28583 21.2059 10.6397 20.529C11.9935 19.8521 13.4864 19.4997 15 19.4997C16.5136 19.4997 18.0065 19.8521 19.3603 20.529C20.7142 21.2059 21.8918 22.1888 22.8 23.3997C22.9397 23.586 23.1209 23.7372 23.3292 23.8413C23.5375 23.9455 23.7671 23.9997 24 23.9997C24.2329 23.9997 24.4625 23.9455 24.6708 23.8413C24.8791 23.7372 25.0603 23.586 25.2 23.3997C26.1082 22.1888 27.2858 21.2059 28.6397 20.529C29.9935 19.8521 31.4864 19.4997 33 19.4997C34.5136 19.4997 36.0065 19.8521 37.3603 20.529C38.7142 21.2059 39.8918 22.1888 40.8 23.3997C40.9183 23.5573 41.0665 23.69 41.2361 23.7903C41.4057 23.8906 41.5934 23.9565 41.7885 23.9843C41.9836 24.0121 42.1823 24.0012 42.3731 23.9522C42.564 23.9032 42.7434 23.817 42.9009 23.6987C43.0585 23.5804 43.1913 23.4322 43.2916 23.2626C43.3919 23.093 43.4578 22.9053 43.4856 22.7102C43.5134 22.5151 43.5024 22.3165 43.4534 22.1256C43.4044 21.9347 43.3183 21.7554 43.2 21.5978C41.8717 19.8175 40.1005 18.4161 38.0625 17.5328C39.1797 16.5132 39.9624 15.1796 40.3081 13.7071C40.6537 12.2346 40.5461 10.692 39.9993 9.28182C39.4525 7.8716 38.4921 6.65966 37.2442 5.80507C35.9962 4.95047 34.5191 4.49316 33.0066 4.49316C31.4941 4.49316 30.0169 4.95047 28.7689 5.80507C27.521 6.65966 26.5606 7.8716 26.0138 9.28182C25.467 10.692 25.3594 12.2346 25.705 13.7071C26.0507 15.1796 26.8335 16.5132 27.9506 17.5328C26.4802 18.1684 25.144 19.0776 24.0131 20.2122C22.8822 19.0776 21.546 18.1684 20.0756 17.5328C21.1928 16.5132 21.9756 15.1796 22.3212 13.7071C22.6669 12.2346 22.5592 10.692 22.0124 9.28182C21.4657 7.8716 20.5053 6.65966 19.2573 5.80507C18.0094 4.95047 16.5322 4.49316 15.0197 4.49316C13.5072 4.49316 12.03 4.95047 10.7821 5.80507C9.53412 6.65966 8.57373 7.8716 8.02693 9.28182C7.48014 10.692 7.37251 12.2346 7.71816 13.7071C8.0638 15.1796 8.84658 16.5132 9.96375 17.5328C7.91611 18.4129 6.13547 19.8153 4.8 21.5997C4.68181 21.7573 4.59582 21.9366 4.54693 22.1274C4.49804 22.3182 4.48722 22.5168 4.51508 22.7118C4.54293 22.9068 4.60893 23.0944 4.70929 23.2639C4.80965 23.4334 4.94241 23.5815 5.1 23.6997Z" fill="#1E4C48"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#1E4C48] mb-1 font-montserrat">18</h3>
                <p className="text-[#1E4C48] text-base font-medium ">Teams</p>
              </div>
            </div>
          </div>

          {/* 32 Mentors */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3">
                <svg width="40" height="34" viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.5 0.5H3.5C2.70435 0.5 1.94129 0.81607 1.37868 1.37868C0.81607 1.94129 0.5 2.70435 0.5 3.5V30.5C0.5 31.2956 0.81607 32.0587 1.37868 32.6213C1.94129 33.1839 2.70435 33.5 3.5 33.5H6.01062C6.29451 33.5001 6.5726 33.4196 6.81257 33.2679C7.05254 33.1163 7.24453 32.8996 7.36625 32.6431C8.09566 31.1031 9.24727 29.8019 10.6871 28.8906C12.127 27.9794 13.796 27.4957 15.5 27.4957C17.204 27.4957 18.873 27.9794 20.3129 28.8906C21.7527 29.8019 22.9043 31.1031 23.6338 32.6431C23.7555 32.8996 23.9475 33.1163 24.1874 33.2679C24.4274 33.4196 24.7055 33.5001 24.9894 33.5H36.5C37.2957 33.5 38.0587 33.1839 38.6213 32.6213C39.1839 32.0587 39.5 31.2956 39.5 30.5V3.5C39.5 2.70435 39.1839 1.94129 38.6213 1.37868C38.0587 0.81607 37.2957 0.5 36.5 0.5ZM15.5 24.5C14.3133 24.5 13.1533 24.1481 12.1666 23.4888C11.1799 22.8295 10.4108 21.8925 9.95672 20.7961C9.5026 19.6997 9.38378 18.4933 9.61529 17.3295C9.8468 16.1656 10.4182 15.0965 11.2574 14.2574C12.0965 13.4182 13.1656 12.8468 14.3295 12.6153C15.4933 12.3838 16.6997 12.5026 17.7961 12.9567C18.8925 13.4108 19.8295 14.1799 20.4888 15.1666C21.1481 16.1533 21.5 17.3133 21.5 18.5C21.5 20.0913 20.8679 21.6174 19.7426 22.7426C18.6174 23.8679 17.0913 24.5 15.5 24.5ZM36.5 30.5H25.8931C25.2392 29.3725 24.4058 28.3592 23.4256 27.5H32C32.3978 27.5 32.7794 27.342 33.0607 27.0607C33.342 26.7794 33.5 26.3978 33.5 26V8C33.5 7.60218 33.342 7.22064 33.0607 6.93934C32.7794 6.65804 32.3978 6.5 32 6.5H8C7.60218 6.5 7.22064 6.65804 6.93934 6.93934C6.65804 7.22064 6.5 7.60218 6.5 8V26C6.49983 26.3327 6.61026 26.656 6.81391 26.919C7.01757 27.1821 7.30289 27.37 7.625 27.4531C6.62227 28.3219 5.77126 29.3516 5.10687 30.5H3.5V3.5H36.5V30.5Z" fill="#1E4C48"/>
                    </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#1E4C48] mb-1 font-montserrat">32</h3>
                <p className="text-[#1E4C48] text-base font-medium ">Mentors/Trainers</p>
                <a href="/our-trainers" className="text-teal-600 hover:text-teal-700 underline text-sm">
                  Meet Our Trainers
                </a>
              </div>
            </div>
          </div>

          {/* 1,000+ Hours */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0.5C16.1433 0.5 12.3731 1.64366 9.16639 3.78634C5.95963 5.92903 3.46027 8.97451 1.98436 12.5377C0.508449 16.1008 0.122284 20.0216 0.874696 23.8043C1.62711 27.5869 3.4843 31.0615 6.21143 33.7886C8.93855 36.5157 12.4131 38.3729 16.1957 39.1253C19.9784 39.8777 23.8992 39.4916 27.4623 38.0156C31.0255 36.5397 34.071 34.0404 36.2137 30.8336C38.3564 27.6269 39.5 23.8567 39.5 20C39.4945 14.83 37.4383 9.87322 33.7826 6.21745C30.1268 2.56167 25.1701 0.50546 20 0.5ZM30.5 21.5H20C19.6022 21.5 19.2207 21.342 18.9393 21.0607C18.658 20.7794 18.5 20.3978 18.5 20V9.5C18.5 9.10218 18.658 8.72064 18.9393 8.43934C19.2207 8.15804 19.6022 8 20 8C20.3978 8 20.7794 8.15804 21.0607 8.43934C21.342 8.72064 21.5 9.10218 21.5 9.5V18.5H30.5C30.8978 18.5 31.2794 18.658 31.5607 18.9393C31.842 19.2206 32 19.6022 32 20C32 20.3978 31.842 20.7794 31.5607 21.0607C31.2794 21.342 30.8978 21.5 30.5 21.5Z" fill="#1E4C48"/>
                    </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#1E4C48] mb-1 font-montserrat">1,000+</h3>
                <p className="text-[#1E4C48] text-base font-medium">Live instructions/Clinic hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Flagship Builds */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3">
              <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.5 4.50004V27C36.4988 27.2136 36.452 27.4244 36.3628 27.6184C36.2735 27.8124 36.1439 27.9852 35.9825 28.125C33.1175 30.6057 30.3781 31.5 27.7663 31.5C24.2206 31.5 20.9094 29.8613 17.8288 28.3407C12.8506 25.875 8.52312 23.7394 3.5 27.7069V36C3.5 36.3979 3.34196 36.7794 3.06066 37.0607C2.77936 37.342 2.39782 37.5 2 37.5C1.60218 37.5 1.22064 37.342 0.93934 37.0607C0.658036 36.7794 0.5 36.3979 0.5 36V4.50004C0.501438 4.28635 0.548521 4.07542 0.638094 3.8814C0.727667 3.68738 0.857662 3.51474 1.01938 3.37504C7.76937 -2.47121 13.8275 0.523165 19.1675 3.16504C24.3125 5.71129 28.7731 7.91254 34.0175 3.37504C34.2343 3.18714 34.5004 3.06533 34.7842 3.02406C35.0681 2.9828 35.3579 3.0238 35.6192 3.14221C35.8805 3.26062 36.1023 3.45147 36.2584 3.69213C36.4146 3.93279 36.4984 4.21318 36.5 4.50004Z" fill="#1E4C48"/>
                </svg>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#1E4C48] mb-1 font-montserrat">4 Flagship Builds</h3>
              <p className="text-[#1E4C48] text-base font-medium ">D'EventMatcha, LinguAfrica, Imovelle, Studat, AI Solutions</p>
              <a href="/Projects-built" className="text-teal-600 hover:text-teal-700 underline text-sm">
                Explore Projects by Our Students
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom CTA Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-11 mb-12">
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

      {/* Results (2023-2024) section */}
      <div className="mb-12 font-montserrat">
        <h3 className="text-[32px] font-semibold text-[#0F2624] mb-8">Results (2023-2024)</h3>

        {/* Model Flow */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-6 py-4" style={{ backgroundColor: "#FFCDC6" }}>
            <h4 className="text-2xl text-center font-semibold" style={{ color: "#B95F45" }}>
              Model:
            </h4>
          </div>

          {/* Flow */}
          <div className="p-6 " style={{ backgroundColor: "#fff0ee" }}>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[28px]">
              <span className="font-medium" style={{ color: "#B95F45" }}>
                Foundations
              </span>
              <PiArrowFatRightFill className="w-7 h-7" style={{ color: "#B95F45" }} />
              <span className="font-medium" style={{ color: "#B95F45" }}>
                Skills
              </span>
              <PiArrowFatRightFill className="w-7 h-7" style={{ color: "#B85450" }} />
              <span className="font-medium" style={{ color: "#B95F45" }}>
                Projects
              </span>
              <PiArrowFatRightFill className="w-7 h-7" style={{ color: "#B85450" }} />
              <span className="font-medium" style={{ color: "#B95F45" }}>
                Internship/mentorship (Stage 4)
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Cohort Metrics section */}
      <div className="mb-12  font-montserrat">
        <h3 className="text-[28px] font-semibold text-[#0F2624] mb-8">Cohort Metrics</h3>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xl">
              <thead>
                <tr className="border-b border-gray-200 ">
                  <th className="text-left py-4 px-6 font-semibold text-[#0F2624]">METRIC</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#0F2624]">2023</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#0F2624]">2024</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#0F2624]">NOTES</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-[#EDF8F7]">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Applicants</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">400</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">1,650</td>
                  <td className="py-4 px-6 text-gray-600">New figures</td>
                </tr>
                <tr className=" border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Admitted</td>
                  <td className="py-4 px-6 text-gray-700">200</td>
                  <td className="py-4 px-6 text-gray-700">650</td>
                  <td className="py-4 px-6 text-gray-600">Selective intake</td>
                </tr>
                <tr className="border-b border-gray-100 bg-[#EDF8F7]">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Started Stage 1</td>
                  <td className="py-4 px-6 text-gray-700">160</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">520</td>
                  <td className="py-4 px-6 text-gray-600">Commenced</td>
                </tr>
                <tr className=" border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Stage 1-2 retention</td>
                  <td className="py-4 px-6 text-gray-700">72%</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">78%</td>
                  <td className="py-4 px-6 text-gray-600">Improved support</td>
                </tr>
                <tr className="border-b border-gray-100 bg-[#EDF8F7]">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Stage 2-3 retention</td>
                  <td className="py-4 px-6 text-gray-700">62%</td>
                  <td className="py-4 px-6 text-gray-700">55%</td>
                  <td className="py-4 px-6 text-gray-600">
                    520×0.78×0.55 ≈ <span className="font-semibold">223</span> (S3)
                  </td>
                </tr>
                <tr className=" border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Started Stage 3</td>
                  <td className="py-4 px-6 text-gray-700">~ 72</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">223</td>
                  <td className="py-4 px-6 text-gray-600">2024 confirmed</td>
                </tr>
                <tr className="border-b border-gray-100 bg-[#EDF8F7]">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Stage 3-4 retention</td>
                  <td className="py-4 px-6 text-gray-700">58%</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">60%</td>
                  <td className="py-4 px-6 text-gray-600">Into internship/mentorship</td>
                </tr>
                <tr className=" border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Started Stage 4</td>
                  <td className="py-4 px-6 text-gray-700">~ 41</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">~ 134</td>
                  <td className="py-4 px-6 text-gray-600">
                    223×0.60 ≈ <span className="font-semibold">134</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 bg-[#EDF8F7]">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Graduated</td>
                  <td className="py-4 px-6 text-gray-700">58</td>
                  <td className="py-4 px-6 text-gray-700">160 (to date)</td>
                  <td className="py-4 px-6 text-gray-600">Ongoing</td>
                </tr>
                <tr className=" border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Capstone Projects</td>
                  <td className="py-4 px-6 text-gray-700">12</td>
                  <td className="py-4 px-6 text-gray-700">30 (to date)</td>
                  <td className="py-4 px-6 text-gray-600">Demo/POC</td>
                </tr>
                <tr className="border-b border-gray-100 bg-[#EDF8F7]">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Mentors/Trainers</td>
                  <td className="py-4 px-6 text-gray-700">15</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">32</td>
                  <td className="py-4 px-6 text-gray-600">Scaled</td>
                </tr>
                <tr className=" border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Instruction hours</td>
                  <td className="py-4 px-6 text-gray-700">350+</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">700+</td>
                  <td className="py-4 px-6 text-gray-600">Live/clinics</td>
                </tr>
                <tr className="border-b border-gray-100 bg-[#EDF8F7]">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Internship Offers</td>
                  <td className="py-4 px-6 text-gray-700">10</td>
                  <td className="py-4 px-6 text-gray-700">40 (to date)</td>
                  <td className="py-4 px-6 text-gray-600">Rolling</td>
                </tr>
                <tr className=" border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Job Placements</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">30</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">50 (to date)</td>
                  <td className="py-4 px-6 text-gray-600">Lagging indicator</td>
                </tr>
                <tr className="bg-[#EDF8F7] border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">NPS</td>
                  <td className="py-4 px-6 text-gray-700">56</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">61</td>
                  <td className="py-4 px-6 text-gray-600">Survey</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Women Participation</td>
                  <td className="py-4 px-6 text-gray-700">35%</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">42%</td>
                  <td className="py-4 px-6 text-gray-600">Toward ≥45%</td>
                </tr>
                <tr className="bg-[#EDF8F7] border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-[#0F2624]">Countries Represented</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">9</td>
                  <td className="py-4 px-6 text-gray-700 font-semibold">15</td>
                  <td className="py-4 px-6 text-gray-600">Africa/Europe/NA/Asia</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Bottom CTA Section */}
      <div className=" sm:px-6 lg:px-8">
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
      </>
  )
}

export default Ourimpac