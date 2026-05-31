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
  const handleDelete = async (id) => {
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

      {myRecipes.length === 0 ? (
        <div className="empty-state">
          <h2>No Recipes Yet</h2>

          <p>
            Start creating your favorite recipe.
          </p>
        </div>
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