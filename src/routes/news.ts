import { Router, Request, Response } from "express";
import { fetchNewsFromOpenAI } from "../services/fetchNews";
import NewsArticle from "../models/NewsArticle";

const router = Router();

/**
 * POST /api/news/fetch-and-save
 * Fetches news from OpenAI and saves it to MongoDB
 */
router.post("/fetch-and-save", async (req: Request, res: Response) => {
	try {
		const news = await fetchNewsFromOpenAI();

		let inserted = 0;

		for (const item of news) {
			try {
				// Use findOneAndUpdate with upsert to handle duplicates
				const result = await NewsArticle.findOneAndUpdate(
					{ source: item.source },
					{
						title: item.title,
						description: item.description,
						source: item.source,
					},
					{
						upsert: true,
						new: true,
						setDefaultsOnInsert: true,
					}
				);

				// If the document was newly created (not updated), increment counter
				if (
					result.createdAt &&
					result.updatedAt &&
					result.createdAt.getTime() === result.updatedAt.getTime()
				) {
					inserted++;
				}
			} catch (error) {
				console.error("Error inserting article:", error);
				// Continue with other articles even if one fails
			}
		}

		res.status(200).json({ message: `Inserted ${inserted} new articles.` });
	} catch (error) {
		console.error("❌ Failed to fetch and save news:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/", async (req: Request, res: Response) => {
	const news = await NewsArticle.find();
	news.forEach((article) => {
		article.id = article.id.toString();
	});
	res.status(200).json(news);
});

export default router;
