import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiSupportService } from './ai-support.service';
import { PromptDto } from './dto/prompt.dto';
import { ConfigService } from '@nestjs/config';

@Controller('ai')
export class AiSupportController {
  constructor(
    private readonly appService: AiSupportService,
    private configService: ConfigService,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Post('prompt')
  async postHello(@Body() body: PromptDto): Promise<any> {
    try {
      return this.appService.prompt(body.prompt);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
