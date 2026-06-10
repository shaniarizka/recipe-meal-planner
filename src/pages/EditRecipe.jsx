import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function EditRecipe({
  recipes,
  setRecipes,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(
    (item) => item.id === id
  );
  if (!recipe) {
    return <h1>Recipe Not Found</h1>;
  }

  const [title, setTitle] =
    useState(recipe.title);

  const [category, setCategory] =
    useState(recipe.category);

  const [ingredients, setIngredients] =
    useState(
      recipe.ingredients.join(", ")
    );

  const [steps, setSteps] = useState(recipe.steps);
  const [image, setImage] = useState(recipe.image);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(
        doc(db, "recipes", recipe.id),
        {
          title,
          category,
          ingredients: ingredients.split(","),
          steps,
          image,
        }
      );

      const updatedRecipes =
        recipes.map((item) => {
          if (item.id === recipe.id) {
            return {
              ...item,
              title,
              category,
              ingredients: ingredients.split(","),
              steps,
              image,
            };
          }

          return item;
        });
      setRecipes(updatedRecipes);
      navigate("/my-recipes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      <div className="web-header">
        <h1>Edit Recipe 🍳</h1>
        <p>Update your recipe details.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="edit-form-card"
      >
        <div className="input-field-web">
          <label>Recipe Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <div className="input-field-web">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Chicken">Chicken</option>
            <option value="Beef">Beef</option>
            <option value="Seafood">Seafood</option>
            <option value="Pasta">Pasta</option>
            <option value="Dessert">Dessert</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Side">Side</option>
          </select>
        </div>

        <div className="input-field-web">
          <label>Ingredients</label>

          <textarea
            value={ingredients}
            onChange={(e) =>
              setIngredients(e.target.value)
            }
          />
        </div>

        <div className="input-field-web">
          <label>Cooking Steps</label>

          <textarea
            value={steps}
            onChange={(e) =>
              setSteps(e.target.value)
            }
          />
        </div>

        <div className="input-field-web">
          <label>Image URL</label>

          <input
            type="text"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
          />
        </div>

        <div className="web-form-actions">
          <button
            type="button"
            className="btn-secondary-web"
            onClick={() =>
              navigate(-1)
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-primary-web"
          >
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRecipe;