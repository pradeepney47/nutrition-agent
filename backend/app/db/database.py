from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+psycopg://pradeep@localhost:5432/nutrition_agent"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)