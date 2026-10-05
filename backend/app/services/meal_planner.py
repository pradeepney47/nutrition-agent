# Application/ Business Logic

# Service

def generate_meal_plan(calories: int, meals_per_day: int) -> dict:
    calories_per_meal = calories // meals_per_day
    return {
        "calories": calories,
        "meals_per_day": meals_per_day,
        "calories_per_meal": calories_per_meal,
        "message": "Meal plan request received"
    }
