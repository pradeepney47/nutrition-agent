# Application/ Business Logic

from app.db.database import SessionLocal
from app.models.meal_plan import MealPlan

# Service
# def generate_meal_plan(calories: int, meals_per_day: int) -> dict:
#     calories_per_meal = calories // meals_per_day
#     return {
#         "calories": calories,
#         "meals_per_day": meals_per_day,
#         "calories_per_meal": calories_per_meal,
#         "message": "Meal plan request received"
#     }

# database
# saving values to meal plan table 
def create_meal_plan(calories: int, meals_per_day: int):
    # application/ business logic
    calories_per_meal = calories // meals_per_day

    with SessionLocal() as session:

        meal_plan = MealPlan(
            calories=calories,
            meals_per_day=meals_per_day,
            calories_per_meal=calories_per_meal
            )

        session.add(meal_plan)
        session.commit()

        return meal_plan