import { z } from 'zod';

export const JiraToolSchema = z.object({
  output: z.string().describe('The output of the Jira tool'),
  hasTickets: z.boolean().describe('Whether the Jira tool has tickets'),
});

export type JiraToolResponse = z.infer<typeof JiraToolSchema>;

export const HumanMessage = z.object({
  role: z.literal('user'),
  content: z.string(),
});

export type HumanMessage = z.infer<typeof HumanMessage>;

export const ChatOpenAI = z.object({
  model: z.string(),
  temperature: z.number().optional(),
});

export type ChatOpenAI = z.infer<typeof ChatOpenAI>;
