import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new Pool({
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
	port: Number(process.env.PGPORT),
	ssl: {
		rejectUnauthorized: false, // SSL is required on Railway
	},
});

export default db;
