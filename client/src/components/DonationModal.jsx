import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import useDonation from '../hooks/useDonation';
import PhoneInput from './PhoneInput';

const DonationModal = ({ isOpen, onClose }) => {
  const { processDonation, isProcessing, error } = useDonation();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    currency: 'USD',
    amount: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Currency options
  const currencies = [
    { 
      value: 'USD', 
      label: 'USD ($) - For international cards (Processed by Stripe)',
      symbol: '$',
      processor: 'stripe'
    },
    { 
      value: 'GBP', 
      label: 'GBP (£) - For international cards (Processed by Stripe)',
      symbol: '£',
      processor: 'stripe'
    },
    { 
      value: 'NGN', 
      label: 'Naira (₦) - For Nigeria-issued cards (Processed by Paystack)',
      symbol: '₦',
      processor: 'paystack'
    }
  ];

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle phone input changes
  const handlePhoneChange = (fullPhoneNumber) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: fullPhoneNumber
    }));
    
    // Clear error when user starts typing
    if (errors.phoneNumber) {
      setErrors(prev => ({
        ...prev,
        phoneNumber: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Prepare donation data with proper formatting
      const donationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(), // Already formatted with country code
        currency: formData.currency,
        amount: parseFloat(formData.amount),
        message: formData.message.trim()
      };
      
      console.log('Submitting donation:', donationData);
      
      // Use the donation hook to process payment
      await processDonation(donationData);
      
      // Modal will close automatically on successful redirect
      // If we reach here without redirect, close modal
      onClose();
      
    } catch (error) {
      console.error('Payment error:', error);
      setErrors({ 
        submit: error.message || 'Payment processing failed. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Remove the placeholder payment functions as they're now in the hook

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        currency: 'USD',
        amount: '',
        message: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedCurrency = currencies.find(c => c.value === formData.currency);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[56rem] max-h-[90vh] flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="flex justify-between items-center p-6 border-b bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            Donate to Tecvinson Academy
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Messages */}
          {(error || errors.submit) && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-800 text-sm">{error || errors.submit}</p>
            </div>
          )}

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
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
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
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
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-4">
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
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <PhoneInput
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Phone number"
                error={errors.phoneNumber}
              />
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Important</h4>
                <div className="text-sm text-blue-800 space-y-2">
                  <p>
                    If your card supports international payments, please select USD ($) or GBP (£). 
                    Payments will be securely processed via Stripe.
                  </p>
                  <p>
                    If your card is Naira-only (₦) or issued by a Nigerian bank, please select Naira (₦). 
                    Your payment will be processed via Paystack.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Currency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Currency
            </label>
            <div className="space-y-2">
              {currencies.map((currency) => (
                <label key={currency.value} className="flex items-center">
                  <input
                    type="radio"
                    name="currency"
                    value={currency.value}
                    checked={formData.currency === currency.value}
                    onChange={handleInputChange}
                    className="mr-3 w-4 h-4 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">{currency.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount To Donate <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">
                {selectedCurrency?.symbol}
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Additional Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Any Additional Message?
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Write..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* Stripe Notice */}
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-4 h-4 border border-gray-400 rounded mr-2 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <span>You will be redirected to {selectedCurrency?.processor === 'stripe' ? 'Stripe' : 'Paystack'} for secure payment processing</span>
          </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading || isProcessing}
                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-3 px-4 rounded-md transition-colors"
              >
                {isLoading || isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
