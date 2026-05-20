import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RecommendationSection from "../components/RecommendationSection";

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

      day: "Monday",

      mealType: "Dinner",
    };

    setMealPlans([...mealPlans, newPlan]);

    alert("Added to Meal Planner");
  };

  if (!recipe) {
    return <h1>Recipe Not Found</h1>;
  }

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

      <RecommendationSection
        recipes={recipes}
        currentRecipe={recipe}
      />
    </div>
  );
}

export default RecipeDetail;