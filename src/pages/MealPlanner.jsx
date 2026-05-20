function MealPlanner({
  mealPlans,
}) {
  const currentUserId = 1;

  const myMealPlans = mealPlans.filter(
    (plan) =>
      plan.userId === currentUserId
  );

  return (
    <div className="home-container">
      <h1>Meal Planner</h1>

      {myMealPlans.length === 0 ? (
        <p>No meal plans yet.</p>
      ) : (
        <div className="meal-grid">
          {myMealPlans.map((plan) => (
            <div
              key={plan.id}
              className="meal-card"
            >
              <h3>{plan.recipeTitle}</h3>

              <p>
                <strong>Day:</strong>{" "}
                {plan.day}
              </p>

              <p>
                <strong>Meal:</strong>{" "}
                {plan.mealType}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MealPlanner;