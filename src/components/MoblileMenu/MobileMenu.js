import { motion } from 'framer-motion'
import Navlinks from '../Navbar/Navlinks'

import './MobileMenu.css'

function MobileMenu({ isOpen, handleMenu }) {

  return (
    <motion.div 
        className="menu-mobile" 
        initial={{x: 200}}
        animate={isOpen? {x: 0} : {x: 200}}
        transition={{ duration: 0.1, ease: 'easeInOut', }}
      >
        {isOpen && <Navlinks handleMenu={handleMenu}/>}
    </motion.div>
  )
}

export default MobileMenu