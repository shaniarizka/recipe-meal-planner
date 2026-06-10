import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/AuthContext";

function Favorites({
  recipes,
  favorites,
}) {
  const { currentUser } = useAuth();
  const favoriteRecipes =
    recipes.filter((recipe) =>
      favorites.some(
        (fav) =>
          fav.recipeId === recipe.id &&
          fav.userId === currentUser?.uid
      )
    );

  const totalFavorites =
    favoriteRecipes.length;

  return (
    <div className="home-container">
      <h1>Favorite Recipes</h1>

      <p>
        You have{" "}
        <strong>
          {totalFavorites}
        </strong>{" "}
        favorite recipes
      </p>

      {favoriteRecipes.length === 0 ? (
        <div className="empty-state">
          <h2>
            No Favorites Yet ❤️
          </h2>

          <p>
            Save recipes you love.
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Favorites;