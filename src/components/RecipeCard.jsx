import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.title}
      />

      <div className="recipe-content">
        <span className="category-badge">
          {recipe.category}
        </span>

        <h3>{recipe.title}</h3>

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