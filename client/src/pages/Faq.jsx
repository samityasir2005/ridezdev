import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Faq.css";
import uridLogo from "../assets/robotfaq.png";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Urid?",
      answer:
        "Urid is a ride-sharing service founded by Samit Yasir, a 2nd year computer science student from Laurier University. It's specifically designed for university and college students, providing a secure, dependable, and affordable transportation solution by students, for students.",
    },
    {
      question: "What problem is Urid trying to solve?",
      answer:
        "Urid addresses the transportation challenges faced by university students who may not have cars. We offer an affordable, safe, and reliable service tailored to student needs, solving issues of inconvenient public transport and costly conventional ride-sharing services. Additionally, Urid helps reduce environmental impact by encouraging carpooling.",
    },
    {
      question: "What makes Urid unique?",
      answer:
        "Urid stands out by focusing exclusively on university students, ensuring safety, affordability, and community. We verify all users through their university accounts, creating a trusted network. Our platform allows student drivers to share trip details, enabling passengers to find suitable rides easily, fostering friendships and reducing costs through direct interaction.",
    },
    {
      question: "Who are Urid's customers?",
      answer:
        "Our primary customers are university students without access to private cars, looking to reduce transportation expenses and travel safely in groups. We also cater to students with vehicles who want to cut down on operational costs by offering rides to their peers.",
    },
    {
      question: "How does Urid work?",
      answer:
        "Urid connects student drivers with fellow students needing rides. Drivers can upload information about their trips, including destination, departure time, and available seats. Passengers can then find and book rides that match their preferences, creating a community-based transportation solution.",
    },
    {
      question: "What if I have more questions?",
      answer:
        "If you have additional questions, please don't hesitate to contact our support team. You can reach us through the 'Contact Us' page on our website, or email us directly at support@urid.com. We're here to help!",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="faq-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="faq-header" variants={itemVariants}>
        <div className="header-content">
          <div className="header-text">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              FAQs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Have questions? Here you'll find answers to common queries about
              Urid, our student-focused ride-sharing platform.
            </motion.p>
          </div>
          <motion.img
            src={uridLogo}
            alt="Urid Logo"
            className="urid-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </div>
      </motion.div>
      <div className="faq-content">
        <motion.div className="faq-sidebar" variants={itemVariants}>
          <h3>Categories</h3>
          <ul>
            <li>About Urid</li>
            <li>Our Service</li>
            <li>Safety & Security</li>
            <li>How It Works</li>
            <li>Pricing</li>
          </ul>
        </motion.div>
        <motion.div className="faq-main" variants={itemVariants}>
          <h2>About Urid</h2>
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="faq-item"
              variants={itemVariants}
            >
              <motion.div
                className={`faq-question ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => toggleQuestion(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.question}
                <motion.span
                  className="faq-icon"
                  initial={false}
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeIndex === index ? "−" : "+"}
                </motion.span>
              </motion.div>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Faq;
