import { Tool } from '@langchain/core/tools';
import { Injectable } from '@nestjs/common';
import { JiraService } from 'src/integrations/jira/jira.service';

// interface JiraToolConfig {
//   name: string; // e.g., 'jira-search-tool'
//   description: string; // e.g., 'A tool for interacting with and fetching data from the Jira API.'
//   baseUrl: string; // e.g., 'https://abc.atlassian.net'
//   topKResults: number; // e.g., 3
// }

@Injectable()
export class JiraTool extends Tool {
  //config: JiraToolConfig;
  name = 'jira-search-tool';
  description =
    'A tool for interacting with and fetching data from the Jira API.';
  protected baseUrl = 'https://montugroup.atlassian.net';
  protected topKResults = 3;

  constructor(
    private readonly jiraService: JiraService,
    // params: JiraParams = {},
  ) {
    super();
    this.topKResults = this.topKResults;
    this.baseUrl = this.baseUrl;
  }

  async _call(query: string): Promise<any> {
    try {
      return await this.jiraService.searchIssues(query);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
