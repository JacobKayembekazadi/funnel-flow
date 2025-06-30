import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-center mt-16 pb-8">
      <p className="text-slate-400">See how we build growth engines for brands like yours.</p>
      <div className="flex justify-center items-center space-x-6 mt-4">
        <Link href="#" className="text-indigo-400 hover:text-indigo-300 transition">Pitch Deck</Link>
        <span className="text-slate-600">|</span>
        <Link href="#" className="text-indigo-400 hover:text-indigo-300 transition">AI Demo</Link>
        <span className="text-slate-600">|</span>
        <a href="https://calendly.com/electrofyne/30min" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition">Calendly</a>
      </div>
    </footer>
  );
};

export default Footer;
