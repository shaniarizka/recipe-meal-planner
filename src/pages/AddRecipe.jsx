import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function AddRecipe({
  recipes,
  setRecipes,
}) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login first");
      return;
    }
    try {
      const docRef = await addDoc(
        collection(db, "recipes"),
        {
          userId: currentUser.uid,
          title,
          category,
          ingredients:
            ingredients.split(","),
          steps,
          image,
          createdAt:
            new Date().toISOString(),
        }
      );

      const newRecipe = {
        id: docRef.id,
        userId: currentUser.uid,
        title,
        category,
        ingredients:
          ingredients.split(","),
        steps,
        image,
      };

      setRecipes([
        ...recipes,
        newRecipe,
      ]);

      alert("Recipe Added");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert(
        "Failed to add recipe"
      );
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

          <option value="Breakfast">
            Breakfast
          </option>

          <option value="Chicken">
            Chicken
          </option>

          <option value="Beef">
            Beef
          </option>

          <option value="Seafood">
            Seafood
          </option>

          <option value="Pasta">
            Pasta
          </option>

          <option value="Dessert">
            Dessert
          </option>

          <option value="Vegetarian">
            Vegetarian
          </option>

          <option value="Side">
            Side
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
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <button type="submit">
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;