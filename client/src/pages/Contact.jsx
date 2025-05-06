import React, { useState, useEffect } from 'react';
import { useContact } from '../hooks/useContact';
import Faq from "../components/Faq";
import { HiEnvelope, HiPhone } from "react-icons/hi2";
import { SiFacebook, SiLinkedin } from "react-icons/si";
import { RiInstagramFill, RiTwitterXFill } from "react-icons/ri";

const Contact = () => {
    const { submitContact, isLoading, error, successMessage, clearContactMessages } = useContact();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }, []);

    useEffect(() => {
        // Clear messages when component unmounts
        return () => clearContactMessages();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await submitContact(formData);
        if (success) {
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                subject: '',
                message: ''
            });
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 ">
                <h1 className="text-4xl font-bold text-[#1d4741] mb-8">Contact us</h1>

                {/* Main container with green background */}
                <div className="bg-[#1d4741] rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Column - Contact Information */}
                        <div className="p-8 text-white md:w-1/2">
                            <h2 className="text-2xl font-bold mb-2">We'd Love to Hear From You</h2>
                            <p className="text-sm mb-6">Connect with us through any of these channels.</p>

                            {/* Call Us Card */}
                            <div className="bg-white rounded-lg p-6 mb-4">
                                <div className="flex flex-col items-start">
                                    <div className="bg-[#e0f2f1] p-4 rounded-md mb-3">
                                        <HiPhone className="h-8 w-8 text-[#3B9790]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#1d4741] mb-1 text-2xl">Call Us</h3>
                                        <p className="text-lg font-medium text-[#2C716C] underline">+1 (111) 111-1111</p>
                                    </div>
                                </div>
                            </div>

                            {/* Email Us Card */}
                            <div className="bg-white rounded-lg p-6 mb-8">
                                <div className="flex flex-col items-start">
                                    <div className="bg-[#e0f2f1] p-4 rounded-md mb-3">
                                        <HiEnvelope className="h-8 w-8 text-[#3B9790]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#1d4741] mb-1 text-2xl">Email Us</h3>
                                        <p className="text-lg font-medium text-[#2C716C] underline">example@domain.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Socials */}
                            <div>
                                <h3 className="text-xl font-bold mb-4">Socials</h3>
                                <div className="flex space-x-3">
                                    {/* LinkedIn */}
                                    <a href="#" className="bg-white rounded-full p-2.5 flex items-center justify-center">
                                        <SiLinkedin className="h-6 w-6 text-[#3B9790]" />
                                    </a>

                                    {/* Twitter/X */}
                                    <a href="#" className="bg-white rounded-full p-2.5 flex items-center justify-center">
                                        <RiTwitterXFill className="h-6 w-6 text-[#3B9790]" />
                                    </a>

                                    {/* Facebook */}
                                    <a href="#" className="bg-white rounded-full p-2.5 flex items-center justify-center">
                                        <SiFacebook className="h-6 w-6 text-[#3B9790]" />
                                    </a>

                                    {/* Instagram */}
                                    <a href="#" className="bg-white rounded-full p-2.5 flex items-center justify-center">
                                        <RiInstagramFill className="h-6 w-6 text-[#3B9790]" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form in white container */}
                        <div className="bg-white p-8 rounded-lg m-6 md:m-8 md:w-1/2 md:ml-0">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Request a callback</h2>
                            <p className="text-sm text-gray-600 mb-6">
                                Complete this form, and a member of our team will reach out to assist you shortly.
                            </p>

                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {error}
                                </div>
                            )}

                            {successMessage && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                    {successMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    ></textarea>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-6 py-2 bg-[#3d9d8b] text-white font-medium rounded-md hover:bg-[#2c7a6a]"
                                    >
                                        {isLoading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="my-14 ">
                    <h1 className="text-[40px] font-semibold mb-6">
                        Visit Our Office
                    </h1>

                    <div className="w-full h-[500px] lg:h-[600px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d609.0465138060981!2d13.062581199162826!3d55.592645359867404!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a186e74062e3%3A0x6cabbb9302e2f90!2sRudh%C3%B6gsgatan%2010B%2C%20212%2031%20Malm%C3%B6%2C%20Sweden!5e0!3m2!1sen!2sng!4v1730631221477!5m2!1sen!2sng"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full rounded-md"
                        />
                    </div>
                </div>
            </div>
            <div className="my-14">
                <Faq />
            </div>
        </>
    );
};

export default Contact;