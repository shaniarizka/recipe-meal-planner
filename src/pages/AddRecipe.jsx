import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Storage functions
import { db, storage } from "../firebase/firebase"; // Import storage yang sudah diexport

function AddRecipe({ recipes, setRecipes }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [imageFile, setImageFile] = useState(null); // State untuk file gambar
  const [uploading, setUploading] = useState(false); // State loading saat upload

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Please login first");
    if (!imageFile) return alert("Please select an image first");

    setUploading(true); // Mulai loading

    try {
      // 1. PROSES UPLOAD KE FIREBASE STORAGE
      const storageRef = ref(storage, `recipes/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef); // Ambil link hasil upload

      // 2. SIMPAN DATA KE FIRESTORE (Gunakan imageUrl hasil upload)
      const docRef = await addDoc(collection(db, "recipes"), {
        userId: currentUser.uid,
        title,
        category,
        ingredients: ingredients.split(","),
        steps,
        image: imageUrl,
        source: "user",
        createdAt: new Date().toISOString(),
      });

      const newRecipe = {
        id: docRef.id,
        userId: currentUser.uid,
        title,
        category,
        ingredients: ingredients.split(","),
        steps,
        image: imageUrl,
        source: "user",
      };

      setRecipes([...recipes, newRecipe]);
      alert("Recipe Published!");
      navigate("/my-recipes");
    } catch (error) {
      console.error(error);
      alert("Failed to upload image or save recipe");
    } finally {
      setUploading(false); // Selesai loading
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
            <input type="text" placeholder="e.g. Special Fried Rice" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="input-field-web">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
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
            <label>Ingredients (separate with comma)</label>
            <textarea className="small-textarea" placeholder="Garlic, Onion, Salt, Rice..." value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
          </div>

          {/* INPUT FILE GAMBAR BARU */}
          <div className="input-field-web">
            <label>Recipe Image (Upload File)</label>
            <div className="file-upload-wrapper">
                <input 
                   type="file" 
                   accept="image/*" 
                   onChange={(e) => setImageFile(e.target.files[0])} 
                   required
                />
                {imageFile && <p className="file-name">Selected: {imageFile.name}</p>}
            </div>
          </div>
        </div>

        <div className="form-column-right">
          <div className="input-field-web h-full">
            <label>Cooking Steps</label>
            <textarea className="large-textarea" placeholder="1. Heat the oil... 2. Fry the garlic..." value={steps} onChange={(e) => setSteps(e.target.value)} required />
          </div>
          
          <div className="web-form-actions">
            <button type="button" className="btn-secondary-web" onClick={() => navigate(-1)} disabled={uploading}>Discard</button>
            <button type="submit" className="btn-primary-web" disabled={uploading}>
              {uploading ? "Uploading..." : "Publish Recipe"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;