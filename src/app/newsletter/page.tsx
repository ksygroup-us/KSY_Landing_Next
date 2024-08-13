'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IFormInputs {
  email: string;
}

interface INewsletterIssue {
  id: number;
  date: string;
  title: string;
  preview: string;
}

const newsletterIssues: INewsletterIssue[] = [
  {
    id: 1,
    date: "2023-07-01",
    title: "US Chemical Imports from South Asia on the Rise",
    preview: "In this issue, we explore the growing trend of US chemical imports from South Asian suppliers, with a focus on India and Bangladesh."
  },
  {
    id: 2,
    date: "2023-06-01",
    title: "Sustainable Practices in Chemical Distribution",
    preview: "Discover how the chemical industry is adopting eco-friendly practices and the impact on global distribution networks."
  },
  // Add more past issues here
];

export default function NewsletterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<INewsletterIssue | null>(null);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Subscription failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = {
    labels: ['2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        label: 'US Chemical Imports from South Asia (in billion USD)',
        data: [12, 14, 13, 17, 22],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Chemical Industry Newsletter</h1>
      
      {isSubmitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
          <h2 className="font-bold text-xl mb-2">Thank you for subscribing!</h2>
          <p>You&apos;ve successfully subscribed to the KSY Group newsletter. Check your email for a confirmation message with more details about what to expect.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mb-8">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email Address</label>
            <input
              {...register('email', { 
                required: 'Email is required', 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              id="email"
              type="email"
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <button 
            type="submit" 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Latest Report: US Chemical Imports from South Asia</h2>
          <p className="mb-4">
            Recent years have seen a significant growth in US chemical imports from South Asian suppliers, particularly India and Bangladesh. This trend is driven by competitive pricing, improving quality standards, and diversification of supply chains.
          </p>
          <p className="mb-4">
            Key findings:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>83% increase in chemical imports from South Asia since 2018</li>
            <li>India remains the largest exporter, accounting for 68% of South Asian chemical imports to the US</li>
            <li>Specialty chemicals and pharmaceuticals lead the growth</li>
          </ul>
          <div className="mb-4">
            <Line data={chartData} />
          </div>
          <p className="text-sm text-gray-600">
            Sources: US Census Bureau, Chemical & Engineering News, American Chemistry Council
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Past Issues</h2>
          <ul className="space-y-4">
            {newsletterIssues.map((issue) => (
              <li key={issue.id} className="border p-4 rounded hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedIssue(issue)}>
                <h3 className="font-semibold">{issue.title}</h3>
                <p className="text-sm text-gray-600">{issue.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-2">{selectedIssue.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{selectedIssue.date}</p>
            <p>{selectedIssue.preview}</p>
            <button 
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
              onClick={() => setSelectedIssue(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">What You&apos;ll Receive</h2>
        <ul className="list-disc list-inside">
          <li>Monthly industry updates</li>
          <li>Exclusive offers and promotions</li>
          <li>Insights from chemical industry experts</li>
          <li>Information about new products and services</li>
        </ul>
      </div>
    </div>
  );
}