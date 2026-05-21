import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import MealPlanner from "./pages/MealPlanner";
import dummyRecipes from "./data/dummyRecipes";
import EditRecipe from "./pages/EditRecipe";

function App() {
  const [recipes, setRecipes] =
    useState(dummyRecipes);

  const [mealPlans, setMealPlans] =
  useState([]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home recipes={recipes} />}
        />

        <Route
          path="/recipe/:id"
          element={
            <RecipeDetail
              recipes={recipes}
              mealPlans={mealPlans}
              setMealPlans={setMealPlans}
            />
          }
        />

        <Route
          path="/add-recipe"
          element={
            <AddRecipe
              recipes={recipes}
              setRecipes={setRecipes}
            />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;