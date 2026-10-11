# Nutrition Agent

Nutrition Agent is a full-stack AI-powered meal planning application. It allows users to specify a daily calorie target and a preferred number of meals, then generates a structured meal plan using Google's Gemini API.

This project is being developed incrementally, with an emphasis on understanding full-stack development, AI integration, relational database design, and software engineering fundamentals.

## Current Features

- Accepts a daily calorie target and number of meals.
- Generates structured meal plans using Gemini.
- Displays meals, calorie values, and ingredients in a React interface.
- Persists meal plans, meals, and ingredients in PostgreSQL.
- Uses SQLAlchemy to model database tables and relationships.
- Exposes a REST API through FastAPI.

## Technology Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS

**Backend**
- Python
- FastAPI
- Pydantic
- SQLAlchemy

**Database**
- PostgreSQL
- Psycopg

**AI**
- Google Gemini API

## Architecture

The application follows a frontend-backend architecture.

1. The user enters meal-planning preferences in the React frontend.
2. React sends a JSON request to the FastAPI backend.
3. The backend calculates the target calories per meal and requests a structured plan from Gemini.
4. The application converts the generated plan into SQLAlchemy model objects.
5. SQLAlchemy persists the meal plan, meals, and ingredients in PostgreSQL.
6. The backend returns the saved plan to React for display.

## Database Structure

The database currently contains three related tables:

- `meal_plans`: stores the overall meal plan.
- `meals`: stores individual meals belonging to a plan.
- `ingredients`: stores ingredients belonging to individual meals.

Each meal references its parent meal plan, and each ingredient references its parent meal.

## Local Development

### Prerequisites

- Python
- Node.js and npm
- PostgreSQL
- A Google Gemini API key

### Backend

From the repository root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install "fastapi[standard]" sqlalchemy psycopg google-genai python-dotenv
```

Configure the required environment variables using the project's environment configuration, then start the API:

```bash
uvicorn app.main:app --reload --port 8001
```

The API documentation is available at:

`http://localhost:8001/docs`

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server runs at:

`http://localhost:5173`

### Environment Variables

Keep API keys and other secrets in a local `.env` file. Never commit secrets to Git.

Refer to `.env.example` for the required variable names.

## Project Status

The initial end-to-end meal generation and database persistence flow is implemented.

Planned development includes:

- Firebase Authentication
- User-specific meal-plan ownership and authorization
- Improved input validation and error handling
- Automated testing
- Deployment and production-readiness improvements
- Retrieval-augmented generation and more advanced AI-agent capabilities

## Disclaimer

Generated meal plans are informational and should not be treated as medical advice or a substitute for individualized advice from a qualified healthcare professional.