import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

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

  const [steps, setSteps] =
    useState(recipe.steps);

  const [image, setImage] =
    useState(recipe.image);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedRecipes = recipes.map(
      (item) => {
        if (item.id === recipe.id) {
          return {
            ...item,

            title,

            category,

            ingredients:
              ingredients.split(","),

            steps,

            image,
          };
        }

        return item;
      }
    );

    setRecipes(updatedRecipes);

    navigate("/my-recipes");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Recipe</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          required
        >
          <option value="Makanan Berat">
            Makanan Berat
          </option>

          <option value="Cemilan">
            Cemilan
          </option>

          <option value="Kue">
            Kue
          </option>

          <option value="Minuman">
            Minuman
          </option>
        </select>

        <input
          type="text"
          value={ingredients}
          onChange={(e) =>
            setIngredients(e.target.value)
          }
          required
        />

        <textarea
          value={steps}
          onChange={(e) =>
            setSteps(e.target.value)
          }
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        <button type="submit">
          Update Recipe
        </button>
      </form>
    </div>
  );
}

export default EditRecipe;