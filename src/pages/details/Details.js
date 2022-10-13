import { useDocument } from "../../hooks/useDocument"
import { useParams, useNavigate } from "react-router-dom"
import { MdDeleteForever } from "react-icons/md"
import { useFirestore } from "../../hooks/useFirestore"

// styles
import './Details.css'

export default function Details() {

  const navigate = useNavigate()
  const { id } = useParams()
  const { document: meal, error } = useDocument('meals', id)
  const { deleteDocument } = useFirestore('meals')

  const handleClick = () => {
    deleteDocument(id)
    navigate("/meals")

  }

  return (
    <div className="meal-details-wrapper">
      {meal && (
        <div className="meal-details-container">
          <h3>{meal.mealName}</h3>
          <div className="meal-info">
            <h4 className="meal-category">{meal.category}</h4>
            <h4 className="time-info">{`Cooking Time: ${meal.cookingTime} minutes`}</h4>
          </div>
          <div className="ing-prep-wrapper">
            <div className="ingredients-container">
              <h5>Ingredients:</h5>
              <div>
                {meal.ingredients.map((ing, i) => (
                  <p key={i}>{ing}</p>  
                ))}
              </div>
            </div>
            <div className="prep-container">
              <h5>Preparation:</h5>
              <div>
                {meal.prep}
              </div>
            </div>        
          </div>
          <div className="delete-container" onClick={handleClick}>
            <p>Delete</p>
            <MdDeleteForever className="delete-icon"/>
          </div>
        </div>
      )}
      {error && <div className="error">
        <p>Could not fetch details...</p>
      </div>}
    </div>
  )
}
