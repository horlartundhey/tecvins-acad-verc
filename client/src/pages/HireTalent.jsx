import { useState } from "react";
import { CheckCircle, X, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import useHireRequests from "../hooks/useHireRequests.js";
import PhoneInput from "../components/PhoneInput";

const HireTalent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formType, setFormType] = useState("quick");
  const { submitHireRequest, isLoading } = useHireRequests();

  const [quickFormData, setQuickFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    roleTitle: "",
    message: "",
    engagementTypes: [],
    selectedTracks: [],
  });

  const [detailedFormData, setDetailedFormData] = useState({
    companyName: "",
    companyWebsite: "",
    industry: "",
    location: "",
    companySize: "",
    contactName: "",
    jobTitle: "",
    contactPhone: "",
    contactEmail: "",
    preferredContactMethod: "",
    engagementType: "",
    projectBased: false,
    workModality: "",
    startDate: undefined,
    duration: "",
    resourcesNeeded: "",
    selectedTracks: [],
    skillLevel: "",
    jobDescription: "",
    paidOpportunity: "",
    trainingSupport: "",
    workPermitNeeded: "",
    workPermitAssistance: "",
    toolsProvided: "",
    additionalInformation: "",
    acknowledgment: false,
  });

  const handleQuickInputChange = (field, value) => {
    setQuickFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailedInputChange = (field, value) => {
    setDetailedFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) return; // Prevent double submission

    // Prepare data based on form type
    const requestData = {
      requestType: formType,
      companyName: formType === "quick" ? quickFormData.companyName : detailedFormData.companyName,
      contactName: formType === "quick" ? quickFormData.fullName : detailedFormData.contactName,
      contactEmail: formType === "quick" ? quickFormData.email : detailedFormData.contactEmail,
      contactPhone: formType === "quick" ? quickFormData.phoneNumber : detailedFormData.contactPhone,
      jobTitle: detailedFormData.jobTitle,
      companyWebsite: detailedFormData.companyWebsite,
      industry: detailedFormData.industry,
      location: detailedFormData.location,
      preferredContactMethod: detailedFormData.preferredContactMethod,
      engagementTypes: formType === "quick" ? quickFormData.engagementTypes : [],
      engagementType: detailedFormData.engagementType,
      projectBased: detailedFormData.projectBased,
      workModality: detailedFormData.workModality,
      startDate: detailedFormData.startDate,
      duration: detailedFormData.duration,
      resourcesNeeded: detailedFormData.resourcesNeeded,
      selectedTracks: formType === "quick" ? quickFormData.selectedTracks : detailedFormData.selectedTracks,
      skillLevel: detailedFormData.skillLevel,
      jobDescription: detailedFormData.jobDescription,
      message: formType === "quick" ? quickFormData.message : "",
      paidOpportunity: detailedFormData.paidOpportunity,
      trainingSupport: detailedFormData.trainingSupport,
      workPermitNeeded: detailedFormData.workPermitNeeded,
      workPermitAssistance: detailedFormData.workPermitAssistance,
      toolsProvided: detailedFormData.toolsProvided,
      additionalInformation: detailedFormData.additionalInformation,
      acknowledgment: formType === "detailed" ? detailedFormData.acknowledgment : true
    };

    const result = await submitHireRequest(requestData);
    
    if (result.success) {
      setIsSubmitted(true);
    } else {
      // Handle error - you might want to show a toast or alert
      console.error('Error submitting hire request:', result.error);
      alert('Failed to submit request. Please try again.');
    }
  };

  const resetForm = () => {
    setQuickFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      roleTitle: "",
      message: "",
      engagementTypes: [],
      selectedTracks: [],
    });
    setDetailedFormData({
      companyName: "",
      companyWebsite: "",
      industry: "",
      location: "",
      companySize: "",
      contactName: "",
      jobTitle: "",
      contactPhone: "",
      contactEmail: "",
      preferredContactMethod: "",
      engagementType: "",
      projectBased: false,
      workModality: "",
      startDate: undefined,
      duration: "",
      resourcesNeeded: "",
      selectedTracks: [],
      skillLevel: "",
      jobDescription: "",
      paidOpportunity: "",
      trainingSupport: "",
      workPermitNeeded: "",
      workPermitAssistance: "",
      toolsProvided: "",
      additionalInformation: "",
      acknowledgment: false,
    });
    setIsSubmitted(false);
    setIsOpen(false);
    setFormType("quick");
  };

  const tracks = [
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
    "Mobile App Development",
    "UI/UX Design",
    "Product Design",
    "Data Science",
    "Data Analytics",
    "Machine Learning",
    "DevOps Engineering",
    "Cloud Engineering",
    "Cybersecurity",
    "Product Management",
    "Project Management",
    "Digital Marketing",
    "Content Creation",
    "Business Analysis",
    "Quality Assurance",
    "Technical Writing",
  ];

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Looking to Hire Talented Tech Talent?</h2>
        <p className="text-xl text-[#1E1E1E] mb-8 mx-auto max-w-3xl">
          Our students are trained, creative, and ready to deliver. If you're impressed by the projects showcased here and
          would like to hire a Tecvinson Academy student for an internship, freelance role, or full-time position, we'd
          love to hear from you.
        </p>
      </div>

      <div className={`modal ${isOpen ? "block" : "hidden"}`}>
        <div className="modal-overlay absolute inset-0 bg-gray-500 bg-opacity-75"></div>
        <div className="modal-container fixed z-50 inset-0 overflow-y-auto">
          <div className="modal-content bg-white rounded-lg shadow-xl max-w-4xl mx-auto my-8 max-h-[95vh] overflow-hidden">
            {isSubmitted ? (
              <div className="text-center py-12 px-8">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for your interest in hiring Tecvinson talent. We'll review your request and get back to you
                  within 24-48 hours.
                </p>
                <button
                  onClick={resetForm}
                  className="bg-[#3B9790] hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg text-lg"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-white border-b px-8 py-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Hire a Tecvinson Talent</h2>
                    <p className="text-gray-600 mt-1">Connect with our skilled graduates for your next project</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Form Type Toggle */}
                <div className="bg-gray-50 px-8 py-4 border-b">
                  <div className="flex space-x-1 bg-white rounded-lg p-1 max-w-md">
                    <button
                      type="button"
                      onClick={() => setFormType("quick")}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        formType === "quick" ? "bg-[#3B9790] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Quick Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormType("detailed")}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        formType === "detailed"
                          ? "bg-[#3B9790] text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Detailed Request
                    </button>
                  </div>
                </div>

                {/* Form Content */}
                <div className="overflow-y-auto max-h-[calc(95vh-180px)]">
                  <div className="px-8 py-6">
                    {formType === "quick" ? (
                      /* Quick Request Form */
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* How would you like to proceed */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-gray-900">How would you like to proceed?</h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="quick-option"
                                name="request-type"
                                checked={formType === "quick"}
                                onChange={() => setFormType("quick")}
                                className="text-[#3B9790] focus:ring-[#3B9790]"
                              />
                              <label htmlFor="quick-option" className="text-sm text-gray-700">
                                <span className="font-medium">Quick Request</span> (Short Form - just basic info, we'll
                                contact you to finalize details)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="detailed-option"
                                name="request-type"
                                checked={formType === "detailed"}
                                onChange={() => setFormType("detailed")}
                                className="text-[#3B9790] focus:ring-[#3B9790]"
                              />
                              <label htmlFor="detailed-option" className="text-sm text-gray-700">
                                <span className="font-medium">Detailed Request</span> (Complete Form - provide all
                                relevant details)
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* 1. Company Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">1. Company Information</h3>

                          <div className="space-y-2">
                            <label htmlFor="companyName" className="text-sm font-medium text-gray-700 block mb-1">
                              Company Name
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                  className="h-5 w-5 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H3m2-16h14a2 2 0 012 2v16M7 3v18M15 3v18"
                                  />
                                </svg>
                              </div>
                              <input
                                id="companyName"
                                type="text"
                                placeholder="Enter your company name"
                                value={quickFormData.companyName}
                                onChange={(e) => handleQuickInputChange("companyName", e.target.value)}
                                className="w-full h-11 pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="contactPersonName" className="text-sm font-medium text-gray-700 block mb-1">
                              Contact Person's Full Name
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                  className="h-5 w-5 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              <input
                                id="contactPersonName"
                                type="text"
                                placeholder="Enter contact person's full name"
                                value={quickFormData.fullName}
                                onChange={(e) => handleQuickInputChange("fullName", e.target.value)}
                                className="w-full h-11 pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                                Email Address
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                                <input
                                  id="email"
                                  type="email"
                                  placeholder="example@domain.com"
                                  value={quickFormData.email}
                                  onChange={(e) => handleQuickInputChange("email", e.target.value)}
                                  className="w-full h-11 pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 block mb-1">
                                Phone Number
                              </label>
                              <PhoneInput
                                value={quickFormData.phoneNumber}
                                onChange={(fullPhoneNumber) => handleQuickInputChange("phoneNumber", fullPhoneNumber)}
                                placeholder="Phone number"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 block mb-1">
                              Preferred Contact Method
                            </label>
                            <div className="flex space-x-6">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="contact-email"
                                  name="contactMethod"
                                  value="email"
                                  className="text-[#3B9790] focus:ring-[#3B9790]"
                                />
                                <label htmlFor="contact-email" className="text-sm text-gray-700">
                                  📧 Email
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="contact-phone"
                                  name="contactMethod"
                                  value="phone"
                                  className="text-[#3B9790] focus:ring-[#3B9790]"
                                />
                                <label htmlFor="contact-phone" className="text-sm text-gray-700">
                                  📞 Phone
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="contact-whatsapp"
                                  name="contactMethod"
                                  value="whatsapp"
                                  className="text-[#3B9790] focus:ring-[#3B9790]"
                                />
                                <label htmlFor="contact-whatsapp" className="text-sm text-gray-700">
                                  💬 WhatsApp
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2. Type of Engagement */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">2. Type of Engagement</h3>

                          <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 block mb-1">Engagement Type</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {["Internship", "Contract", "Full-Time", "Part-Time", "Volunteer"].map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`engagement-${type}`}
                                    checked={quickFormData.engagementTypes?.includes(type)}
                                    onChange={(e) => {
                                      const currentTypes = quickFormData.engagementTypes || [];
                                      const newTypes = e.target.checked
                                        ? [...currentTypes, type]
                                        : currentTypes.filter((t) => t !== type);
                                      handleQuickInputChange("engagementTypes", newTypes);
                                    }}
                                    className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300 rounded"
                                  />
                                  <label htmlFor={`engagement-${type}`} className="text-sm text-gray-700">
                                    {type}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="project-based"
                              className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300 rounded"
                            />
                            <label htmlFor="project-based" className="text-sm text-gray-700">
                              Project based
                            </label>
                          </div>

                          <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 block mb-1">Work Modality</label>
                            <div className="flex space-x-6">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="work-remote"
                                  name="workModality"
                                  value="remote"
                                  className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                />
                                <label htmlFor="work-remote" className="text-sm text-gray-700">
                                  Remote
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="work-hybrid"
                                  name="workModality"
                                  value="hybrid"
                                  className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                />
                                <label htmlFor="work-hybrid" className="text-sm text-gray-700">
                                  Hybrid
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="work-onsite"
                                  name="workModality"
                                  value="onsite"
                                  className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                />
                                <label htmlFor="work-onsite" className="text-sm text-gray-700">
                                  On-Site
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 4. Role/Resource Needs */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">4. Role/Resource Needs</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="resourcesNeeded" className="text-sm font-medium text-gray-700 block mb-1">
                                Number Of Resources Needed
                              </label>
                              <input
                                id="resourcesNeeded"
                                type="number"
                                placeholder="e.g., 2"
                                className="w-full h-11 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="courseTrack" className="text-sm font-medium text-gray-700 block mb-1">
                                Preferred Course Track/Role
                              </label>
                              <div className="relative">
                                <select
                                  multiple
                                  value={quickFormData.selectedTracks}
                                  onChange={(e) => {
                                    const options = Array.from(e.target.selectedOptions, (option) => option.value);
                                    handleQuickInputChange("selectedTracks", options);
                                  }}
                                  className="w-full h-11 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                >
                                  {tracks.map((track) => (
                                    <option key={track} value={track}>
                                      {track}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {quickFormData.selectedTracks && quickFormData.selectedTracks.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {quickFormData.selectedTracks.map((track) => (
                                    <span
                                      key={track}
                                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#3B9790] text-white"
                                    >
                                      {track}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newTracks = quickFormData.selectedTracks.filter((t) => t !== track);
                                          handleQuickInputChange("selectedTracks", newTracks);
                                        }}
                                        className="ml-1 text-white hover:text-gray-200"
                                      >
                                        ×
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="jobSummary" className="text-sm font-medium text-gray-700 block mb-1">
                              Job Summary / Role Description (Optional)
                            </label>
                            <textarea
                              id="jobSummary"
                              placeholder="Briefly describe the role, responsibilities, and requirements..."
                              value={quickFormData.message}
                              onChange={(e) => handleQuickInputChange("message", e.target.value)}
                              rows={4}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent resize-none"
                            />
                          </div>
                        </div>

                        {/* Acknowledgments */}
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="acknowledgment1"
                              required
                              className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300 rounded mt-1"
                            />
                            <label htmlFor="acknowledgment1" className="text-sm leading-6 text-gray-700">
                              I acknowledge that Tecvinson Academy will review this request and connect me to discuss fit,
                              availability and next steps.
                            </label>
                          </div>

                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="acknowledgment2"
                              className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300 rounded mt-1"
                            />
                            <label htmlFor="acknowledgment2" className="text-sm leading-6 text-gray-700">
                              I agree to provide feedback on the performance of any assigned student.
                            </label>
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#3B9790] hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold h-12 text-lg rounded-md"
                          >
                            {isLoading ? 'Submitting...' : 'Submit Request'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* Detailed Request Form */
                      <form onSubmit={handleSubmit} className="space-y-8">
                        {/* How would you like to proceed */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-gray-900">How would you like to proceed?</h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="detailed-quick-option"
                                name="detailed-request-type"
                                checked={formType === "quick"}
                                onChange={() => setFormType("quick")}
                                className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                              />
                              <label htmlFor="detailed-quick-option" className="text-sm text-gray-700">
                                <span className="font-medium">Quick Request</span> (Short Form - just basic info, we'll
                                contact you to finalize details)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="detailed-detailed-option"
                                name="detailed-request-type"
                                checked={formType === "detailed"}
                                onChange={() => setFormType("detailed")}
                                className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                              />
                              <label htmlFor="detailed-detailed-option" className="text-sm text-gray-700">
                                <span className="font-medium">Detailed Request</span> (Complete Form - provide all
                                relevant details)
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* 1. Company Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">1. Company Information</h3>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label htmlFor="d-companyName" className="text-sm font-medium text-gray-700 block mb-1">
                                Company Name
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H3m2-16h14a2 2 0 012 2v16M7 3v18M15 3v18"
                                    />
                                  </svg>
                                </div>
                                <input
                                  id="d-companyName"
                                  type="text"
                                  placeholder="Enter company name"
                                  value={detailedFormData.companyName}
                                  onChange={(e) => handleDetailedInputChange("companyName", e.target.value)}
                                  className="w-full h-11 pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="d-website" className="text-sm font-medium text-gray-700 block mb-1">
                                Website
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                                    />
                                  </svg>
                                </div>
                                <input
                                  id="d-website"
                                  type="url"
                                  placeholder="www.companywebsite.com"
                                  value={detailedFormData.companyWebsite}
                                  onChange={(e) => handleDetailedInputChange("companyWebsite", e.target.value)}
                                  className="w-full h-11 pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="d-industry" className="text-sm font-medium text-gray-700 block mb-1">
                                Industry
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H3m2-16h14a2 2 0 012 2v16M7 3v18M15 3v18"
                                    />
                                  </svg>
                                </div>
                                <select
                                  id="d-industry"
                                  value={detailedFormData.industry}
                                  onChange={(e) => handleDetailedInputChange("industry", e.target.value)}
                                  className="w-full h-11 pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                >
                                  <option value="">Select industry</option>
                                  <option value="technology">Technology</option>
                                  <option value="finance">Finance</option>
                                  <option value="healthcare">Healthcare</option>
                                  <option value="education">Education</option>
                                  <option value="ecommerce">E-commerce</option>
                                  <option value="consulting">Consulting</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="d-location" className="text-sm font-medium text-gray-700 block mb-1">
                                Location
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                </div>
                                <input
                                  id="d-location"
                                  type="text"
                                  placeholder="Enter company location"
                                  value={detailedFormData.location}
                                  onChange={(e) => handleDetailedInputChange("location", e.target.value)}
                                  className="w-full h-11 pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2. Contact Person */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">2. Contact Person</h3>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label htmlFor="d-contactName" className="text-sm font-medium text-gray-700 block mb-1">
                                Full Name
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                </div>
                                <input
                                  id="d-contactName"
                                  type="text"
                                  placeholder="Enter contact person's full name"
                                  value={detailedFormData.contactName}
                                  onChange={(e) => handleDetailedInputChange("contactName", e.target.value)}
                                  className="w-full h-11 pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="d-jobTitle" className="text-sm font-medium text-gray-700 block mb-1">
                                Job Title
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"
                                    />
                                  </svg>
                                </div>
                                <input
                                  id="d-jobTitle"
                                  type="text"
                                  placeholder="Enter job title"
                                  value={detailedFormData.jobTitle}
                                  onChange={(e) => handleDetailedInputChange("jobTitle", e.target.value)}
                                  className="w-full h-11 pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label htmlFor="d-contactEmail" className="text-sm font-medium text-gray-700 block mb-1">
                                  Email Address
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                      className="h-5 w-5 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </div>
                                  <input
                                    id="d-contactEmail"
                                    type="email"
                                    placeholder="example@domain.com"
                                    value={detailedFormData.contactEmail}
                                    onChange={(e) => handleDetailedInputChange("contactEmail", e.target.value)}
                                    className="w-full h-11 pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label htmlFor="d-contactPhone" className="text-sm font-medium text-gray-700 block mb-1">
                                  Phone Number
                                </label>
                                <PhoneInput
                                  value={detailedFormData.contactPhone}
                                  onChange={(fullPhoneNumber) => handleDetailedInputChange("contactPhone", fullPhoneNumber)}
                                  placeholder="Phone number"
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700 block mb-1">
                                Preferred Contact Method
                              </label>
                              <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="d-contact-email"
                                    name="detailedContactMethod"
                                    value="email"
                                    className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                    checked={detailedFormData.preferredContactMethod === "email"}
                                    onChange={() => handleDetailedInputChange("preferredContactMethod", "email")}
                                  />
                                  <label htmlFor="d-contact-email" className="text-sm text-gray-700">
                                    📧 Email
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="d-contact-phone"
                                    name="detailedContactMethod"
                                    value="phone"
                                    className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                    checked={detailedFormData.preferredContactMethod === "phone"}
                                    onChange={() => handleDetailedInputChange("preferredContactMethod", "phone")}
                                  />
                                  <label htmlFor="d-contact-phone" className="text-sm text-gray-700">
                                    📞 Phone
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="d-contact-whatsapp"
                                    name="detailedContactMethod"
                                    value="whatsapp"
                                    className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                    checked={detailedFormData.preferredContactMethod === "whatsapp"}
                                    onChange={() => handleDetailedInputChange("preferredContactMethod", "whatsapp")}
                                  />
                                  <label htmlFor="d-contact-whatsapp" className="text-sm text-gray-700">
                                    💬 WhatsApp
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 3. Type of Engagement */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">3. Type of Engagement</h3>

                          <div className="space-y-4">
                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700 block mb-1">Engagement Type</label>
                              <div className="flex space-x-6">
                                {["Internship", "Contract", "Full-Time", "Part-Time", "Volunteer"].map((type) => (
                                  <div key={type} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id={`d-engagement-${type}`}
                                      name="engagementType"
                                      value={type}
                                      checked={detailedFormData.engagementType === type}
                                      onChange={() => handleDetailedInputChange("engagementType", type)}
                                      className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                    />
                                    <label htmlFor={`d-engagement-${type}`} className="text-sm text-gray-700">
                                      {type}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="d-project-based"
                                checked={detailedFormData.projectBased}
                                onChange={(e) => handleDetailedInputChange("projectBased", e.target.checked)}
                                className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300 rounded"
                              />
                              <label htmlFor="d-project-based" className="text-sm text-gray-700">
                                Project-based
                              </label>
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700 block mb-1">Work Modality</label>
                              <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="d-work-remote"
                                    name="detailedWorkModality"
                                    value="remote"
                                    checked={detailedFormData.workModality === "remote"}
                                    onChange={() => handleDetailedInputChange("workModality", "remote")}
                                    className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                  />
                                  <label htmlFor="d-work-remote" className="text-sm text-gray-700">
                                    Remote
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="d-work-hybrid"
                                    name="detailedWorkModality"
                                    value="hybrid"
                                    checked={detailedFormData.workModality === "hybrid"}
                                    onChange={() => handleDetailedInputChange("workModality", "hybrid")}
                                    className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                  />
                                  <label htmlFor="d-work-hybrid" className="text-sm text-gray-700">
                                    Hybrid
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="d-work-onsite"
                                    name="detailedWorkModality"
                                    value="onsite"
                                    checked={detailedFormData.workModality === "onsite"}
                                    onChange={() => handleDetailedInputChange("workModality", "onsite")}
                                    className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                  />
                                  <label htmlFor="d-work-onsite" className="text-sm text-gray-700">
                                    On-Site
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="d-startDate" className="text-sm font-medium text-gray-700 block mb-1">
                                Start Date
                              </label>
                              <div className="relative">
                                <input
                                  type="date"
                                  id="d-startDate"
                                  value={
                                    detailedFormData.startDate
                                      ? format(detailedFormData.startDate, "yyyy-MM-dd")
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleDetailedInputChange(
                                      "startDate",
                                      e.target.value ? new Date(e.target.value) : undefined,
                                    )
                                  }
                                  min={format(new Date(), "yyyy-MM-dd")}
                                  className="w-full h-11 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700 block mb-1">Expected Duration</label>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  "Less than 1 month",
                                  "1-3 months",
                                  "4-6 months",
                                  "6+ months",
                                  "Ongoing / Open-ended",
                                  "Specific Duration",
                                ].map((durationOption) => (
                                  <div key={durationOption} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id={`d-duration-${durationOption.replace(/\s+/g, "-").toLowerCase()}`}
                                      name="duration"
                                      value={durationOption}
                                      checked={detailedFormData.duration === durationOption}
                                      onChange={() => handleDetailedInputChange("duration", durationOption)}
                                      className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                    />
                                    <label
                                      htmlFor={`d-duration-${durationOption.replace(/\s+/g, "-").toLowerCase()}`}
                                      className="text-sm text-gray-700"
                                    >
                                      {durationOption}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 4. Role/Resource Needs */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">4. Role/Resource Needs</h3>

                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label htmlFor="d-resourcesNeeded" className="text-sm font-medium text-gray-700 block mb-1">
                                  Number Of Resources Needed
                                </label>
                                <input
                                  id="d-resourcesNeeded"
                                  type="number"
                                  placeholder="0"
                                  value={detailedFormData.resourcesNeeded}
                                  onChange={(e) => handleDetailedInputChange("resourcesNeeded", e.target.value)}
                                  className="w-full h-11 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                />
                              </div>

                              <div className="space-y-2">
                                <label htmlFor="d-courseTrack" className="text-sm font-medium text-gray-700 block mb-1">
                                  Preferred Course Track/Role
                                </label>
                                <div className="relative">
                                  <select
                                    multiple
                                    value={detailedFormData.selectedTracks}
                                    onChange={(e) => {
                                      const options = Array.from(e.target.selectedOptions, (option) => option.value);
                                      handleDetailedInputChange("selectedTracks", options);
                                    }}
                                    className="w-full h-11 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent"
                                  >
                                    {tracks.map((track) => (
                                      <option key={track} value={track}>
                                        {track}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                {detailedFormData.selectedTracks && detailedFormData.selectedTracks.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {detailedFormData.selectedTracks.map((track) => (
                                      <span
                                        key={track}
                                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#3B9790] text-white"
                                      >
                                        {track}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newTracks = detailedFormData.selectedTracks.filter(
                                              (t) => t !== track,
                                            );
                                            handleDetailedInputChange("selectedTracks", newTracks);
                                          }}
                                          className="ml-1 text-white hover:text-gray-200"
                                        >
                                          ×
                                        </button>
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700 block mb-1">
                                Skill Level Required
                              </label>
                              <div className="space-y-2">
                                {[
                                  "Entry-Level (Junior)",
                                  "Mid-Level (Intermediate)",
                                  "Senior-Level (Advanced)",
                                  "Flexible / Open to All Levels - No specific level required",
                                ].map((skillLevelOption) => (
                                  <div key={skillLevelOption} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id={`d-skill-level-${skillLevelOption.replace(/\s+/g, "-").toLowerCase()}`}
                                      name="skillLevel"
                                      value={skillLevelOption}
                                      checked={detailedFormData.skillLevel === skillLevelOption}
                                      onChange={() => handleDetailedInputChange("skillLevel", skillLevelOption)}
                                      className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                    />
                                    <label
                                      htmlFor={`d-skill-level-${skillLevelOption.replace(/\s+/g, "-").toLowerCase()}`}
                                      className="text-sm text-gray-700"
                                    >
                                      {skillLevelOption}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="d-jobDescription" className="text-sm font-medium text-gray-700 block mb-1">
                                Job Description or Track Summary
                              </label>
                              <textarea
                                id="d-jobDescription"
                                placeholder="Write..."
                                value={detailedFormData.jobDescription}
                                onChange={(e) => handleDetailedInputChange("jobDescription", e.target.value)}
                                rows={4}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent resize-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 5. Support & Compensation */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">5. Support & Compensation</h3>

                          <div className="space-y-4">
                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700 block mb-1">
                                Is this a Paid Opportunity?
                              </label>
                              <div className="flex space-x-6">
                                {["Yes", "No", "Negotiable"].map((paidOption) => (
                                  <div key={paidOption} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id={`d-paid-${paidOption.toLowerCase()}`}
                                      name="paidOpportunity"
                                      value={paidOption}
                                      checked={detailedFormData.paidOpportunity === paidOption}
                                      onChange={() => handleDetailedInputChange("paidOpportunity", paidOption)}
                                      className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                    />
                                    <label
                                      htmlFor={`d-paid-${paidOption.toLowerCase()}`}
                                      className="text-sm text-gray-700"
                                    >
                                      {paidOption}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700 block mb-1">
                                Will your company provide training or onboarding support?
                              </label>
                              <div className="flex space-x-6">
                                {["Yes", "No"].map((trainingOption) => (
                                  <div key={trainingOption} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id={`d-training-${trainingOption.toLowerCase()}`}
                                      name="trainingSupport"
                                      value={trainingOption}
                                      checked={detailedFormData.trainingSupport === trainingOption}
                                      onChange={() => handleDetailedInputChange("trainingSupport", trainingOption)}
                                      className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                    />
                                    <label
                                      htmlFor={`d-training-${trainingOption.toLowerCase()}`}
                                      className="text-sm text-gray-700"
                                    >
                                      {trainingOption}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700 block mb-1">
                                Will the student need a work permit to participate?
                              </label>
                              <div className="flex space-x-6">
                                {["Yes", "No", "Not Sure"].map((permitOption) => (
                                  <div key={permitOption} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id={`d-permit-${permitOption.toLowerCase().replace(" ", "-")}`}
                                      name="workPermitNeeded"
                                      value={permitOption}
                                      checked={detailedFormData.workPermitNeeded === permitOption}
                                      onChange={() => handleDetailedInputChange("workPermitNeeded", permitOption)}
                                      className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                    />
                                    <label
                                      htmlFor={`d-permit-${permitOption.toLowerCase().replace(" ", "-")}`}
                                      className="text-sm text-gray-700"
                                    >
                                      {permitOption}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {detailedFormData.workPermitNeeded === "Yes" && (
                              <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                  If yes, will your company be willing to assist in the work permit application?
                                </label>
                                <div className="flex space-x-6">
                                  {["Yes", "No"].map((assistanceOption) => (
                                    <div key={assistanceOption} className="flex items-center space-x-2">
                                      <input
                                        type="radio"
                                        id={`d-assistance-${assistanceOption.toLowerCase()}`}
                                        name="workPermitAssistance"
                                        value={assistanceOption}
                                        checked={detailedFormData.workPermitAssistance === assistanceOption}
                                        onChange={() =>
                                          handleDetailedInputChange("workPermitAssistance", assistanceOption)
                                        }
                                        className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300"
                                      />
                                      <label
                                        htmlFor={`d-assistance-${assistanceOption.toLowerCase()}`}
                                        className="text-sm text-gray-700"
                                      >
                                        {assistanceOption}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="space-y-2">
                              <label htmlFor="d-toolsProvided" className="text-sm font-medium text-gray-700 block mb-1">
                                Will your company provide any tools, equipment, or software accounts?
                                <br />
                                If yes, please list them below:
                              </label>
                              <textarea
                                id="d-toolsProvided"
                                placeholder="e.g., Laptop, Slack, GitHub, AWS access"
                                value={detailedFormData.toolsProvided}
                                onChange={(e) => handleDetailedInputChange("toolsProvided", e.target.value)}
                                rows={3}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent resize-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 6. Additional Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">6. Additional Information</h3>

                          <div className="space-y-2">
                            <label
                              htmlFor="d-additionalInformation"
                              className="text-sm font-medium text-gray-700 block mb-1"
                            >
                              Anything else you'd like us to know?
                            </label>
                            <textarea
                              id="d-additionalInformation"
                              placeholder="Write..."
                              value={detailedFormData.additionalInformation}
                              onChange={(e) => handleDetailedInputChange("additionalInformation", e.target.value)}
                              rows={4}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B9790] focus:border-transparent resize-none"
                            />
                          </div>
                        </div>

                        {/* Acknowledgments */}
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="d-acknowledgment1"
                              checked={detailedFormData.acknowledgment}
                              onChange={(e) => handleDetailedInputChange("acknowledgment", e.target.checked)}
                              className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300 rounded mt-1"
                              required
                            />
                            <label htmlFor="d-acknowledgment1" className="text-sm leading-6 text-gray-700">
                              I acknowledge that Tecvinson Academy will review this request and contact me to discuss
                              fit, availability and next steps.
                            </label>
                          </div>

                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="d-acknowledgment2"
                              className="h-4 w-4 text-[#3B9790] focus:ring-[#3B9790] border-gray-300 rounded mt-1"
                            />
                            <label htmlFor="d-acknowledgment2" className="text-sm leading-6 text-gray-700">
                              I agree to provide feedback on the performance of any assigned student.
                            </label>
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#3B9790] hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold h-12 text-lg rounded-md"
                          >
                            {isLoading ? 'Submitting...' : 'Submit Request'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#3B9790] hover:bg-teal-700 text-white font-semibold px-8 py-[1.3rem] rounded-xl transition-colors text-lg"
        >
          Hire a Tecvinson Talent
        </button>
      </div>
    </div>
  );
};

export default HireTalent;