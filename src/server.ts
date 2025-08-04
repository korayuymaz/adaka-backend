import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import newsRoute from "./routes/news";
import connectDB from "./db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoute);

// Connect to MongoDB before starting the server
connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`🚀 Server running at http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Failed to connect to MongoDB:", error);
		process.exit(1);
	});
