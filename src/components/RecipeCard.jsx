import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />

      <div className="recipe-content">
        <h3>{recipe.title}</h3>

        <p>{recipe.category}</p>

        <Link to={`/recipe/${recipe.id}`}>
          <button>View Detail</button>
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;