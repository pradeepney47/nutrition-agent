import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [mealPlan, setMealPlan] = useState<{
    calories: number
    meals_per_day: number
    message: string
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
    const response = await fetch(
      'http://localhost:8001/api/v1/meal-plans',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calories: 2002,
          meals_per_day: 3,
        }),
      },
    )

    const data = await response.json()
    console.log(data)
    // setMessage(data.message)
    setMealPlan(data)
  }

  return (
    <main>
      <h1>Nutrition Agent</h1>
      <p>AI-powered Meal Planner </p>

      <button onClick={createMealPlan}>
        Create Meal Plan
      </button>

      {/* <p>Calories: {data.calories}</p>
      <p>Meals: {data.meals_per_day}</p>
      <p>{data.message}</p> */}

      {/* <p>{message}</p> */}

      {mealPlan && (
        <>
          <p>Calories: {mealPlan.calories}</p>
          <p>Meals: {mealPlan.meals_per_day}</p>
          <p>{mealPlan.message}</p>
        </>
      )}



    </main>
  )
}

export default App
