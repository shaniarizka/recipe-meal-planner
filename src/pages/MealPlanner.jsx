import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function MealPlanner({
  mealPlans,
  recipes,
  setMealPlans,
}) {
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;
  const myMealPlans = mealPlans.filter(
    (plan) =>
      plan.userId === currentUserId
  );
  const recipesMap = {};
  recipes.forEach((recipe) => {
    recipesMap[recipe.id] = recipe;
  });
  const handleDeleteMeal = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this meal plan?"
      );
    if (!confirmDelete) return;
    try {
      await deleteDoc(
        doc(
          db,
          "mealPlans",
          id
        )
      );
      setMealPlans(
        mealPlans.filter(
          (plan) =>
            plan.id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="home-container">
      <h1>Weekly Meal Planner</h1>

      {myMealPlans.length === 0 ? (
        <div className="empty-state">
          <h1>🍽️</h1>
          <h2>No Meal Plans Yet</h2>

          <p>
            Add recipes to your weekly planner.
          </p>
        </div>
      ) : (
        <div className="weekly-planner">
          {days.map((day) => {
            const dayPlans =
              myMealPlans.filter(
                (plan) => plan.day === day
              );

            return (
              <div
                key={day}
                className="planner-day"
              >
                <h2>{day}</h2>

                {dayPlans.length === 0 ? (
                  <p>No meals planned</p>
                ) : (
                  dayPlans.map((plan) => {
                    const recipe =
                      recipesMap[plan.recipeId];

                    return (
                      <div
                        key={plan.id}
                        className="meal-card"
                      >
                        <Link
                          to={`/recipe/${plan.recipeId}`}
                          className="meal-link"
                        >
                          <img
                            src={recipe?.image}
                            alt={plan.recipeTitle}
                            className="meal-image"
                          />
                          <h3>{plan.recipeTitle}</h3>
                          <p className="meal-type">
                            🍽️ {plan.mealType}
                          </p>
                        </Link>

                        <div className="meal-actions">
                          <Link
                            to={`/edit-meal/${plan.id}`}
                          >
                            <button className="edit-btn">
                              Edit
                            </button>
                          </Link>

                          <button
                            className="delete-meal-btn"
                            onClick={() =>
                              handleDeleteMeal(plan.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MealPlanner;