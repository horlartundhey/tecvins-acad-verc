import { Info, X } from "lucide-react";
import { useState } from "react";

const countryTimeZones = {
  Nigeria: ["WAT (West Africa Time)"],
  Ghana: ["GMT (Greenwich Mean Time)"],
  Kenya: ["EAT (East Africa Time)"],
  SouthAfrica: ["SAST (South Africa Standard Time)"],
  Egypt: ["EET (Eastern European Time)"],
  Algeria: ["CET (Central European Time)"],
  Ethiopia: ["EAT (East Africa Time)"],
  Morocco: ["WET (Western European Time)"],
  UnitedStates: ["EST (Eastern Standard Time)", "CST (Central Standard Time)", "PST (Pacific Standard Time)", "MST (Mountain Standard Time)", "AKST (Alaska Standard Time)", "HST (Hawaii Standard Time)"],
  UnitedKingdom: ["GMT (Greenwich Mean Time)", "BST (British Summer Time)"],
  Canada: ["EST (Eastern Standard Time)", "CST (Central Standard Time)", "PST (Pacific Standard Time)", "MST (Mountain Standard Time)"],
  India: ["IST (Indian Standard Time)"],
  Germany: ["CET (Central European Time)", "CEST (Central European Summer Time)"],
  France: ["CET (Central European Time)", "CEST (Central European Summer Time)"],
  Australia: ["AEST (Australian Eastern Standard Time)", "ACST (Australian Central Standard Time)", "AWST (Australian Western Standard Time)"],
  Brazil: ["BRT (Brasilia Time)"],
  China: ["CST (China Standard Time)"],
  Japan: ["JST (Japan Standard Time)"],
  Mexico: ["CST (Central Standard Time)", "MST (Mountain Standard Time)", "PST (Pacific Standard Time)"],
  Russia: ["MSK (Moscow Standard Time)", "YAKT (Yakutsk Time)", "VLAT (Vladivostok Time)"],
  Italy: ["CET (Central European Time)", "CEST (Central European Summer Time)"],
  Spain: ["CET (Central European Time)", "CEST (Central European Summer Time)"],
  Netherlands: ["CET (Central European Time)", "CEST (Central European Summer Time)"],
  Singapore: ["SGT (Singapore Time)"],
  UnitedArabEmirates: ["GST (Gulf Standard Time)"],
  Indonesia: ["WIB (Western Indonesian Time)", "WITA (Central Indonesian Time)", "WIT (Eastern Indonesian Time)"],
  Malaysia: ["MYT (Malaysia Time)"],
  Pakistan: ["PKT (Pakistan Standard Time)"],
  SouthKorea: ["KST (Korea Standard Time)"],
  Thailand: ["ICT (Indochina Time)"],
  Poland: ["CET (Central European Time)", "CEST (Central European Summer Time)"],
  Portugal: ["WET (Western European Time)", "WEST (Western European Summer Time)"],
  Sweden: ["CET (Central European Time)", "CEST (Central European Summer Time)"],
  Argentina: ["ART (Argentina Time)"],
  Chile: ["CLT (Chile Standard Time)"],
  Colombia: ["COT (Colombia Time)"],
  SaudiArabia: ["AST (Arabia Standard Time)"],
  Other: ["UTC"]
};

