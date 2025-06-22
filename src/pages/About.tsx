import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import OwnerIntroduction from '@/components/about/OwnerIntroduction';
import CompanyStory from '@/components/about/CompanyStory';
import GlobalPresence from '@/components/about/GlobalPresence';
import ServiceGuarantees from '@/components/about/ServiceGuarantees';
import Testimonials from '@/components/Testimonials';

const About: React.FC = () => {
  const { i18n } = useTranslation();

  // Set page direction based on language and ensure scroll to top
  useEffect(() => {
    const dir = i18n.dir();
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;

    // Ensure page starts from top
    window.scrollTo(0, 0);
  }, [i18n]);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="overflow-hidden">
        {/* Hero Section */}
        <AboutHero />

        {/* Owner Introduction */}
        <OwnerIntroduction />

        {/* Company Story */}
        <CompanyStory />

        {/* Global Presence */}
        <GlobalPresence />

        {/* Service Guarantees */}
        <ServiceGuarantees />

        {/* Student Success Stories */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default About;
