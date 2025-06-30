'use client';

import React, { useState } from 'react';
import type { AnalyzeMarketingOfferOutput } from '@/ai/flows/analyze-marketing-offer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ScoreDonut from './ScoreDonut';
import { ClipboardCopy } from 'lucide-react';

interface AnalysisResultsProps {
  results: AnalyzeMarketingOfferOutput;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopySuccess('Failed!');
    }
  };

  return (
    <section id="results" className="mt-12">
      <h2 className="font-headline text-3xl font-bold text-center mb-8">AI Funnel Audit</h2>
      <div className="space-y-8">
        {results.analysis.map((item, index) => (
          <Card key={index} className="bg-card/60 border-border">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <ScoreDonut score={item.score} />
              <div className="flex-grow">
                <CardTitle className="font-bold text-xl text-amber-400 font-headline">{item.area}</CardTitle>
                <p className="mt-1 text-slate-300"><strong>Leak Detected:</strong> {item.leak}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-6 border-t border-border pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-teal-400">💡 Fix Suggestion A</h4>
                  <p className="mt-2 text-slate-300">{item.fix.primarySuggestion}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sky-400">🧪 A/B Test Suggestion B</h4>
                  <p className="mt-2 text-slate-300">{item.fix.abTestSuggestion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="bg-card/60 border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-400 font-headline">Generated Sample Copy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-background rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-slate-300">{results.sampleCopy.platform}</h4>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(results.sampleCopy.content)} className="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition">
                  <ClipboardCopy className="w-4 h-4" />
                  <span>{copySuccess ? copySuccess : 'Copy'}</span>
                </Button>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap font-mono text-sm">{results.sampleCopy.content}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 text-center bg-gradient-to-tr from-slate-800 to-slate-900 border border-purple-500/30 rounded-xl p-8 shadow-2xl shadow-purple-900/30">
          <h3 className="font-headline text-2xl font-bold text-white">Want us to rebuild this into a sales-ready system?</h3>
          <p className="mt-2 text-slate-400">Let our experts give you a full strategy breakdown.</p>
          <a href="https://calendly.com/electrofyne/30min" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
              Book a Free 15-Min Funnel Preview
          </a>
      </div>
    </section>
  );
};

export default AnalysisResults;
