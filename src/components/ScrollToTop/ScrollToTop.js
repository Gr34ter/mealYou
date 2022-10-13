import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

// styles
import './ScrollToTop.css'



const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if(window.pageYOffset > 300){
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && <motion.button 
                className="scroll-to-top"
                onClick={scrollToTop}
                initial={{ x: 100, opacity: 0 }}
                animate= {{ x: 0, opacity: 0.9}}
                transition={{ duration: 0.5}}
                exit={{ x: 100, opacity: 0 }}
            >
                <BsFillArrowUpCircleFill />
            </motion.button>}
        </AnimatePresence>
    );
}

export default ScrollToTop;

