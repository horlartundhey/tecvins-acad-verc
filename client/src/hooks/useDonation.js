import { useState } from 'react';
import PaymentService from '../services/paymentService';
import { ensurePaystackLoaded } from '../utils/paymentUtils';

const useDonation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [donationResult, setDonationResult] = useState(null);

  // Main donation processing function
  const processDonation = async (donationData) => {
    setIsProcessing(true);
    setError(null);
    setDonationResult(null);
    
    try {
      const { currency } = donationData;
      
      // Route to appropriate payment processor
      if (currency === 'USD' || currency === 'GBP') {
        return await processStripePayment(donationData);
      } else if (currency === 'NGN') {
        return await processPaystackPayment(donationData);
      } else {
        throw new Error('Unsupported currency');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  // Stripe payment processing
  const processStripePayment = async (donationData) => {
    try {
      console.log('Processing Stripe payment:', donationData);
      
      const result = await PaymentService.createStripeCheckout(donationData);
      
      // Store donation info for later verification
      localStorage.setItem('pendingDonation', JSON.stringify({
        donationId: result.donationId,
        processor: 'stripe',
        amount: donationData.amount,
        currency: donationData.currency
      }));
      
      // Redirect to Stripe Checkout
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      }
      
      return result;
    } catch (err) {
      console.error('Stripe payment error:', err);
      throw err;
    }
  };

  // Paystack payment processing
  const processPaystackPayment = async (donationData) => {
    let result;
    
    try {
      console.log('Processing Paystack payment:', donationData);
      
      result = await PaymentService.createPaystackPayment(donationData);
      
      // Store donation info for later verification
      localStorage.setItem('pendingDonation', JSON.stringify({
        donationId: result.donationId,
        processor: 'paystack',
        amount: donationData.amount,
        currency: donationData.currency
      }));
      
      // Check if Paystack is available
      const paystackLoaded = await ensurePaystackLoaded();
      if (!paystackLoaded) {
        console.error('Paystack not available. Redirecting to authorization URL.');
        if (result.authorizationUrl) {
          window.location.href = result.authorizationUrl;
          return result;
        } else {
          throw new Error('Paystack not available and no authorization URL provided');
        }
      }

      // Define callback function separately to ensure it's valid
      const paymentCallback = async (response) => {
        console.log('Paystack payment callback triggered:', response);
        try {
          const verificationResult = await PaymentService.verifyPayment(
            response.reference, 
            'paystack', 
            result.donationId
          );
          setDonationResult(verificationResult);
          
          // Clear pending donation from localStorage
          localStorage.removeItem('pendingDonation');
          
          // Redirect to success page
          window.location.href = `/donate/success?donation=${result.donationId}&reference=${response.reference}`;
        } catch (verifyError) {
          console.error('Payment verification failed:', verifyError);
          setError('Payment verification failed. Please contact support.');
        }
      };

      const paymentCloseCallback = () => {
        console.log('Paystack payment window closed');
        setIsProcessing(false);
      };

      // Initialize Paystack popup with separate callback functions
      const handler = window.PaystackPop.setup({
        key: result.publicKey || import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: donationData.email,
        amount: donationData.amount * 100, // Convert to kobo
        currency: 'NGN',
        ref: result.reference,
        callback: paymentCallback,
        onClose: paymentCloseCallback
      });

      // Open the payment modal
      handler.openIframe();
      
      return result;
    } catch (err) {
      console.error('Paystack payment error:', err);
      // Fallback: redirect to authorization URL if popup fails
      if (result?.authorizationUrl && err.message.includes('callback')) {
        console.log('Falling back to authorization URL redirect');
        window.location.href = result.authorizationUrl;
        return result;
      }
      throw err;
    }
  };

  // Verify payment status (for webhook callbacks or manual verification)
  const verifyPayment = async (reference, processor, donationId) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await PaymentService.verifyPayment(reference, processor, donationId);
      setDonationResult(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  // Get donation statistics for dashboard
  const getDonationStats = async () => {
    try {
      return await PaymentService.getDonationStats();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Get all donations for admin dashboard
  const getAllDonations = async (page = 1, limit = 10, status = 'all') => {
    try {
      return await PaymentService.getAllDonations(page, limit, status);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    processDonation,
    verifyPayment,
    getDonationStats,
    getAllDonations,
    isProcessing,
    error,
    donationResult,
    clearError: () => setError(null),
    clearResult: () => setDonationResult(null)
  };
};

export default useDonation;
