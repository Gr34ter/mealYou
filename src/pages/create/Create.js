import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

// styles && icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./Create.css";

const categoryStyles = {
  font_light: "#d1d1d1",
  font_neon: "#a8dadcff",
  font_pastel_pink: "#f0baff",
  font_pastel_blue: "#caddff",
};
const categories = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
  { value: "other", label: "Other" },
];

export default function Create() {
  const { user } = useAuthContext();
  const { addDocument } = useFirestore("meals");

  const [mealName, setMealName] = useState("");
  const [category, setCategory] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState("");
  const [formError, setFormError] = useState(null);

  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!category) {
        setFormError("Select meal category");
      } else {
        const doc = {
          mealName,
          category: category.label.toLowerCase(),
          startDate: new Date(),
          ingredients,
          createdBy: user.uid,
          prep: preparation,
          isPlanned: false,
          isFav: false,
          cookingTime,
        };
        addDocument(doc);
        navigate("/meals");
      }
    } catch (err) {
      console.log(err.message);
      setFormError(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }

    setNewIngredient("");
    ingredientInput.current.focus();
  };

  // SELECT colors functionality
  const customStyles = {
    control: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: "transparent",
        cursor: "pointer",
        border: isFocused
          ? "3px solid var(--text-color-light)"
          : "3px solid var(--text-color-light)",
        ":hover": {
          border: "3px solid var(--pastel-pink)",
        },
      };
    },
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: "transparent",
        color: categoryStyles.font_light,
        cursor: "pointer",
        ":hover": {
          color: categoryStyles.font_pastel_pink,
        },
      };
    },
    singleValue: (styles) => {
      return {
        ...styles,
        color: categoryStyles.font_pastel_pink,
        fontWeight: "bolder",
      };
    },
    menu: (styles) => {
      return { ...styles, backgroundColor: "var(--primary-color-dark)" };
    },
  };

  return (
    <div className="create-wrapper">
      <form className="meal-form-container" onSubmit={handleSubmit}>
        <h4 className="meal-form-header">Create your delicous meal !</h4>
        <div className="create-details-wrapper">
          <label className="meal-form-label">
            <span className="meal-form-label-text">Meal name:</span>
            <input
              required
              type="text"
              maxLength="20"
              onChange={(e) => setMealName(e.target.value)}
              value={mealName}
            />
          </label>
          <label className="meal-form-label">
            <span className="meal-form-label-text">Meal category:</span>
            {formError && <p className="error">{formError}</p>}
            <Select
              className="meal-form-label"
              required
              onChange={(option) => setCategory(option)}
              options={categories}
              styles={customStyles}
            />
          </label>
          <label className="cookingTime-label  meal-form-label">
            <span className="meal-form-label-text">
              Cooking time (minutes):
            </span>
            <input
              type="number"
              required
              min="10"
              step="1"
              max="666"
              placeholder=""
              onChange={(e) => setCookingTime(e.target.value)}
              options={categories}
            />
          </label>
        </div>
        <div className="create-ingredients-wrapper">
          <label className="meal-form-label">
            <span className="meal-form-label-text">Ingredients:</span>
            <div className="create-ingredients-container">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                ref={ingredientInput}
                className="ing-input"
                maxLength="20"
                pattern="[a-z][A-Z]"
              />
              <button className="add-ing-btn" onClick={handleAdd}>
                <AiOutlinePlusCircle />
              </button>
              <div className="ingredients-list">
                <p>
                  {ingredients.map((ingredient) => (
                    <em key={ingredient}>{ingredient}, </em>
                  ))}
                </p>
              </div>
            </div>
          </label>
        </div>
        <div className="create-prep-details">
          <label className="meal-form-label">
            <span className="meal-form-label-text">
              Notes and preparation (optional):
            </span>
            <textarea
              onChange={(e) => setPreparation(e.target.value)}
              value={preparation}
              className="prep-text"
            />
          </label>
        </div>
        <button className="submit-meal-btn"> Create ! </button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
