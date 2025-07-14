import { Router, Request, Response } from "express";
import { fetchNewsFromOpenAI } from "../services/fetchNews";

const router = Router();

/**
 * GET /api/news/fetch
 * Fetches latest news from OpenAI and returns it as JSON.
 */
router.get("/fetch", async (req: Request, res: Response) => {
	try {
		const news = await fetchNewsFromOpenAI();

		if (!news || news.length === 0) {
			return res.status(204).json({ message: "No news found." });
		}

		res.status(200).json(news);
	} catch (error) {
		console.error("❌ Error in /api/news/fetch:", error);
		res.status(500).json({ message: "Failed to fetch news." });
	}
});

export default router;
