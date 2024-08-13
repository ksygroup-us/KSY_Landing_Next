import { Analytics } from '@vercel/analytics/react';
import { Roboto, Merriweather } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot'; // Add this import
import Script from 'next/script';
import '../styles/globals.css';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'KSY Group - Your Trusted Chemical Importer',
  description: 'Sourcing specialty chemicals from across the globe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="mytheme">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${roboto.className} text-gray-800`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatBot /> {/* Add this line */}
        <Analytics />
      </body>
    </html>
  );
}