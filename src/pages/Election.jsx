import { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import ElectionHero from '../components/sections/ElectionHero';
import ElectionPortal from '../components/sections/ElectionPortal';
import GreenCTA from '../components/sections/GreenCTA';

const Election = () => {
  const [isVoterVerified, setIsVoterVerified] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans overflow-x-hidden">
      <SEO 
        title="DITA Elections - Online Voting Portal" 
        description="Verify your identity and cast your vote in the upcoming DITA association elections. Secure, transparent, and fair online voting for all Daystar students."
      />
      <Navbar />
      
      <main className="flex-grow">
        <ElectionHero />
        <ElectionPortal 
          isVerified={isVoterVerified} 
          onVerify={() => setIsVoterVerified(true)} 
        />
      </main>

      {/* Standard Site Footer with Floating CTA */}
      <div className="relative mt-20">
        <div className="bg-brand-primary pt-32 pb-10 relative">
          <div className="absolute top-0 left-0 w-full -translate-y-1/2 px-4 z-10">
            <GreenCTA />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Election;
