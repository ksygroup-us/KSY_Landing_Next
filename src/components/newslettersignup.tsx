'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/utils/supabaseClient';

interface NewsletterSignupProps {
  handleSubscribe: (email: string) => Promise<void>;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ handleSubscribe }) => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error' | 'already_subscribed'>('idle');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubscriptionStatus('idle');

    try {
      const { data: existingSubscriptions, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', email);

      if (checkError) throw checkError;

      if (existingSubscriptions?.length > 0) {
        setSubscriptionStatus('already_subscribed');
        return;
      }

      const { error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (insertError) throw insertError;

      await handleSubscribe(email);
      
      const response = await fetch('/api/send-newsletter-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to send welcome email');

      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setSubscriptionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Stay Connected
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-primary mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Stay ahead with cutting-edge chemical industry updates and exclusive offers
          </motion.p>
        </div>

        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {subscriptionStatus !== 'idle' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 rounded-lg shadow-lg ${
                  subscriptionStatus === 'success' ? 'bg-green-100 text-green-800' :
                  subscriptionStatus === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}
              >
                {subscriptionStatus === 'success' && "Welcome aboard! Check your email for a special welcome package."}
                {subscriptionStatus === 'error' && "Oops! Something went wrong. Please try again."}
                {subscriptionStatus === 'already_subscribed' && "You're already subscribed! We appreciate your enthusiasm."}
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