const countryList = [
  { value: "Nigeria", label: "Nigeria", flag: "ng" },
  { value: "Ghana", label: "Ghana", flag: "gh" },
  { value: "Kenya", label: "Kenya", flag: "ke" },
  { value: "SouthAfrica", label: "South Africa", flag: "za" },
  { value: "Egypt", label: "Egypt", flag: "eg" },
  { value: "Algeria", label: "Algeria", flag: "dz" },
  { value: "Ethiopia", label: "Ethiopia", flag: "et" },
  { value: "Morocco", label: "Morocco", flag: "ma" },
  { value: "UnitedStates", label: "United States", flag: "us" },
  { value: "UnitedKingdom", label: "United Kingdom", flag: "gb" },
  { value: "Canada", label: "Canada", flag: "ca" },
  { value: "India", label: "India", flag: "in" },
  { value: "Germany", label: "Germany", flag: "de" },
  { value: "France", label: "France", flag: "fr" },
  { value: "Australia", label: "Australia", flag: "au" },
  { value: "Brazil", label: "Brazil", flag: "br" },
  { value: "China", label: "China", flag: "cn" },
  { value: "Japan", label: "Japan", flag: "jp" },
  { value: "Mexico", label: "Mexico", flag: "mx" },
  { value: "Russia", label: "Russia", flag: "ru" },
  { value: "Italy", label: "Italy", flag: "it" },
  { value: "Spain", label: "Spain", flag: "es" },
  { value: "Netherlands", label: "Netherlands", flag: "nl" },
  { value: "Singapore", label: "Singapore", flag: "sg" },
  { value: "UnitedArabEmirates", label: "United Arab Emirates", flag: "ae" },
  { value: "Indonesia", label: "Indonesia", flag: "id" },
  { value: "Malaysia", label: "Malaysia", flag: "my" },
  { value: "Pakistan", label: "Pakistan", flag: "pk" },
  { value: "SouthKorea", label: "South Korea", flag: "kr" },
  { value: "Thailand", label: "Thailand", flag: "th" },
  { value: "Poland", label: "Poland", flag: "pl" },
  { value: "Portugal", label: "Portugal", flag: "pt" },
  { value: "Sweden", label: "Sweden", flag: "se" },
  { value: "Argentina", label: "Argentina", flag: "ar" },
  { value: "Chile", label: "Chile", flag: "cl" },
  { value: "Colombia", label: "Colombia", flag: "co" },
  { value: "SaudiArabia", label: "Saudi Arabia", flag: "sa" },
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
  formType = 'application', // Default to application if not specified
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
  };  // Local state for submit button loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local handleSubmit to clean payload before sending
  const handleCleanSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'courseOfInterest', 'cohortId', 'country', 'timeZone', 'reason'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.map(field => {
        switch(field) {
          case 'courseOfInterest': return 'Course of Interest';
          case 'timeZone': return 'Time Zone';
          default: return field.charAt(0).toUpperCase() + field.slice(1);
        }
      }).join(', ')}`);
      return;
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }    // Map fields correctly for backend
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      course: mapCourseToBackend(formData.courseOfInterest), // Map course value to backend-compatible format
      country: formData.country,
      timeZone: formData.timeZone,
      reason: formData.reason,
    };

    // Add cohort field based on submission type
    if (formType === 'waitlist') {
      payload.preferredCohort = formData.cohortId; // For waitlist, use preferredCohort
    } else {
      payload.cohortId = formData.cohortId; // For regular applications, use cohortId
    }

    console.log('=== APPLICATION MODAL DEBUG ===');
    console.log('Form type:', formType);
    console.log('Original formData:', JSON.stringify(formData, null, 2));
    console.log('Mapped payload:', JSON.stringify(payload, null, 2));
    console.log('Missing cohortId check:', !formData.cohortId);

    try {
      setIsSubmitting(true);
      await handleSubmit(payload);
      // Success state is handled by parent component
    } catch (error) {
      setIsSubmitting(false);
      console.error('=== APPLICATION MODAL ERROR ===');
      console.error('Error object:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Failed to submit application. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <>
      {isModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-0 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>            {modalStep === "notice" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {formType === 'waitlist' ? 'JOIN THE WAITLIST' : 'SUBMIT YOUR APPLICATION'}
                </h2>
                <h3 className="text-lg font-semibold text-yellow-600 mb-6">
                  {formType === 'waitlist' 
                    ? 'IMPORTANT NOTICE – PLEASE READ BEFORE JOINING WAITLIST'
                    : 'IMPORTANT NOTICE – PLEASE READ BEFORE APPLYING'
                  }
                </h3>
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
                    />                    <label className="text-gray-600 text-sm">
                      {formType === 'waitlist'
                        ? "I acknowledge that I meet the requirements and understand I will be notified when a spot becomes available."
                        : "I acknowledge and confirm that I meet the requirements, understand the terms of enrollment, and agree to take the aptitude test."
                      }
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
                  </button>                  <h2 className="text-2xl font-bold text-gray-900">
                    {formType === 'waitlist' ? 'JOIN THE WAITLIST' : 'SUBMIT YOUR APPLICATION'}
                  </h2>
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

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course of Interest <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="courseOfInterest"
                        value={formData.courseOfInterest}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-200 p-3 pr-10 text-sm text-gray-400 focus:border-teal-500 focus:ring-0 appearance-none"
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
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 10L12 6" stroke="#616161" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
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
                          className="block w-full rounded-md border border-gray-200 p-3 pl-24 pr-10 text-sm text-gray-400 focus:border-teal-500 focus:ring-0 appearance-none"
                          required
                        >
                          {countryList.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6L8 10L12 6" stroke="#616161" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Zone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="timeZone"
                          value={selectedTimeZone}
                          onChange={handleTimeZoneChange}
                          className="block w-full rounded-md border border-gray-200 p-3 pr-10 text-sm text-gray-400 focus:border-teal-500 focus:ring-0 appearance-none"
                          required
                        >
                          <option value="" disabled>Select your time zone</option>
                          {(countryTimeZones[selectedCountry] || ["UTC"]).map((tz) => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6L8 10L12 6" stroke="#616161" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border border-gray-200 p-3 pr-10 text-sm text-gray-400 focus:border-teal-500 focus:ring-0 appearance-none"
                          required
                        >
                          <option value="2026">2026</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6L8 10L12 6" stroke="#616161" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div> */}

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
                </div>                <button
                  onClick={handleCleanSubmit}
                  disabled={isSubmitting}
                  className="mt-6 bg-[#3B9790] hover:bg-teal-600 text-white font-medium px-4 w-1/3 rounded-xl py-4 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"                >
                  {isSubmitting 
                    ? 'Submitting...' 
                    : (formType === 'waitlist' ? 'Join Waitlist' : 'Submit Application')
                  }
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
                </div>                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {formType === 'waitlist' ? 'WAITLIST REQUEST RECEIVED!' : 'APPLICATION RECEIVED!'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {formType === 'waitlist' 
                    ? "Thank you for joining the waitlist! We'll notify you as soon as a spot becomes available. Keep an eye on your email for updates! 🎉"
                    : "Thank you for applying to Tecvinson Academy. Please check your email for further instructions. We're excited about your journey and look forward to helping you grow and thrive in tech! 🎉"
                  }
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