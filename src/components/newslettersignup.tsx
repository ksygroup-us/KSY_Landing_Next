'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterSignupProps {
  handleSubscribe: (e: React.FormEvent, preferences?: string[], frequency?: string) => Promise<void>;
  email: string;
  setEmail: (email: string) => void;
  subscriptionStatus: 'idle' | 'success' | 'error';
  isLoading: boolean;
}

interface NewsletterSignupState {
  step: number;
  preferences: string[];
  frequency: string;
}

class NewsletterSignup extends React.Component<NewsletterSignupProps, NewsletterSignupState> {
  constructor(props: NewsletterSignupProps) {
    super(props);
    this.state = {
      step: 1,
      preferences: [],
      frequency: 'weekly',
    };
  }

  handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (this.state.step < 3) {
      this.setState(prevState => ({ step: prevState.step + 1 }));
    } else {
      this.props.handleSubscribe(e, this.state.preferences, this.state.frequency);
    }
  };

  togglePreference = (pref: string) => {
    this.setState(prevState => ({
      preferences: prevState.preferences.includes(pref)
        ? prevState.preferences.filter(p => p !== pref)
        : [...prevState.preferences, pref]
    }));
  };

  setFrequency = (frequency: string) => {
    this.setState({ frequency });
  };

  render() {
    const { email, setEmail, subscriptionStatus, isLoading } = this.props;
    const { step, preferences, frequency } = this.state;

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
            Join the ChemInsights Community
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
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto"
              >
                <form onSubmit={this.handleNextStep} className="space-y-4">
                  {step === 1 && (
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
                  )}
                  
                  {step === 2 && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Select your interests:</h3>
                      {['Industry News', 'Product Updates', 'Regulatory Changes', 'Market Trends', 'Innovation Spotlight'].map((pref) => (
                        <label key={pref} className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={preferences.includes(pref)}
                            onChange={() => this.togglePreference(pref)}
                            className="form-checkbox h-5 w-5 text-purple-600"
                          />
                          <span className="text-gray-700">{pref}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">How often would you like to hear from us?</h3>
                      <select
                        value={frequency}
                        onChange={(e) => this.setFrequency(e.target.value)}
                        className="w-full px-3 py-2 text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      >
                        <option value="daily">Daily Digest</option>
                        <option value="weekly">Weekly Roundup</option>
                        <option value="monthly">Monthly Insights</option>
                      </select>
                    </motion.div>
                  )}

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
                    {isLoading ? 'Joining...' : step === 3 ? 'Complete Signup' : 'Next'}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    );
  }
}

export default NewsletterSignup;




// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface NewsletterSignupProps {
//   handleSubscribe: (e: React.FormEvent, preferences?: string[], frequency?: string) => Promise<void>;
//   email: string;
//   setEmail: React.Dispatch<React.SetStateAction<string>>;
//   subscriptionStatus: 'idle' | 'success' | 'error';
//   isLoading: boolean;
// }

// const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
//   handleSubscribe,
//   email,
//   setEmail,
//   subscriptionStatus,
//   isLoading,
// }) => {
//   const [step, setStep] = useState(1);
//   const [preferences, setPreferences] = useState<string[]>([]);
//   const [frequency, setFrequency] = useState('weekly');

//   const handleNextStep = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (step < 3) {
//       setStep(step + 1);
//     } else {
//       handleSubscribe(e, preferences, frequency);
//     }
//   };

//   const togglePreference = (pref: string) => {
//     setPreferences(prev => 
//       prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
//     );
//   };

//   const buttonVariants = {
//     idle: { scale: 1 },
//     hover: { scale: 1.05 },
//     tap: { scale: 0.95 },
//     loading: { 
//       scale: 1,
//       boxShadow: "0 0 0 0 rgba(147, 51, 234, 1)",
//       transition: {
//         duration: 1,
//         repeat: Infinity,
//         repeatType: "reverse" as const
//       }
//     }
//   };

//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-purple-100 py-10 md:py-20"
//     >
//       <div className="container mx-auto px-4">
//         <motion.h2
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-3xl font-bold mb-4 text-center text-black"
//         >
//           Join the ChemInsights Community
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="text-xl mb-8 text-center text-gray-700"
//         >
//           Stay ahead with cutting-edge chemical industry updates and exclusive offers.
//         </motion.p>

//         <AnimatePresence mode="wait">
//           {subscriptionStatus === 'success' ? (
//             <motion.div
//               key="success"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               className="alert alert-success bg-green-100 text-green-800 p-4 rounded-lg shadow-md"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span>Welcome aboard! Check your email for a special welcome package.</span>
//             </motion.div>
//           ) : subscriptionStatus === 'error' ? (
//             <motion.div
//               key="error"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               className="alert alert-error bg-red-100 text-red-800 p-4 rounded-lg shadow-md"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span>Oops! A little hiccup occurred. Please try again or reach out to our support team.</span>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="form"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto"
//             >
//               <form onSubmit={handleNextStep} className="space-y-4">
//                 {step === 1 && (
//                   <motion.div
//                     initial={{ x: -50, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     exit={{ x: 50, opacity: 0 }}
//                   >
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email address"
//                       className="input input-bordered w-full text-black bg-gray-100"
//                       required
//                     />
//                   </motion.div>
//                 )}
                
//                 {step === 2 && (
//                   <motion.div
//                     initial={{ x: -50, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     exit={{ x: 50, opacity: 0 }}
//                   >
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">Select your interests:</h3>
//                     {['Industry News', 'Product Updates', 'Regulatory Changes', 'Market Trends', 'Innovation Spotlight'].map((pref) => (
//                       <label key={pref} className="flex items-center space-x-2 mb-2">
//                         <input
//                           type="checkbox"
//                           checked={preferences.includes(pref)}
//                           onChange={() => togglePreference(pref)}
//                           className="checkbox checkbox-primary"
//                         />
//                         <span className="text-gray-700">{pref}</span>
//                       </label>
//                     ))}
//                   </motion.div>
//                 )}

//                 {step === 3 && (
//                   <motion.div
//                     initial={{ x: -50, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     exit={{ x: 50, opacity: 0 }}
//                   >
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">How often would you like to hear from us?</h3>
//                     <select
//                       value={frequency}
//                       onChange={(e) => setFrequency(e.target.value)}
//                       className="select select-bordered w-full text-black bg-gray-100"
//                     >
//                       <option value="daily">Daily Digest</option>
//                       <option value="weekly">Weekly Roundup</option>
//                       <option value="monthly">Monthly Insights</option>
//                     </select>
//                   </motion.div>
//                 )}

//                 <motion.button
//                   variants={buttonVariants}
//                   initial="idle"
//                   whileHover="hover"
//                   whileTap="tap"
//                   animate={isLoading ? "loading" : "idle"}
//                   type="submit"
//                   className={`btn btn-primary bg-purple-600 text-white border-none w-full ${isLoading ? 'loading' : ''}`}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Joining...' : step === 3 ? 'Complete Signup' : 'Next'}
//                 </motion.button>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.section>
//   );
// };

// export default NewsletterSignup;