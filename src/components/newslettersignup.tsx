'use client';

import React, { useState } from 'react';

interface NewsletterSignupProps {
  handleSubscribe: (e: React.FormEvent) => Promise<void>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  subscriptionStatus: 'idle' | 'success' | 'error';
  isLoading: boolean;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  handleSubscribe,
  email,
  setEmail,
  subscriptionStatus,
  isLoading,
}) => {
  return (
    <section className="bg-primary text-white py-10 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-purple-700">Stay Informed</h2>
        <p className="text-xl mb-8 text-center text-purple-600">Subscribe to our newsletter for the latest chemical industry updates and exclusive offers.</p>
        {subscriptionStatus === 'success' ? (
          <div className="alert alert-success bg-purple-700 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Thank you for subscribing! Check your email for a confirmation message.</span>
          </div>
        ) : subscriptionStatus === 'error' ? (
          <div className="alert alert-error bg-red-600 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Oops! Something went wrong. Please try again later or contact us for assistance.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="input input-bordered w-full max-w-xs mb-2 sm:mb-0 sm:mr-2 text-black"
              required
            />
            <button
              type="submit"
              className={`btn btn-secondary bg-purple-600 border-none ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;
