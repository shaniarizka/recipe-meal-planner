import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function EditMealPlan({
  mealPlans,
  setMealPlans,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = mealPlans.find(
    (item) => item.id === id
  );
  if (!plan) {
    return <h1>Meal Plan Not Found</h1>;
  }
  const [day, setDay] = useState(
    plan.day
  );
  const [mealType, setMealType] =
    useState(plan.mealType);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(
        doc(
          db,
          "mealPlans",
          plan.id
        ),
        {
          day,
          mealType,
        }
      );
      const updatedMealPlans =
        mealPlans.map((item) => {
          if (item.id === plan.id) {
            return {
              ...item,
              day,
              mealType,
            };
          }
          return item;
        });
      setMealPlans(
        updatedMealPlans
      );
      navigate(
        "/meal-planner"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-meal-wrapper">

      <div className="edit-meal-hero">
        <div>
          <span className="brand-tag">
            RECIPE PLANNER
          </span>

          <h1>Edit Meal Plan 🍽️</h1>

          <p>
            Update your schedule and keep your
            weekly meals organized.
          </p>
        </div>
      </div>

      <div className="edit-meal-card">

        <form onSubmit={handleSubmit}>

          <div className="input-field-web">
            <label>Select Day</label>

            <select
              value={day}
              onChange={(e) =>
                setDay(e.target.value)
              }
            >
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>

          <div className="input-field-web">
            <label>Meal Type</label>

            <select
              value={mealType}
              onChange={(e) =>
                setMealType(e.target.value)
              }
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary-web"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditMealPlan;