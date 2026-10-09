# Application/ Business Logic
# Service

from app.db.database import SessionLocal
from app.models.meal_plan import MealPlan
from app.services.llm import generate_meal_plan


def create_meal_plan(calories: int, meals_per_day: int):
    
    # application/ business logic
    calories_per_meal = calories // meals_per_day

    meal_plan = generate_meal_plan(
        calories=calories,
        meals_per_day=meals_per_day,
        calories_per_meal=calories_per_meal,
    )
    

    # PSQL database operation
    # saving values to meal plan table 

    # with SessionLocal() as session:

    #     meal_plan = MealPlan(
    #         calories=calories,
    #         meals_per_day=meals_per_day,
    #         calories_per_meal=calories_per_meal
    #         )

    #     session.add(meal_plan)
    #     session.commit()

    #     return meal_plan

    return meal_plan