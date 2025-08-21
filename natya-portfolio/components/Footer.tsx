import React, { useState } from 'react';
import { YOUR_NAME, SOCIAL_LINKS } from '../constants';
import { BehanceIcon, LinkedInIcon} from './icons/SocialIcons';

const Footer: React.FC = () => {
  const [clicks, setClicks] = useState(0);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEasterEgg = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks === 7) {
      console.log("🚀 You found the easter egg! Keep being curious. 🚀");
      setClicks(0); // reset
    }
  };

  return (
    <footer className="bg-surface-light dark:bg-surface-dark mt-20">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p onClick={handleEasterEgg} className="text-sm text-muted-light dark:text-muted-dark cursor-pointer select-none">&copy; {new Date().getFullYear()} {YOUR_NAME}. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-6">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-light dark:text-muted-dark hover:text-accent transition-colors"><LinkedInIcon /></a>
            <a href={SOCIAL_LINKS.behance} target="_blank" rel="noopener noreferrer" className="text-muted-light dark:text-muted-dark hover:text-accent transition-colors"><BehanceIcon /></a>
          </div>

          <button onClick={backToTop} className="text-sm font-medium text-accent hover:underline">
            Back to Top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;