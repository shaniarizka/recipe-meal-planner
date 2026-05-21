import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";

function MealPlanner({
  mealPlans,
  recipes,
  setMealPlans,
}) {
  const { currentUser } = useAuth();

  const currentUserId =
    currentUser?.id;

  const myMealPlans = mealPlans.filter(
    (plan) =>
      plan.userId === currentUserId
  );

  const recipesMap = {};

  recipes.forEach((recipe) => {
    recipesMap[recipe.id] = recipe;
  });

  const handleDeleteMeal = (id) => {
    const updatedMealPlans =
      mealPlans.filter(
        (plan) => plan.id !== id
      );

    setMealPlans(updatedMealPlans);
  };

  return (
    <div className="home-container">
      <h1>Weekly Meal Planner</h1>

      {myMealPlans.length === 0 ? (
        <div className="empty-state">
          <h2>No Meal Plans Yet</h2>

          <p>
            Add recipes to your weekly planner.
          </p>
        </div>
      ) : (
        <div className="meal-grid">
          {myMealPlans.map((plan) => {
            const recipe =
              recipesMap[plan.recipeId];

            return (
              <Link
                key={plan.id}
                to={`/recipe/${plan.recipeId}`}
                className="meal-link"
              >
                <div className="meal-card">
                  <img
                    src={recipe?.image}
                    alt={plan.recipeTitle}
                    className="meal-image"
                  />

                  <span className="meal-day">
                    {plan.day}
                  </span>

                  <h3>
                    {plan.recipeTitle}
                  </h3>

                  <p>{plan.mealType}</p>

                  <div className="meal-actions">

                    <Link
                      to={`/edit-meal/${plan.id}`}
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >
                      <button
                        className="edit-btn"
                      >
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        handleDeleteMeal(
                          plan.id
                        );
                      }}
                      className="delete-btn"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MealPlanner;