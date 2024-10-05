import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JiraService } from './jira.service';
import { jiraConfig } from './jira.config';

@Module({
  imports: [ConfigModule.forRoot({ load: [jiraConfig] })],
  providers: [JiraService],
  exports: [JiraService],
})
export class JiraModule {}
