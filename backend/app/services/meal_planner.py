# Application/ Business Logic
# Service

from app.db.database import SessionLocal
from app.models.meal_plan import MealPlan
from app.models.meal import Meal
from app.models.ingredient import Ingredient
from app.services.llm import generate_meal_plan


def create_meal_plan(calories: int, meals_per_day: int):
    # 1. Calculate the target calories per meal.
    calories_per_meal = calories // meals_per_day

    # 2. Generate a structured meal plan using Gemini.
    generated_plan = generate_meal_plan(
        calories=calories,
        meals_per_day=meals_per_day,
        calories_per_meal=calories_per_meal,
    )

    # 3. Convert the generated Pydantic objects into SQLAlchemy objects.
    db_meal_plan = MealPlan(
        total_calories=generated_plan.total_calories,
        meals_per_day=generated_plan.meals_per_day,
        meals=[
            Meal(
                name=generated_meal.name,
                calories=generated_meal.calories,
                ingredients=[
                    Ingredient(name=ingredient_name)
                    for ingredient_name in generated_meal.ingredients
                ],
            )
            for generated_meal in generated_plan.meals
        ],
    )

    # 4. Save the plan, its meals, and their ingredients.
    with SessionLocal() as session:
        session.add(db_meal_plan)
        session.commit()

        # 5. Return a JSON-friendly response containing database IDs.
        return {
            "id": db_meal_plan.id,
            "total_calories": db_meal_plan.total_calories,
            "meals_per_day": db_meal_plan.meals_per_day,
            "meals": [
                {
                    "id": meal.id,
                    "name": meal.name,
                    "calories": meal.calories,
                    "ingredients": [
                        {
                            "id": ingredient.id,
                            "name": ingredient.name,
                        }
                        for ingredient in meal.ingredients
                    ],
                }
                for meal in db_meal_plan.meals
            ],
        }