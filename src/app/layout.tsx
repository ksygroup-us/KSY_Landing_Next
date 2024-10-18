import { Analytics } from '@vercel/analytics/react';
import { Roboto, Merriweather } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import Script from 'next/script';
import '../styles/globals.css';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-merriweather' });

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
    <html lang="en" data-theme="mytheme" className={`${roboto.variable} ${merriweather.variable}`}>
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
      <body className="font-sans text-gray-800">
        <Header />
        <div className="pt-[calc(64px+2rem)] md:pt-[calc(80px+2rem)] lg:pt-[calc(96px+2rem)]">
          <main>{children}</main>
        </div>
        <Footer />
        {/* <ChatBot /> */}
        <Analytics />
      </body>
    </html>
  );
}