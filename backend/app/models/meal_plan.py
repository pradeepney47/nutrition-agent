from sqlalchemy import Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class MealPlan(Base):
    __tablename__ = "meal_plans"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    calories: Mapped[int] = mapped_column(Integer, nullable=False)
    meals_per_day: Mapped[int] = mapped_column(Integer, nullable=False)