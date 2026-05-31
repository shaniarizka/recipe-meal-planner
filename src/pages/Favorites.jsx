import RecipeCard from "../components/RecipeCard";

function Favorites({
  recipes,
  favorites,
}) {
  const favoriteRecipes =
    recipes.filter((recipe) =>
      favorites.some(
        (fav) => fav.recipeId === recipe.id
      )
    );

  return (
    <div className="home-container">
      <h1>Favorite Recipes</h1>

      <div className="recipe-grid">
        {favoriteRecipes.map(
          (recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Favorites;