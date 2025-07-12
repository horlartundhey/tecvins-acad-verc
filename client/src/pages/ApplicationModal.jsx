import { Info, X } from "lucide-react";
import { useState } from "react";
import PhoneInput from "../components/PhoneInput";

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

const ApplicationModal = ({ isOpen, onClose, formType, formData, handleInputChange, onSubmit }) => {
  const [modalStep, setModalStep] = useState("notice");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleContinue = () => {
    if (isChecked) {
      setModalStep("form");
    }
  };

  const handleBack = () => {
    setModalStep("notice");
    setIsChecked(false);
  };

  const handlePhoneChange = (fullPhoneNumber) => {
    handleInputChange({ target: { name: 'phoneNumber', value: fullPhoneNumber } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(e);
    if (success) {
      setModalStep("success");
    }
  };

  const handleClose = () => {
    setModalStep("notice");
    setIsChecked(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="flex justify-between items-center p-6 border-b bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            {modalStep === "notice" 
              ? (formType === 'waitlist' ? 'Join Our Waitlist' : 'Apply for Training')
              : modalStep === "form" 
                ? (formType === 'waitlist' ? 'Waitlist Application' : 'Training Application')
                : 'Application Submitted'
            }
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {modalStep === "notice" && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-blue-900 font-semibold text-base mb-2">Important Information</h3>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        {formType === 'waitlist'
                          ? "Joining our waitlist ensures you'll be notified as soon as spots become available in our training programs. Please review the requirements below before proceeding."
                          : "Before applying for our training program, please carefully review the requirements and information below to ensure you meet all necessary criteria."
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-base">1. ELIGIBILITY REQUIREMENTS</h4>
                    <p className="text-gray-600 text-sm">To be eligible for our training programs, applicants must:</p>
                    <ul className="text-gray-600 text-sm space-y-2 pl-1 mt-1">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-0.5">✔</span>
                        <span>Be at least 18 years old.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-0.5">✔</span>
                        <span>Have a high school diploma or equivalent qualification.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-0.5">✔</span>
                        <span>Possess basic computer literacy and internet access.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-0.5">✔</span>
                        <span>Demonstrate commitment to completing the full program duration.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-base">2. APTITUDE TEST REQUIREMENT</h4>
                    <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                      <p className="text-yellow-800 text-sm font-medium">📝 Mandatory Assessment</p>
                      <p className="text-yellow-800 text-sm">All applicants must complete an aptitude test to assess their readiness and suitability for the chosen program track.</p>
                      <p className="text-yellow-800 text-sm">Only applicants who pass the aptitude test will be granted admission into the training program.</p>
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
            </div>
          )}

          {modalStep === "form" && (
            <div className="p-6">
              <div className="flex items-center mb-6">
                <button
                  onClick={handleBack}
                  className="mr-3 text-gray-500 hover:text-gray-700"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <h2 className="text-2xl font-bold text-gray-900">
                  {formType === 'waitlist' ? 'JOIN THE WAITLIST' : 'SUBMIT YOUR APPLICATION'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                    <PhoneInput
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="Phone number"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country/Region <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-200 p-3 text-sm focus:border-teal-500 focus:ring-0"
                      required
                    >
                      <option value="">Select your country/region</option>
                      {countryList.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time Zone <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="timeZone"
                      value={formData.timeZone}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-200 p-3 text-sm focus:border-teal-500 focus:ring-0"
                      required
                    >
                      <option value="">Select your time zone</option>
                      {formData.country && countryTimeZones[formData.country]?.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Track <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="courseTrack"
                    value={formData.courseTrack}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border border-gray-200 p-3 text-sm focus:border-teal-500 focus:ring-0"
                    required
                  >
                    <option value="">Select a course track</option>
                    <option value="product-management">Product Management</option>
                    <option value="creative-design">Creative Design</option>
                    <option value="product-development">Product Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Tell us more about yourself, your background, or anything else you'd like us to know..."
                    rows="4"
                    className="block w-full rounded-md border border-gray-200 p-3 text-sm placeholder-gray-400 focus:border-teal-500 focus:ring-0"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium"
                  >
                    {formType === 'waitlist' ? 'Join Waitlist' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {modalStep === "success" && (
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {formType === 'waitlist' ? 'Successfully Added to Waitlist!' : 'Application Submitted Successfully!'}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {formType === 'waitlist'
                  ? "You've been added to our waitlist. We'll notify you as soon as spots become available."
                  : "Thank you for your application. We'll review it and get back to you soon with next steps, including the aptitude test details."
                }
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;