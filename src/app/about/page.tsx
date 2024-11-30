'use client';
import React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { OurStory } from '@/components/about/OurStory';
import { CoreValues } from '@/components/about/CoreValues';
import { TeamMembers } from '@/components/about/TeamMembers';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <OurStory />
      <CoreValues />
      <TeamMembers />
    </div>
  );
}
