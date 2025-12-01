const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const User = require('../models/User');

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Coin packages
const COIN_PACKAGES = {
  '100': { coins: 100, price: 99 },
  '500': { coins: 500, price: 449 },
  '1000': { coins: 1000, price: 849 },
  '5000': { coins: 5000, price: 3999 },
  '10000': { coins: 10000, price: 7499 }
};

// Create Razorpay Order
router.post('/razorpay/create-order', async (req, res) => {
  try {
    const { userId, packageId } = req.body;
    const package = COIN_PACKAGES[packageId];

    if (!package) {
      return res.status(400).json({ error: 'Invalid package' });
    }

    const options = {
      amount: package.price * 100, // amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    const payment = new Payment({
      user: userId,
      orderId: order.id,
      amount: package.price,
      coins: package.coins,
      paymentGateway: 'razorpay',
      status: 'pending'
    });

    await payment.save();

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Razorpay Payment
router.post('/razorpay/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      const payment = await Payment.findOne({ orderId: razorpay_order_id });
      
      if (payment) {
        payment.status = 'success';
        payment.transactionId = razorpay_payment_id;
        await payment.save();

        // Add coins to user
        await User.findByIdAndUpdate(payment.user, {
          $inc: { coins: payment.coins }
        });

        res.json({ success: true, message: 'Payment verified successfully' });
      } else {
        res.status(404).json({ error: 'Payment not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Paytm Payment Initiation
router.post('/paytm/initiate', async (req, res) => {
  try {
    const { userId, packageId } = req.body;
    const package = COIN_PACKAGES[packageId];

    if (!package) {
      return res.status(400).json({ error: 'Invalid package' });
    }

    const orderId = `PAYTM_${Date.now()}`;
    
    const payment = new Payment({
      user: userId,
      orderId: orderId,
      amount: package.price,
      coins: package.coins,
      paymentGateway: 'paytm',
      status: 'pending'
    });

    await payment.save();

    // Paytm integration code here
    res.json({
      success: true,
      orderId: orderId,
      amount: package.price,
      message: 'Paytm payment initiated'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PhonePe Payment Initiation
router.post('/phonepe/initiate', async (req, res) => {
  try {
    const { userId, packageId } = req.body;
    const package = COIN_PACKAGES[packageId];

    if (!package) {
      return res.status(400).json({ error: 'Invalid package' });
    }

    const orderId = `PHONEPE_${Date.now()}`;
    
    const payment = new Payment({
      user: userId,
      orderId: orderId,
      amount: package.price,
      coins: package.coins,
      paymentGateway: 'phonepe',
      status: 'pending'
    });

    await payment.save();

    // PhonePe integration code here
    res.json({
      success: true,
      orderId: orderId,
      amount: package.price,
      message: 'PhonePe payment initiated'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment history
router.get('/history/:userId', async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
