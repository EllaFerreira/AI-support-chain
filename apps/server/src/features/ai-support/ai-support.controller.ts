import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiSupportService } from './ai-support.service';
import { PromptDto } from './dto/prompt.dto';
import { ConfigService } from '@nestjs/config';
import { JiraService } from 'src/integrations/jira/jira.service';
import { Payload } from 'src/types';
import { JiraToolResponse } from 'src/schema';

@Controller('ai')
export class AiSupportController {
  constructor(
    private readonly appService: AiSupportService,
    private configService: ConfigService,
    private readonly jiraService: JiraService,
  ) {}

  @Post('prompt')
  async postHello(@Body() body: PromptDto): Promise<any> {
    try {
      return this.appService.prompt(body.prompt);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Get('search-issues')
  async fetchIssues(): Promise<any> {
    try {
      return this.jiraService.searchIssues('out of repeats');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Post('find-tickets')
  async testAgent(@Body() body: Payload): Promise<JiraToolResponse> {
    try {
      return this.appService.findTickets(body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
