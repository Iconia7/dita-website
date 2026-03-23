import { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import ElectionHero from '../components/sections/ElectionHero';
import ElectionPortal from '../components/sections/ElectionPortal';

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

      <Footer />
    </div>
  );
};

export default Election;
