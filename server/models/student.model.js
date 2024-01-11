import "dotenv/config";
import { OpenAI } from "langchain/llms/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";

const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

// load text document
const loader = new TextLoader("./data/private.txt");
const docs = await loader.load();

// splitter function
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 10,
  });
  // create chunks from txt document
const splittedDocs = await splitter.splitDocuments(docs);

const embeddings = new OpenAIEmbeddings();
// Vector database for store embeddings
const vectorStore = await HNSWLib.fromDocuments(
    splittedDocs,
    embeddings,
  );
  const vectorStoreRetriever = vectorStore.asRetriever();
  const model = new OpenAI({
    modelName:'gpt-3.5-turbo',
  });
  
  
 export const studentChain = RetrievalQAChain.fromLLM(model,vectorStoreRetriever);

//  This is our question
//  const question = "What  is the name of Assitance Co-ordinator?";

//  const answer = await chain.call({
//     query:question,
//  });