import { Injectable } from '@nestjs/common';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { loadFile } from 'src/utils/utils';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { Document } from '@langchain/core/documents';
import { ChromaClient } from 'chromadb';
import { JiraTool } from './tools/jira-search-tool';
import { LangGraphService } from './lang-graph-service';
import { HumanMessage } from '@langchain/core/messages';

@Injectable()
export class AiSupportService {
  constructor(
    private readonly jiraTool: JiraTool,
    private readonly langGraphService: LangGraphService,
  ) {}
  async prompt(input: string): Promise<any> {
    const content = loadFile('./src/fixtures/test.md');

    const splits = await this.splitContent(content);
    const vectorStore = await this.addToVectorStore(splits);
    const model = new ChatOpenAI({
      model: 'gpt-4o-mini',
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a support engineer with access to a list of open tickets. 
        Check the existing ticket list to determine if there is already an open ticket for the patient. 
        If an open ticket exists, provide the ticket number and details to the user.`,
      ],
      ['human', 'Only use the following context: {context}.'],
      ['human', 'Answer the question: {question}.'],
      [
        'human',
        `
        Return markdown formatted text with the ticket data.
        eg: 
        ## Jira Ticket number: 1234
        - Patient: John Doe
        - Description: Can't login
        `,
      ],
    ]);

    const ragChain = await createStuffDocumentsChain({
      llm: model,
      prompt,
      outputParser: new StringOutputParser(),
    });

    const retriever = vectorStore.asRetriever({
      k: 10,
      searchType: 'similarity',
    });

    const retrievedDocs = await retriever.invoke(input);

    const res = await ragChain.invoke({
      question: input,
      context: retrievedDocs,
    });

    return res;
  }

  async splitContent(content: string): Promise<Document[]> {
    const textSplitter = RecursiveCharacterTextSplitter.fromLanguage(
      'markdown',
      {
        chunkSize: 100,
        chunkOverlap: 5,
        // separators: ['##'],
      },
    );

    const mdDocs = await textSplitter.createDocuments([content]);
    return mdDocs;
  }

  async addToVectorStore(documents: Document[]): Promise<Chroma> {
    //Setup vector store
    const client = new ChromaClient({ path: 'http://chromadb:8000' });
    await client.deleteCollection({ name: 'db_ai_test' });

    const vectorStore = await Chroma.fromDocuments(
      documents,
      new OpenAIEmbeddings({
        model: 'text-embedding-3-small',
      }),
      { collectionName: 'db_ai_test', url: 'http://chromadb:8000' },
    );
    return vectorStore;
  }

  async testTool(input: string): Promise<any> {
    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0,
    });

    const test = await this.langGraphService.callAgent({
      messages: [
        new HumanMessage(
          `Search for any relevant support tickets that have keywords from the ${input} in the Jira board.`,
        ),
      ],
      tools: [this.jiraTool],
      llm: llm,
      systemMessage:
        'You are a support engineer with access to a tool for fetching support tickets from a Jira board. Your task is to process the input query, use the tool to perform the search, and return relevant results.',
    });
    return test;
  }
}
