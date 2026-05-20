import RecipeCard from "./RecipeCard";

function RecommendationSection({
  recipes,
  currentRecipe,
}) {
  const recommendedRecipes = recipes.filter(
    (recipe) =>
      recipe.category ===
        currentRecipe.category &&
      recipe.id !== currentRecipe.id
  );

  if (recommendedRecipes.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Recommended Recipes</h2>

      <div className="recipe-grid">
        {recommendedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendationSection;