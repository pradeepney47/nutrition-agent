import './App.css'
import { useEffect, useState } from 'react'

function App() {
  
  const[calories, setCalories] = useState('')
  const[mealsPerDay, setMealsPerDay] = useState('')

  // const [mealPlan, setMealPlan] = useState<{
  //   calories: number
  //   meals_per_day: number
  //   message: string
  //   calories_per_meal: number
  // } | null>(null)

    const [mealPlan, setMealPlan] = useState<{
    total_calories: number
    meals_per_day: number
    meals:{
      name: number
      calories: number
      ingredients: string[]
    }[]
  } | null>(null)



  // const [, setMessage] = useState("loading")

  useEffect(() => {
    // Send an HTTP request using GET to /
    // fetch() itself isn't synonymous with HTTP GET 
    // fetch() can send GET, POST, PUT, DELETE, etc.
    fetch('http://localhost:8001/')
      .then((response) => response.json())
      // .then((data) => setMessage(data.message))
      // .catch(() => setMessage('Failed to connect to API'))
  }, [])

  async function createMealPlan() {
    console.log('createMealPlan called')
    const response = await fetch(
      'http://localhost:8001/api/v1/meal-plans',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calories: Number(calories),
          meals_per_day: Number(mealsPerDay),
        }),
      },
    )

    const data = await response.json()
    console.log(data)
    console.log(typeof data)
    setMealPlan(data)
  }

  return (
    <main>
      <h1>Nutrition Agent</h1>
      <p>AI-powered Meal Planner </p>

      <input
      type="number"
      placeholder="Calories"
      value={calories}
      onChange={(event) => setCalories(event.target.value)}
      />

      <input
      type="number"
      placeholder="Meals per day"
      value={mealsPerDay}
      onChange={(event) => setMealsPerDay(event.target.value)}
      />

      <button onClick={createMealPlan}>
        Create Meal Plan
      </button>
      
      {mealPlan && (
    <>
      <p>Total Calories: {mealPlan.total_calories}</p>
      <p>Meals per Day: {mealPlan.meals_per_day}</p>

      {mealPlan.meals.map((meal) => (
        <div key={meal.name}>
          <h2>{meal.name}</h2>
          <p>Calories: {meal.calories}</p>

          <ul>
            {meal.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )}

    </main>
  )
}

export default App
