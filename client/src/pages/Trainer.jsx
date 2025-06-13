import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Award, Globe, Zap, FileText, MessageSquare, Trophy, X, ChevronDown } from "lucide-react"
import { HiArrowLongRight, HiCheckCircle, HiMiniUserGroup } from 'react-icons/hi2';
import { MdLibraryBooks, MdStars } from 'react-icons/md';
import { useTrainerApplications } from '../hooks/useTrainerApplications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Trainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { submitApplication, isLoading, error } = useTrainerApplications();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        country: '',
        email: '',
        phoneNumber: '',
        courseArea: '',
        experience: '',
        skillRating: '',
        teachingExp: '',
        confidence: '',
        prepTime: '',
        note: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        const requiredFields = [
            'firstName', 'lastName', 'gender', 'country', 'email', 'phoneNumber',
            'courseArea', 'experience', 'skillRating', 'teachingExp', 'confidence', 'prepTime'
        ];

        const emptyFields = requiredFields.filter(field => !formData[field]);
        
        if (emptyFields.length > 0) {
            toast.error(`Please fill in all required fields: ${emptyFields.join(', ')}`, {
                position: "top-center",
                autoClose: 5000,
            });
            return;
        }

        // Email validation
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address', {
                position: "top-center",
                autoClose: 5000,
            });
            return;
        }

        try {
            toast.info('Submitting your application...', {
                position: "top-center",
                autoClose: false,
                toastId: 'submitting',
            });

            const result = await submitApplication(formData);
            
            toast.dismiss('submitting');
            
            if (result) {
                toast.success('Application submitted successfully! We will be in touch soon.', {
                    position: "top-center",
                    autoClose: 6000,
                });
                closeModal();
                setFormData({
                    firstName: '',
                    lastName: '',
                    gender: '',
                    country: '',
                    email: '',
                    phoneNumber: '',
                    courseArea: '',
                    experience: '',
                    skillRating: '',
                    teachingExp: '',
                    confidence: '',
                    prepTime: '',
                    note: ''
                });
            } else {
                toast.error('Failed to submit application. Please try again.', {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            toast.dismiss('submitting');
            toast.error(error.message || 'An error occurred. Please try again.', {
                position: "top-center",
                autoClose: 5000,
            });
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

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
                            <span className="text-gray-600">Become a Trainer</span>
                        </nav>
                    </div>

                    {/* Hero Section */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            Join Tecvinson Academy as a Trainer
                        </h1>
                        <p className="text-xl text-gray-600">
                            Empower and Inspire the Next Generation of Tech Professionals
                        </p>
                    </div>

                    {/* Three Column Layout */}
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                        {/* Decorative Elements */}
                        <div className="absolute op-[-10px] sm:top-[-20px] left-[3rem] sm:left-[5rem]    w-0 h-0 z-0" style={{ transform: 'scaleX(-1)' }}>
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
                                        src="https://res.cloudinary.com/kamisama/image/upload/v1746458885/Frame_333_czvlav.png"
                                        alt="Group of diverse tech professionals collaborating"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Center Text Box */}
                            <div className="md:col-span-1 flex items-center">
                                <div className=" bg-[#BE3C2F] border-[8px] border-[#FF6F61] text-white py-11 px-8 rounded-xl">
                                    <p className="text-lg">
                                        Tecvinson Academy is growing, and we need passionate, skilled professionals to join us as trainers. By becoming a trainer, you'll play a pivotal role in transforming lives, sharing your expertise, and shaping the next generation of IT talent.
                                    </p>
                                </div>
                            </div>


                            {/* Right Image */}
                            <div className="md:col-span-1">

                                <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
                                    <img
                                        src="https://res.cloudinary.com/kamisama/image/upload/v1746458875/Frame_335_wx6ca8.png"
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
                            <h2 className="text-2xl font-bold text-gray-800 mb-8">What We're Looking For in Trainers</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        <div className=" rounded-full p-2 flex items-center justify-center">
                                            <HiCheckCircle className="h-8 w-8 text-[#757575]" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Experience</h3>
                                        <p className="text-gray-600">
                                            Trainers should have a minimum of two years of ongoing work experience in their chosen area of
                                            instruction.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        <div className=" rounded-full p-2 flex items-center justify-center">
                                            <HiCheckCircle className="h-8 w-8 text-[#757575]" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Industry Knowledge</h3>
                                        <p className="text-gray-600">
                                            Up-to-date knowledge of current industry trends, ensuring they bring current, real-world experiences to
                                            students.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        <div className=" rounded-full p-2 flex items-center justify-center">
                                            <HiCheckCircle className="h-8 w-8 text-[#757575]" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Passion for Education</h3>
                                        <p className="text-gray-600">
                                            A genuine passion for education, teaching, mentoring, and helping others learn new skills to reach their
                                            full potential.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        <div className=" rounded-full p-2 flex items-center justify-center">
                                            <HiCheckCircle className="h-8 w-8 text-[#757575]" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Areas of Expertise</h3>
                                        <p className="text-gray-600">
                                            We're looking for trainers across various domains including software development, data science,
                                            cybersecurity, cloud computing, and project management.
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
                                <span className="text-base sm:text-lg lg:text-xl leading-relaxed mb-2 sm:mb-0" style={{textAlign: 'center'}}>Empower and Inspire the Next Generation of Tech Professionals</span>
                                <HiArrowLongRight className="hidden sm:block ml-2 h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0" />
                            </div>
                            <button className="bg-[#3B9790] hover:bg-teal-700 text-white px-8 py-[1.3rem]  rounded-xl transition-colors" onClick={openModal}>
                                Apply to be a Trainer
                            </button>
                        </div>
                    </div>


                    <div className=''>
                        {/* Why Join Us Section */}
                        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8">Why Join Us as a Trainer?</h2>
                            <div className="grid md:grid-cols-2 gap-8">

                                <div className="flex gap-4 bg-white p-8">
                                    <div className="mt-1">
                                        <div className=" rounded-full flex items-center justify-center">
                                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 28.767C20.772 28.767 22.406 28.339 23.904 27.484C25.401 26.628 26.608 25.467 27.524 24C27.708 23.634 27.692 23.267 27.478 22.9C27.265 22.534 26.944 22.351 26.516 22.351H11.483C11.055 22.351 10.734 22.534 10.52 22.9C10.306 23.267 10.291 23.634 10.474 24C11.391 25.467 12.606 26.628 14.118 27.484C15.631 28.339 17.258 28.767 19 28.767ZM13.316 14.926L14.279 15.888C14.554 16.163 14.874 16.301 15.241 16.301C15.608 16.301 15.929 16.163 16.204 15.888C16.479 15.613 16.608 15.292 16.593 14.926C16.578 14.559 16.448 14.238 16.204 13.963L14.599 12.313C14.233 11.946 13.797 11.763 13.293 11.763C12.789 11.763 12.354 11.946 11.987 12.313L10.337 13.963C10.062 14.238 9.924 14.559 9.924 14.926C9.924 15.292 10.062 15.613 10.337 15.888C10.581 16.132 10.895 16.262 11.276 16.278C11.658 16.293 11.987 16.178 12.262 15.934L13.316 14.926ZM24.683 14.926L25.737 15.934C26.012 16.178 26.333 16.301 26.699 16.301C27.066 16.301 27.387 16.163 27.662 15.888C27.937 15.613 28.074 15.292 28.074 14.926C28.074 14.559 27.937 14.238 27.662 13.963L26.012 12.313C25.645 11.946 25.21 11.763 24.706 11.763C24.201 11.763 23.766 11.946 23.399 12.313L21.749 13.963C21.505 14.238 21.383 14.559 21.383 14.926C21.383 15.292 21.52 15.613 21.795 15.888C22.07 16.163 22.391 16.301 22.758 16.301C23.124 16.301 23.445 16.163 23.72 15.888L24.683 14.926ZM19 37.017C16.464 37.017 14.08 36.536 11.849 35.573C9.619 34.611 7.679 33.305 6.029 31.655C4.379 30.005 3.072 28.064 2.11 25.834C1.147 23.603 0.666 21.22 0.666 18.684C0.666 16.148 1.147 13.764 2.11 11.534C3.072 9.303 4.379 7.363 6.029 5.713C7.679 4.063 9.619 2.757 11.849 1.794C14.08 0.832 16.464 0.35 19 0.35C21.536 0.35 23.919 0.832 26.149 1.794C28.38 2.757 30.32 4.063 31.97 5.713C33.62 7.363 34.926 9.303 35.889 11.534C36.851 13.764 37.333 16.148 37.333 18.684C37.333 21.22 36.851 23.603 35.889 25.834C34.926 28.064 33.62 30.005 31.97 31.655C30.32 33.305 28.38 34.611 26.149 35.573C23.919 36.536 21.536 37.017 19 37.017Z" fill="#FF6F61" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Make a Difference</h3>
                                        <p className="text-gray-600">
                                            At Tecvinson Academy, train and mentor the next generation of tech professionals who will go on to make
                                            a difference.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 bg-white p-8">
                                    <div className="mt-1">
                                        <div className=" rounded-full flex items-center justify-center">
                                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 28.767C20.772 28.767 22.406 28.339 23.904 27.484C25.401 26.628 26.608 25.467 27.524 24C27.708 23.634 27.692 23.267 27.478 22.9C27.265 22.534 26.944 22.351 26.516 22.351H11.483C11.055 22.351 10.734 22.534 10.52 22.9C10.306 23.267 10.291 23.634 10.474 24C11.391 25.467 12.606 26.628 14.118 27.484C15.631 28.339 17.258 28.767 19 28.767ZM13.316 14.926L14.279 15.888C14.554 16.163 14.874 16.301 15.241 16.301C15.608 16.301 15.929 16.163 16.204 15.888C16.479 15.613 16.608 15.292 16.593 14.926C16.578 14.559 16.448 14.238 16.204 13.963L14.599 12.313C14.233 11.946 13.797 11.763 13.293 11.763C12.789 11.763 12.354 11.946 11.987 12.313L10.337 13.963C10.062 14.238 9.924 14.559 9.924 14.926C9.924 15.292 10.062 15.613 10.337 15.888C10.581 16.132 10.895 16.262 11.276 16.278C11.658 16.293 11.987 16.178 12.262 15.934L13.316 14.926ZM24.683 14.926L25.737 15.934C26.012 16.178 26.333 16.301 26.699 16.301C27.066 16.301 27.387 16.163 27.662 15.888C27.937 15.613 28.074 15.292 28.074 14.926C28.074 14.559 27.937 14.238 27.662 13.963L26.012 12.313C25.645 11.946 25.21 11.763 24.706 11.763C24.201 11.763 23.766 11.946 23.399 12.313L21.749 13.963C21.505 14.238 21.383 14.559 21.383 14.926C21.383 15.292 21.52 15.613 21.795 15.888C22.07 16.163 22.391 16.301 22.758 16.301C23.124 16.301 23.445 16.163 23.72 15.888L24.683 14.926ZM19 37.017C16.464 37.017 14.08 36.536 11.849 35.573C9.619 34.611 7.679 33.305 6.029 31.655C4.379 30.005 3.072 28.064 2.11 25.834C1.147 23.603 0.666 21.22 0.666 18.684C0.666 16.148 1.147 13.764 2.11 11.534C3.072 9.303 4.379 7.363 6.029 5.713C7.679 4.063 9.619 2.757 11.849 1.794C14.08 0.832 16.464 0.35 19 0.35C21.536 0.35 23.919 0.832 26.149 1.794C28.38 2.757 30.32 4.063 31.97 5.713C33.62 7.363 34.926 9.303 35.889 11.534C36.851 13.764 37.333 16.148 37.333 18.684C37.333 21.22 36.851 23.603 35.889 25.834C34.926 28.064 33.62 30.005 31.97 31.655C30.32 33.305 28.38 34.611 26.149 35.573C23.919 36.536 21.536 37.017 19 37.017Z" fill="#FF6F61" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Professional Growth</h3>
                                        <p className="text-gray-600">
                                            Hone your leadership, communication, and mentorship skills while continuously updating your technical
                                            knowledge.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 bg-white p-8">
                                    <div className="mt-1">
                                        <div className=" rounded-full flex items-center justify-center">
                                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 28.767C20.772 28.767 22.406 28.339 23.904 27.484C25.401 26.628 26.608 25.467 27.524 24C27.708 23.634 27.692 23.267 27.478 22.9C27.265 22.534 26.944 22.351 26.516 22.351H11.483C11.055 22.351 10.734 22.534 10.52 22.9C10.306 23.267 10.291 23.634 10.474 24C11.391 25.467 12.606 26.628 14.118 27.484C15.631 28.339 17.258 28.767 19 28.767ZM13.316 14.926L14.279 15.888C14.554 16.163 14.874 16.301 15.241 16.301C15.608 16.301 15.929 16.163 16.204 15.888C16.479 15.613 16.608 15.292 16.593 14.926C16.578 14.559 16.448 14.238 16.204 13.963L14.599 12.313C14.233 11.946 13.797 11.763 13.293 11.763C12.789 11.763 12.354 11.946 11.987 12.313L10.337 13.963C10.062 14.238 9.924 14.559 9.924 14.926C9.924 15.292 10.062 15.613 10.337 15.888C10.581 16.132 10.895 16.262 11.276 16.278C11.658 16.293 11.987 16.178 12.262 15.934L13.316 14.926ZM24.683 14.926L25.737 15.934C26.012 16.178 26.333 16.301 26.699 16.301C27.066 16.301 27.387 16.163 27.662 15.888C27.937 15.613 28.074 15.292 28.074 14.926C28.074 14.559 27.937 14.238 27.662 13.963L26.012 12.313C25.645 11.946 25.21 11.763 24.706 11.763C24.201 11.763 23.766 11.946 23.399 12.313L21.749 13.963C21.505 14.238 21.383 14.559 21.383 14.926C21.383 15.292 21.52 15.613 21.795 15.888C22.07 16.163 22.391 16.301 22.758 16.301C23.124 16.301 23.445 16.163 23.72 15.888L24.683 14.926ZM19 37.017C16.464 37.017 14.08 36.536 11.849 35.573C9.619 34.611 7.679 33.305 6.029 31.655C4.379 30.005 3.072 28.064 2.11 25.834C1.147 23.603 0.666 21.22 0.666 18.684C0.666 16.148 1.147 13.764 2.11 11.534C3.072 9.303 4.379 7.363 6.029 5.713C7.679 4.063 9.619 2.757 11.849 1.794C14.08 0.832 16.464 0.35 19 0.35C21.536 0.35 23.919 0.832 26.149 1.794C28.38 2.757 30.32 4.063 31.97 5.713C33.62 7.363 34.926 9.303 35.889 11.534C36.851 13.764 37.333 16.148 37.333 18.684C37.333 21.22 36.851 23.603 35.889 25.834C34.926 28.064 33.62 30.005 31.97 31.655C30.32 33.305 28.38 34.611 26.149 35.573C23.919 36.536 21.536 37.017 19 37.017Z" fill="#FF6F61" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Global Network</h3>
                                        <p className="text-gray-600">
                                            Join a global community of trainers, professionals and experts from international leaders in partner
                                            training.
                                        </p>
                                    </div>
                                </div>


                                <div className="flex gap-4 bg-white p-8">
                                    <div className="mt-1">
                                        <div className=" rounded-full flex items-center justify-center">
                                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 28.767C20.772 28.767 22.406 28.339 23.904 27.484C25.401 26.628 26.608 25.467 27.524 24C27.708 23.634 27.692 23.267 27.478 22.9C27.265 22.534 26.944 22.351 26.516 22.351H11.483C11.055 22.351 10.734 22.534 10.52 22.9C10.306 23.267 10.291 23.634 10.474 24C11.391 25.467 12.606 26.628 14.118 27.484C15.631 28.339 17.258 28.767 19 28.767ZM13.316 14.926L14.279 15.888C14.554 16.163 14.874 16.301 15.241 16.301C15.608 16.301 15.929 16.163 16.204 15.888C16.479 15.613 16.608 15.292 16.593 14.926C16.578 14.559 16.448 14.238 16.204 13.963L14.599 12.313C14.233 11.946 13.797 11.763 13.293 11.763C12.789 11.763 12.354 11.946 11.987 12.313L10.337 13.963C10.062 14.238 9.924 14.559 9.924 14.926C9.924 15.292 10.062 15.613 10.337 15.888C10.581 16.132 10.895 16.262 11.276 16.278C11.658 16.293 11.987 16.178 12.262 15.934L13.316 14.926ZM24.683 14.926L25.737 15.934C26.012 16.178 26.333 16.301 26.699 16.301C27.066 16.301 27.387 16.163 27.662 15.888C27.937 15.613 28.074 15.292 28.074 14.926C28.074 14.559 27.937 14.238 27.662 13.963L26.012 12.313C25.645 11.946 25.21 11.763 24.706 11.763C24.201 11.763 23.766 11.946 23.399 12.313L21.749 13.963C21.505 14.238 21.383 14.559 21.383 14.926C21.383 15.292 21.52 15.613 21.795 15.888C22.07 16.163 22.391 16.301 22.758 16.301C23.124 16.301 23.445 16.163 23.72 15.888L24.683 14.926ZM19 37.017C16.464 37.017 14.08 36.536 11.849 35.573C9.619 34.611 7.679 33.305 6.029 31.655C4.379 30.005 3.072 28.064 2.11 25.834C1.147 23.603 0.666 21.22 0.666 18.684C0.666 16.148 1.147 13.764 2.11 11.534C3.072 9.303 4.379 7.363 6.029 5.713C7.679 4.063 9.619 2.757 11.849 1.794C14.08 0.832 16.464 0.35 19 0.35C21.536 0.35 23.919 0.832 26.149 1.794C28.38 2.757 30.32 4.063 31.97 5.713C33.62 7.363 34.926 9.303 35.889 11.534C36.851 13.764 37.333 16.148 37.333 18.684C37.333 21.22 36.851 23.603 35.889 25.834C34.926 28.064 33.62 30.005 31.97 31.655C30.32 33.305 28.38 34.611 26.149 35.573C23.919 36.536 21.536 37.017 19 37.017Z" fill="#FF6F61" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Recognition and Impact</h3>
                                        <p className="text-gray-600">
                                            Gain recognition for your expertise and workforce contribution through features on our website and
                                            social platforms.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 bg-white p-8 rounded-lg">
                                    <div className="mt-1">
                                        <div className=" rounded-full flex items-center justify-center">
                                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 28.767C20.772 28.767 22.406 28.339 23.904 27.484C25.401 26.628 26.608 25.467 27.524 24C27.708 23.634 27.692 23.267 27.478 22.9C27.265 22.534 26.944 22.351 26.516 22.351H11.483C11.055 22.351 10.734 22.534 10.52 22.9C10.306 23.267 10.291 23.634 10.474 24C11.391 25.467 12.606 26.628 14.118 27.484C15.631 28.339 17.258 28.767 19 28.767ZM13.316 14.926L14.279 15.888C14.554 16.163 14.874 16.301 15.241 16.301C15.608 16.301 15.929 16.163 16.204 15.888C16.479 15.613 16.608 15.292 16.593 14.926C16.578 14.559 16.448 14.238 16.204 13.963L14.599 12.313C14.233 11.946 13.797 11.763 13.293 11.763C12.789 11.763 12.354 11.946 11.987 12.313L10.337 13.963C10.062 14.238 9.924 14.559 9.924 14.926C9.924 15.292 10.062 15.613 10.337 15.888C10.581 16.132 10.895 16.262 11.276 16.278C11.658 16.293 11.987 16.178 12.262 15.934L13.316 14.926ZM24.683 14.926L25.737 15.934C26.012 16.178 26.333 16.301 26.699 16.301C27.066 16.301 27.387 16.163 27.662 15.888C27.937 15.613 28.074 15.292 28.074 14.926C28.074 14.559 27.937 14.238 27.662 13.963L26.012 12.313C25.645 11.946 25.21 11.763 24.706 11.763C24.201 11.763 23.766 11.946 23.399 12.313L21.749 13.963C21.505 14.238 21.383 14.559 21.383 14.926C21.383 15.292 21.52 15.613 21.795 15.888C22.07 16.163 22.391 16.301 22.758 16.301C23.124 16.301 23.445 16.163 23.72 15.888L24.683 14.926ZM19 37.017C16.464 37.017 14.08 36.536 11.849 35.573C9.619 34.611 7.679 33.305 6.029 31.655C4.379 30.005 3.072 28.064 2.11 25.834C1.147 23.603 0.666 21.22 0.666 18.684C0.666 16.148 1.147 13.764 2.11 11.534C3.072 9.303 4.379 7.363 6.029 5.713C7.679 4.063 9.619 2.757 11.849 1.794C14.08 0.832 16.464 0.35 19 0.35C21.536 0.35 23.919 0.832 26.149 1.794C28.38 2.757 30.32 4.063 31.97 5.713C33.62 7.363 34.926 9.303 35.889 11.534C36.851 13.764 37.333 16.148 37.333 18.684C37.333 21.22 36.851 23.603 35.889 25.834C34.926 28.064 33.62 30.005 31.97 31.655C30.32 33.305 28.38 34.611 26.149 35.573C23.919 36.536 21.536 37.017 19 37.017Z" fill="#FF6F61" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Flexible Opportunities</h3>
                                        <p className="text-gray-600">
                                            Teach online or in-person based on your availability and schedule.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 bg-white p-8 rounded-lg">
                                    <div className="mt-1">
                                        <div className=" rounded-full flex items-center justify-center">
                                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 28.767C20.772 28.767 22.406 28.339 23.904 27.484C25.401 26.628 26.608 25.467 27.524 24C27.708 23.634 27.692 23.267 27.478 22.9C27.265 22.534 26.944 22.351 26.516 22.351H11.483C11.055 22.351 10.734 22.534 10.52 22.9C10.306 23.267 10.291 23.634 10.474 24C11.391 25.467 12.606 26.628 14.118 27.484C15.631 28.339 17.258 28.767 19 28.767ZM13.316 14.926L14.279 15.888C14.554 16.163 14.874 16.301 15.241 16.301C15.608 16.301 15.929 16.163 16.204 15.888C16.479 15.613 16.608 15.292 16.593 14.926C16.578 14.559 16.448 14.238 16.204 13.963L14.599 12.313C14.233 11.946 13.797 11.763 13.293 11.763C12.789 11.763 12.354 11.946 11.987 12.313L10.337 13.963C10.062 14.238 9.924 14.559 9.924 14.926C9.924 15.292 10.062 15.613 10.337 15.888C10.581 16.132 10.895 16.262 11.276 16.278C11.658 16.293 11.987 16.178 12.262 15.934L13.316 14.926ZM24.683 14.926L25.737 15.934C26.012 16.178 26.333 16.301 26.699 16.301C27.066 16.301 27.387 16.163 27.662 15.888C27.937 15.613 28.074 15.292 28.074 14.926C28.074 14.559 27.937 14.238 27.662 13.963L26.012 12.313C25.645 11.946 25.21 11.763 24.706 11.763C24.201 11.763 23.766 11.946 23.399 12.313L21.749 13.963C21.505 14.238 21.383 14.559 21.383 14.926C21.383 15.292 21.52 15.613 21.795 15.888C22.07 16.163 22.391 16.301 22.758 16.301C23.124 16.301 23.445 16.163 23.72 15.888L24.683 14.926ZM19 37.017C16.464 37.017 14.08 36.536 11.849 35.573C9.619 34.611 7.679 33.305 6.029 31.655C4.379 30.005 3.072 28.064 2.11 25.834C1.147 23.603 0.666 21.22 0.666 18.684C0.666 16.148 1.147 13.764 2.11 11.534C3.072 9.303 4.379 7.363 6.029 5.713C7.679 4.063 9.619 2.757 11.849 1.794C14.08 0.832 16.464 0.35 19 0.35C21.536 0.35 23.919 0.832 26.149 1.794C28.38 2.757 30.32 4.063 31.97 5.713C33.62 7.363 34.926 9.303 35.889 11.534C36.851 13.764 37.333 16.148 37.333 18.684C37.333 21.22 36.851 23.603 35.889 25.834C34.926 28.064 33.62 30.005 31.97 31.655C30.32 33.305 28.38 34.611 26.149 35.573C23.919 36.536 21.536 37.017 19 37.017Z" fill="#FF6F61" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Access to Real Projects</h3>
                                        <p className="text-gray-600">
                                        Contribute beyond the classroom by guiding students on real-world projects and MVPs, gaining visibility into innovative ideas and potential collaboration opportunities.
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
                                <span className="text-base sm:text-lg lg:text-xl leading-relaxed mb-2 sm:mb-0">Empower and Inspire the Next Generation of Tech Professionals</span>
                                <HiArrowLongRight className="hidden sm:block ml-2 h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0" />
                            </div>
                            <button className="bg-[#3B9790] hover:bg-teal-700 text-white px-8 py-[1.3rem]  rounded-xl transition-colors" onClick={openModal}>
                                Apply to be a Trainer
                            </button>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className='bg-white w-full'>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8">Support You'll Receive as a Trainer</h2>
                            <div className="grid md:grid-cols-3 gap-8">

                                <div className="flex flex-col items-start text-start border-4 rounded-xl border-[#F1F1F1] p-5">
                                    <div className="mb-4">
                                        <div className=" p-4 rounded-full">
                                            <MdLibraryBooks className="h-8 w-8 text-[#001533]" />
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Training Materials and Resources</h3>
                                    <p className="text-gray-600">
                                        Access to comprehensive training materials and resources to support your classes.
                                    </p>
                                </div>

                                <div className="flex flex-col items-start text-start border-4 rounded-xl border-[#F1F1F1] p-5">
                                    <div className="mb-4">
                                        <div className=" p-4 rounded-full">
                                            <HiMiniUserGroup className="h-8 w-8 text-[#001533]" />
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Community Support</h3>
                                    <p className="text-gray-600">Connect with other trainers to share experiences and best practices.</p>
                                </div>

                                <div className="flex flex-col items-start text-start border-4 rounded-xl border-[#F1F1F1] p-5">
                                    <div className="mb-4">
                                        <div className=" p-4 rounded-full">
                                            <MdStars className="h-8 w-8 text-[#001533]" />
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Recognition</h3>
                                    <p className="text-gray-600">
                                        Regular recognition of your efforts and achievements through our various channels.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5'>
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
                            <div className="flex flex-col sm:flex-row sm:items-center text-[#1E1E1E] font-medium py-4 sm:py-6 lg:py-10">
                                <span className="text-base sm:text-lg lg:text-xl leading-relaxed mb-2 sm:mb-0">Empower and Inspire the Next Generation of Tech Professionals</span>
                                <HiArrowLongRight className="hidden sm:block ml-2 h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0" />
                            </div>
                            <button className="bg-[#3B9790] hover:bg-teal-700 text-white px-8 py-[1.3rem]  rounded-xl transition-colors" onClick={openModal}>
                                Apply to be a Trainer
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer position="top-center" />
            {/* Application Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">Join Tecvinson Academy as a Trainer</h2>
                            <p className="mt-1 text-gray-600">Please complete this form and we will be in touch shortly.</p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Enter your first name"
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
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Enter your last name"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((g) => (
                                            <label key={g} className="flex items-center space-x-2">
                                                <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} className="h-4 w-4 text-teal-600 focus:ring-teal-500" />
                                                <span>{g}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Country Of Residence <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:ring-teal-500 focus:border-teal-500 pr-8"
                                            required
                                        >
                                            <option value="">Select country</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="Sweden">Sweden</option>
                                            <option value="United States">United States</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <ChevronDown className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="example@domain.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="XXX XXX XXXX"
                                        />
                                    </div>
                                </div>
                                {/* Course Area */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Course area you will like to support as a trainer <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="courseArea"
                                            value={formData.courseArea}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:ring-teal-500 focus:border-teal-500 pr-8"
                                            required
                                        >
                                            <option value="">Select course</option>
                                            <option value="product-management">Product Management</option>
                                            <option value="product-design">Product Design</option>
                                            <option value="development">Product Development</option>
                                            <option value="job-readiness">Job Readiness</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <ChevronDown className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                                {/* Experience */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        How many years of professional experience do you have in the field? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['None', 'More than 6 months', 'Between 4-12 months', '2 - 18 months', '18 - 24 months', 'More than 24 months'].map((exp) => (
                                            <label key={exp} className="flex items-center space-x-2">
                                                <input type="radio" name="experience" value={exp} checked={formData.experience === exp} onChange={handleChange} className="h-4 w-4 text-teal-600 focus:ring-teal-500" />
                                                <span>{exp}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {/* Skill Rating */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        On a scale of 0 to 7, where 0 means no knowledge and 7 means expert, how would you rate your skill and knowledge in the area you wish to train in? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {[0, 1, 2, 3, 4, 5, 6, 7].map((rating) => (
                                            <label 
                                                key={rating} 
                                                className={`flex items-center justify-center w-10 h-10 border rounded-full cursor-pointer transition-colors ${
                                                    formData.skillRating === rating.toString() 
                                                        ? 'bg-teal-50 border-teal-500 text-teal-600' 
                                                        : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name="skillRating" 
                                                    value={rating} 
                                                    checked={formData.skillRating === rating.toString()} 
                                                    onChange={handleChange} 
                                                    className="sr-only" 
                                                />
                                                <span>{rating}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                                        <span>No knowledge</span>
                                        <span>Expert</span>
                                    </div>
                                </div>

                                {/* Teaching Experience */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Have you had any experience in training or teaching? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-4">
                                        {['Yes', 'No'].map((val) => (
                                            <label key={val} className="flex items-center space-x-2">
                                                <input type="radio" name="teachingExp" value={val} checked={formData.teachingExp === val} onChange={handleChange} className="h-4 w-4 text-teal-600 focus:ring-teal-500" />
                                                <span>{val}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {/* Confidence Level */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        How confident are you in managing and instructing a classroom of students? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                        {['Not Confident', 'Slightly Confident', 'Moderately Confident', 'Confident', 'Very Confident'].map((val) => (
                                            <label 
                                                key={val} 
                                                className={`flex items-center justify-center p-2 border rounded-md cursor-pointer transition-colors ${
                                                    formData.confidence === val 
                                                        ? 'bg-teal-50 border-teal-500 text-teal-600' 
                                                        : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name="confidence" 
                                                    value={val} 
                                                    checked={formData.confidence === val} 
                                                    onChange={handleChange} 
                                                    className="sr-only" 
                                                />
                                                <span>{val}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Preparation Time */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        If tasked with preparing a curriculum and course materials for the area, how much time would you need to complete the preparation and be ready to present it to Tecvinson Academy Management? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {['Less than 1 month', '1 - 2 months', '3 - 4 months', '5 - 6 months', 'More than 6 months'].map((val) => (
                                            <label 
                                                key={val} 
                                                className={`flex items-center justify-center p-2 border rounded-md cursor-pointer transition-colors ${
                                                    formData.prepTime === val 
                                                        ? 'bg-teal-50 border-teal-500 text-teal-600' 
                                                        : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name="prepTime" 
                                                    value={val} 
                                                    checked={formData.prepTime === val} 
                                                    onChange={handleChange} 
                                                    className="sr-only" 
                                                />
                                                <span>{val}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Additional Note (optional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        name="note"
                                        value={formData.note}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                        placeholder="Leave a note..."
                                    />
                                </div>
                                {/* Form Actions */}
                                <div className="flex justify-start gap-4 pt-4">
                                    <button
                                        type="submit"
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
                                {error && <div className="text-red-600 mt-2">{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Trainer