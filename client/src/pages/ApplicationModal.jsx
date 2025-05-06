import { Info, X } from "lucide-react";
import { useState } from "react";

const countryTimeZones = {
  Nigeria: ["WAT (West Africa Time)"],
  Ghana: ["GMT (Greenwich Mean Time)"],
  Kenya: ["EAT (East Africa Time)"],
  SouthAfrica: ["SAST (South Africa Standard Time)"],
  Egypt: ["EET (Eastern European Time)"],
  UnitedStates: ["EST (Eastern Standard Time)", "CST (Central Standard Time)", "PST (Pacific Standard Time)", "MST (Mountain Standard Time)", "AKST (Alaska Standard Time)", "HST (Hawaii Standard Time)"],
  UnitedKingdom: ["GMT (Greenwich Mean Time)", "BST (British Summer Time)"],
  Canada: ["EST (Eastern Standard Time)", "CST (Central Standard Time)", "PST (Pacific Standard Time)", "MST (Mountain Standard Time)"],
  India: ["IST (Indian Standard Time)"],
  Germany: ["CET (Central European Time)", "CEST (Central European Summer Time)"],
  France: ["CET (Central European Time)", "CEST (Central European Summer Time)"],
  Australia: ["AEST (Australian Eastern Standard Time)", "ACST (Australian Central Standard Time)", "AWST (Australian Western Standard Time)"],
  Other: ["UTC"]
};

const countryList = [
  { value: "Nigeria", label: "Nigeria", flag: "ng" },
  { value: "Ghana", label: "Ghana", flag: "gh" },
  { value: "Kenya", label: "Kenya", flag: "ke" },
  { value: "SouthAfrica", label: "South Africa", flag: "za" },
  { value: "Egypt", label: "Egypt", flag: "eg" },
  { value: "UnitedStates", label: "United States", flag: "us" },
  { value: "UnitedKingdom", label: "United Kingdom", flag: "gb" },
  { value: "Canada", label: "Canada", flag: "ca" },
  { value: "India", label: "India", flag: "in" },
  { value: "Germany", label: "Germany", flag: "de" },
  { value: "France", label: "France", flag: "fr" },
  { value: "Australia", label: "Australia", flag: "au" },
  { value: "Other", label: "Other", flag: "" }
];

const courseCategories = [
  {
    label: "Product",
    options: [
      { value: "Product Management", label: "Product Management" },
      { value: "Product Design", label: "Product Design" },
      { value: "Product Development", label: "Product Development" }
    ]
  },
  {
    label: "Development",
    options: [
      { value: "Frontend Development", label: "Frontend Development" },
      { value: "Backend Development", label: "Backend Development" },
      { value: "Fullstack Development", label: "Fullstack Development" },
      { value: "Mobile App Development", label: "Mobile App Development" },
      { value: "Data Science", label: "Data Science" }
    ]
  },
  {
    label: "Job Readiness",
    options: [
      { value: "Job Readiness", label: "Job Readiness" },
      { value: "Career Coaching", label: "Career Coaching" }
    ]
  }
];

