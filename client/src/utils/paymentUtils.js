// Utility functions for payment processing

/**
 * Check if Paystack script is loaded and initialize if needed
 * @returns {Promise<boolean>} True if Paystack is available
 */
export const ensurePaystackLoaded = () => {
  return new Promise((resolve) => {
    // If already loaded, resolve immediately
    if (window.PaystackPop) {
      resolve(true);
      return;
    }

    // Check if script is already in DOM
    const existingScript = document.querySelector('script[src*="paystack"]');
    if (existingScript) {
      // Script exists, wait for it to load
      existingScript.addEventListener('load', () => {
        resolve(!!window.PaystackPop);
      });
      existingScript.addEventListener('error', () => {
        resolve(false);
      });
      return;
    }

    // Add script dynamically if not present
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    
    script.onload = () => {
      resolve(!!window.PaystackPop);
    };
    
    script.onerror = () => {
      console.error('Failed to load Paystack script');
      resolve(false);
    };

    document.head.appendChild(script);
  });
};

/**
 * Format currency amount for display
 * @param {number} amount 
 * @param {string} currency 
 * @returns {string}
 */
export const formatCurrency = (amount, currency) => {
  const symbols = {
    USD: '$',
    GBP: '£',
    NGN: '₦'
  };
  
  const symbol = symbols[currency] || currency;
  return `${symbol}${amount.toLocaleString()}`;
};

/**
 * Validate donation form data
 * @param {Object} formData 
 * @returns {Object} validation errors
 */
export const validateDonationForm = (formData) => {
  const errors = {};

  // Required fields
  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!formData.phoneNumber?.trim()) {
    errors.phoneNumber = 'Phone number is required';
  }

  if (!formData.amount || formData.amount <= 0) {
    errors.amount = 'Please enter a valid donation amount';
  } else if (formData.amount < 1) {
    errors.amount = 'Minimum donation amount is 1';
  }

  if (!formData.currency) {
    errors.currency = 'Please select a currency';
  }

  return errors;
};

/**
 * Get the appropriate processor for a currency
 * @param {string} currency 
 * @returns {string}
 */
export const getProcessorForCurrency = (currency) => {
  if (['USD', 'GBP'].includes(currency)) {
    return 'stripe';
  } else if (currency === 'NGN') {
    return 'paystack';
  }
  throw new Error(`Unsupported currency: ${currency}`);
};

/**
 * Generate a unique transaction reference
 * @param {string} prefix 
 * @returns {string}
 */
export const generateTransactionRef = (prefix = 'TXN') => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return `${prefix}_${timestamp}_${random}`.toUpperCase();
};
