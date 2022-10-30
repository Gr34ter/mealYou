import { useDocument } from "../../hooks/useDocument";
import { useParams, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./Details.css";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { document: meal, error } = useDocument("meals", id);
  const { deleteDocument } = useFirestore("meals");

  const handleClick = () => {
    deleteDocument(id);
    navigate("/meals");
  };

  return (
    <div className="meal-details-wrapper">
      {meal && (
        <div className="meal-details-container">
          <h3 className="meal-details-meal-name">{meal.mealName}</h3>
          <div className="meal-info">
            <h4 className="meal-category">{meal.category}</h4>
            <h4 className="time-info">{`Cooking Time: ${meal.cookingTime} minutes`}</h4>
          </div>
          <div className="ing-prep-wrapper">
            <div className="ingredients-container">
              <h5 className="ingredients-container-header">Ingredients:</h5>
              <div className="ingredient-area">
                {meal.ingredients.map((ing, i) => (
                  <p key={i} className="ingredients-item">
                    {ing}
                  </p>
                ))}
              </div>
            </div>
            <div className="prep-container">
              <h5 className="prep-container-header">Preparation:</h5>
              <p className="meal-prep">{meal.prep}</p>
            </div>
          </div>
          <div className="delete-container" onClick={handleClick}>
            <p>Delete</p>
            <MdDeleteForever className="delete-icon" />
          </div>
        </div>
      )}
      {error && (
        <div className="error">
          <p>Could not fetch details...</p>
        </div>
      )}
    </div>
  );
}
