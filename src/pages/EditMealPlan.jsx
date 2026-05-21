import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

function EditMealPlan({
  mealPlans,
  setMealPlans,
}) {
  const { id } = useParams();

  const navigate = useNavigate();

  const plan = mealPlans.find(
    (item) => item.id === Number(id)
  );

  if (!plan) {
    return <h1>Meal Plan Not Found</h1>;
  }

  const [day, setDay] = useState(
    plan.day
  );

  const [mealType, setMealType] =
    useState(plan.mealType);

  const handleSubmit = (e) => {
    e.preventDefault();

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

    setMealPlans(updatedMealPlans);

    navigate("/meal-planner");
  };

  return (
    <div className="form-container">
      <h1>Edit Meal Plan</h1>

      <form onSubmit={handleSubmit}>

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

        <button type="submit">
          Update Meal Plan
        </button>

      </form>
    </div>
  );
}

export default EditMealPlan;