import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'



// styles
import './Planner.css'
import MealsList from '../../components/MealsList/MealsList';

export default function Planner() {
    const { user } = useAuthContext()
    const { documents, error, isPending } = useCollection('meals', user.uid)

    const [plannedDocuments, setPlannedDocuments] = useState([])

    const isInPlanner = true;

    useEffect(() => {
        if (documents) {

            const planned = documents.filter((doc) => {
                return doc.isPlanned? true : false
            })
            setPlannedDocuments(planned)
        }
    }, [documents])


    if (documents) {
        return (
            <div className='planner-wrapper'>
                <div className='planner-container'>
                    <MealsList documents={plannedDocuments} isInPlanner={isInPlanner} />
                </div>
                {plannedDocuments.length === 0 &&(
                    <div className='planner-info'>
                        <h3 className='planner-info-header'>No meals planned yet...</h3>
                        <p className='planner-info-text'>Go to your <span className='lint-text'>Meals Book </span>and create some awesome recipes.
                        <br /><br />
                        And remember, add them to the <span className='lint-text'>Planner!</span></p>
                        <Link to='/meals' className='toMeals-btn'>Meals book</Link>
                    </div> 
                )}
                <ScrollToTop className='scroll-to-top' />
            </div>
        )
    }
    if (isPending) {
        return (
            <div className="loading-container">
                <div className="loading">Loading...</div>
            </div>
        )
    }
    if (error) {
        return (
            <div className="error">{error}</div>
        )
    }
}