const ApplicationModal = ({
  isModalOpen,
  setIsModalOpen,
  modalStep,
  setModalStep,
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(formData.country || "Nigeria");
  const [selectedTimeZone, setSelectedTimeZone] = useState(formData.timeZone || "");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    setSelectedTimeZone(countryTimeZones[value]?.[0] || "");
    handleInputChange({ target: { name: "country", value } });
    handleInputChange({ target: { name: "timeZone", value: countryTimeZones[value]?.[0] || "" } });
  };

  const handleTimeZoneChange = (e) => {
    setSelectedTimeZone(e.target.value);
    handleInputChange(e);
  };

  const handleContinue = () => {
    if (isChecked) {
      setModalStep("form");
    }
  };

  const handleBack = () => {
    setModalStep("notice");
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-6xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            {modalStep === "notice" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">SUBMIT YOUR APPLICATION</h2>
                <h3 className="text-lg font-semibold text-yellow-600 mb-6">IMPORTANT NOTICE – PLEASE READ BEFORE APPLYING</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-base">1. COMPUTER LITERACY IS MANDATORY</h4>
                    <ul className="text-gray-600 text-sm space-y-2 pl-1">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-0.5">✔</span>
                        <span>Use a computer efficiently for learning, research, and assignments.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-0.5">✔</span>
                        <span>Navigate online learning platforms, video conferencing tools, and collaboration tools.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-0.5">✔</span>
                        <span>Follow structured learning in a virtual classroom setting.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-base">2. APTITUDE TEST REQUIREMENT</h4>
                    <div className="text-gray-600 text-sm space-y-2">
                      <p>To ensure applicants are prepared for the training and can effectively engage with the coursework, all students must be willing to take an aptitude test as part of the enrollment process.</p>
                      <p>The test will assess basic logical reasoning, problem-solving skills, and ability to learn in a structured environment.</p>
                      <p>Only applicants who pass the aptitude test will be granted admission into the training program.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-base">3. COMMITMENT TO LEARNING</h4>
                    <p className="text-gray-600 text-sm">Our training programs require active participation and dedication. By enrolling, students commit to:</p>
                    <ul className="text-gray-600 text-sm space-y-2 pl-1 mt-1">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-0.5">✔</span>
                        <span>Attending training sessions regularly.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-0.5">✔</span>
                        <span>Completing assignments and assessments as required.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-0.5">✔</span>
                        <span>Actively engaging in discussions and collaborative exercises.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-base">4. CONFIRMATION OF READINESS</h4>
                    <p className="text-gray-600 text-sm">
                      By proceeding with the application, you confirm that you meet the prerequisites, understand the enrollment requirements, and are willing to take the aptitude test as part of the selection process.
                    </p>
                  </div>
                  <div className="flex items-start mt-6 pt-2">
                    <input
                      type="checkbox"
                      className="mt-1 mr-3 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label className="text-gray-600 text-sm">
                      I acknowledge and confirm that I meet the requirements, understand the terms of enrollment, and agree to take the aptitude test.
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  className={`mt-6 w-1/3 rounded-xl py-4 px-4 font-medium text-white transition-colors duration-300 ${
                    isChecked ? "bg-[#3B9790] hover:bg-teal-600" : "bg-gray-200 text-gray-800 cursor-not-allowed"
                  }`}
                  disabled={!isChecked}
                >
                  CONTINUE TO APPLY
                </button>
              </div>
            )}

            {modalStep === "form" && (
              <div>
                <div className="flex items-center mb-6">
                  <button
                    onClick={handleBack}
                    className="mr-3 text-gray-500 hover:text-gray-700"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold text-gray-900">SUBMIT YOUR APPLICATION</h2>
                </div>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className="block w-full rounded-md border border-gray-200 p-3 text-sm placeholder-gray-400 focus:border-teal-500 focus:ring-0"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name/Surname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name/surname"
                        className="block w-full rounded-md border border-gray-200 p-3 text-sm placeholder-gray-400 focus:border-teal-500 focus:ring-0"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@domain.com"
                        className="block w-full rounded-md border border-gray-200 p-3 text-sm placeholder-gray-400 focus:border-teal-500 focus:ring-0"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-500 text-sm">
                          <img src="https://flagcdn.com/16x12/ng.png" alt="Nigeria" className="mr-1" /> +234
                        </span>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="XX XXX XXXX"
                          className="block w-full rounded-md border border-gray-200 p-3 pl-20 text-sm placeholder-gray-400 focus:border-teal-500 focus:ring-0"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="courseOfInterest"
                      value={formData.courseOfInterest}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-200 p-3 text-sm text-gray-400 focus:border-teal-500 focus:ring-0 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDYgTCA4IDEwIDQgNiIgc3Ryb2tlPSIjNjE2MTYxIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[right_1rem_center] bg-[length:12px_12px]"
                      required
                    >
                      <option value="" disabled>Select a course</option>
                      {courseCategories.map((cat) => (
                        <optgroup key={cat.label} label={cat.label}>
                          {cat.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-500 text-sm">
                          {countryList.find(c => c.value === selectedCountry)?.flag && (
                            <img src={`https://flagcdn.com/16x12/${countryList.find(c => c.value === selectedCountry)?.flag}.png`} alt={selectedCountry} className="mr-1" />
                          )}
                          {countryList.find(c => c.value === selectedCountry)?.label}
                        </span>
                        <select
                          name="country"
                          value={selectedCountry}
                          onChange={handleCountryChange}
                          className="block w-full rounded-md border border-gray-200 p-3 pl-24 text-sm text-gray-400 focus:border-teal-500 focus:ring-0 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCA1NiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDYgTCA8IDEwIDQgNiIgc3Ryb2tlPSIjNjE2MTYxIiBzdHJva2Utd2lkdGg9IjEuNSI gc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[right_1rem_center] bg-[length:12px_12px]"
                          required
                        >
                          {countryList.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Zone <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="timeZone"
                        value={selectedTimeZone}
                        onChange={handleTimeZoneChange}
                        className="block w-full rounded-md border border-gray-200 p-3 text-sm text-gray-400 focus:border-teal-500 focus:ring-0 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCA1NiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDYgTCA8IDEwIDQgNiIgc3Ryb2tlPSIjNjE2MTYxIiBzdHJva2Utd2lkdGg9IjEuNSI gc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[right_1rem_center] bg-[length:12px_12px]"
                        required
                      >
                        <option value="" disabled>Select your time zone</option>
                        {(countryTimeZones[selectedCountry] || ["UTC"]).map((tz) => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-200 p-3 text-sm text-gray-400 focus:border-teal-500 focus:ring-0 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCA1NiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDYgTCA8IDEwIDQgNiIgc3Ryb2tlPSIjNjE2MTYxIiBzdHJva2Utd2lkdGg9IjEuNSI gc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[right_1rem_center] bg-[length:12px_12px]"
                        required
                      >
                        <option value="2025">2025</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cohort <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="cohort"
                        value={formData.cohort}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-200 p-3 text-sm text-gray-400 focus:border-teal-500 focus:ring-0 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCA1NiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDYgTCA8IDEwIDQgNiIgc3Ryb2tlPSIjNjE2MTYxIiBzdHJva2Utd2lkdGg9IjEuNSI gc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[right_1rem_center] bg-[length:12px_12px]"
                        required
                      >
                        <option value="" disabled>Select cohort</option>
                        <option value="Cohort 1">Cohort 1</option>
                        <option value="Cohort 2">Cohort 2</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Why are you interested in this course?
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="Write..."
                      className="block w-full rounded-md border border-gray-200 p-3 text-sm placeholder-gray-400 focus:border-teal-500 focus:ring-0 h-24"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="mt-6 bg-[#3B9790] hover:bg-teal-600 text-white font-medium px-4 w-1/3 rounded-xl py-4 transition-colors duration-300"
                >
                  Submit Application
                </button>
              </div>
            )}

            {modalStep === "success" && (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">APPLICATION RECEIVED!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for applying to Tecvinson Academy. Please check your email for further instructions. We're excited about your journey and look forward to helping you grow and thrive in tech! 🎉
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#3B9790] hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Got it!
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationModal;