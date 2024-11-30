'use client';
import React from 'react';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { FAQ } from '@/components/contact/FAQ';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <ContactForm />
      <FAQ />
    </div>
  );
}