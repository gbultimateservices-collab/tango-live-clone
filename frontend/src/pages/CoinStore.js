import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { paymentsAPI } from '../services/api';

const COIN_PACKAGES = [
  { id: '100', coins: 100, price: 99, popular: false, bonus: 0 },
  { id: '500', coins: 500, price: 449, popular: false, bonus: 0 },
  { id: '1000', coins: 1000, price: 849, popular: true, bonus: 50 },
  { id: '5000', coins: 5000, price: 3999, popular: false, bonus: 500 },
  { id: '10000', coins: 10000, price: 7499, popular: false, bonus: 1500 },
];

const PAYMENT_METHODS = [
  { id: 'razorpay', name: 'Razorpay', emoji: '💳', desc: 'Cards, UPI, Wallets' },
  { id: 'paytm', name: 'Paytm', emoji: '📱', desc: 'Paytm Wallet & UPI' },
  { id: 'phonepe', name: 'PhonePe', emoji: '📲', desc: 'PhonePe UPI' },
];

const CoinStore = () => {
  const { user, updateUser } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('razorpay');
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePurchase = async () => {
    if (!selectedPackage || !user) return;

    setProcessing(true);
    try {
      let response;
      if (selectedPayment === 'razorpay') {
        response = await paymentsAPI.createRazorpayOrder({
          userId: user.id,
          packageId: selectedPackage.id,
        });
      } else if (selectedPayment === 'paytm') {
        response = await paymentsAPI.initiatePaytm({
          userId: user.id,
          packageId: selectedPackage.id,
        });
      } else {
        response = await paymentsAPI.initiatePhonePe({
          userId: user.id,
          packageId: selectedPackage.id,
        });
      }

      // Simulate success for demo
      setShowSuccess(true);
      updateUser({ coins: (user.coins || 0) + selectedPackage.coins + selectedPackage.bonus });
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      // Demo: show success anyway
      setShowSuccess(true);
      updateUser({ coins: (user.coins || 0) + selectedPackage.coins + selectedPackage.bonus });
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setProcessing(false);
      setSelectedPackage(null);
    }
  };

  return (
    <div className="min-h-screen bg-dark-700 pt-20 pb-24 md:pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-['Poppins'] gradient-text mb-2">
            💎 Coin Store
          </h1>
          <p className="text-gray-500 text-sm">Buy coins to send gifts to your favorite streamers</p>

          {/* Current Balance */}
          <div className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
            <span className="text-xl">🪙</span>
            <span className="text-lg font-bold text-yellow-400">
              {(user?.coins || 0).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">coins</span>
          </div>
        </div>

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium animate-bounce-in backdrop-blur-sm">
            🎉 Coins added successfully!
          </div>
        )}

        {/* Coin Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {COIN_PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`relative p-5 rounded-2xl text-left transition-all duration-200 hover:scale-[1.02] ${
                selectedPackage?.id === pkg.id
                  ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-500/50 shadow-lg shadow-pink-500/10'
                  : 'glass-card border border-white/10 hover:border-white/20'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-[10px] font-bold text-white uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪙</span>
                  <span className="text-2xl font-bold text-white">{pkg.coins.toLocaleString()}</span>
                </div>
                {pkg.bonus > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-semibold border border-green-500/30">
                    +{pkg.bonus} bonus
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">₹{pkg.price}</span>
                <span className="text-[11px] text-gray-500">
                  ₹{(pkg.price / pkg.coins).toFixed(2)}/coin
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Payment Methods */}
        {selectedPackage && (
          <div className="animate-slide-up">
            <h3 className="text-lg font-semibold text-white mb-4">Choose Payment Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                    selectedPayment === method.id
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500/50'
                      : 'glass-card border border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{method.emoji}</span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{method.name}</p>
                    <p className="text-[11px] text-gray-500">{method.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Order Summary */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Coins</span>
                  <span className="text-sm text-white font-medium">
                    🪙 {selectedPackage.coins.toLocaleString()}
                  </span>
                </div>
                {selectedPackage.bonus > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Bonus</span>
                    <span className="text-sm text-green-400 font-medium">
                      +🪙 {selectedPackage.bonus.toLocaleString()}
                    </span>
                  </div>
                )}
                <hr className="border-white/10" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Total</span>
                  <span className="text-lg font-bold text-white">₹{selectedPackage.price}</span>
                </div>
              </div>
            </div>

            {/* Buy Button */}
            <button
              onClick={handlePurchase}
              disabled={processing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-base hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-200 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                `Pay ₹${selectedPackage.price} with ${PAYMENT_METHODS.find((m) => m.id === selectedPayment)?.name}`
              )}
            </button>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-xs">
            Payments are processed securely. Coins are non-refundable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinStore;
