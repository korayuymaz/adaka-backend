# Adaka Backend

AI-powered news summarizer backend built with Express.js, TypeScript, and MongoDB.

## Features

- Fetch news articles from OpenAI
- Store news articles in MongoDB
- RESTful API endpoints
- TypeScript support

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
# Server Configuration
PORT=4000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/adaka

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

3. Make sure MongoDB is running locally or update the `MONGODB_URI` to point to your MongoDB instance.

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### POST /api/news/fetch-and-save
Fetches news articles from OpenAI and saves them to MongoDB.

**Response:**
```json
{
  "message": "Inserted X new articles."
}
```

## Database Schema

The application uses MongoDB with the following schema for news articles:

```typescript
interface NewsArticle {
  title: string;
  description: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Technologies Used

- Express.js
- TypeScript
- MongoDB with Mongoose
- OpenAI API
- CORS 