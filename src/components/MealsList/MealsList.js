import MealCard from '../../components/MealCard/MealCard'

// styles
import './MealsList.css'

export default function MealsList ({ documents, isInPlanner }) {

    documents.forEach(doc => {
      console.log(doc.mealName, doc.category);
    });

    return (
        <div className='meals-list'>
        {documents.map((doc) => (
          <div className='meal-card-container' key={doc.id}>
            <MealCard meal={doc} date={doc.startDate} isInPlanner={isInPlanner}/>
          </div>
        ))}

      </div>
    )
}