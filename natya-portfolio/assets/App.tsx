
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Work from '../components/Work';
import Process from '../components/Process';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

const App: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div className="relative">
      <CustomCursor />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-bg-light via-bg-light to-gray-200 dark:from-bg-dark dark:via-[#11131a] dark:to-[#1a1c28] bg-[length:200%_200%] animate-backgroundShift -z-10"></div>
      
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto px-4 md:px-8">
        <Hero />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;