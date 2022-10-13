
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import MealsList from '../../components/MealsList/MealsList'
import MealsFilter from '../../components/MealsFilter/MealsFilter'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'


// styles
import './MealsBook.css'



export default function MealsBook() {

  const [currentFilter, setcurrentFilter] = useState('all')
  const { user } = useAuthContext()
  const { documents, isPending, error } = useCollection('meals', user.uid)

  const changeFilter = (newFilter) => {
    setcurrentFilter(newFilter)
  }

  const sortedByFilterMeals = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case "all":
        return true
      case "breakfast":
      case "lunch":
      case "dinner":
      case "snack":
      case "other":
        return document.category === currentFilter
      case "favourites":
        return document.isFav
      default:
        return true
    }
  }) : null

  if (documents) {
      documents.forEach((doc) => {
        if (doc.createdBy === user.uid) {
          console.log(doc.createdBy, user.uid);
        }
      })
    
  }

  if (documents) {
    return (
      <div className="meals-book-wrapper">
        {documents.length !== 0 && <MealsFilter changeFilter={changeFilter}/>}
        <div className='meals-book-container'>
          <MealsList documents={sortedByFilterMeals} filter={currentFilter}/>
        </div>
        {documents.length === 0 && (
          <div className='mealsbook-info'>
            <h3 className='mealsbook-info-header'>
              Your <span className='lint-text'>Meals Book</span> is empty.
            </h3>
            <p className='mealsbook-info-text'>
              Seems like you dont have any meals created so far... 
              <br /><br />
              Create your first awesome recipe, and enjoy your own meal planner!
            </p>
            <Link to='/create' className='toMeals-btn'>Create Meal</Link>
          </div>
        )}
        <ScrollToTop className="scroll-to-top"/>
      </div>
    )
  }
  if (isPending && !documents) {
    return (
      <div className='loading-container'>
        <h3 className='loading'>Loading...</h3>
      </div>
    )
  }
  if (error) {
    return(
      <p>{error}</p>
    )
  }
}

