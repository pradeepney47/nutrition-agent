# ORM model for meals table
# table 2

from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models import MealPlan
    from app.models import Ingredient

class Meal(Base):
    __tablename__ = "meals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    meal_plan_id: Mapped[int] = mapped_column(
        ForeignKey("meal_plans.id"),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(String, nullable=False)
    
    calories: Mapped[int] = mapped_column(Integer, nullable=False)

    meal_plan: Mapped["MealPlan"] = relationship(
        back_populates="meals",
    )

    ingredients: Mapped[list["Ingredient"]] = relationship(
        back_populates="meal",
        cascade="all, delete-orphan",
    )