import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function MyRecipes({
  recipes,
  setRecipes,
}) {
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;
  const myRecipes = recipes.filter(
    (recipe) =>
      recipe.userId === currentUserId
  );
  const totalMyRecipes = myRecipes.length;
  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this recipe?"
      );

    if (!confirmDelete) {
      return;
    }
    try {
      await deleteDoc(doc(db, "recipes", id));
      setRecipes(
        recipes.filter((r) => r.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      <h1>My Recipes</h1>
      <Link
        to="/add-recipe"
        className="add-recipe-btn"
      >
        + Add New Recipe
      </Link>
      <div className="my-recipes-info">
        <p>
          Total Recipes:
          {" "}
          <strong>
            {totalMyRecipes}
          </strong>
        </p>
      </div>
      {myRecipes.length === 0 ? (
        <div className="empty-state">
          <h2>No Recipes Yet 🍳</h2>

          <p>
             Start by adding your first recipe.
          </p>
        </div>
      ) : (
        <div className="recipe-grid">
          {myRecipes.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCard recipe={recipe} />
              <div className="recipe-actions">

                <Link
                  to={`/edit-recipe/${recipe.id}`}
                >
                  <button>
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() =>
                    handleDelete(recipe.id)
                  }
                  className="delete-btn"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRecipes;