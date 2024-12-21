'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/utils/supabaseClient';

export default function VerifySubscription() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        const email = searchParams.get('email');
        const token = searchParams.get('token');

        if (!email || !token) {
          throw new Error('Invalid verification link');
        }

        // Update the subscription status in Supabase
        const { error } = await supabase
          .from('newsletter_subscriptions')
          .update({ verified: true, verified_at: new Date().toISOString() })
          .eq('email', email);

        if (error) throw error;
        
        setStatus('success');
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
      }
    };

    verifySubscription();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {status === 'verifying' && (
          <div className="space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Verifying your subscription...
            </h1>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Subscription Verified!
              </h1>
              <p className="text-lg text-gray-600">
                Thank you for confirming your subscription to the KSY Group newsletter.
                You'll now receive our latest updates and exclusive offers.
              </p>
              <motion.a
                href="/"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-block mt-6 text-primary hover:text-primary/80 underline"
              >
                Return to Homepage
              </motion.a>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Verification Failed
              </h1>
              <p className="text-lg text-gray-600">
                We couldn't verify your subscription. The link might be invalid or expired.
                Please try subscribing again.
              </p>
              <motion.a
                href="/"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-block mt-6 text-primary hover:text-primary/80 underline"
              >
                Return to Homepage
              </motion.a>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
} 