import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";

export async function getAnswerFromTexts(texts: string[], metadatas: any[], query: string) {
  const model = new ChatOpenAI({ temperature: 0 });
  const embeddings = new OpenAIEmbeddings();

  const vectorStore = await MemoryVectorStore.fromTexts(texts, metadatas, embeddings);

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  const result = await chain.call({ query });

  return result.text;
}
