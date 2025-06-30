'use client';

import React, { useState, useTransition } from 'react';
import type { AnalyzeMarketingOfferOutput } from '@/ai/flows/analyze-marketing-offer';
import { analyzeMarketingOffer } from '@/ai/flows/analyze-marketing-offer';

import Header from '@/components/funnel-flow/Header';
import FunnelAnalysisForm from '@/components/funnel-flow/FunnelAnalysisForm';
import AnalysisResults from '@/components/funnel-flow/AnalysisResults';
import Footer from '@/components/funnel-flow/Footer';
import LoadingSpinner from '@/components/funnel-flow/LoadingSpinner';

export default function Home() {
  const [inputType, setInputType] = useState<'link' | 'text'>('link');
  const [inputValue, setInputValue] = useState('');
  const [persona, setPersona] = useState('General Audience');
  const [results, setResults] = useState<AnalyzeMarketingOfferOutput | null>(null);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError('Please enter a URL or describe your offer.');
      return;
    }

    startTransition(async () => {
      setResults(null);
      setError('');

      try {
        const response = await analyzeMarketingOffer({
          offerDetails: inputValue,
          inputType,
          persona,
        });
        setResults(response);
      } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(`An error occurred while analyzing: ${errorMessage}. Please try again.`);
        setResults(null);
      }
    });
  };

  return (
    <div className="bg-background min-h-screen font-sans text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main>
          <FunnelAnalysisForm
            inputType={inputType}
            setInputType={setInputType}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            persona={persona}
            setPersona={setPersona}
            handleSubmit={handleSubmit}
            isLoading={isPending}
            error={error}
          />
        </main>
        
        {isPending && <LoadingSpinner />}

        {results && (
          <div className="mt-12 animate-in fade-in duration-500">
            <AnalysisResults results={results} />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
