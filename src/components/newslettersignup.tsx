'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
      // Check if email already exists
      const { data: existingSubscriptions, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', email);

      if (checkError) {
        console.error('Error checking existing subscription:', checkError);
        throw checkError;
      }

      if (existingSubscriptions && existingSubscriptions.length > 0) {
        setSubscriptionStatus('already_subscribed');
        return;
      }

      // Insert email into Supabase table
      const { error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (insertError) {
        console.error('Error inserting subscription:', insertError);
        throw insertError;
      }

      // Send thank you email using Resend
      try {
        await handleSubscribe(email);
      } catch (subscribeError) {
        console.error('Error in handleSubscribe:', subscribeError);
        // Continue execution even if email sending fails
      }

      // Call the API route to send email
      const response = await fetch('/api/send-newsletter-welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from API:', errorData);
        throw new Error(`Failed to send email: ${errorData.error || 'Unknown error'}`);
      }

      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubscriptionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    loading: { 
      scale: 1,
      boxShadow: "0 0 0 0 rgba(147, 51, 234, 1)",
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-purple-100 py-10 md:py-20"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4 text-center text-black"
        >
          Subscribe to our newsletter
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl mb-8 text-center text-gray-700"
        >
          Stay ahead with cutting-edge chemical industry updates and exclusive offers.
        </motion.p>

        <AnimatePresence mode="wait">
          {subscriptionStatus === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Welcome aboard! Check your email for a special welcome package.</span>
            </motion.div>
          ) : subscriptionStatus === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Oops! A little hiccup occurred. Please try again or reach out to our support team.</span>
            </motion.div>
          ) : subscriptionStatus === 'already_subscribed' ? (
            <motion.div
              key="already_subscribed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>You're already subscribed! We appreciate your enthusiasm.</span>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </motion.div>

                <motion.button
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  animate={isLoading ? "loading" : "idle"}
                  type="submit"
                  className={`w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default NewsletterSignup;