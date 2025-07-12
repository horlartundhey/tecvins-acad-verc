import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Download } from 'lucide-react';
import useDonation from '../hooks/useDonation';

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const donationId = searchParams.get('donation');
  const [donationDetails, setDonationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { verifyPayment } = useDonation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Get donation details from localStorage if available
    const pendingDonation = localStorage.getItem('pendingDonation');
    if (pendingDonation) {
      try {
        const donationData = JSON.parse(pendingDonation);
        setDonationDetails(donationData);
        localStorage.removeItem('pendingDonation');
      } catch (error) {
        console.error('Error parsing donation data:', error);
      }
    }

    // Verify payment if we have URL parameters
    const reference = searchParams.get('reference');
    const processor = searchParams.get('processor') || 'stripe';
    
    if (reference && donationId) {
      verifyPayment(reference, processor, donationId)
        .then((result) => {
          if (result.success) {
            setDonationDetails(result.donation);
          }
        })
        .catch((error) => {
          console.error('Payment verification failed:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [searchParams, donationId, verifyPayment]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your donation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Donation!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your generous contribution will help us continue providing free, quality IT education to learners worldwide.
          </p>

          {/* Donation Details */}
          {donationDetails && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Donation Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">
                    {donationDetails.currency === 'USD' && '$'}
                    {donationDetails.currency === 'GBP' && '£'}
                    {donationDetails.currency === 'NGN' && '₦'}
                    {donationDetails.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Currency:</span>
                  <span className="font-semibold">{donationDetails.currency}</span>
                </div>
                {donationId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono text-sm">{donationId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Impact Message */}
          <div className="bg-teal-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-teal-900 mb-3">
              Your Impact
            </h3>
            <p className="text-teal-800 text-sm leading-relaxed">
              Your donation directly supports our mission to provide free IT training, 
              cover trainer compensation, provide student resources, and maintain our 
              learning platform. Together, we're building a more inclusive tech industry.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Make Another Donation
            </Link>
            
            <Link
              to="/"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Receipt Download */}
          {donationDetails && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                A receipt has been sent to your email address.
              </p>
              <button
                onClick={() => {
                  // TODO: Implement receipt download
                  alert('Receipt download feature coming soon!');
                }}
                className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center justify-center mx-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </button>
            </div>
          )}
        </div>

        {/* Share Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Help us spread the word about our mission!
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                const shareText = "I just donated to Tecvinson Academy to support free IT education! Join me in making a difference. #TecvinsonAcademy #TechEducation";
                if (navigator.share) {
                  navigator.share({
                    title: 'Support Tecvinson Academy',
                    text: shareText,
                    url: window.location.origin
                  });
                } else {
                  // Fallback to Twitter
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.origin)}`);
                }
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Share on Social Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;
