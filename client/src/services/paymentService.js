import apiService from '../redux/services/apiService';

class PaymentService {
  static async createStripeCheckout(donationData) {
    const response = await apiService.post('/donate/stripe/create', donationData);
    const result = response.data;
    return {
      donationId: result.donationId,
      checkoutUrl: result.checkoutUrl,
      sessionId: result.sessionId
    };
  }

  static async createPaystackPayment(donationData) {
    const response = await apiService.post('/donate/paystack/create', donationData);
    const result = response.data;
    return {
      donationId: result.donationId,
      authorizationUrl: result.authorizationUrl,
      reference: result.reference,
      publicKey: result.publicKey
    };
  }

  static async verifyPayment(reference, processor, donationId = null) {
    const response = await apiService.post('/donate/verify', { reference, processor, donationId });
    const result = response.data;
    return {
      success: result.success,
      donation: result.donation,
      transactionId: result.transactionId
    };
  }

  static async getAllDonations(page = 1, limit = 10, status = 'all') {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      status
    });
    const response = await apiService.get(`/donate/all?${queryParams}`);
    return {
      donations: response.data?.donations || [],
      totalPages: response.data?.pagination?.totalPages || 1,
      totalCount: response.data?.pagination?.totalDonations || 0,
      currentPage: page
    };
  }

  static async getDonationStats() {
    const response = await apiService.get('/donate/stats');
    return response.data;
  }

  static async deleteDonation(id) {
    const response = await apiService.delete(`/donate/${id}`);
    return response.data;
  }

  static async markDonationCompleted(id) {
    const response = await apiService.patch(`/donate/${id}/complete`);
    return response.data;
  }
}

export default PaymentService;
