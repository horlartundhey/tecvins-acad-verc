import { useState } from 'react';
import { X } from 'lucide-react';
import PhoneInput from './PhoneInput';

// Time zones and country data
const countryTimeZones = {
  Nigeria: ["WAT (West Africa Time)"],
  Ghana: ["GMT (Greenwich Mean Time)"],
  Kenya: ["EAT (East Africa Time)"],
  SouthAfrica: ["SAST (South Africa Standard Time)"],
  UnitedStates: ["EST (Eastern Standard Time)", "CST (Central Standard Time)", "PST (Pacific Standard Time)", "MST (Mountain Standard Time)"],
  UnitedKingdom: ["GMT (Greenwich Mean Time)", "BST (British Summer Time)"],
  // Add more as needed
};

const countryList = [
  { value: "Nigeria", label: "Nigeria", flag: "ng" },
  { value: "Ghana", label: "Ghana", flag: "gh" },
  { value: "Kenya", label: "Kenya", flag: "ke" },
  { value: "SouthAfrica", label: "South Africa", flag: "za" },
  { value: "UnitedStates", label: "United States", flag: "us" },
  { value: "UnitedKingdom", label: "United Kingdom", flag: "gb" },
  // Add more as needed
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
      { value: "Fullstack Development", label: "Fullstack Development" }
    ]
  },
  {
    label: "Job Readiness",
    options: [
      { value: "Job Readiness", label: "Job Readiness" }
    ]
  }
];

const WaitlistModal = ({ isModalOpen, setIsModalOpen }) => {
  const [modalStep, setModalStep] = useState("notice");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    timezone: '',
    course: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle phone input changes
  const handlePhoneChange = (fullPhoneNumber) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: fullPhoneNumber
    }));
  };

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
  };

  const handleCleanSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would submit to your API
      console.log('Submitting waitlist form:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setModalStep("success");
    } catch (error) {
      console.error('Failed to submit waitlist:', error);
      alert('Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isModalOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] mx-4 sm:mx-0 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="p-8 border-b bg-white relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          {modalStep === "notice" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">JOIN THE WAITLIST</h2>
              <h3 className="text-lg font-semibold text-yellow-600">
                IMPORTANT NOTICE – PLEASE READ BEFORE JOINING WAITLIST
              </h3>
            </div>
          )}
          {modalStep === "form" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Join the Waitlist</h2>
              <p className="text-gray-600 mt-2">Please fill in all required fields</p>
            </div>
          )}
          {modalStep === "success" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Successfully Added to Waitlist!</h2>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {modalStep === "notice" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 text-base">1. COMPUTER LITERACY IS MANDATORY</h4>
                <ul className="text-gray-600 text-sm space-y-2 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✔</span>
                    <span>Be familiar with basic computer operations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✔</span>
                    <span>Navigate online learning platforms effectively.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✔</span>
                    <span>Participate in online discussions and collaborations.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 text-base">2. INTERNET CONNECTION IS REQUIRED</h4>
                <ul className="text-gray-600 text-sm space-y-2 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✔</span>
                    <span>Have access to a stable internet connection for online classes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✔</span>
                    <span>Be able to stream videos and participate in live sessions.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 text-base">3. DEVICE REQUIREMENTS</h4>
                <ul className="text-gray-600 text-sm space-y-2 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✔</span>
                    <span>Have access to a laptop or desktop computer (mobile phones are not sufficient).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✔</span>
                    <span>Ensure your device meets the minimum technical requirements for the course.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 text-base">4. COMMITMENT EXPECTATIONS</h4>
                <ul className="text-gray-600 text-sm space-y-2 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✔</span>
                    <span>Be available for the scheduled class times.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✔</span>
                    <span>Commit to completing assignments and projects on time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✔</span>
                    <span>Actively participate in class discussions and activities.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium text-sm">
                  <strong>Important:</strong> By joining the waitlist, you confirm that you meet all the above requirements. 
                  Failure to meet these requirements may result in course withdrawal without refund.
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
                  I acknowledge that I meet the requirements and understand I will be notified when a spot becomes available.
                </label>
              </div>
              
              <button
                onClick={handleContinue}
                className={`mt-6 w-1/3 rounded-xl py-4 px-4 font-medium text-white transition-colors duration-300 ${
                  isChecked ? "bg-[#3B9790] hover:bg-teal-600" : "bg-gray-200 text-gray-800 cursor-not-allowed"
                }`}
                disabled={!isChecked}
              >
                CONTINUE
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
                <h2 className="text-2xl font-bold text-gray-900">
                  JOIN THE WAITLIST
                </h2>
              </div>
              
              <form onSubmit={handleCleanSubmit} className="space-y-5">
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
                      Phone Number
                    </label>
                    <PhoneInput
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="Phone number"
                      className="block w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-200 p-3 text-sm focus:border-teal-500 focus:ring-0"
                      required
                    >
                      <option value="">Select your country</option>
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
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-200 p-3 text-sm focus:border-teal-500 focus:ring-0"
                      required
                      disabled={!formData.country}
                    >
                      <option value="">Select your timezone</option>
                      {formData.country && countryTimeZones[formData.country]?.map((timezone) => (
                        <option key={timezone} value={timezone}>
                          {timezone}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border border-gray-200 p-3 text-sm focus:border-teal-500 focus:ring-0"
                    required
                  >
                    <option value="">Select a course</option>
                    {courseCategories.map((category) => (
                      <optgroup key={category.label} label={category.label}>
                        {category.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 bg-[#3B9790] hover:bg-teal-600 text-white font-medium px-4 w-1/3 rounded-xl py-4 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                </button>
              </form>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                WAITLIST REQUEST RECEIVED!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for joining the waitlist! We'll notify you as soon as a spot becomes available. Keep an eye on your email for updates! 🎉
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
    </div>
  );
};

export default WaitlistModal;
