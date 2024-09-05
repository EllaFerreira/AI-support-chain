import { Injectable } from '@nestjs/common';
import { createReactAgent } from '@langchain/langgraph/prebuilt';

@Injectable()
export class LangGraphService {
  async callAgent({ messages, llm, tools, systemMessage }) {
    const app = createReactAgent({
      llm,
      tools,
      messageModifier: systemMessage,
    });

    const agentOutput = await app.invoke({
      messages,
    });

    console.log({
      input: messages,
      output: agentOutput,
    });

    return {
      output: agentOutput.messages[agentOutput.messages.length - 1].content,
    };
  }
}
