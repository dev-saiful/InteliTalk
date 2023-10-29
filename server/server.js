import 'dotenv/config';
import express from 'express';
import { OpenAI } from "langchain/llms/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";

const app = express();
const PORT = process.env.PORT || 8001
const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

// load text document
const loader = new TextLoader("./data/cr.txt");
const docs = await loader.load();

// splitter function
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 10,
  });
  // create chunks from txt document
const splittedDocs = await splitter.splitDocuments(docs);

const embeddings = new OpenAIEmbeddings();



const vectorStore = await HNSWLib.fromDocuments(
    splittedDocs,
    embeddings,
  );
  const vectorStoreRetriever = vectorStore.asRetriever();
  const model = new OpenAI({
    modelName:'gpt-3.5-turbo',
  });
  
  
 const chain = RetrievalQAChain.fromLLM(model,vectorStoreRetriever);

 const question = "What is the name of co-ordinator teacher?";

 const answer = await chain.call({
    query:question,
 });


app.get('/',(req,res)=>{
    
    res.send("hello world");
});


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(answer);
})