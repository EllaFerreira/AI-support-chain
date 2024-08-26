import { Module } from '@nestjs/common';
import { AiSupportController } from './ai-support.controller';
import { AiSupportService } from './ai-support.service';
import { ConfigModule } from '@nestjs/config';
import { JiraService } from 'src/integrations/jira/jira.service';
import { jiraConfig } from 'src/integrations/jira/jira.config';

@Module({
  imports: [ConfigModule.forRoot({ load: [jiraConfig] })],
  controllers: [AiSupportController],
  providers: [AiSupportService, JiraService],
})
export class AiSupportModule {}
