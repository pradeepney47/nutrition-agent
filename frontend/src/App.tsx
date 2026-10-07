import './App.css'
import { useEffect, useState } from 'react'

function App() {
  
  const[calories, setCalories] = useState('')
  const[mealsPerDay, setMealsPerDay] = useState('')

  const [mealPlan, setMealPlan] = useState<{
    calories: number
    meals_per_day: number
    message: string
    calories_per_meal: number
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
          {/* <p>Calories: {mealPlan.calories}</p> */}
          {/* <p>Meals: {mealPlan.meals_per_day}</p> */}
          {/* <p>{mealPlan.message}</p> */}
          <p>Calories per Meal: {mealPlan.calories_per_meal}</p>
        </>
      )}


    </main>
  )
}

export default App
