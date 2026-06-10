import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import MealPlanner from "./pages/MealPlanner";
import EditRecipe from "./pages/EditRecipe";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import EditMealPlan from "./pages/EditMealPlan";
import Favorites from "./pages/Favorites";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { fetchMeals } from "./service/mealApi";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    fetchRecipes();
    fetchFavorites();
    fetchMealPlans();
  }, []);
  const [loading, setLoading] = useState(true);
  const fetchRecipes = async () => {
    try {
      const firestoreSnapshot =
        await getDocs(
          collection(db, "recipes")
        );

      const firestoreRecipes =
        firestoreSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      const apiRecipes =
        await fetchMeals();

      setRecipes([
        ...firestoreRecipes,
        ...apiRecipes,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchMealPlans =
    async () => {
      try {
        const snapshot =
          await getDocs(
            collection(
              db,
              "mealPlans"
            )
          );

        const mealPlanData =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setMealPlans(
          mealPlanData
        );
      } catch (error) {
        console.log(error);
      }
    };
  const fetchFavorites = async () => {
    try {
      const snapshot =
        await getDocs(
          collection(db, "favorites")
        );

      const favoriteData =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setFavorites(favoriteData);
    } catch (error) {
      console.log(error);
    }
  };

if (loading) {
  return <h2>Loading...</h2>;
}
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
          <Home 
            recipes={recipes} 
            mealPlans={mealPlans}
            favorites={favorites}
          />}
        />

        <Route
          path="/recipe/:id"
          element={
            <RecipeDetail
              recipes={recipes}
              mealPlans={mealPlans}
              setMealPlans={setMealPlans}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />

        <Route
          path="/add-recipe"
          element={
            <ProtectedRoute>
              <AddRecipe
                recipes={recipes}
                setRecipes={setRecipes}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-recipes"
          element={
            <MyRecipes
              recipes={recipes}
              setRecipes={setRecipes}
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/meal-planner"
          element={<MealPlanner
            recipes={recipes}
            mealPlans={mealPlans}
            setMealPlans={setMealPlans}
          />}
        />

        <Route
          path="/edit-recipe/:id"
          element={
            <EditRecipe
              recipes={recipes}
              setRecipes={setRecipes}
            />
          }
        />

        <Route
          path="/edit-meal/:id"
          element={
            <ProtectedRoute>
              <EditMealPlan
                mealPlans={mealPlans}
                setMealPlans={setMealPlans}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              recipes={recipes}
              favorites={favorites}
            />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;