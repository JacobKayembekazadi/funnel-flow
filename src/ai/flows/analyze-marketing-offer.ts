'use server';

/**
 * @fileOverview AI-powered marketing funnel analysis flow.
 *
 * - analyzeMarketingOffer - Analyzes a marketing offer for funnel leaks and generates improvement suggestions.
 * - AnalyzeMarketingOfferInput - The input type for the analyzeMarketingOffer function.
 * - AnalyzeMarketingOfferOutput - The return type for the analyzeMarketingOffer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMarketingOfferInputSchema = z.object({
  offerDetails: z.string().describe('The landing page URL or a description of the marketing offer.'),
  inputType: z.enum(['link', 'text']).describe('The type of input provided: link for a landing page URL, text for a description.'),
  persona: z.string().describe('The target audience persona.'),
});
export type AnalyzeMarketingOfferInput = z.infer<typeof AnalyzeMarketingOfferInputSchema>;

const AnalysisItemSchema = z.object({
  id: z.string().describe('A unique identifier for the analysis item.'),
  area: z.string().describe('The area being analyzed, e.g., \'Headline Clarity\'.'),
  score: z.number().describe('A score from 1-10 for this area.'),
  leak: z.string().describe('The identified funnel leak or weakness.'),
  fix: z.object({
    primarySuggestion: z.string().describe('Suggestion A for A/B test.'),
    abTestSuggestion: z.string().describe('Suggestion B for A/B test.'),
  }).describe('Suggestions for fixing the leak'),
});

const SampleCopySchema = z.object({
  platform: z.string().describe('e.g., \'Instagram Post\' or \'Short Email\''),
  content: z.string().describe('The generated marketing copy.'),
});

const AnalyzeMarketingOfferOutputSchema = z.object({
  analysis: z.array(AnalysisItemSchema).describe('An array of analysis items.'),
  sampleCopy: SampleCopySchema.describe('Generated sample marketing copy.'),
});
export type AnalyzeMarketingOfferOutput = z.infer<typeof AnalyzeMarketingOfferOutputSchema>;

export async function analyzeMarketingOffer(input: AnalyzeMarketingOfferInput): Promise<AnalyzeMarketingOfferOutput> {
  return analyzeMarketingOfferFlow(input);
}

const analyzeMarketingOfferPrompt = ai.definePrompt({
  name: 'analyzeMarketingOfferPrompt',
  input: {schema: AnalyzeMarketingOfferInputSchema},
  output: {schema: AnalyzeMarketingOfferOutputSchema},
  prompt: `You are an expert marketing funnel conversion analyst.\nA user is providing their marketing offer details for analysis.\nThe user's input is: "{{{offerDetails}}}" ({{{inputType}}}).\nThe target audience persona is: "{{{persona}}}".

Your task is to perform a detailed analysis and provide the following:
1.  **Analysis of 2-3 key areas:** Identify critical "leaks". For each area (e.g., 'Headline Clarity', 'Call-to-Action Strength', 'Offer Urgency'):
    - Give it a score from 1 to 10.
    - Describe the leak.
    - Provide two distinct fix suggestions (A and B) for A/B testing.
2.  **Generate Sample Copy:** Based on your analysis, write a short, engaging social media post (e.g., for Twitter or Instagram) to promote the user's offer, incorporating your suggested improvements.

Present your complete analysis in the structured JSON format specified.`,
});

const analyzeMarketingOfferFlow = ai.defineFlow(
  {
    name: 'analyzeMarketingOfferFlow',
    inputSchema: AnalyzeMarketingOfferInputSchema,
    outputSchema: AnalyzeMarketingOfferOutputSchema,
  },
  async input => {
    const {output} = await analyzeMarketingOfferPrompt(input);
    return output!;
  }
);
