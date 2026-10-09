# ORM model for ingredients table
# table 3

from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models import Meal

class Ingredient(Base):
    __tablename__ = "ingredients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    meal_id: Mapped[int] = mapped_column(
        ForeignKey("meals.id"),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(String, nullable=False)

    meal: Mapped["Meal"] = relationship(
        back_populates="ingredients",
    )