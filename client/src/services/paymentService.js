// Payment service for handling donation transactions
import apiService from '../redux/services/apiService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class PaymentService {
  // Create donation record and initiate Stripe checkout
  static async createStripeCheckout(donationData) {
    try {
      // First, create donation record in database
      const donationRecord = {
        firstName: donationData.firstName,
        lastName: donationData.lastName,
        email: donationData.email,
        phoneNumber: donationData.phoneNumber,
        amount: donationData.amount,
        currency: donationData.currency,
        message: donationData.message || '',
        paymentProcessor: 'stripe',
        status: 'pending'
      };

      const response = await fetch(`${API_BASE_URL}/donate/stripe/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationRecord),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create donation record');
      }

      const result = await response.json();
      
      // Return both donation ID and Stripe checkout URL
      return {
        donationId: result.donationId,
        checkoutUrl: result.checkoutUrl,
        sessionId: result.sessionId
      };
    } catch (error) {
      console.error('Stripe payment error:', error);
      throw error;
    }
  }

  // Create donation record and initiate Paystack payment
  static async createPaystackPayment(donationData) {
    try {
      // First, create donation record in database
      const donationRecord = {
        firstName: donationData.firstName,
        lastName: donationData.lastName,
        email: donationData.email,
        phoneNumber: donationData.phoneNumber,
        amount: donationData.amount,
        currency: donationData.currency,
        message: donationData.message || '',
        paymentProcessor: 'paystack',
        status: 'pending'
      };

      const response = await fetch(`${API_BASE_URL}/donate/paystack/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationRecord),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create donation record');
      }

      const result = await response.json();
      
      // Return donation ID and Paystack authorization URL
      return {
        donationId: result.donationId,
        authorizationUrl: result.authorizationUrl,
        reference: result.reference
      };
    } catch (error) {
      console.error('Paystack payment error:', error);
      throw error;
    }
  }

  // Verify payment and update donation status
  static async verifyPayment(reference, processor, donationId = null) {
    try {
      const response = await fetch(`${API_BASE_URL}/donate/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          reference, 
          processor, 
          donationId 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Verification failed');
      }

      const result = await response.json();
      
      // Return verification status and updated donation record
      return {
        success: result.success,
        donation: result.donation,
        transactionId: result.transactionId
      };
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  // Get all donations for dashboard
  static async getAllDonations(page = 1, limit = 10, status = 'all') {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        status
      });

      const response = await apiService.get(`/donate/all?${queryParams}`);
      
      // If no donations, return placeholder data
      const donations = response.data?.donations || [];
      const totalPages = response.data?.totalPages || 1;
      const totalCount = response.data?.totalCount || 0;

      return {
        donations,
        totalPages,
        totalCount,
        currentPage: page
      };
    } catch (error) {
      console.error('Error fetching donations:', error);
      
      // Return placeholder data instead of throwing error
      return {
        donations: [],
        totalPages: 1,
        totalCount: 0,
        currentPage: 1
      };
    }
  }

  // Get donation statistics
  static async getDonationStats() {
    try {
      const response = await apiService.get('/donate/stats');
      
      return response.data || {
        // Placeholder stats if no data
        totalDonations: 0,
        totalAmount: 0,
        averageDonation: 0,
        monthlyGrowth: 0,
        donationsByMonth: [],
        topDonors: [],
        recentDonations: []
      };
    } catch (error) {
      console.error('Error fetching donation stats:', error);
      
      // Return placeholder stats instead of throwing error
      return {
        totalDonations: 0,
        totalAmount: 0,
        averageDonation: 0,
        monthlyGrowth: 0,
        donationsByMonth: [],
        topDonors: [],
        recentDonations: []
      };
    }
  }
}

export default PaymentService;
