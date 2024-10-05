import { z } from 'zod';
import { registerAs } from '@nestjs/config';

const JiraConfigSchema = z.object({
  JIRA_BASE_URL: z.string().nonempty(),
  JIRA_ACCESS_TOKEN: z.string().nonempty(),
  JIRA_ACCESS_TOKEN_CREATOR_EMAIL: z.string().email().nonempty(),
  JIRA_SUPPORT_BOARD_KEY: z.string().nonempty(),
});

export type JiraConfig = z.infer<typeof JiraConfigSchema>;

export const JIRA_CONFIG_NAMESPACE = 'jiraConfig';

export const jiraConfig = registerAs(
  JIRA_CONFIG_NAMESPACE,
  // eslint-disable-next-line no-process-env
  (): JiraConfig => JiraConfigSchema.parse(process.env),
);
