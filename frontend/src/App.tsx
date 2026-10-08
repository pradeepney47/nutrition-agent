import { useState } from 'react'

function App() {
  const [calories, setCalories] = useState('')
  const [mealsPerDay, setMealsPerDay] = useState('')
  const [loading, setLoading] = useState(false)

  const [mealPlan, setMealPlan] = useState<{
    total_calories: number
    meals_per_day: number
    meals: {
      name: string
      calories: number
      ingredients: string[]
    }[]
  } | null>(null)

  async function createMealPlan() {
    setLoading(true)

    try {
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

      setMealPlan(data)
    } catch (error) {
      console.error('Failed to create meal plan:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            AI Nutrition Planner
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Nutrition Agent
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Generate a personalized meal plan using your daily calorie target
            and preferred number of meals
          </p>
        </header>

        {/* Input Card */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Your daily target
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell us how many calories and meals you want in your day
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {/* Calories */}
            <div>
              <label
                htmlFor="calories"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Daily calories
              </label>

              <input
                id="calories"
                type="number"
                min="1"
                placeholder="e.g. 2500"
                value={calories}
                onChange={(event) => setCalories(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Meals per day */}
            <div>
              <label
                htmlFor="mealsPerDay"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Meals per day
              </label>

              <input
                id="mealsPerDay"
                type="number"
                min="1"
                max="10"
                placeholder="e.g. 4"
                value={mealsPerDay}
                onChange={(event) => setMealsPerDay(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <button
            onClick={createMealPlan}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Generating your meal plan...' : 'Generate Meal Plan'}
          </button>
        </section>

        {/* Meal Plan Results */}
        {mealPlan && (
          <section className="mt-10">

            {/* Results heading */}
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Your meal plan
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                A plan built around your goals
              </h2>
            </div>

            {/* Summary Cards */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">
                  Daily target
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {mealPlan.total_calories}
                </p>

                <p className="text-sm text-slate-500">
                  calories
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">
                  Meals
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {mealPlan.meals_per_day}
                </p>

                <p className="text-sm text-slate-500">
                  per day
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">
                  Average per meal
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {Math.round(
                    mealPlan.total_calories /
                      mealPlan.meals_per_day,
                  )}
                </p>

                <p className="text-sm text-slate-500">
                  calories
                </p>
              </div>

            </div>

            {/* Meal Cards */}
            <div className="grid gap-6 md:grid-cols-2">

              {mealPlan.meals.map((meal, index) => (
                <article
                  key={`${meal.name}-${index}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Card top accent */}
                  <div className="h-1" />

                  <div className="p-6">

                    {/* Meal header */}
                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <p className="text-sm font-semibold text-blue-600">
                          Meal {index + 1}
                        </p>

                        <h3 className="mt-1 text-xl font-bold leading-tight text-slate-900">
                          {meal.name}
                        </h3>
                      </div>

                      {/* Calories badge */}
                      <div className="shrink-0 rounded-xl bg-slate-100 px-3 py-2 text-center">
                        <p className="text-lg font-bold text-slate-900">
                          {meal.calories}
                        </p>

                        <p className="text-xs text-slate-500">
                          kcal
                        </p>
                      </div>

                    </div>

                    {/* Calorie indicator */}
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{
                          width: `${Math.min(
                            (meal.calories /
                              (mealPlan.total_calories /
                                mealPlan.meals_per_day)) *
                              100,
                            100,
                          )}%`,
                        }}
                      />
                    </div>

                    {/* Ingredients */}
                    <div className="mt-6">

                      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Ingredients
                      </h4>

                      <ul className="space-y-2">

                        {meal.ingredients.map((ingredient) => (
                          <li
                            key={ingredient}
                            className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />

                            <span>
                              {ingredient}
                            </span>
                          </li>
                        ))}

                      </ul>

                    </div>

                  </div>

                </article>
              ))}

            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-slate-400">
              Meal Plans are Generated by Google Gemini AI
            </div>

          </section>
        )}

      </div>
    </main>
  )
}

export default App