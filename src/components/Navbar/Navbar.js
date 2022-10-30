import { AiOutlineMenu } from "react-icons/ai";
// import { FaUserAlt } from 'react-icons/fa'
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";

// styles
import "./Navbar.css";
import Navlinks from "./Navlinks";
import MobileMenu from "../MoblileMenu/MobileMenu";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <h1 className="logo">MealYOU</h1>
      {user && (
        <div className="user-container">
          {/* <FaUserAlt className='user-icon'/> */}
          <p>
            Hello <span className="user-name-text">{user.displayName}</span>
          </p>
        </div>
      )}
      <div className="navbar">
        <Navlinks />
      </div>
      <div className="hamburger-wrapper" onClick={handleMenu}>
        {!isOpen && <AiOutlineMenu className="hamburger-icon" />}
        {isOpen && <MdOutlineClose className="hamburger-close" />}
      </div>
      <MobileMenu isOpen={isOpen} handleMenu={handleMenu} />
    </nav>
  );
}
