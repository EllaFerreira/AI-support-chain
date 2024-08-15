import { Module } from '@nestjs/common';
import { AiSupportModule } from './features/ai-support/ai-support.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), AiSupportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
