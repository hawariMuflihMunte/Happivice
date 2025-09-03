// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Analyzes log data to identify trends, patterns, and potential issues.
 *
 * - analyzeLogs - A function that takes log data as input and returns insights and recommendations.
 * - AnalyzeLogsInput - The input type for the analyzeLogs function.
 * - AnalyzeLogsOutput - The return type for the analyzeLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLogsInputSchema = z.object({
  logData: z
    .string()
    .describe('The log data to analyze.'),
});

export type AnalyzeLogsInput = z.infer<typeof AnalyzeLogsInputSchema>;

const AnalyzeLogsOutputSchema = z.object({
  summary: z.string().describe('A summary of the analysis of the log data.'),
  insights: z.string().describe('Insights and patterns identified in the log data.'),
  recommendations: z
    .string()
    .describe('Actionable recommendations based on the log analysis.'),
});

export type AnalyzeLogsOutput = z.infer<typeof AnalyzeLogsOutputSchema>;

export async function analyzeLogs(input: AnalyzeLogsInput): Promise<AnalyzeLogsOutput> {
  return analyzeLogsFlow(input);
}

const analyzeLogsPrompt = ai.definePrompt({
  name: 'analyzeLogsPrompt',
  input: {schema: AnalyzeLogsInputSchema},
  output: {schema: AnalyzeLogsOutputSchema},
  prompt: `You are an expert log analyst. Analyze the following log data to identify trends, patterns, and potential issues. Provide a summary of your analysis, insights into the log data, and actionable recommendations.

Log Data:
{{{logData}}}`,
});

const analyzeLogsFlow = ai.defineFlow(
  {
    name: 'analyzeLogsFlow',
    inputSchema: AnalyzeLogsInputSchema,
    outputSchema: AnalyzeLogsOutputSchema,
  },
  async input => {
    const {output} = await analyzeLogsPrompt(input);
    return output!;
  }
);
