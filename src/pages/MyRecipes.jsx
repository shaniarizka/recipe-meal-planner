import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function MyRecipes({
  recipes,
  setRecipes,
}) {
  const { currentUser } = useAuth();

  const currentUserId =
  currentUser?.id;

  const myRecipes = recipes.filter(
    (recipe) =>
      recipe.userId === currentUserId
  );

  const handleDelete = (id) => {
    const updatedRecipes =
      recipes.filter(
        (recipe) => recipe.id !== id
      );

    setRecipes(updatedRecipes);
  };

  return (
    <div className="home-container">
      <h1>My Recipes</h1>

      {myRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="recipe-grid">
          {myRecipes.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCard recipe={recipe} />

              <button
                onClick={() =>
                  handleDelete(recipe.id)
                }
                className="delete-btn"
              >
                Delete
              </button>
              
              <Link to={`/edit-recipe/${recipe.id}`}>
                <button className="edit-btn">
                  Edit
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRecipes;