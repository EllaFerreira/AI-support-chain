import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { jiraConfig, JiraConfig } from './jira.config';
import { JiraResponse } from 'src/features/ai-support/dto/jira.type';

@Injectable()
export class JiraService {
  private readonly client: AxiosInstance;
  constructor(@Inject(jiraConfig.KEY) readonly config: JiraConfig) {
    this.client = axios.create({
      baseURL: this.config.JIRA_BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${this.config.JIRA_ACCESS_TOKEN_CREATOR_EMAIL}:${this.config.JIRA_ACCESS_TOKEN}`,
        ).toString('base64')}`,
      },
    });
  }
  searchIssues = async (query: string) => {
    const response = await this.client.post<any, AxiosResponse<JiraResponse>>(
      '/rest/api/2/search',
      {
        jql: `project=${this.config.JIRA_SUPPORT_BOARD_KEY} and status NOT IN (Closed, Done, Resolved) and statusCategory != Done and summary ~ '${query}'`,
        fields: ['summary', 'status', 'comment'],
        fieldsByKeys: true,
        maxResults: 15,
        startAt: 0,
      },
    );
    return response.data;
  };
}
