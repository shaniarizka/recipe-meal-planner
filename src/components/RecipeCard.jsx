import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img
        src={
          recipe.image ||
          "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt={recipe.title}
      />
      <div className="recipe-source">
        {recipe.source === "api"
          ? "🌍 API"
          : "👤 User"}
      </div>
      <div className="recipe-content">
        <span className="category-badge">
          {recipe.category}
        </span>
        <h3>{recipe.title}</h3>
        {recipe.source === "user" && (
          <span className="recipe-badge">
            👤 My Recipe
          </span>
        )}
        <p className="recipe-meta">
          📂 {recipe.category} • 🥘 {recipe.ingredients?.length || 0} Ingredients
        </p>
        <Link to={`/recipe/${recipe.id}`}>
          <button>
            View Detail
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;