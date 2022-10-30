import React from "react";
import Footer from "../../components/Footer/Footer";
import Typed from "react-typed";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { BsCardChecklist } from "react-icons/bs";
import { AiOutlineAppstoreAdd, AiFillFileAdd } from "react-icons/ai";
import { FaShoppingBasket, FaAddressBook, FaUserFriends } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";

import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
// styles
import "./About.css";

const scrollVariant = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
};

export default function About() {
  const { user } = useAuthContext();

  return (
    <div className="about-wrapper">
      <div></div>
      <div className="about-header-container">
        <div className="type-text-container">
          <p className="about-header-container-type-text">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              A place created with passion.
            </motion.span>
            <br />
            <br />
            <motion.span
              className="type-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <Typed
                strings={["Create.", "Plan.", "Discover."]}
                typeSpeed={90}
                backSpeed={50}
                loop
              />
            </motion.span>
          </p>
        </div>
        {!user && (
          <div className="login-now">
            <Link to="/login">Start Now</Link>
          </div>
        )}
      </div>
      <section className="features-container">
        <div className="feature">
          <motion.div
            variants={scrollVariant}
            initial="initial"
            whileInView="whileInView"
            className="feature-motion-div"
          >
            <h4 className="feature-header">Create</h4>
            <Link to={user ? "/create" : "/login"}>
              <AiFillFileAdd className="feature-icon" />
            </Link>
          </motion.div>
          <p className="feature-text">
            Create your recipe and find it in your Meals Book
          </p>
        </div>
        <div className="feature">
          <motion.div
            variants={scrollVariant}
            initial="initial"
            whileInView="whileInView"
            className="feature-motion-div"
          >
            <h4 className="feature-header">Discover</h4>
            <Link to={user ? "/meals" : "/login"}>
              <FaAddressBook className="feature-icon" />
            </Link>
          </motion.div>
          <p className="feature-text">
            Discover your meals in a book of recipies, all details are there for
            you.
            <br />
            Choose a meal from your book to make it visible in your personal
            Planner.
          </p>
        </div>
        <div className="feature">
          <motion.div
            variants={scrollVariant}
            initial="initial"
            whileInView="whileInView"
            className="feature-motion-div"
          >
            <h4 className="feature-header">Plan</h4>
            <Link to={user ? "/planner" : "/login"}>
              <BsCardChecklist className="feature-icon" />
            </Link>
          </motion.div>
          <p className="feature-text">
            With a planner choose a date of your meal.
            <br />
            It will stay there for you untill you make it done!
          </p>
        </div>
        <div className="feature">
          <motion.div
            variants={scrollVariant}
            initial="initial"
            whileInView="whileInView"
            className="feature-motion-div"
          >
            <h4 className="feature-header">Shopping</h4>
            <Link to={user ? "/shopping-list" : "/login"}>
              <FaShoppingBasket className="feature-icon" />
            </Link>
          </motion.div>
          <p className="feature-text">
            Personal shopping list is a huge advantage.
            <br />
            All ingredients from meals in planner are stored there for you!
          </p>
        </div>
      </section>
      <section className="future-info-container">
        <motion.div
          className="future-header-container"
          variants={scrollVariant}
          initial="initial"
          whileInView="whileInView"
        >
          <h3>
            <span className="lint-text">Coming soon</span>
          </h3>
          <p className="future-header-container-text">
            We still working on developing new features to our website.
            <br />
            Our goal is to give you a place where you can public your best
            recipes.
          </p>
        </motion.div>
        <div className="future-cards">
          <motion.div
            className="future-card"
            variants={scrollVariant}
            initial="initial"
            whileInView="whileInView"
          >
            <h4 className="future-card-header">Ranking and shares</h4>
            <GiAchievement className="future-card-icon" />
            <p className="future-card-text">
              Users will be able to interact with your recipes by giving it a
              Star Tag and leave comments.
            </p>
          </motion.div>
          <motion.div
            className="future-card"
            variants={scrollVariant}
            initial="initial"
            whileInView="whileInView"
          >
            <h4 className="future-card-header">Friends lobby</h4>
            <FaUserFriends className="future-card-icon" />
            <p className="future-card-text">
              Friends list and chat app within our website where you will be
              able to talk with your friends seeing their online status.
            </p>
          </motion.div>
          <motion.div
            className="future-card"
            variants={scrollVariant}
            initial="initial"
            whileInView="whileInView"
          >
            <h4 className="future-card-header">Recipe wall</h4>
            <AiOutlineAppstoreAdd className="future-card-icon" />
            <p className="future-card-text">
              We would like to create community where people can see eachothers
              best recipes. Users can decide wheter they want to publish their
              recipe or not. Interface where you can discover recipes, plans,
              diet and soon even more.
            </p>
          </motion.div>
        </div>
      </section>
      {!user && (
        <div className="get-started-about">
          <Link to="/login">Get started</Link>
        </div>
      )}
      <Footer />
      <ScrollToTop className="scroll-to-top" />
    </div>
  );
}
