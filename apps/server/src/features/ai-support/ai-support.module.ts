import { Module } from '@nestjs/common';
import { AiSupportController } from './ai-support.controller';
import { AiSupportService } from './ai-support.service';
import { ConfigModule } from '@nestjs/config';
import { JiraTool } from './tools/jira-search-tool';
import { LangGraphService } from './lang-graph-service';
import { jiraConfig } from 'src/integrations/jira/jira.config';
import { JiraService } from 'src/integrations/jira/jira.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [jiraConfig] })],
  controllers: [AiSupportController],
  providers: [AiSupportService, JiraService, JiraTool, LangGraphService],
})
export class AiSupportModule {}
