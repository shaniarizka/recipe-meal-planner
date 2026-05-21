import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RecommendationSection from "../components/RecommendationSection";
import { useState } from "react";

function RecipeDetail({
  recipes,
  mealPlans,
  setMealPlans,
}) {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const recipe = recipes.find(
    (item) => item.id === Number(id)
  );

  const handleAddToMealPlanner = () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    const newPlan = {
      id: Date.now(),
      userId: currentUser.id,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      day: selectedDay,
      mealType: mealType,
    };

    setMealPlans([...mealPlans, newPlan]);

    alert("Added to Meal Planner");
  };

  if (!recipe) {
    return <h1>Recipe Not Found</h1>;
  }

  const [selectedDay, setSelectedDay] =
  useState("Monday");

  const [mealType, setMealType] =
    useState("Breakfast");

  return (
    <div className="detail-container">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="detail-image"
      />

      <h1>{recipe.title}</h1>

      <p>
        <strong>Category:</strong>{" "}
        {recipe.category}
      </p>

      <h2>Ingredients</h2>

      <ul>
        {recipe.ingredients.map(
          (ingredient, index) => (
            <li key={index}>
              {ingredient}
            </li>
          )
        )}
      </ul>

      <h2>Steps</h2>

      <p>{recipe.steps}</p>

      <button
        onClick={handleAddToMealPlanner}
        className="planner-btn"
      >
        Add to Meal Planner
      </button>

      <div className="planner-options">

        <select
          value={selectedDay}
          onChange={(e) =>
            setSelectedDay(e.target.value)
          }
        >
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>

        <select
          value={mealType}
          onChange={(e) =>
            setMealType(e.target.value)
          }
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>

      </div>

      <RecommendationSection
        recipes={recipes}
        currentRecipe={recipe}
      />
    </div>
  );
}

export default RecipeDetail;