import { Info, Rocket, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import ApplicationModal from "./ApplicationModal";
import { HiArrowLongDown } from "react-icons/hi2";
import { useStudentApplications } from "../hooks/useStudentApplications";

const Enrollment = () => {
  const [expandedStage, setExpandedStage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("notice"); // notice, form, success
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    course: "",
    education: "",
    currentOccupation: "",
    address: "",
    country: "Nigeria", // Additional field for frontend use
    timeZone: "", // Additional field for frontend use
    year: "2025", // Additional field for frontend use
    cohort: "", // Additional field for frontend use
  });

  const { submitApplication } = useStudentApplications();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const toggleStage = (stageNumber) => {
    if (expandedStage === stageNumber) {
      setExpandedStage(null);
    } else {
      setExpandedStage(stageNumber);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const success = await submitApplication(formData);
    if (success) {
      setModalStep("success");
      setTimeout(() => {
        window.location.href = "/courses"; // Redirect to courses page after 3 seconds
      }, 3000);
    } else {
      alert("Failed to submit application. Please check your details and try again.");
    }
  };

  const timelineStages = [
    {
      number: 1,
      title: "General IT Knowledge",
      duration: "2 Months",
      content: [
        "Introduction To Software Development.",
        "Introduction To How The Internet And Web Works.",
        "Introduction To Jira And Confluence",
        "Introduction To Operating Systems.",
        "Introduction To Networking.",
        "Introduction To Computer Security.",
        "Introduction To Data Communication.",
        "Introduction To Virtualization and Containerization.",
        "Introduction To Windows Command Line.",
        "Introduction To Linux and Shell Commands.",
        "Introduction To Databases and SQL.",
        "Introduction To Git And Github.",
        "Introduction To API (Application Programming Interface).",
        "Introduction To Docker.",
        "Introduction To Cloud.",
      ],
    },
    {
      number: 2,
      title: "Software Development",
      duration: "2 Months",
      content: [
        "Advanced Programming Concepts",
        "Front-end Development",
        "Back-end Development",
        "Database Design and Management",
        "API Development",
        "Testing and Quality Assurance",
        "DevOps Fundamentals",
      ],
    },
    {
      number: 3,
      title: "Specialization",
      duration: "3 Months",
      content: [
        "Choose Your Track: Web, Mobile, or Data",
        "Deep Dive into Frameworks",
        "Advanced Architecture Patterns",
        "Security Best Practices",
        "Performance Optimization",
        "Team Collaboration",
      ],
    },
    {
      number: 4,
      title: "Project-based Learning and Job Readiness",
      duration: "2 Months",
      content: [
        "Real-world Project Implementation",
        "Portfolio Development",
        "Technical Interview Preparation",
        "Resume Building",
        "Soft Skills Development",
        "Industry Networking",
      ],
    },
  ];

  const cohortSteps = [
    {
      title: "Join Orientation",
      description: "Receive schedule and materials.",
    },
    {
      title: "Engage in Stages 1-3",
      description: "Complete core and specialization tracks.",
    },
    {
      title: "Complete Stage 4",
      description: "Work on real-world projects and build job readiness skills.",
    },
    {
      title: "Graduation and Opportunities",
      description: "Access placement support.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Apply to Tecvinson Academy</h1>

          {/* Cohort Information Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-12">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Cohort Information</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-baseline">
                    <span className="font-medium mr-2">•</span>
                    <span className="font-medium mr-1">Start Date:</span> February 5, 2025
                  </li>
                  <li className="flex items-baseline">
                    <span className="font-medium mr-2">•</span>
                    <span className="font-medium mr-1">Duration:</span> 9 Months (2 Sessions per Week)
                  </li>
                  <li className="flex items-baseline">
                    <span className="font-medium mr-2">•</span>
                    <span className="font-medium mr-1">Time:</span> Saturdays and Sundays, 14:00 - 16:00 (CET)
                  </li>
                  <li className="flex items-baseline">
                    <span className="font-medium mr-2">•</span>
                    <span className="font-medium mr-1">Mode of Delivery:</span> Online (via Microsoft Teams)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Application Steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Steps to Apply:</h2>

            <div className="flex flex-col md:flex-row gap-2 md:gap-0 mb-12">
              {/* Step 1 */}
              <div className="border-2 border-gray-800 rounded-lg p-6 flex flex-col items-center text-center md:w-1/4">
                <div className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <p className="text-gray-800">Review prerequisites below</p>
              </div>

              {/* Connector */}
              <div className="hidden md:block w-4 self-center border-t-2 border-gray-800"></div>

              {/* Step 2 */}
              <div className="border-2 border-gray-800 rounded-lg p-6 flex flex-col items-center text-center md:w-1/4">
                <div className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <p className="text-gray-800">Submit an online application</p>
              </div>

              {/* Connector */}
              <div className="hidden md:block w-4 self-center border-t-2 border-gray-800"></div>

              {/* Step 3 */}
              <div className="border-2 border-gray-800 rounded-lg p-6 flex flex-col items-center text-center md:w-1/4">
                <div className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <p className="text-gray-800">Complete assessment</p>
              </div>

              {/* Connector */}
              <div className="hidden md:block w-4 self-center border-t-2 border-gray-800"></div>

              {/* Step 4 */}
              <div className="border-2 border-gray-800 rounded-lg p-6 flex flex-col items-center text-center md:w-1/4">
                <div className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                  4
                </div>
                <p className="text-gray-800">Await email confirmation</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="relative w-full px-4">
            {/* SVG positioned at the start */}
            <div className="absolute left-4 md:left-8 lg:left-12 top-full transform -translate-y-1/2 hidden md:block">
              <svg width="60" height="120" viewBox="0 0 63 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.1281 0.764042C40.6576 0.734252 41.111 1.13935 41.1408 1.66885C41.1705 2.19835 40.7654 2.65175 40.2359 2.68154L40.1281 0.764042ZM1.4342 59.277L2.38794 59.1653L2.38796 59.1654L1.4342 59.277ZM8.72047 111.55L7.83962 111.933L7.83948 111.932L8.72047 111.55ZM58.6863 130.617C59.0253 131.025 58.9695 131.63 58.5616 131.969C58.1538 132.308 57.5483 132.252 57.2094 131.845L58.6863 130.617ZM39.3951 132.931C38.865 132.916 38.4476 132.474 38.4628 131.944C38.478 131.414 38.9201 130.997 39.4502 131.012L39.3951 132.931ZM57.9017 117.229C57.8425 116.702 58.2216 116.227 58.7487 116.167C59.2757 116.108 59.751 116.487 59.8102 117.014L57.9017 117.229ZM40.182 1.72279C40.2359 2.68154 40.236 2.68153 40.236 2.68154C40.2358 2.68155 40.2356 2.68156 40.2352 2.68158C40.2345 2.68162 40.2332 2.68169 40.2314 2.6818C40.2279 2.682 40.2223 2.68233 40.2147 2.68279C40.1995 2.6837 40.1762 2.68511 40.1452 2.68708C40.0832 2.69102 39.9902 2.69716 39.8682 2.70586C39.6243 2.72324 39.2647 2.75082 38.8064 2.79136C37.8896 2.87246 36.5791 3.00533 35.01 3.21201C31.8679 3.6259 27.708 4.33337 23.6054 5.50671C19.4869 6.68457 15.5065 8.30983 12.6648 10.5193C9.84742 12.7097 8.23766 15.3924 8.56562 18.7682L7.60986 18.8611L6.6541 18.9539C6.24261 14.7184 8.33464 11.4532 11.4859 9.00309C14.6128 6.57199 18.8678 4.8641 23.0773 3.66021C27.3025 2.45181 31.563 1.72894 34.7592 1.30793C36.3594 1.09715 37.6975 0.961435 38.6371 0.878308C39.1071 0.836736 39.4776 0.808294 39.7317 0.790185C39.8588 0.78113 39.9567 0.774657 40.0235 0.770417C40.0569 0.768296 40.0825 0.766734 40.1 0.765686C40.1087 0.765162 40.1155 0.764767 40.1202 0.764495C40.1225 0.764358 40.1244 0.764253 40.1257 0.764178C40.1263 0.76414 40.1269 0.764106 40.1273 0.764087C40.1277 0.764061 40.1281 0.764042 40.182 1.72279ZM7.60986 18.8611L8.56562 18.7682C8.8709 21.9104 11.5321 23.7915 16.2528 25.0599C20.9263 26.3156 27.0741 26.8229 33.5063 27.5891C39.8685 28.347 46.4697 29.357 51.7976 31.6616C57.1634 33.9827 61.3524 37.6718 62.6532 43.805L61.7138 44.0042L60.7744 44.2034C59.6437 38.872 56.0387 35.5887 51.0351 33.4243C45.9937 31.2436 39.6502 30.2551 33.2792 29.4962C26.9781 28.7456 20.6043 28.2177 15.7545 26.9147C10.9519 25.6243 7.08828 23.423 6.6541 18.9539L7.60986 18.8611ZM61.7138 44.0042L62.6532 43.805C63.9798 50.0598 60.6247 55.3573 55.2223 59.3987C49.8169 63.4423 42.1844 66.3875 34.3957 68.0214C26.6051 69.6557 18.5449 70.0019 12.2511 68.7548C6.04344 67.5249 1.09304 64.6228 0.480449 59.3886L1.4342 59.277L2.38796 59.1654C2.84314 63.0546 6.56947 65.6712 12.6243 66.8709C18.593 68.0536 26.381 67.7404 34.0014 66.1418C41.6234 64.5428 48.9644 61.6816 54.0719 57.8609C59.1823 54.0379 61.8794 49.4132 60.7744 44.2034L61.7138 44.0042ZM1.4342 59.277L0.480465 59.3888C0.185296 56.8699 0.807347 54.6893 2.14005 52.8703C3.45684 51.073 5.42969 49.6778 7.77309 48.6183C12.4497 46.5039 18.8302 45.6237 25.2671 45.6965C31.717 45.7695 38.3351 46.8007 43.5282 48.5971C46.123 49.4946 48.403 50.5972 50.1334 51.8978C51.8561 53.1928 53.1216 54.752 53.5005 56.5788L52.5603 56.7738L51.62 56.9689C51.3726 55.776 50.5037 54.5788 48.9795 53.4331C47.4628 52.2931 45.383 51.2708 42.9003 50.4121C37.9384 48.6957 31.5309 47.6881 25.2454 47.617C18.9468 47.5457 12.882 48.4162 8.56428 50.3683C6.41054 51.342 4.749 52.5589 3.68927 54.0053C2.64544 55.4301 2.14882 57.1247 2.38794 59.1653L1.4342 59.277ZM52.5603 56.7738L53.5005 56.5788C54.2006 59.954 53.0264 63.2201 50.9706 66.1869C48.915 69.1532 45.9088 71.9254 42.7262 74.381C39.5359 76.8425 36.1216 79.0209 33.2141 80.7875C30.2654 82.5792 27.9223 83.8995 26.7348 84.7195L26.1892 83.9293L25.6435 83.1391C26.8898 82.2786 29.3732 80.874 32.2169 79.1462C35.1018 77.3934 38.4459 75.2578 41.553 72.8604C44.6679 70.4571 47.4985 67.8255 49.392 65.093C51.2853 62.3609 52.1727 59.6331 51.62 56.9689L52.5603 56.7738ZM26.1892 83.9293L26.7348 84.7195C24.1463 86.5068 18.3331 89.4562 13.8251 93.9549C11.5972 96.1782 9.77422 98.7092 8.88931 101.552C8.01209 104.37 8.03582 107.558 9.60146 111.168L8.72047 111.55L7.83948 111.932C6.09489 107.909 6.03863 104.248 7.05557 100.981C8.0648 97.739 10.1101 94.949 12.4685 92.5955C17.1331 87.9405 23.3644 84.7128 25.6435 83.1391L26.1892 83.9293ZM8.72047 111.55L9.60132 111.168C11.1162 114.658 13.9912 116.734 17.8098 118.091C21.6602 119.46 26.3487 120.055 31.3464 120.644C36.298 121.228 41.5338 121.805 46.295 123.173C51.0701 124.546 55.462 126.738 58.6863 130.617L57.9478 131.231L57.2094 131.845C54.3205 128.369 50.3306 126.331 45.7646 125.019C41.1848 123.703 36.1202 123.141 31.1214 122.552C26.1688 121.968 21.2571 121.355 17.1665 119.901C13.0442 118.435 9.63761 116.075 7.83962 111.933L8.72047 111.55ZM39.4227 131.972C39.4502 131.012 39.4503 131.012 39.4504 131.012C39.4506 131.012 39.4507 131.012 39.451 131.012C39.4515 131.012 39.4523 131.012 39.4533 131.012C39.4553 131.012 39.4584 131.012 39.4624 131.012C39.4705 131.012 39.4826 131.013 39.4985 131.013C39.5304 131.014 39.5778 131.015 39.6397 131.017C39.7634 131.021 39.9453 131.026 40.1776 131.032C40.6421 131.045 41.3081 131.064 42.1141 131.086C43.7262 131.13 45.8978 131.188 48.1363 131.244C52.6384 131.356 57.3432 131.456 58.3802 131.42L58.4141 132.379L58.448 133.339C57.3357 133.378 52.5448 133.275 48.0885 133.164C45.8479 133.108 43.6746 133.05 42.0616 133.006C41.255 132.984 40.5885 132.965 40.1236 132.952C39.8911 132.946 39.709 132.94 39.5851 132.937C39.5231 132.935 39.4756 132.934 39.4436 132.933C39.4276 132.932 39.4155 132.932 39.4074 132.932C39.4033 132.932 39.4003 132.932 39.3982 132.932C39.3972 132.932 39.3964 132.931 39.3959 132.931C39.3957 132.931 39.3955 132.931 39.3953 132.931C39.3952 132.931 39.3951 132.931 39.4227 131.972ZM58.4141 132.379L58.3802 131.42C58.1978 131.426 58.0887 131.521 58.0648 131.547C58.0553 131.558 58.094 131.516 58.1514 131.364C58.2656 131.06 58.3656 130.561 58.4342 129.868C58.5695 128.504 58.5602 126.654 58.4815 124.762C58.4033 122.88 58.2584 120.996 58.1327 119.58C58.0699 118.873 58.012 118.284 57.9699 117.872C57.9488 117.666 57.9317 117.505 57.9199 117.395C57.914 117.34 57.9094 117.298 57.9063 117.27C57.9048 117.256 57.9036 117.246 57.9028 117.239C57.9024 117.236 57.9022 117.233 57.902 117.231C57.9019 117.23 57.9018 117.23 57.9018 117.229C57.9017 117.229 57.9017 117.229 57.9017 117.229C57.9017 117.229 57.9017 117.229 58.856 117.122C59.8102 117.014 59.8102 117.015 59.8103 117.015C59.8103 117.015 59.8103 117.015 59.8103 117.015C59.8104 117.016 59.8105 117.017 59.8106 117.018C59.8108 117.02 59.8111 117.023 59.8116 117.026C59.8124 117.034 59.8137 117.045 59.8153 117.06C59.8185 117.09 59.8233 117.133 59.8294 117.189C59.8415 117.302 59.859 117.467 59.8804 117.676C59.9233 118.095 59.982 118.693 60.0457 119.41C60.1729 120.843 60.3205 122.759 60.4004 124.682C60.4799 126.595 60.4944 128.555 60.3454 130.058C60.2718 130.8 60.1526 131.499 59.9488 132.04C59.8472 132.31 59.7023 132.602 59.4817 132.844C59.2467 133.1 58.899 133.323 58.448 133.339L58.4141 132.379Z" fill="#EBC894"/>
              </svg>
            </div>
            
            {/* Button centered on the page */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#3B9790] hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center"
              >
                Submit Your Application
                <Rocket className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">Your Learning Journey at Tecvinson Academy</h1>

        {/* Timeline Visualization */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Timeline Visualization:</h2>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[1.4rem] top-6 bottom-10 w-1 bg-[#B7E5E1]"></div>

            {/* Timeline Stages */}
            <div className="space-y-4">
            {timelineStages.map((stage) => (
              <div key={stage.number} className="relative">
                {/* Stage Circle */}
                <div className="absolute left-6 transform -translate-x-1/2 top-6">
                  <div className="w-8 h-8 bg-white rounded-full border-8 border-teal-100 flex items-center justify-center">                    
                  </div>
                </div>

                {/* Stage Content */}
                <div className="ml-16">
                  {/* Stage Header */}
                  <div
                    className={`rounded-md p-4 ${
                      expandedStage === stage.number
                        ? "bg-teal-50 border border-teal-100"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-gray-700">Stage {stage.number} </span>
                        <span className="text-sm text-gray-500">({stage.duration}): </span>
                        <span className="text-gray-700">{stage.title}</span>
                      </div>
                      <button
                        onClick={() => toggleStage(stage.number)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                      >
                        {expandedStage === stage.number ? <X size={16} /> : <Plus size={16} />}
                      </button>
                    </div>

                    {/* Expanded Content */}
                    {expandedStage === stage.number && (
                      <div className="mt-2 space-y-4">
                        {stage.content.map((item, index) => (
                          <div key={index} className="relative">
                            <div className="bg-white rounded-md p-4 shadow-sm flex items-center">
                              <div className="w-8 h-8 bg-[#DBF2F0] rounded-full flex items-center justify-center text-xs font-medium text-[#2C716C] mr-3 border border-teal-100">
                                {index + 1}
                              </div>
                              <div className="flex-1 text-[#5E5E5E] ">{item}</div>
                            </div>

                            {/* Arrow between items */}
                            {index < stage.content.length - 1 && (
                              <div className="flex justify-center my-4">
                                <HiArrowLongDown className="text-[#4ABDB4]" size={30} />
                              </div>
                            )}
                          </div>
                        ))}

                        {stage.number === 1 && (
                          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-md p-4">
                            <div className="flex">
                              <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                              <div className="text-sm text-blue-800">
                                <p className="font-semibold mb-1">Important Notes:</p>
                                <p>
                                  Tecvinson Academy continuously updates its courses and materials to keep pace with
                                  industry standards and the evolving IT landscape. Content may be revised to ensure
                                  relevance and equip students with the latest in-demand skills.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Steps for Cohort Participants */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Steps for Cohort Participants:</h2>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-6 bottom-[0.5rem] w-1 bg-[#EBC894]"></div>

            {/* Cohort Steps */}
            <div className="space-y-6">
              {cohortSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start">
                    <div className="absolute left-4 transform -translate-x-1/2 mt-1">
                      <div className="w-8 h-8 bg-white rounded-full border-8 border-[#EBC894] flex items-center justify-center"></div>
                    </div>

                    <div className="ml-12 flex gap-x-3">
                      <div className="font-semibold text-[#5E5E5E]">{step.title}: </div>
                      <div className="text-gray-600">{step.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ApplicationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalStep={modalStep}
        setModalStep={setModalStep}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Enrollment;