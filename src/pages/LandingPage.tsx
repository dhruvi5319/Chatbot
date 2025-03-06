
import Header from '@/components/Landing/Header';
import Hero from '@/components/Landing/Hero';
import Features from '@/components/Landing/Features';
import HowItWorks from '@/components/Landing/HowItWorks';
import Footer from '@/components/Landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default LandingPage;
