import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import "./Contact.css";

// styles and icons
import idea from "../../assets/undraw_lightbulb_moment_re_ulyo.svg";
import support from "../../assets/undraw_questions_re_1fy7 (1).svg";
import community from "../../assets/undraw_positive_attitude_re_wu7d.svg";
import mail from "../../assets/undraw_newsletter_re_wrob.svg";
import message from "../../assets/undraw_online_messaging_re_qft3.svg";

import { BsFacebook, BsGithub, BsTwitter, BsWhatsapp } from "react-icons/bs";

function Contact() {
  const socialAnimation = useAnimation();
  const contactAnimation = useAnimation();

  const [refSocials, socialsInView] = useInView({
    threshold: 0.4,
  });
  const [refContact, contactInView] = useInView({
    threshold: 0.4,
  });

  useEffect(() => {
    if (socialsInView) {
      socialAnimation.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
          delay: 0.2,
        },
      });
    }
    if (!socialsInView) {
      socialAnimation.start({
        y: -20,
        opacity: 0,
      });
    }
    if (contactInView) {
      contactAnimation.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
        },
      });
    }
    if (!contactInView) {
      contactAnimation.start({
        y: -20,
        opacity: 0,
      });
    }
  }, [socialsInView, contactInView, contactAnimation, socialAnimation]);

  return (
    <div className="contact-wrapper">
      <motion.h2
        className="contact-header"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        We'd Love to Hear From <span className="logo-type-text">You</span>
      </motion.h2>
      <div className="contact-page-infos">
        <div className="idea page-info">
          <motion.img
            src={idea}
            alt="idea"
            className="idea-svg info-icon"
            initial={{ x: "-10vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 0.3,
              bounce: 0.3,
              delay: 0.6,
              stiffness: 80,
            }}
          />
          <h4>Ideas and Partnership</h4>
        </div>
        <div className="support page-info">
          <motion.img
            src={support}
            alt="support"
            className="idea-svg info-icon"
            initial={{ x: "-10vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 0.3,
              bounce: 0.3,
              delay: 1,
              stiffness: 80,
            }}
          />
          <h4>Get support</h4>
        </div>
        <div className="community page-info">
          <motion.img
            src={community}
            alt="community"
            className="idea-svg info-icon"
            initial={{ x: "-10vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 0.3,
              bounce: 0.3,
              delay: 1.4,
              stiffness: 80,
            }}
          />
          <h4>Join Community</h4>
        </div>
      </div>
      <motion.div className="contact-page-details">
        <div ref={refContact}>
          <motion.div className="email-info">
            <h4 className="info-text">Drop us an email!</h4>
            <p>rafal.szadkowski@adres.pl</p>
            <motion.img
              src={mail}
              alt="mail"
              className="contact-info-icon"
              animate={contactAnimation}
            />
          </motion.div>
          <motion.div className="message-info">
            <h4 className="info-text">Give us a text !</h4>
            <p>tel: 123 456 789</p>
            <motion.img
              src={message}
              alt="message"
              className="contact-info-icon"
              animate={contactAnimation}
            />
          </motion.div>
        </div>
      </motion.div>
      <div className="contact-page-socials" ref={refSocials}>
        <div className="contact-page-icon-container" animate={socialAnimation}>
          <a href="https://www.facebook.com/" target="blank">
            <BsFacebook className="contact-page-social-icon" />
          </a>
        </div>
        <div className="contact-page-icon-container" animate={socialAnimation}>
          <a href="https://github.com/" target="blank">
            <BsGithub className="contact-page-social-icon" />
          </a>
        </div>
        <div className="contact-page-icon-container" animate={socialAnimation}>
          <a href="https://twitter.com/" target="blank">
            <BsTwitter className="contact-page-social-icon" />
          </a>
        </div>
        <div className="contact-page-icon-container" animate={socialAnimation}>
          <a href="https://web.whatsapp.com/" target="blank">
            <BsWhatsapp className="contact-page-social-icon" />
          </a>
        </div>
      </div>
      <ScrollToTop className="scroll-to-top" />
    </div>
  );
}

export default Contact;
