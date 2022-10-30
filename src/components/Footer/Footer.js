import { Link } from "react-router-dom";

// styles and icons
import { BsFacebook, BsGithub, BsTwitter, BsWhatsapp } from "react-icons/bs";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="contact-details">
        <div className="contact-details-container">
          <p className="contact-details-text">
            <span className="contact-type">email:</span>{" "}
            rafal.szadkowski@adres.pl
          </p>
          <p className="contact-details-text">
            <span className="contact-type">tel:</span> 123 456 789
          </p>
        </div>
      </div>
      <div className="contact-mobile">
        <Link to="/contact" className="contact-btn">
          Contact us
        </Link>
      </div>
      <div className="socials">
        <div>
          <a href="https://www.facebook.com/" target="blank">
            <BsFacebook className="social-icon fb" />
          </a>
        </div>
        <div>
          <a href="https://web.whatsapp.com/" target="blank">
            <BsWhatsapp className="social-icon whatsapp" />
          </a>
        </div>
        <div>
          <a href="https://twitter.com/" target="blank">
            <BsTwitter className="social-icon twitter" />
          </a>
        </div>
        <div>
          <a href="https://github.com/" target="blank">
            <BsGithub className="social-icon github" />
          </a>
        </div>
      </div>
      <p className="copyright-text">
        Copyright &copy; erra Company, rafal szadkowski 2022
      </p>
    </footer>
  );
}
