import { useState } from "react";

import { useNavigate } from "react-router-dom";

function AddRecipe({
  recipes,
  setRecipes,
}) {
  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [ingredients, setIngredients] =
    useState("");

  const [steps, setSteps] =
    useState("");

  const [image, setImage] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      id: Date.now(),

      title,

      category,

      ingredients:
        ingredients.split(","),

      steps,

      image,
    };

    setRecipes([...recipes, newRecipe]);

    navigate("/");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="form-container">
      <h1>Add Recipe</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
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
          <option value="">
            Select Category
          </option>

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
          placeholder="Ingredients (separate with comma)"
          value={ingredients}
          onChange={(e) =>
            setIngredients(e.target.value)
          }
          required
        />

        <textarea
          placeholder="Cooking Steps"
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
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;