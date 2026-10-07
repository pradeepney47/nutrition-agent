# Database and Session configuration

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# from app.db.base import Base
# from app.models.meal_plan import MealPlan

DATABASE_URL = "postgresql+psycopg://pradeep@localhost:5432/nutrition_agent"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

# Base.metadata.create_all(engine)