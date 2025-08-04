import mongoose, { Schema, Document } from "mongoose";

export interface INewsArticle extends Document {
	title: string;
	description: string;
	source: string;
	createdAt: Date;
	updatedAt: Date;
}

const NewsArticleSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		source: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<INewsArticle>("NewsArticle", NewsArticleSchema);
