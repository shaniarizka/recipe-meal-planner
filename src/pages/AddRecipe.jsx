import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function AddRecipe({ recipes, setRecipes }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // ✅ ganti file → URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login first");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "recipes"), {
        userId: currentUser.uid,
        title,
        category,
        ingredients: ingredients.split(",").map(i => i.trim()),
        steps,
        image: imageUrl, // ✅ langsung pakai URL
        createdAt: new Date().toISOString(),
      });

      const newRecipe = {
        id: docRef.id,
        userId: currentUser.uid,
        title,
        category,
        ingredients: ingredients.split(",").map(i => i.trim()),
        steps,
        image: imageUrl,
      };

      setRecipes([...recipes, newRecipe]);

      alert("Recipe Published!");
      navigate("/my-recipes");

    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to save recipe");
    }
  };

  return (
    <div className="home-container">
      <div className="web-header">
        <h1>Add New Recipe 🍳</h1>
        <p>Fill in the details to share your dish with the community.</p>
      </div>

      <form onSubmit={handleSubmit} className="add-recipe-grid-form">

        <div className="form-column-left">

          <div className="input-field-web">
            <label>Recipe Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="input-field-web">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
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
            <label>Ingredients (comma separated)</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>

          {/* ✅ FIX: IMAGE URL INPUT */}
          <div className="input-field-web">
            <label>Recipe Image URL</label>
            <input
              type="text"
              placeholder="Paste image link (https://...)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

        </div>

        <div className="form-column-right">

          <div className="input-field-web h-full">
            <label>Cooking Steps</label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              required
            />
          </div>

          <div className="web-form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary-web"
            >
              Discard
            </button>

            <button type="submit" className="btn-primary-web">
              Publish Recipe
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}

export default AddRecipe;