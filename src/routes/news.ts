import { Router, Request, Response } from "express";
import { fetchNewsFromOpenAI } from "../services/fetchNews";
import db from "../db"; // PostgreSQL connection

const router = Router();

/**
 * POST /api/news/fetch-and-save
 * Fetches news from OpenAI and saves it to PostgreSQL
 */
router.post("/fetch-and-save", async (req: Request, res: Response) => {
	try {
		const news = await fetchNewsFromOpenAI();

		let inserted = 0;

		for (const item of news) {
			const result = await db.query(
				`INSERT INTO news_articles (title, description, source)
         VALUES ($1, $2, $3)
         ON CONFLICT (source) DO NOTHING`, // same source should not be inserted again
				[item.title, item.description, item.source]
			);

			if (result.rowCount && result.rowCount > 0) inserted++;
		}

		res.status(200).json({ message: `Inserted ${inserted} new articles.` });
	} catch (error) {
		console.error("❌ Failed to fetch and save news:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export default router;
