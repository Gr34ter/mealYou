import { useFirestore } from "../../hooks/useFirestore"
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// icons
import { AiFillFileAdd, AiFillStar, AiOutlineCheckCircle, AiOutlineFieldTime } from 'react-icons/ai'
import { BsCloudArrowDown } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
// styles
import './MealCard.css'


export default function MealCard({ meal, isInPlanner, date}) 
{
  const [startDate, setStartDate] = useState(date.toDate())
  const [isFav, setIsFav] = useState(meal.isFav)
  const [isPlanned, setIsPlanned ] = useState(meal.isPlanned)
  
  const { updateDocument } = useFirestore('meals')
  
  // allow user to see days only in advance 
  const addDays = (date, days) => {
    let result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }


  // set Date in page Planner
  const handleDate = (date, id) => {
    const updates = {
      startDate: date
    }

    updateDocument(id, updates)
    setStartDate(date)
  }

  // add to Planer 
  const handleAdd = (id) => {
    const updates = {
      isPlanned: true
    }
    updateDocument(id, updates)
    setIsPlanned(true)
  }

  // Complete meal in page Planner
  const handleComplete = (id) => {
    const updates = {
      isPlanned: false,
    }
    updateDocument(id, updates)
  }


  const handleFav = (id, arg) => {
    const updates = {
      isFav: arg
    }
    updateDocument(id, updates)
    setIsFav(arg)
  }

  return (
    <motion.div className='meal-card'>
        <h5 className="meal-card-header">{meal.mealName}</h5>
        <div className='meal-card-details'>
          <h6 className='meal-category'>{meal.category}</h6>
          <div className="meal-card-time-info">
            <AiOutlineFieldTime className="time-icon"/>
            <h6>{meal.cookingTime} minutes</h6>
          </div>
        </div>
        {isInPlanner && 
          <label>
              <div className="date-picker-container">
                  <span>Select eating day:</span>
                  <DatePicker
                      selected={startDate}
                      onChange={(date) => handleDate(date, meal.id)}
                      placeholderText="Choose date here..."
                      minDate={new Date()}
                      maxDate={addDays(new Date(), 14)}
                      closeOnScroll={false}
                      dateFormat="dd/MM/yyyy"
                  />
              </div>
          </label>
        }
        <div className="icons-container">
          {isInPlanner && 
            <div className="option">
              <AiOutlineCheckCircle className="complete-btn" onClick={() => handleComplete(meal.id)} />
              <h6>Done</h6>
            </div>}
          {!isPlanned && 
            <div className="option">
              <AiFillFileAdd className='add-toPlan-btn' onClick={() => handleAdd(meal.id)} />
              <h6>Plan me !</h6>
            </div>}
          {isPlanned && !isInPlanner &&
            <div className="option">
              <GoChecklist className='added-toPlan-btn' />
              <h6>Im already planned</h6>
            </div>
          }
          {!isFav && !isInPlanner &&
          <div className="option">
            <AiFillStar className="add-toFav-btn" onClick={() => handleFav(meal.id, true)}/>
            <h6>Add me to Favourites</h6>
          </div> }
          {isFav && !isInPlanner &&
            <div className="option">
              <AiFillStar className="favourite-icon" onClick={() => handleFav(meal.id, false)}/>
              <h6>I'm favourite!</h6>
            </div>
          }
          <div className="option">
            <Link key={meal.id} to={`/meals/${meal.id}`}>
              <BsCloudArrowDown className="details-btn"/>
            </Link>
            <h6>details</h6>
          </div>
        </div>
    </motion.div>
  )
}
