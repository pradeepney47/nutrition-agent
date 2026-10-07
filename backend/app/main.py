# HTTP/ API Layer

# Fast API Endpoints
# Defining HTTP Endpoints 

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# from app.services.meal_planner import generate_meal_plan
from app.services.meal_planner import create_meal_plan

app = FastAPI()

class MealPlanRequest(BaseModel):
    calories: int
    meals_per_day: int

# Cross-Origin Resource Sharing (CORS) is a security system 
# built into web browsers that allows a server to permit or block 
# web pages from requesting resources from a different domain, protocol, or port


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# http://localhost:8000/
# HTTP endpoint GET /
# FastAPI, handle GET requests arriving at / with this Python function
@app.get("/")
def root():
    return {"message": "Nutrition Agent API is running"}

@app.post("/api/v1/meal-plans")
def create_meal_plan_endpoint(request: MealPlanRequest):
    # request is a Pydantic Model Object
    # print(request)

    # return create_meal_plan(
    #     calories=request.calories,
    #     meals_per_day=request.meals_per_day
    # )

    meal_plan = create_meal_plan(
        calories=request.calories,
        meals_per_day=request.meals_per_day
    )

    print(meal_plan)
    print(meal_plan.id)
    print(meal_plan.calories)
    print(meal_plan.meals_per_day)
    print(meal_plan.calories_per_meal)



    return {
        "id": meal_plan.id,
        "calories": meal_plan.calories,
        "meals_per_day": meal_plan.meals_per_day,
        "calories_per_meal": meal_plan.calories_per_meal 
    }