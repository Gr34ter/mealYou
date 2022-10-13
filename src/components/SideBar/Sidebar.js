import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

// icons
import { BsCardChecklist } from 'react-icons/bs'
import { AiFillFileAdd, AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai"
import { FaShoppingBasket, FaAddressBook} from 'react-icons/fa'

// styles
import './Sidebar.css'
 
export default function Sidebar () {

  const [ sideOpen, setSideOpen] = useState(false)

  const handleClick = () => {
    setSideOpen(!sideOpen)
  }

    return (
      <motion.div 
        className='side-bar .side-bar-close'
        initial={{ x: -110}}
        animate={ sideOpen? { x: 0 }: { x: -48 }}
        transition={{ duration: 0.3}}
      >
        <ul
        > 
          <div className='close-btn' onClick={handleClick}>
            {!sideOpen? <AiOutlineDoubleRight /> : <AiOutlineDoubleLeft />}
          </div>
          <Link to="/planner" onClick={handleClick}>
            <li>
              <BsCardChecklist className='sidebar-icon' />
            </li>
          </Link>
          <Link to='/meals' onClick={handleClick}>
            <li>
              <FaAddressBook className='sidebar-icon' />
            </li>
          </Link>
          <Link to='/shopping-list' onClick={handleClick}>
            <li>
              <FaShoppingBasket className='sidebar-icon' />
            </li>
          </Link>
          <Link to='/create' onClick={handleClick}>
            <li>
              <AiFillFileAdd className='sidebar-icon' />
            </li>
          </Link>
        </ul>
      </motion.div>
    )
}