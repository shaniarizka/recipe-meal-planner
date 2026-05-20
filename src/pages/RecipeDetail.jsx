import { useParams } from "react-router-dom";

import dummyRecipes from "../data/dummyRecipes";

import RecommendationSection from "../components/RecommendationSection";

function RecipeDetail() {
  const { id } = useParams();

  const recipe = dummyRecipes.find(
    (item) => item.id === Number(id)
  );

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

      <RecommendationSection
        recipes={dummyRecipes}
        currentRecipe={recipe}
      />
    </div>
  );
}

export default RecipeDetail;