import { MdOutlineSettingsSuggest } from "react-icons/md";
import { useState } from 'react'
import { motion } from 'framer-motion'
// styles
import './MealsFilter.css'

export default function MealsFilter({ changeFilter }) {
    const [isOpen, setIsOpen] = useState(false)

    const categories = [
        "all",
        "breakfast",
        "lunch",
        "dinner",
        "snack",
        "favourites",
        "other"
    ]

    const handleClick = (filter) => {
        changeFilter(filter)
    }


    return (
        <div className='filters'>
            {isOpen && 
                <motion.div 
                    className="items-container"
                    initial={{y: 200}}
                    animate={{y: 0}}
                >
                    {categories.map((category) => (
                        <button 
                            key={category} 
                            className="filter-item"
                            onClick={() => handleClick(category)}
                        >
                        {category}
                        </button>
                    ))}
                </motion.div>
            }
            <div className='filter-icon-container'>
                <MdOutlineSettingsSuggest className="filter-icon" onClick={() => setIsOpen(!isOpen)}/>
            </div>
        </div>
    )
}