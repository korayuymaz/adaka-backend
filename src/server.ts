import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import newsRoute from "./routes/news";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoute);

app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});
