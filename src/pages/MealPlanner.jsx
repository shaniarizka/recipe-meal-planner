import { useAuth } from "../context/AuthContext";

function MealPlanner({
  mealPlans,
}) {
  const { currentUser } = useAuth();

  const currentUserId =
    currentUser?.id;

  const myMealPlans = mealPlans.filter(
    (plan) =>
      plan.userId === currentUserId
  );

  return (
    <div className="home-container">
      <h1>Weekly Meal Planner</h1>

      {myMealPlans.length === 0 ? (
        <p>No meal plans yet.</p>
      ) : (
        <div className="meal-grid">
          {myMealPlans.map((plan) => (
            <div
              key={plan.id}
              className="meal-card"
            >
              <span className="meal-day">
                {plan.day}
              </span>

              <h3>
                {plan.recipeTitle}
              </h3>

              <p>{plan.mealType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MealPlanner;