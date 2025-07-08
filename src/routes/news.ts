import express from "express";
import OpenAI from "openai";
import Parser from "rss-parser";

type CustomFeed = { title: string; link: string };
type CustomItem = { title: string; link: string };

const parser = new Parser<CustomFeed, CustomItem>();
const API_KEY = process.env.OPENAI_API_KEY;
const router = express.Router();
const openai = new OpenAI({
	apiKey: API_KEY,
	baseURL: "https://api.openai.com/v1",
});

/*
router.get("/", async (_req, res) => {
	try {
		const feed = await parser.parseURL("https://www.ntv.com.tr/gundem.rss");
		console.log(feed.items.slice(0, 5));
		const results = await Promise.all(
			feed.items.slice(0, 5).map(async (item) => {
				const prompt = `Aşağıdaki haberi kısa, sade ve Türkçe şekilde özetle:\n\nBaşlık: ${item.title}\nİçerik: ${item.contentSnippet}`;
				const response = await openai.chat.completions.create({
					messages: [{ role: "user", content: prompt }],
					model: "gpt-4o",
				});

				return {
					title: item.title,
					link: item.link,
					summary: response.choices[0].message.content,
					published: item.pubDate,
				};
			})
		);

		res.json(results);
	} catch (error) {
		console.error("Haber çekme hatası:", error);
		res.status(500).json({ error: "Haberler alınamadı" });
	}
});
*/

router.get("/", async (_req, res) => {
	try {
		const feed = await fetch(process.env.WEB_HOOK_URL || "");
		const data = await feed.json();
		console.log(data);
	} catch (error) {
		console.error("Haber çekme hatası:", error);
		res.status(500).json({ error: "Haberler alınamadı" });
	}
});
export default router;
