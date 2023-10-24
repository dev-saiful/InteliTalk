import 'dotenv/config';

import express from 'express';

import { OpenAI } from "langchain/llms/openai";

const app = express();
const PORT = process.env.PORT || 8001
const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

app.get('/',(req,res)=>{
    res.send("hello world");
});


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})