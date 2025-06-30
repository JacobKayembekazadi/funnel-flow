'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Users } from 'lucide-react';

interface FunnelAnalysisFormProps {
  inputType: 'link' | 'text';
  setInputType: (type: 'link' | 'text') => void;
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  persona: string;
  setPersona: (persona: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string;
}

const FunnelAnalysisForm: React.FC<FunnelAnalysisFormProps> = ({
  inputType,
  setInputType,
  inputValue,
  handleInputChange,
  persona,
  setPersona,
  handleSubmit,
  isLoading,
  error,
}) => {
  const personaOptions = [
    'General Audience',
    'SaaS Founders',
    'Busy Parents',
    'Coaches & Consultants',
    'E-commerce Shoppers',
    'Creative Professionals',
  ];

  return (
    <div className="bg-card/50 border border-border rounded-xl shadow-2xl shadow-indigo-900/20 p-6 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="persona" className="block text-sm font-medium text-muted-foreground mb-2">Who is your target audience?</label>
            <Select value={persona} onValueChange={setPersona}>
              <SelectTrigger className="w-full bg-input border-border p-3 pl-10 text-foreground focus:ring-2 focus:ring-ring focus:outline-none transition">
                <Users className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-muted-foreground" />
                <SelectValue placeholder="Select a persona" />
              </SelectTrigger>
              <SelectContent>
                {personaOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">What are we analyzing?</label>
            <div className="flex items-center justify-start space-x-2 bg-input p-1 rounded-lg border border-border">
              <button type="button" onClick={() => setInputType('link')} suppressHydrationWarning className={cn('w-full px-4 py-2 rounded-md transition-all duration-200 text-sm font-semibold', inputType === 'link' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:bg-slate-700')}>
                Landing Page Link
              </button>
              <button type="button" onClick={() => setInputType('text')} suppressHydrationWarning className={cn('w-full px-4 py-2 rounded-md transition-all duration-200 text-sm font-semibold', inputType === 'text' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:bg-slate-700')}>
                Describe Offer
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {inputType === 'link' ? (
            <Input type="url" value={inputValue} onChange={handleInputChange} placeholder="https://your-landing-page.com" className="w-full bg-input border-border p-4 h-auto text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none transition"/>
          ) : (
            <Textarea value={inputValue} onChange={handleInputChange} placeholder="Describe your offer in 1-2 lines..." rows={3} className="w-full bg-input border-border p-4 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none transition"/>
          )}
        </div>
        
        {error && <p className="text-red-400 mt-2 text-sm text-center">{error}</p>}
        
        <div className="mt-6 text-center">
          <Button type="submit" disabled={isLoading} suppressHydrationWarning className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto h-auto">
            {isLoading ? 'Analyzing...' : 'Generate Audit'}
            {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FunnelAnalysisForm;
