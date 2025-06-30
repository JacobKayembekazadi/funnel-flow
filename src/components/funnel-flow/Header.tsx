import React from 'react';

const Header = () => {
  return (
    <header className="text-center my-8 md:my-12">
      <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
        Your Funnel Is Leaking Sales.
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
        Get an instant, AI-powered audit. Select your audience, paste your offer, and get scores, A/B tests, and ready-to-use copy to fix your funnel.
      </p>
    </header>
  );
};

export default Header;
