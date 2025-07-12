import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Award, Globe, Zap, FileText, MessageSquare, Trophy, X, ChevronDown } from "lucide-react"
import { HiArrowLongRight, HiBanknotes } from 'react-icons/hi2';
import { PiCursorFill } from 'react-icons/pi';
import { MdLibraryBooks } from 'react-icons/md';
import { BsFillLaptopFill } from 'react-icons/bs';
import { RiBriefcase4Fill } from 'react-icons/ri';
import { usePartnership } from '../hooks/usePartnership';
import PhoneInput from '../components/PhoneInput';

const Partner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState('individual');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        contactMethod: [],
        userType: 'individual',
        companyName: '',
        note: ''
    });

    const { submitPartnership, isLoading, error } = usePartnership();

    const openModal = () => {
        setIsModalOpen(true);
        setModalStep('individual');
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            contactMethod: [],
            userType: 'individual',
            companyName: '',
            note: ''
        });
    };
    
    useEffect(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, []);

    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle phone input changes
    const handlePhoneChange = (fullPhoneNumber) => {
        setFormData(prev => ({
            ...prev,
            phone: fullPhoneNumber
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => {
            if (checked) {
                return { ...prev, [name]: [...prev[name], value] };
            } else {
                return { ...prev, [name]: prev[name].filter(item => item !== value) };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prepare data for backend
        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phone,
            contactMethod: formData.contactMethod,
            type: formData.userType,
            companyName: formData.companyName,
            additionalInfo: formData.note
        };
        const success = await submitPartnership(payload);
        if (success) {
            setModalStep('success');
        } else {
            alert('Submission failed. Please try again.');
        }
    };

    return (
      <>
      <div className='bg-[#FAFAFA]'>
      <div className="bg-mint-50 min-h-screen">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <nav className="flex">
            <Link to="/support" className="text-teal-600 hover:text-teal-800">
              Support Us
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-600">Partner With Us</span>
          </nav>
        </div>
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Partner With Tecvinson Academy
          </h1>
          <p className="text-base text-gray-600">
          Transform Lives and Shape the Future of Tech Education
          </p>
        </div>
        
        {/* Three Column Layout */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Decorative Elements */}
          <div className="absolute top-[-12px] sm:top-[-20px] left-[5rem] sm:left-[5rem]    w-0 h-0 z-0" style={{ transform: 'scaleX(-1)' }}>
                            <svg width="91" height="70" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M63.8138 2.26838C40.1743 7.43569 13.3759 22.9858 3.3701 46.9324C1.07162 52.4307 -2.662 62.5968 2.91267 67.6498C8.09003 72.3374 16.9543 68.2165 22.3497 65.7082C22.6177 65.5835 22.8772 65.4629 23.1273 65.3475C44.1395 55.6509 67.0728 39.8631 82.7334 22.1883C82.8322 22.0768 82.9344 21.9616 83.0398 21.843C86.702 17.7199 94.0905 9.40174 89.2886 3.67684C84.2683 -2.30644 71.9109 0.458801 65.1306 1.97603C64.6638 2.08048 64.2235 2.17902 63.8138 2.26838ZM54.0272 13.1553C41.8205 16.0111 27.0844 24.9824 21.4461 36.8733C16.6046 47.0872 23.5988 50.2164 32.5228 47.0447C44.2195 42.8856 58.0198 33.5041 65.4574 23.2325C72.9442 12.8819 62.6179 11.1471 54.0272 13.1553Z"
                                    fill="#6ECAC3"
                                />
                            </svg>
                        </div>
                        <div className="absolute top-[889px] sm:top-[250px] right-[6rem] sm:right-[6rem] w-0 h-0 z-0">
                            <svg width="91" height="70" viewBox="0 0 91 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M63.8138 68.2028C40.1743 63.0355 13.3759 47.4854 3.3701 23.5388C1.07162 18.0405 -2.662 7.87436 2.91267 2.8214C8.09003 -1.86623 16.9543 2.25474 22.3497 4.76303C22.6177 4.88766 22.8772 5.0083 23.1273 5.12368C44.1395 14.8203 67.0728 30.6081 82.7334 48.2829C82.8322 48.3944 82.9344 48.5096 83.0398 48.6282C86.702 52.7512 94.0905 61.0694 89.2886 66.7944C84.2683 72.7776 71.9109 70.0124 65.1306 68.4952C64.6638 68.3907 64.2235 68.2922 63.8138 68.2028ZM54.0272 57.3159C41.8205 54.4601 27.0844 45.4888 21.4461 33.5979C16.6046 23.384 23.5988 20.2548 32.5228 23.4265C44.2195 27.5856 58.0198 36.9671 65.4574 47.2387C72.9442 57.5893 62.6179 59.3241 54.0272 57.3159Z" fill="#F4A89A"/>
                            </svg>
                        </div>
          
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-200 transform -translate-x-1/2"></div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-32">
            {/* Left Image */}
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
                <img 
                  src="https://res.cloudinary.com/kamisama/image/upload/v1746460722/Frame_333_cglkpp.png" 
                  alt="Group of diverse tech professionals collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Center Text Box */}
            <div className="md:col-span-1 flex items-center">
              <div className=" bg-[#3E3ACE] border-[8px] border-[#807CFF] text-white py-3 px-8 rounded-xl">
                <p className="text-lg">
                At Tecvinson Academy, we are building a global ecosystem to transform lives through free, accessible IT education. We are seeking partnerships with corporations, nonprofit organizations, and tech companies to expand our impact and reach more individuals from underrepresented backgrounds.
                </p>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
                <img 
                  src="https://res.cloudinary.com/kamisama/image/upload/v1746461488/Frame_335_drtsia.png" 
                  alt="Trainer helping students with computer tasks" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>              
        </div>
  
        <div className='bg-white w-full'>
          {/* What We're Looking For Section */}
          <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Collaboration Areas</h2>
              <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                  <div className="mt-1">
                  <div className=" rounded-full p-2 flex items-center justify-center">
                      <HiBanknotes className="h-8 w-8 text-[#807CFF]" />
                  </div>
                  </div>
                  <div>
                  <h3 className="font-semibold text-lg mb-2">Funding Support:</h3>
                  <p className="text-gray-600">
                  Partner with us to fund our programs and help us train more students globally. Your financial support will enable us to scale our efforts, develop new courses, and provide necessary tools and resources to our students.
                  </p>
                  </div>
              </div>
  
              <div className="flex gap-4">
                  <div className="mt-1">
                  <div className=" rounded-full p-2 flex items-center justify-center">
                      <PiCursorFill className="h-8 w-8 text-[#807CFF]" />
                  </div>
                  </div>
                  <div>
                  <h3 className="font-semibold text-lg mb-2">Tools and Software Contributions:</h3>
                  <p className="text-gray-600">
                  Help equip our students with industry-standard tools, software licenses, and platforms such as Jira, Miro, and other essential tech tools. This ensures our students are well-prepared for real-world projects.
                  </p>
                  </div>
              </div>
  
              <div className="flex gap-4">
                  <div className="mt-1">
                  <div className=" rounded-full p-2 flex items-center justify-center">
                      <RiBriefcase4Fill className="h-8 w-8 text-[#807CFF]" />
                  </div>
                  </div>
                  <div>
                  <h3 className="font-semibold text-lg mb-2">Job and Internship Opportunities:</h3>
                  <p className="text-gray-600">
                  Collaborate with us to provide job placements, internships, and mentorship opportunities for our graduates. This not only empowers students but also gives partners access to a pool of skilled, motivated, and job-ready talent.
                  </p>
                  </div>
              </div>
  
              <div className="flex gap-4">
                  <div className="mt-1">
                  <div className=" rounded-full p-2 flex items-center justify-center">
                      <MdLibraryBooks className="h-8 w-8 text-[#807CFF]" />
                  </div>
                  </div>
                  <div>
                  <h3 className="font-semibold text-lg mb-2">Specialized Training Initiatives:</h3>
                  <p className="text-gray-600">
                  Work with us to design bespoke training programs tailored to your organization's specific talent needs, creating a talent pipeline directly aligned with your objectives.
                  </p>
                  </div>
              </div>
              <div className="flex gap-4">
                  <div className="mt-1">
                  <div className=" rounded-full p-2 flex items-center justify-center">
                      <BsFillLaptopFill className="h-8 w-8 text-[#807CFF]" />
                  </div>
                  </div>
                  <div>
                  <h3 className="font-semibold text-lg mb-2">Technology and Infrastructure Support:</h3>
                  <p className="text-gray-600">
                  Support us with cutting-edge hardware, cloud solutions, or infrastructure enhancements that improve the learning experience for our students.
                  </p>
                  </div>
              </div>
  
              <div className="flex gap-4">
                  <div className="mt-1">
                  <div className=" rounded-full p-2 flex items-center justify-center">
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.916 4.25C17.916 5.258 17.557 6.121 16.839 6.839C16.121 7.557 15.258 7.917 14.249 7.917C13.852 7.917 13.485 7.863 13.149 7.756C12.813 7.649 12.477 7.473 12.141 7.229C11.408 7.473 10.82 7.917 10.376 8.558C9.933 9.2 9.712 9.903 9.712 10.667H31.391C31.941 10.667 32.392 10.881 32.743 11.308C33.095 11.736 33.24 12.225 33.179 12.775L31.895 21.942C31.834 22.4 31.628 22.774 31.276 23.064C30.925 23.355 30.52 23.5 30.062 23.5H26.762L27.083 20.338C27.236 18.84 26.815 17.542 25.822 16.442C24.829 15.342 23.584 14.792 22.087 14.792H11.912C10.415 14.792 9.17 15.342 8.176 16.442C7.183 17.542 6.763 18.84 6.916 20.338L7.237 23.5H3.937C3.479 23.5 3.074 23.355 2.722 23.064C2.371 22.774 2.165 22.4 2.104 21.942L0.82 12.775C0.759 12.225 0.904 11.736 1.255 11.308C1.607 10.881 2.058 10.667 2.608 10.667H6C6 9.169 6.412 7.81 7.237 6.587C8.062 5.365 9.177 4.464 10.583 3.883C10.674 2.936 11.072 2.149 11.774 1.523C12.477 0.897 13.302 0.583 14.249 0.583C15.258 0.583 16.121 0.942 16.839 1.66C17.557 2.378 17.916 3.241 17.916 4.25ZM12.599 33.125H21.399C21.888 33.125 22.301 32.972 22.637 32.667C22.973 32.361 23.172 31.964 23.233 31.475L24.333 20.063C24.394 19.39 24.21 18.802 23.783 18.298C23.355 17.794 22.79 17.542 22.087 17.542H11.912C11.209 17.542 10.644 17.794 10.216 18.298C9.788 18.802 9.605 19.39 9.666 20.063L10.766 31.475C10.827 31.964 11.026 32.361 11.362 32.667C11.698 32.972 12.11 33.125 12.599 33.125Z" fill="#807CFF"/>
                    </svg>
                  </div>
                  </div>
                  <div>
                  <h3 className="font-semibold text-lg mb-2">Community Workshops and Hackathons:</h3>
                  <p className="text-gray-600">
                  Sponsor workshops, events, or hackathons that foster creativity and innovation while engaging directly with a diverse and talented group of aspiring tech professionals.
                  </p>
                  </div>
              </div>
              </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5'>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
              <div className="flex flex-col sm:flex-row sm:items-center text-[#1E1E1E] font-medium py-4 sm:py-6 lg:py-10">
              <span className='text-base sm:text-lg lg:text-xl leading-relaxed mb-2 sm:mb-0' style={{textAlign: 'center'}}>Transform Lives and Shape the Future of Tech Education</span>
              <ArrowRight className="hidden sm:block ml-2 h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0" />
              </div>
              <button className="bg-[#3B9790] hover:bg-teal-700 text-white px-8 py-[1.3rem]  font-semibold rounded-xl transition-colors" onClick={openModal}>
                Partner With Us Today
              </button>
          </div>        
        </div>
  
  
        <div className=''>
          {/* Why Join Us Section */}
          <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Mutual Benefits for Partners</h2>
              <div className="grid md:grid-cols-2 gap-8">
              
              <div className="flex gap-4 bg-white p-8 rounded-xl">
                  <div className="mt-1">
                  <div className=" rounded-full p-2 flex items-center justify-center">
                  <svg width="30" height="30" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.333 61C33.389 61 32.597 60.681 31.958 60.042C31.319 59.403 31 58.611 31 57.667C31 57.278 31.083 56.875 31.25 56.458C31.417 56.042 31.667 55.667 32 55.333L46.25 41.083C46.583 40.75 46.75 40.347 46.75 39.875C46.75 39.403 46.583 39 46.25 38.667C45.917 38.333 45.514 38.181 45.042 38.208C44.569 38.236 44.167 38.417 43.833 38.75L29.667 52.917C29.333 53.25 28.972 53.5 28.583 53.667C28.194 53.833 27.778 53.917 27.333 53.917C26.389 53.917 25.597 53.597 24.958 52.958C24.319 52.319 24 51.528 24 50.583C24 50.028 24.083 49.569 24.25 49.208C24.417 48.847 24.639 48.528 24.917 48.25L39.167 34C39.5 33.667 39.667 33.278 39.667 32.833C39.667 32.389 39.5 32 39.167 31.667C38.833 31.333 38.444 31.167 38 31.167C37.556 31.167 37.167 31.333 36.833 31.667L22.583 45.833C22.25 46.167 21.889 46.417 21.5 46.583C21.111 46.75 20.667 46.833 20.167 46.833C19.278 46.833 18.5 46.5 17.833 45.833C17.167 45.167 16.833 44.389 16.833 43.5C16.833 43.056 16.917 42.639 17.083 42.25C17.25 41.861 17.5 41.5 17.833 41.167L32 27C32.333 26.667 32.5 26.264 32.5 25.792C32.5 25.319 32.333 24.917 32 24.583C31.667 24.25 31.278 24.083 30.833 24.083C30.389 24.083 30 24.25 29.667 24.583L15.5 38.833C15.222 39.111 14.889 39.333 14.5 39.5C14.111 39.667 13.639 39.75 13.083 39.75C12.139 39.75 11.347 39.431 10.708 38.792C10.069 38.153 9.75 37.361 9.75 36.417C9.75 35.972 9.833 35.556 10 35.167C10.167 34.778 10.417 34.417 10.75 34.083L27.083 17.75C27.694 17.139 28.458 16.861 29.375 16.917C30.292 16.972 31.056 17.306 31.667 17.917L41.833 28.083C42.444 28.694 43.167 29.181 44 29.542C44.833 29.903 45.667 30.083 46.5 30.083C48.278 30.083 49.833 29.458 51.167 28.208C52.5 26.958 53.167 25.361 53.167 23.417C53.167 22.639 53.028 21.833 52.75 21C52.472 20.167 51.972 19.389 51.25 18.667L39.833 7.25C39.222 6.639 38.819 5.972 38.625 5.25C38.431 4.528 38.528 3.833 38.917 3.167C39.417 2.333 40.056 1.722 40.833 1.333C41.611 0.944 42.472 0.75 43.417 0.75C44.583 0.75 45.778 1.028 47 1.583C48.222 2.139 49.333 2.917 50.333 3.917L64.417 18.083C65.417 19.083 66.153 20.194 66.625 21.417C67.097 22.639 67.333 24.056 67.333 25.667C67.333 26.778 67.083 27.903 66.583 29.042C66.083 30.181 65.361 31.222 64.417 32.167L36.667 60C36.222 60.444 35.833 60.722 35.5 60.833C35.167 60.944 34.778 61 34.333 61ZM3.667 31.417C2.611 30.639 1.819 29.708 1.292 28.625C0.764 27.542 0.5 26.389 0.5 25.167C0.5 23.889 0.764 22.639 1.292 21.417C1.819 20.194 2.583 19.083 3.583 18.083L17.667 3.917C18.611 2.972 19.653 2.25 20.792 1.75C21.931 1.25 23.139 1 24.417 1C25.806 1 27.153 1.25 28.458 1.75C29.764 2.25 30.889 2.972 31.833 3.917L48.917 21C49.194 21.278 49.431 21.625 49.625 22.042C49.819 22.458 49.917 22.889 49.917 23.333C49.917 24.278 49.597 25.069 48.958 25.708C48.319 26.347 47.528 26.667 46.583 26.667C46.139 26.667 45.708 26.569 45.292 26.375C44.875 26.181 44.528 25.944 44.25 25.667L34 15.5C32.722 14.222 31.153 13.583 29.292 13.583C27.431 13.583 25.861 14.222 24.583 15.5L8.917 31.167C8.194 31.889 7.347 32.264 6.375 32.292C5.403 32.319 4.5 32.028 3.667 31.417Z" fill="#757575"/>
            </svg>
                  </div>
                  </div>
                  <div>
                  <h3 className="font-semibold text-lg mb-2">Corporate Social Responsibility (CSR) Alignment</h3>
                  <p className="text-gray-600">
                  Collaborating with Tecvinson Academy supports your organization’s CSR goals, creating a tangible and measurable social impact. Together, we can empower individuals, reduce inequalities, and increase diversity in the tech workforce.
                  </p>
                  </div>
              </div>
  
              <div className="flex gap-4 bg-white p-8 rounded-xl">
                  <div className="mt-1">
                      <div className=" rounded-full p-2 flex items-center justify-center">
                      <svg width="30" height="30" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.333 61C33.389 61 32.597 60.681 31.958 60.042C31.319 59.403 31 58.611 31 57.667C31 57.278 31.083 56.875 31.25 56.458C31.417 56.042 31.667 55.667 32 55.333L46.25 41.083C46.583 40.75 46.75 40.347 46.75 39.875C46.75 39.403 46.583 39 46.25 38.667C45.917 38.333 45.514 38.181 45.042 38.208C44.569 38.236 44.167 38.417 43.833 38.75L29.667 52.917C29.333 53.25 28.972 53.5 28.583 53.667C28.194 53.833 27.778 53.917 27.333 53.917C26.389 53.917 25.597 53.597 24.958 52.958C24.319 52.319 24 51.528 24 50.583C24 50.028 24.083 49.569 24.25 49.208C24.417 48.847 24.639 48.528 24.917 48.25L39.167 34C39.5 33.667 39.667 33.278 39.667 32.833C39.667 32.389 39.5 32 39.167 31.667C38.833 31.333 38.444 31.167 38 31.167C37.556 31.167 37.167 31.333 36.833 31.667L22.583 45.833C22.25 46.167 21.889 46.417 21.5 46.583C21.111 46.75 20.667 46.833 20.167 46.833C19.278 46.833 18.5 46.5 17.833 45.833C17.167 45.167 16.833 44.389 16.833 43.5C16.833 43.056 16.917 42.639 17.083 42.25C17.25 41.861 17.5 41.5 17.833 41.167L32 27C32.333 26.667 32.5 26.264 32.5 25.792C32.5 25.319 32.333 24.917 32 24.583C31.667 24.25 31.278 24.083 30.833 24.083C30.389 24.083 30 24.25 29.667 24.583L15.5 38.833C15.222 39.111 14.889 39.333 14.5 39.5C14.111 39.667 13.639 39.75 13.083 39.75C12.139 39.75 11.347 39.431 10.708 38.792C10.069 38.153 9.75 37.361 9.75 36.417C9.75 35.972 9.833 35.556 10 35.167C10.167 34.778 10.417 34.417 10.75 34.083L27.083 17.75C27.694 17.139 28.458 16.861 29.375 16.917C30.292 16.972 31.056 17.306 31.667 17.917L41.833 28.083C42.444 28.694 43.167 29.181 44 29.542C44.833 29.903 45.667 30.083 46.5 30.083C48.278 30.083 49.833 29.458 51.167 28.208C52.5 26.958 53.167 25.361 53.167 23.417C53.167 22.639 53.028 21.833 52.75 21C52.472 20.167 51.972 19.389 51.25 18.667L39.833 7.25C39.222 6.639 38.819 5.972 38.625 5.25C38.431 4.528 38.528 3.833 38.917 3.167C39.417 2.333 40.056 1.722 40.833 1.333C41.611 0.944 42.472 0.75 43.417 0.75C44.583 0.75 45.778 1.028 47 1.583C48.222 2.139 49.333 2.917 50.333 3.917L64.417 18.083C65.417 19.083 66.153 20.194 66.625 21.417C67.097 22.639 67.333 24.056 67.333 25.667C67.333 26.778 67.083 27.903 66.583 29.042C66.083 30.181 65.361 31.222 64.417 32.167L36.667 60C36.222 60.444 35.833 60.722 35.5 60.833C35.167 60.944 34.778 61 34.333 61ZM3.667 31.417C2.611 30.639 1.819 29.708 1.292 28.625C0.764 27.542 0.5 26.389 0.5 25.167C0.5 23.889 0.764 22.639 1.292 21.417C1.819 20.194 2.583 19.083 3.583 18.083L17.667 3.917C18.611 2.972 19.653 2.25 20.792 1.75C21.931 1.25 23.139 1 24.417 1C25.806 1 27.153 1.25 28.458 1.75C29.764 2.25 30.889 2.972 31.833 3.917L48.917 21C49.194 21.278 49.431 21.625 49.625 22.042C49.819 22.458 49.917 22.889 49.917 23.333C49.917 24.278 49.597 25.069 48.958 25.708C48.319 26.347 47.528 26.667 46.583 26.667C46.139 26.667 45.708 26.569 45.292 26.375C44.875 26.181 44.528 25.944 44.25 25.667L34 15.5C32.722 14.222 31.153 13.583 29.292 13.583C27.431 13.583 25.861 14.222 24.583 15.5L8.917 31.167C8.194 31.889 7.347 32.264 6.375 32.292C5.403 32.319 4.5 32.028 3.667 31.417Z" fill="#757575"/>
            </svg>
                      </div>
                  </div>
                  <div>
                      <h3 className="font-semibold text-lg mb-2">Access to Skilled Talent</h3>
                      <p className="text-gray-600">
                      Gain exclusive access to a pool of highly trained, job-ready professionals who are equipped with both technical and soft skills. Many of our graduates excel in software development, product management, and data analysis, making them ideal candidates for your organization’s growing needs.
                      </p>
                  </div>
              </div>
  
              <div className="flex gap-4 bg-white p-8 rounded-xl">
                  <div className="mt-1">
                  <div className="rounded-full p-2 flex items-center justify-center">
                  <svg width="30" height="30" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.333 61C33.389 61 32.597 60.681 31.958 60.042C31.319 59.403 31 58.611 31 57.667C31 57.278 31.083 56.875 31.25 56.458C31.417 56.042 31.667 55.667 32 55.333L46.25 41.083C46.583 40.75 46.75 40.347 46.75 39.875C46.75 39.403 46.583 39 46.25 38.667C45.917 38.333 45.514 38.181 45.042 38.208C44.569 38.236 44.167 38.417 43.833 38.75L29.667 52.917C29.333 53.25 28.972 53.5 28.583 53.667C28.194 53.833 27.778 53.917 27.333 53.917C26.389 53.917 25.597 53.597 24.958 52.958C24.319 52.319 24 51.528 24 50.583C24 50.028 24.083 49.569 24.25 49.208C24.417 48.847 24.639 48.528 24.917 48.25L39.167 34C39.5 33.667 39.667 33.278 39.667 32.833C39.667 32.389 39.5 32 39.167 31.667C38.833 31.333 38.444 31.167 38 31.167C37.556 31.167 37.167 31.333 36.833 31.667L22.583 45.833C22.25 46.167 21.889 46.417 21.5 46.583C21.111 46.75 20.667 46.833 20.167 46.833C19.278 46.833 18.5 46.5 17.833 45.833C17.167 45.167 16.833 44.389 16.833 43.5C16.833 43.056 16.917 42.639 17.083 42.25C17.25 41.861 17.5 41.5 17.833 41.167L32 27C32.333 26.667 32.5 26.264 32.5 25.792C32.5 25.319 32.333 24.917 32 24.583C31.667 24.25 31.278 24.083 30.833 24.083C30.389 24.083 30 24.25 29.667 24.583L15.5 38.833C15.222 39.111 14.889 39.333 14.5 39.5C14.111 39.667 13.639 39.75 13.083 39.75C12.139 39.75 11.347 39.431 10.708 38.792C10.069 38.153 9.75 37.361 9.75 36.417C9.75 35.972 9.833 35.556 10 35.167C10.167 34.778 10.417 34.417 10.75 34.083L27.083 17.75C27.694 17.139 28.458 16.861 29.375 16.917C30.292 16.972 31.056 17.306 31.667 17.917L41.833 28.083C42.444 28.694 43.167 29.181 44 29.542C44.833 29.903 45.667 30.083 46.5 30.083C48.278 30.083 49.833 29.458 51.167 28.208C52.5 26.958 53.167 25.361 53.167 23.417C53.167 22.639 53.028 21.833 52.75 21C52.472 20.167 51.972 19.389 51.25 18.667L39.833 7.25C39.222 6.639 38.819 5.972 38.625 5.25C38.431 4.528 38.528 3.833 38.917 3.167C39.417 2.333 40.056 1.722 40.833 1.333C41.611 0.944 42.472 0.75 43.417 0.75C44.583 0.75 45.778 1.028 47 1.583C48.222 2.139 49.333 2.917 50.333 3.917L64.417 18.083C65.417 19.083 66.153 20.194 66.625 21.417C67.097 22.639 67.333 24.056 67.333 25.667C67.333 26.778 67.083 27.903 66.583 29.042C66.083 30.181 65.361 31.222 64.417 32.167L36.667 60C36.222 60.444 35.833 60.722 35.5 60.833C35.167 60.944 34.778 61 34.333 61ZM3.667 31.417C2.611 30.639 1.819 29.708 1.292 28.625C0.764 27.542 0.5 26.389 0.5 25.167C0.5 23.889 0.764 22.639 1.292 21.417C1.819 20.194 2.583 19.083 3.583 18.083L17.667 3.917C18.611 2.972 19.653 2.25 20.792 1.75C21.931 1.25 23.139 1 24.417 1C25.806 1 27.153 1.25 28.458 1.75C29.764 2.25 30.889 2.972 31.833 3.917L48.917 21C49.194 21.278 49.431 21.625 49.625 22.042C49.819 22.458 49.917 22.889 49.917 23.333C49.917 24.278 49.597 25.069 48.958 25.708C48.319 26.347 47.528 26.667 46.583 26.667C46.139 26.667 45.708 26.569 45.292 26.375C44.875 26.181 44.528 25.944 44.25 25.667L34 15.5C32.722 14.222 31.153 13.583 29.292 13.583C27.431 13.583 25.861 14.222 24.583 15.5L8.917 31.167C8.194 31.889 7.347 32.264 6.375 32.292C5.403 32.319 4.5 32.028 3.667 31.417Z" fill="#757575"/>
            </svg>
                  </div>
                  </div>
                  <div>
                  <h3 className="font-semibold text-lg mb-2">Brand Visibility and Recognition</h3>
                  <p className="text-gray-600">
                  Showcase your commitment to education and diversity by being featured as a partner on our website, social media platforms, and promotional campaigns. Your brand will be associated with a mission-driven organization that transforms lives.
                  </p>
                  </div>
              </div>
              
  
              <div className="flex gap-4 bg-white p-8 rounded-xl">
                  <div className="mt-1">
                  <div className=" rounded-full p-2 flex items-center justify-center">
                  <svg width="30" height="30" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.333 61C33.389 61 32.597 60.681 31.958 60.042C31.319 59.403 31 58.611 31 57.667C31 57.278 31.083 56.875 31.25 56.458C31.417 56.042 31.667 55.667 32 55.333L46.25 41.083C46.583 40.75 46.75 40.347 46.75 39.875C46.75 39.403 46.583 39 46.25 38.667C45.917 38.333 45.514 38.181 45.042 38.208C44.569 38.236 44.167 38.417 43.833 38.75L29.667 52.917C29.333 53.25 28.972 53.5 28.583 53.667C28.194 53.833 27.778 53.917 27.333 53.917C26.389 53.917 25.597 53.597 24.958 52.958C24.319 52.319 24 51.528 24 50.583C24 50.028 24.083 49.569 24.25 49.208C24.417 48.847 24.639 48.528 24.917 48.25L39.167 34C39.5 33.667 39.667 33.278 39.667 32.833C39.667 32.389 39.5 32 39.167 31.667C38.833 31.333 38.444 31.167 38 31.167C37.556 31.167 37.167 31.333 36.833 31.667L22.583 45.833C22.25 46.167 21.889 46.417 21.5 46.583C21.111 46.75 20.667 46.833 20.167 46.833C19.278 46.833 18.5 46.5 17.833 45.833C17.167 45.167 16.833 44.389 16.833 43.5C16.833 43.056 16.917 42.639 17.083 42.25C17.25 41.861 17.5 41.5 17.833 41.167L32 27C32.333 26.667 32.5 26.264 32.5 25.792C32.5 25.319 32.333 24.917 32 24.583C31.667 24.25 31.278 24.083 30.833 24.083C30.389 24.083 30 24.25 29.667 24.583L15.5 38.833C15.222 39.111 14.889 39.333 14.5 39.5C14.111 39.667 13.639 39.75 13.083 39.75C12.139 39.75 11.347 39.431 10.708 38.792C10.069 38.153 9.75 37.361 9.75 36.417C9.75 35.972 9.833 35.556 10 35.167C10.167 34.778 10.417 34.417 10.75 34.083L27.083 17.75C27.694 17.139 28.458 16.861 29.375 16.917C30.292 16.972 31.056 17.306 31.667 17.917L41.833 28.083C42.444 28.694 43.167 29.181 44 29.542C44.833 29.903 45.667 30.083 46.5 30.083C48.278 30.083 49.833 29.458 51.167 28.208C52.5 26.958 53.167 25.361 53.167 23.417C53.167 22.639 53.028 21.833 52.75 21C52.472 20.167 51.972 19.389 51.25 18.667L39.833 7.25C39.222 6.639 38.819 5.972 38.625 5.25C38.431 4.528 38.528 3.833 38.917 3.167C39.417 2.333 40.056 1.722 40.833 1.333C41.611 0.944 42.472 0.75 43.417 0.75C44.583 0.75 45.778 1.028 47 1.583C48.222 2.139 49.333 2.917 50.333 3.917L64.417 18.083C65.417 19.083 66.153 20.194 66.625 21.417C67.097 22.639 67.333 24.056 67.333 25.667C67.333 26.778 67.083 27.903 66.583 29.042C66.083 30.181 65.361 31.222 64.417 32.167L36.667 60C36.222 60.444 35.833 60.722 35.5 60.833C35.167 60.944 34.778 61 34.333 61ZM3.667 31.417C2.611 30.639 1.819 29.708 1.292 28.625C0.764 27.542 0.5 26.389 0.5 25.167C0.5 23.889 0.764 22.639 1.292 21.417C1.819 20.194 2.583 19.083 3.583 18.083L17.667 3.917C18.611 2.972 19.653 2.25 20.792 1.75C21.931 1.25 23.139 1 24.417 1C25.806 1 27.153 1.25 28.458 1.75C29.764 2.25 30.889 2.972 31.833 3.917L48.917 21C49.194 21.278 49.431 21.625 49.625 22.042C49.819 22.458 49.917 22.889 49.917 23.333C49.917 24.278 49.597 25.069 48.958 25.708C48.319 26.347 47.528 26.667 46.583 26.667C46.139 26.667 45.708 26.569 45.292 26.375C44.875 26.181 44.528 25.944 44.25 25.667L34 15.5C32.722 14.222 31.153 13.583 29.292 13.583C27.431 13.583 25.861 14.222 24.583 15.5L8.917 31.167C8.194 31.889 7.347 32.264 6.375 32.292C5.403 32.319 4.5 32.028 3.667 31.417Z" fill="#757575"/>
            </svg>
                  </div>
                  </div>
                  <div>
                  <h3 className="font-semibold text-lg mb-2">Enhanced Employee Engagement</h3>
                  <p className="text-gray-600">
                  Engage your employees by involving them in mentorship or guest lecture opportunities, fostering a culture of giving back and professional growth within your organization.
                  </p>
                  </div>
              </div>
                <div className="flex gap-4 bg-white p-8 rounded-xl">
                  <div className="mt-1">
                    <div className=" rounded-full p-2 flex items-center justify-center">
                        <svg width="30" height="30" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.333 61C33.389 61 32.597 60.681 31.958 60.042C31.319 59.403 31 58.611 31 57.667C31 57.278 31.083 56.875 31.25 56.458C31.417 56.042 31.667 55.667 32 55.333L46.25 41.083C46.583 40.75 46.75 40.347 46.75 39.875C46.75 39.403 46.583 39 46.25 38.667C45.917 38.333 45.514 38.181 45.042 38.208C44.569 38.236 44.167 38.417 43.833 38.75L29.667 52.917C29.333 53.25 28.972 53.5 28.583 53.667C28.194 53.833 27.778 53.917 27.333 53.917C26.389 53.917 25.597 53.597 24.958 52.958C24.319 52.319 24 51.528 24 50.583C24 50.028 24.083 49.569 24.25 49.208C24.417 48.847 24.639 48.528 24.917 48.25L39.167 34C39.5 33.667 39.667 33.278 39.667 32.833C39.667 32.389 39.5 32 39.167 31.667C38.833 31.333 38.444 31.167 38 31.167C37.556 31.167 37.167 31.333 36.833 31.667L22.583 45.833C22.25 46.167 21.889 46.417 21.5 46.583C21.111 46.75 20.667 46.833 20.167 46.833C19.278 46.833 18.5 46.5 17.833 45.833C17.167 45.167 16.833 44.389 16.833 43.5C16.833 43.056 16.917 42.639 17.083 42.25C17.25 41.861 17.5 41.5 17.833 41.167L32 27C32.333 26.667 32.5 26.264 32.5 25.792C32.5 25.319 32.333 24.917 32 24.583C31.667 24.25 31.278 24.083 30.833 24.083C30.389 24.083 30 24.25 29.667 24.583L15.5 38.833C15.222 39.111 14.889 39.333 14.5 39.5C14.111 39.667 13.639 39.75 13.083 39.75C12.139 39.75 11.347 39.431 10.708 38.792C10.069 38.153 9.75 37.361 9.75 36.417C9.75 35.972 9.833 35.556 10 35.167C10.167 34.778 10.417 34.417 10.75 34.083L27.083 17.75C27.694 17.139 28.458 16.861 29.375 16.917C30.292 16.972 31.056 17.306 31.667 17.917L41.833 28.083C42.444 28.694 43.167 29.181 44 29.542C44.833 29.903 45.667 30.083 46.5 30.083C48.278 30.083 49.833 29.458 51.167 28.208C52.5 26.958 53.167 25.361 53.167 23.417C53.167 22.639 53.028 21.833 52.75 21C52.472 20.167 51.972 19.389 51.25 18.667L39.833 7.25C39.222 6.639 38.819 5.972 38.625 5.25C38.431 4.528 38.528 3.833 38.917 3.167C39.417 2.333 40.056 1.722 40.833 1.333C41.611 0.944 42.472 0.75 43.417 0.75C44.583 0.75 45.778 1.028 47 1.583C48.222 2.139 49.333 2.917 50.333 3.917L64.417 18.083C65.417 19.083 66.153 20.194 66.625 21.417C67.097 22.639 67.333 24.056 67.333 25.667C67.333 26.778 67.083 27.903 66.583 29.042C66.083 30.181 65.361 31.222 64.417 32.167L36.667 60C36.222 60.444 35.833 60.722 35.5 60.833C35.167 60.944 34.778 61 34.333 61ZM3.667 31.417C2.611 30.639 1.819 29.708 1.292 28.625C0.764 27.542 0.5 26.389 0.5 25.167C0.5 23.889 0.764 22.639 1.292 21.417C1.819 20.194 2.583 19.083 3.583 18.083L17.667 3.917C18.611 2.972 19.653 2.25 20.792 1.75C21.931 1.25 23.139 1 24.417 1C25.806 1 27.153 1.25 28.458 1.75C29.764 2.25 30.889 2.972 31.833 3.917L48.917 21C49.194 21.278 49.431 21.625 49.625 22.042C49.819 22.458 49.917 22.889 49.917 23.333C49.917 24.278 49.597 25.069 48.958 25.708C48.319 26.347 47.528 26.667 46.583 26.667C46.139 26.667 45.708 26.569 45.292 26.375C44.875 26.181 44.528 25.944 44.25 25.667L34 15.5C32.722 14.222 31.153 13.583 29.292 13.583C27.431 13.583 25.861 14.222 24.583 15.5L8.917 31.167C8.194 31.889 7.347 32.264 6.375 32.292C5.403 32.319 4.5 32.028 3.667 31.417Z" fill="#757575"/>
                        </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Tailored Talent Pipelines</h3>
                    <p className="text-gray-600">
                    Work closely with us to prepare candidates tailored to your industry-specific needs, saving recruitment time and costs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 bg-white p-8 rounded-xl">
                  <div className="mt-1">
                    <div className=" rounded-full p-2 flex items-center justify-center">
                        <svg width="30" height="30" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.333 61C33.389 61 32.597 60.681 31.958 60.042C31.319 59.403 31 58.611 31 57.667C31 57.278 31.083 56.875 31.25 56.458C31.417 56.042 31.667 55.667 32 55.333L46.25 41.083C46.583 40.75 46.75 40.347 46.75 39.875C46.75 39.403 46.583 39 46.25 38.667C45.917 38.333 45.514 38.181 45.042 38.208C44.569 38.236 44.167 38.417 43.833 38.75L29.667 52.917C29.333 53.25 28.972 53.5 28.583 53.667C28.194 53.833 27.778 53.917 27.333 53.917C26.389 53.917 25.597 53.597 24.958 52.958C24.319 52.319 24 51.528 24 50.583C24 50.028 24.083 49.569 24.25 49.208C24.417 48.847 24.639 48.528 24.917 48.25L39.167 34C39.5 33.667 39.667 33.278 39.667 32.833C39.667 32.389 39.5 32 39.167 31.667C38.833 31.333 38.444 31.167 38 31.167C37.556 31.167 37.167 31.333 36.833 31.667L22.583 45.833C22.25 46.167 21.889 46.417 21.5 46.583C21.111 46.75 20.667 46.833 20.167 46.833C19.278 46.833 18.5 46.5 17.833 45.833C17.167 45.167 16.833 44.389 16.833 43.5C16.833 43.056 16.917 42.639 17.083 42.25C17.25 41.861 17.5 41.5 17.833 41.167L32 27C32.333 26.667 32.5 26.264 32.5 25.792C32.5 25.319 32.333 24.917 32 24.583C31.667 24.25 31.278 24.083 30.833 24.083C30.389 24.083 30 24.25 29.667 24.583L15.5 38.833C15.222 39.111 14.889 39.333 14.5 39.5C14.111 39.667 13.639 39.75 13.083 39.75C12.139 39.75 11.347 39.431 10.708 38.792C10.069 38.153 9.75 37.361 9.75 36.417C9.75 35.972 9.833 35.556 10 35.167C10.167 34.778 10.417 34.417 10.75 34.083L27.083 17.75C27.694 17.139 28.458 16.861 29.375 16.917C30.292 16.972 31.056 17.306 31.667 17.917L41.833 28.083C42.444 28.694 43.167 29.181 44 29.542C44.833 29.903 45.667 30.083 46.5 30.083C48.278 30.083 49.833 29.458 51.167 28.208C52.5 26.958 53.167 25.361 53.167 23.417C53.167 22.639 53.028 21.833 52.75 21C52.472 20.167 51.972 19.389 51.25 18.667L39.833 7.25C39.222 6.639 38.819 5.972 38.625 5.25C38.431 4.528 38.528 3.833 38.917 3.167C39.417 2.333 40.056 1.722 40.833 1.333C41.611 0.944 42.472 0.75 43.417 0.75C44.583 0.75 45.778 1.028 47 1.583C48.222 2.139 49.333 2.917 50.333 3.917L64.417 18.083C65.417 19.083 66.153 20.194 66.625 21.417C67.097 22.639 67.333 24.056 67.333 25.667C67.333 26.778 67.083 27.903 66.583 29.042C66.083 30.181 65.361 31.222 64.417 32.167L36.667 60C36.222 60.444 35.833 60.722 35.5 60.833C35.167 60.944 34.778 61 34.333 61ZM3.667 31.417C2.611 30.639 1.819 29.708 1.292 28.625C0.764 27.542 0.5 26.389 0.5 25.167C0.5 23.889 0.764 22.639 1.292 21.417C1.819 20.194 2.583 19.083 3.583 18.083L17.667 3.917C18.611 2.972 19.653 2.25 20.792 1.75C21.931 1.25 23.139 1 24.417 1C25.806 1 27.153 1.25 28.458 1.75C29.764 2.25 30.889 2.972 31.833 3.917L48.917 21C49.194 21.278 49.431 21.625 49.625 22.042C49.819 22.458 49.917 22.889 49.917 23.333C49.917 24.278 49.597 25.069 48.958 25.708C48.319 26.347 47.528 26.667 46.583 26.667C46.139 26.667 45.708 26.569 45.292 26.375C44.875 26.181 44.528 25.944 44.25 25.667L34 15.5C32.722 14.222 31.153 13.583 29.292 13.583C27.431 13.583 25.861 14.222 24.583 15.5L8.917 31.167C8.194 31.889 7.347 32.264 6.375 32.292C5.403 32.319 4.5 32.028 3.667 31.417Z" fill="#757575"/>
                        </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Innovation Collaboration</h3>
                    <p className="text-gray-600">
                    Partner with Tecvinson Academy on real-world projects, proof-of-concepts, or product development. Collaborate with emerging talent and trainers to test ideas, co-create solutions, and stay ahead in a rapidly evolving tech landscape.
                    </p>
                  </div>
                </div>
              </div>
          </div>        
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 mb-44'>
          {/* Second Call to Action */}
          <div className='mb-10'> 
            <p>By partnering with Tecvinson Academy, you’re not only investing in the future of tech education but also creating a better world where diverse talents thrive in a rapidly evolving industry.</p>
          </div>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
                <div className="flex flex-col sm:flex-row sm:items-center text-[#1E1E1E] font-medium py-4 sm:py-6 lg:py-10">

                <span className='text-base sm:text-lg lg:text-xl leading-relaxed mb-2 sm:mb-0' style={{textAlign: 'center'}}>Empower and Inspire the Next Generation of Tech Professionals</span>
                <HiArrowLongRight className="hidden sm:block ml-2 h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0" />
                </div>
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-[1.3rem] font-semibold rounded-xl transition-colors" onClick={openModal}>
                Partner With Us Today
                </button>
            </div>
        </div>
  
      {/* Support Section */}                
        
      </div>
  </div>
  {/* Application Modal */}
  {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                        {/* Fixed Modal Header */}
                        <div className="p-6 border-b bg-white">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Partner With Tecvinson Academy</h2>
                                <p className="mt-1 text-gray-600">
                                    {modalStep === 'success' 
                                        ? '' 
                                        : 'Please complete this form and we will be in touch shortly.'
                                    }
                                </p>
                            </div>
                            <button 
                                onClick={closeModal}
                                className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Scrollable Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {modalStep === 'individual' && (
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Enter your first name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Enter your last name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="example@domain.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <PhoneInput
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                            placeholder="Phone number"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            How would you like to be reached? <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-2">
                                            {['Email', 'Phone', 'WhatsApp'].map(method => (
                                                <label key={method} className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        name="contactMethod"
                                                        value={method.toLowerCase()}
                                                        checked={formData.contactMethod.includes(method.toLowerCase())}
                                                        onChange={handleCheckboxChange}
                                                        className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                                                    />
                                                    <span>{method}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Are you an individual or a corporate organisation? <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <label className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${formData.userType === 'individual' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'}`}>
                                                <input
                                                    type="radio"
                                                    name="userType"
                                                    value="individual"
                                                    checked={formData.userType === 'individual'}
                                                    onChange={() => setFormData(prev => ({ ...prev, userType: 'individual' }))}
                                                    className="sr-only"
                                                />
                                                <span>Individual</span>
                                            </label>
                                            <label className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${formData.userType === 'corporate' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'}`}>
                                                <input
                                                    type="radio"
                                                    name="userType"
                                                    value="corporate"
                                                    checked={formData.userType === 'corporate'}
                                                    onChange={() => setModalStep('corporate')}
                                                    className="sr-only"
                                                />
                                                <span>Corporate Organization</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Additional Note (Optional)
                                        </label>
                                        <textarea
                                            rows={3}
                                            name="note"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Leave a note..."
                                            value={formData.note}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex justify-start gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Submitting...' : 'Submit'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    {error && <p className="text-red-500 mt-2">{error}</p>}
                                </form>
                            )}

                            {modalStep === 'corporate' && (
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Company Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Enter your company name"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Enter your first name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Enter your last name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="example@domain.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <PhoneInput
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                            placeholder="Phone number"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            How would you like to be reached? <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-2">
                                            {['Email', 'Phone', 'WhatsApp'].map(method => (
                                                <label key={method} className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        name="contactMethod"
                                                        value={method.toLowerCase()}
                                                        checked={formData.contactMethod.includes(method.toLowerCase())}
                                                        onChange={handleCheckboxChange}
                                                        className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                                                    />
                                                    <span>{method}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Additional Note (Optional)
                                        </label>
                                        <textarea
                                            rows={3}
                                            name="note"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Leave a note..."
                                            value={formData.note}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setModalStep('individual')}
                                            className="px-6 py-2 text-teal-600 hover:text-teal-800 transition-colors"
                                        >
                                            ← Back
                                        </button>
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Submitting...' : 'Submit'}
                                            </button>
                                        </div>
                                    </div>
                                    {error && <p className="text-red-500 mt-2">{error}</p>}
                                </form>
                            )}

                            {modalStep === 'success' && (
                                <div className="text-center py-8">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Success! Your Partnership Application Has Been Received</h3>
                                    <div className="mt-2 text-gray-600">
                                        <p className="mb-2">Thank you for your interest in partnership with Tecvinson Academy. We've received your application and will be in touch shortly.</p>
                                        <p>Our team will get in touch with you soon to discuss the next steps.</p>
                                        <p className="mt-4">If you have any questions in the meantime, feel free to reach out to us. We're excited about the possibility of working together to make a lasting impact.</p>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
  </>
    )
  }

export default Partner