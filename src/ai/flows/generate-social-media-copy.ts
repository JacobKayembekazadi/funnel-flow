'use server';
/**
 * @fileOverview AI agent that generates social media copy based on funnel analysis data.
 *
 * - generateSocialMediaCopy - A function that generates social media copy.
 * - GenerateSocialMediaCopyInput - The input type for the generateSocialMediaCopy function.
 * - GenerateSocialMediaCopyOutput - The return type for the generateSocialMediaCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialMediaCopyInputSchema = z.object({
  analysis: z.array(
    z.object({
      area: z.string().describe("The area being analyzed, e.g., 'Headline Clarity'."),
      score: z.number().describe('A score from 1-10 for this area.'),
      leak: z.string().describe('The identified funnel leak or weakness.'),
      fix: z.object({
        primarySuggestion: z.string().describe('Suggestion A for A/B test.'),
        abTestSuggestion: z.string().describe('Suggestion B for A/B test.'),
      }),
    })
  ).describe('The analysis of the funnel.'),
  persona: z.string().describe('The target audience persona.'),
  offerDetails: z.string().describe('Details of the offer being promoted.'),
});
export type GenerateSocialMediaCopyInput = z.infer<typeof GenerateSocialMediaCopyInputSchema>;

const GenerateSocialMediaCopyOutputSchema = z.object({
  platform: z.string().describe('e.g., \'Instagram Post\' or \'Short Email\''),
  content: z.string().describe('The generated marketing copy.'),
});
export type GenerateSocialMediaCopyOutput = z.infer<typeof GenerateSocialMediaCopyOutputSchema>;

export async function generateSocialMediaCopy(input: GenerateSocialMediaCopyInput): Promise<GenerateSocialMediaCopyOutput> {
  return generateSocialMediaCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialMediaCopyPrompt',
  input: {schema: GenerateSocialMediaCopyInputSchema},
  output: {schema: GenerateSocialMediaCopyOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in creating engaging social media posts.

  Based on the following funnel analysis, target audience persona, and offer details, generate a short, engaging social media post to promote the user's offer.
  Incorporate suggested improvements for A/B testing.

  Funnel Analysis:
  {{#each analysis}}
  Area: {{area}}
  Score: {{score}}
  Leak: {{leak}}
  Fix Suggestion A: {{fix.primarySuggestion}}
  Fix Suggestion B: {{fix.abTestSuggestion}}
  {{/each}}

  Target Audience Persona: {{persona}}
  Offer Details: {{offerDetails}}
  Output should be in format:
  Platform: {platform}
  Content: {content}`,
});

const generateSocialMediaCopyFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaCopyFlow',
    inputSchema: GenerateSocialMediaCopyInputSchema,
    outputSchema: GenerateSocialMediaCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
