const Donation = require('../models/Donation');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const https = require('https');
const crypto = require('crypto');

// Create Stripe checkout session and donation record
const createStripeCheckout = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      amount,
      currency,
      message
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !amount || !currency) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate currency for Stripe
    if (!['USD', 'GBP'].includes(currency)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid currency for Stripe. Use USD or GBP.'
      });
    }

    // Create donation record in database
    const donation = new Donation({
      firstName,
      lastName,
      email,
      phoneNumber,
      amount: parseFloat(amount),
      currency,
      message: message || '',
      paymentProcessor: 'stripe',
      status: 'pending',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    const savedDonation = await donation.save();

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'Donation to Tecvinson Academy',
              description: 'Your Support Helps Us Provide Quality Education',
              images: ['https://res.cloudinary.com/kamisama/image/upload/v1746463181/image_azkifq.png']
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      metadata: {
        donationId: savedDonation._id.toString(),
        donorName: `${firstName} ${lastName}`,
        message: message || ''
      },
      success_url: `${process.env.FRONTEND_URL}/donate/success?donation=${savedDonation._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/donate?cancelled=true`,
    });

    // Update donation with session ID
    savedDonation.sessionId = session.id;
    savedDonation.paymentReference = session.id;
    await savedDonation.save();

    res.status(200).json({
      success: true,
      donationId: savedDonation._id,
      checkoutUrl: session.url,
      sessionId: session.id
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create checkout session',
      error: error.message
    });
  }
};

// Create Paystack payment and donation record
const createPaystackPayment = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      amount,
      currency,
      message
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !amount || !currency) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate currency for Paystack
    if (currency !== 'NGN') {
      return res.status(400).json({
        success: false,
        message: 'Invalid currency for Paystack. Use NGN.'
      });
    }

    // Create donation record in database
    const donation = new Donation({
      firstName,
      lastName,
      email,
      phoneNumber,
      amount: parseFloat(amount),
      currency,
      message: message || '',
      paymentProcessor: 'paystack',
      status: 'pending',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    const savedDonation = await donation.save();

    // Initialize Paystack transaction
    const paystackData = JSON.stringify({
      email: email,
      amount: Math.round(amount * 100), // Convert to kobo
      currency: 'NGN',
      reference: donation.paymentReference,
      callback_url: `${process.env.FRONTEND_URL}/donate/success?donation=${savedDonation._id}`,
      metadata: {
        donationId: savedDonation._id.toString(),
        donorName: `${firstName} ${lastName}`,
        message: message || ''
      }
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(paystackData)
      }
    };

    const paystackRequest = new Promise((resolve, reject) => {
      const req = https.request(options, (paystackRes) => {
        let data = '';

        paystackRes.on('data', (chunk) => {
          data += chunk;
        });

        paystackRes.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(paystackData);
      req.end();
    });

    const paystackResponse = await paystackRequest;

    if (!paystackResponse.status) {
      throw new Error(paystackResponse.message || 'Paystack initialization failed');
    }

    // Update donation with payment reference
    savedDonation.paymentReference = paystackResponse.data.reference;
    await savedDonation.save();

    res.status(200).json({
      success: true,
      donationId: savedDonation._id,
      authorizationUrl: paystackResponse.data.authorization_url,
      reference: paystackResponse.data.reference,
      publicKey: process.env.PAYSTACK_PUBLIC_KEY
    });

  } catch (error) {
    console.error('Paystack payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize payment',
      error: error.message
    });
  }
};

// Verify payment (works for both Stripe and Paystack)
const verifyPayment = async (req, res) => {
  try {
    const { reference, processor, donationId } = req.body;

    if (!reference || !processor) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment reference or processor'
      });
    }

    let donation;
    let verificationResult;

    if (processor === 'stripe') {
      // Verify Stripe payment
      const session = await stripe.checkout.sessions.retrieve(reference);
      
      if (session.payment_status === 'paid') {
        donation = await Donation.findOne({ 
          $or: [
            { sessionId: reference },
            { _id: donationId }
          ]
        });

        if (donation) {
          await donation.markAsCompleted(session.payment_intent);
          verificationResult = { success: true, donation };
        } else {
          throw new Error('Donation record not found');
        }
      } else {
        throw new Error('Payment not completed');
      }

    } else if (processor === 'paystack') {
      // Verify Paystack payment
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${reference}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      };

      const paystackVerification = new Promise((resolve, reject) => {
        const req = https.request(options, (paystackRes) => {
          let data = '';

          paystackRes.on('data', (chunk) => {
            data += chunk;
          });

          paystackRes.on('end', () => {
            resolve(JSON.parse(data));
          });
        });

        req.on('error', (error) => {
          reject(error);
        });

        req.end();
      });

      const paystackResponse = await paystackVerification;

      if (paystackResponse.status && paystackResponse.data.status === 'success') {
        donation = await Donation.findOne({ 
          $or: [
            { paymentReference: reference },
            { _id: donationId }
          ]
        });

        if (donation) {
          await donation.markAsCompleted(paystackResponse.data.id);
          verificationResult = { success: true, donation };
        } else {
          throw new Error('Donation record not found');
        }
      } else {
        throw new Error('Payment verification failed');
      }
    } else {
      throw new Error('Invalid payment processor');
    }

    res.status(200).json({
      success: true,
      donation: verificationResult.donation,
      transactionId: verificationResult.donation.transactionId
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
};

// Get all donations (Admin only)
const getAllDonations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || 'all';
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (status !== 'all') {
      filter.status = status;
    }

    // Get donations with pagination
    const donations = await Donation.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-ipAddress -userAgent -internalNotes');

    const totalDonations = await Donation.countDocuments(filter);
    const totalPages = Math.ceil(totalDonations / limit);

    res.status(200).json({
      success: true,
      donations,
      pagination: {
        currentPage: page,
        totalPages,
        totalDonations,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donations',
      error: error.message
    });
  }
};

