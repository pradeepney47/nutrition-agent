import os

from dotenv import load_dotenv
from google import genai

from pydantic import BaseModel

load_dotenv()

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

class MealRequestLlm(BaseModel):
    name: str
    calories: int
    ingredients: list[str]

class MealPlanRequestLlm(BaseModel):
    total_calories: int
    meals_per_day: int
    meals: list[MealRequestLlm]

def generate_meal_plan(
        calories: int, 
        meals_per_day: int, 
        calories_per_meal: int,
        ):
    
    prompt = f""" 
    
    Create a healthy meal plan. 
    
    Requirements:

    - Total daily calories: {calories} 
    - Number of meals per day: {meals_per_day} 
    - Target calories per meal: approximately {calories_per_meal}

    Create exactly {meals_per_day} meals.
    Each meal should be approximately {calories_per_meal} calories.
    
    """

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": MealPlanRequestLlm,
        },
    )
    # return response.text
    return response.parsed


# if __name__ == "__main__":
#     # print(generate_test_response())
#     meal = generate_test_response()
#     print(meal)
#     print(type(meal))