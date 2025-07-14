import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export interface NewsItem {
	title: string;
	description: string;
	source: string;
}

export async function fetchNewsFromOpenAI(): Promise<NewsItem[]> {
	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-4",
			temperature: 0.2,
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant that returns real-world news in JSON format.",
				},
				{
					role: "user",
					content: `Search for global developments from the past 7 days related to kraft paper, packaging, or sustainable packaging. 
Return the output strictly as an array of JSON objects in this format: 
[
  {
    "title": "News title",
    "description": "Brief summary of the news",
    "source": "Valid URL of the original article"
  }
]`,
				},
			],
		});

		const text = completion.choices[0].message?.content;
		if (!text) throw new Error("OpenAI response is empty.");

		// Çıkan içerik geçerli JSON olmayabilir, bu yüzden parse ederken dikkatli ol
		const jsonStart = text.indexOf("[");
		const jsonEnd = text.lastIndexOf("]");
		const jsonString = text.slice(jsonStart, jsonEnd + 1);

		const news: NewsItem[] = JSON.parse(jsonString);
		return news;
	} catch (error) {
		console.error("❌ Failed to fetch news from OpenAI:", error);
		return [];
	}
}
