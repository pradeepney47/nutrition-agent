# ORM model for meal_plans table
# table 1
from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models import Meal


class MealPlan(Base):
    __tablename__ = "meal_plans"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    total_calories: Mapped[int] = mapped_column(Integer, nullable=False)
    meals_per_day: Mapped[int] = mapped_column(Integer, nullable=False)
    meals: Mapped[list["Meal"]] = relationship(back_populates="meal_plan", cascade="all, delete-orphan")

    # calories_per_meal: Mapped[int] = mapped_column(Integer, nullable=False)