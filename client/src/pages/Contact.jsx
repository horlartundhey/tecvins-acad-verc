"use client"
import { useState, useEffect } from "react"
import { HiEnvelope, HiPhone } from "react-icons/hi2"
import { SiLinkedin, SiFacebook } from "react-icons/si"
import { RiInstagramFill, RiTwitterXFill } from "react-icons/ri"
import { useContact } from '../hooks/useContact'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const { submitContact, isLoading, error, successMessage, clearContactMessages } = useContact()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])  // Clear messages when component unmounts
  useEffect(() => {
    return () => clearContactMessages();
  }, [clearContactMessages]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitContact({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      message: formData.message,
    });
    // Do NOT reset the form here!
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { autoClose: 6000 });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      clearContactMessages();
    }
    if (error) {
      toast.error(error, { autoClose: 6000 });
      clearContactMessages();
    }
  }, [successMessage, error, clearContactMessages]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact us</h1>

      {/* Main container with green background */}
      <div className="bg-[#1d4741] rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#1d4741]">
          {/* Left Column - Contact Information */}
          <div className="p-8 text-white md:w-1/2">
            <h2 className="text-3xl font-bold mb-2">We'd Love to Hear From You</h2>
            <p className="text-sm mb-6">Connect with us through any of these channels.</p>

            {/* Call Us Card */}
            <div className="bg-white rounded-lg p-6 mb-4">
              <div className="flex-col items-center gap-4">
                <div className="bg-[#e0f2f1] w-14 p-4 rounded-md mb-3">
                  <HiPhone className="h-6 w-6 text-[#3B9790]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1d4741] text-xl">Call Us</h3>
                  <p className="text-[#2C716C] hover:underline">+46 703 699614</p>
                </div>
              </div>
            </div>

            {/* Email Us Card */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <div className="flex-col items-center gap-4">
                <div className="bg-[#e0f2f1] w-14 p-4 rounded-md mb-3">
                  <HiEnvelope className="h-6 w-6 text-[#3B9790]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1d4741] text-xl">Email Us</h3>
                  <p className="text-[#2C716C] hover:underline">example@domain.com</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-xl font-bold mb-4">Socials</h3>
              <div className="flex space-x-3">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  className="bg-white rounded-full p-2.5 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin className="h-5 w-5 text-[#3B9790]" />
                </a>

                {/* Twitter/X */}
                <a
                  href="https://x.com"
                  className="bg-white rounded-full p-2.5 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="Twitter/X"
                >
                  <RiTwitterXFill className="h-5 w-5 text-[#3B9790]" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  className="bg-white rounded-full p-2.5 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="Facebook"
                >
                  <SiFacebook className="h-5 w-5 text-[#3B9790]" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  className="bg-white rounded-full p-2.5 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="Instagram"
                >
                  <RiInstagramFill className="h-5 w-5 text-[#3B9790]" />
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your first name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name/Surname <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your last name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@domain.com"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <span className="flex items-center">
                        <span className="flag-icon">🇳🇬</span>
                        <span className="ml-1">+234</span>
                      </span>
                    </span>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+XX XXX XXX XXX"
                      className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 p-2 border"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Additional Note (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What would you like to inquire about?"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2 border"
                ></textarea>
              </div>              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-[#3B9790] text-white font-medium rounded-md hover:bg-[#2c7a6a] transition-colors"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map section */}
      <div className="my-14">
        <h1 className="text-[40px] font-semibold mb-6">Visit Our Office</h1>

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
      <ToastContainer position="top-center" />
    </div>
  )
}

export default Contact