// Get donation statistics
const getDonationStats = async (req, res) => {
  try {
    const stats = await Donation.getStats();
    
    res.status(200).json({
      success: true,
      ...stats
    });

  } catch (error) {
    console.error('Error fetching donation stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donation statistics',
      error: error.message
    });
  }
};

// Webhook handler for Stripe
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const donationId = session.metadata.donationId;
      
      if (donationId) {
        const donation = await Donation.findById(donationId);
        if (donation && donation.status === 'pending') {
          await donation.markAsCompleted(session.payment_intent);
          console.log('Donation marked as completed via webhook:', donationId);
        }
      }
      break;

    case 'checkout.session.expired':
      const expiredSession = event.data.object;
      const expiredDonationId = expiredSession.metadata.donationId;
      
      if (expiredDonationId) {
        const donation = await Donation.findById(expiredDonationId);
        if (donation && donation.status === 'pending') {
          await donation.markAsFailed('Session expired');
          console.log('Donation marked as failed via webhook:', expiredDonationId);
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// Webhook handler for Paystack
const handlePaystackWebhook = async (req, res) => {
  const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');
  
  if (hash === req.headers['x-paystack-signature']) {
    const event = req.body;
    
    if (event.event === 'charge.success') {
      const reference = event.data.reference;
      const donation = await Donation.findOne({ paymentReference: reference });
      
      if (donation && donation.status === 'pending') {
        await donation.markAsCompleted(event.data.id);
        console.log('Donation marked as completed via Paystack webhook:', donation._id);
      }
    }
  }
  
  res.sendStatus(200);
};

module.exports = {
  createStripeCheckout,
  createPaystackPayment,
  verifyPayment,
  getAllDonations,
  getDonationStats,
  handleStripeWebhook,
  handlePaystackWebhook
};
