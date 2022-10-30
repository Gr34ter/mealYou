import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { motion } from "framer-motion";

// styles
import "./Home.css";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div
          className={
            user ? "greeting-container-when-logged" : "greeting-container"
          }
        >
          <div className="welcome-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <motion.h2 className="greeting-header">Welcome</motion.h2>
              <p className="greeting-text">
                Make cooking easier
                <br />
                with your very own Meals Book
              </p>
            </motion.div>
            <motion.div
              className="read-more"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeIn", delay: 0.6 }}
            >
              <Link to="/about">Read more</Link>
            </motion.div>
          </div>
        </div>
        {!user && (
          <motion.div
            className="get-started"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: -50 }}
            transition={{ duration: 0.4, delay: 1, ease: "easeIn" }}
          >
            <Link to="/login">Get started</Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
