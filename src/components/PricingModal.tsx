'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Star } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const profile = await res.json();
        setIsPremium(profile.is_premium || false);
      }
    }
    if (isOpen) checkStatus();
  }, [isOpen]);

  const plans = {
    monthly: {
      price: '$19',
      period: '/ month',
      link: 'https://buy.stripe.com/14A6oHdVigUL3jC0Pi4ow00'
    },
    annual: {
      price: '$99',
      period: '/ year',
      link: 'https://buy.stripe.com/8x2cN5g3qgUL4nG8hK4ow01',
      savings: 'Save 56%'
    }
  };

  const currentPlan = plans[billingCycle];

  const features = [
    'Unlimited AI Meal Analysis',
    'Full Food Addiction Swap Library',
    'AI-Powered Craving Swaps',
    'Ad-Free Experience',
    'Advanced Metabolic Sequencing',
    'Priority Science Updates'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-forest/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden border border-gold/20"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-cream/50 transition-colors z-20"
            >
              <X className="w-5 h-5 text-forest/40" />
            </button>

            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-gold/10 px-3 py-1 rounded-full mb-4">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Premium Access</span>
                </div>
                <h2 className="text-3xl font-bold text-forest mb-3">Unlock Your Metabolism</h2>
                <p className="text-mid text-sm max-w-xs mx-auto leading-relaxed">
                  Join GLP·1 Natural Premium for science-backed tools to maintain your results forever.
                </p>
              </div>

              {/* Billing Toggle */}
              <div className="flex justify-center mb-10">
                <div className="bg-cream p-1.5 rounded-2xl flex gap-1 border border-border/50">
                  <button 
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white text-forest shadow-sm' : 'text-mid hover:text-forest'}`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setBillingCycle('annual')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${billingCycle === 'annual' ? 'bg-forest text-cream shadow-sm' : 'text-mid hover:text-forest'}`}
                  >
                    Annual
                    <span className="text-[8px] bg-gold text-forest px-1.5 py-0.5 rounded-full">Best Value</span>
                  </button>
                </div>
              </div>

              {/* Pricing Display */}
              <div className="text-center mb-10">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-forest tracking-tighter">{currentPlan.price}</span>
                  <span className="text-lg text-mid font-medium">{currentPlan.period}</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-gold text-xs font-bold mt-2 uppercase tracking-wide">
                    {plans.annual.savings} compared to monthly
                  </p>
                )}
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-10">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-sage" />
                    </div>
                    <span className="text-xs text-forest/70 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {isPremium ? (
                <div className="w-full bg-sage/10 text-sage font-bold py-4 rounded-2xl text-center flex items-center justify-center gap-2 border border-sage/20">
                  <Check className="w-5 h-5" />
                  Premium Active
                </div>
              ) : (
                <a 
                  href={currentPlan.link}
                  className="w-full bg-forest text-cream font-bold py-5 rounded-[2rem] text-center flex items-center justify-center gap-2 hover:bg-forest/90 transition-all shadow-lg hover:shadow-forest/20 group"
                >
                  <Zap className="w-4 h-4 fill-gold text-gold group-hover:scale-110 transition-transform" />
                  Upgrade to Premium
                </a>
              )}
              
              <p className="text-center text-[10px] text-mid/60 mt-6 px-8 leading-relaxed">
                Secure checkout via Stripe. Cancel anytime. <br /> 
                By upgrading, you agree to our Terms and Metabolic Protocol.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PricingModal;
