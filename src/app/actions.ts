'use server';

import { analyzeLogs, type AnalyzeLogsInput } from '@/ai/flows/analyze-logs-for-insights';

export async function getLogAnalysis(input: AnalyzeLogsInput) {
  try {
    const result = await analyzeLogs(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to analyze logs. Please check the console for more details.' };
  }
}
