import React from "react";

import AboutHero from "../components/about/AboutSection";
import OurStory from "../components/about/OurStory";
import MissionVision from "../components/about/MissionVision";
import TestimonialSection from "../components/about/TestimonialSection";
import CTASection from "../components/about/CTASection";

function About() {
  return (
    <main className="bg-white text-gray-800">
      <AboutHero />
      <OurStory />
      <MissionVision />
      <TestimonialSection />
      <CTASection />
    </main>
  );
}

export default About;
