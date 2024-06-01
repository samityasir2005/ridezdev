import React from "react";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import "../styles/AboutUs.css";

export default function AboutUs() {
  return (
    <div id="about-us-container">
      <nav id="about-us-navbar">
        <ul>
          <li>
            <Link to="what-is-uridez" smooth={true} duration={500}>
              What is Uridez?
            </Link>
          </li>
          <li>
            <Link to="our-mission" smooth={true} duration={500}>
              Our Mission
            </Link>
          </li>
          <li>
            <Link to="team" smooth={true} duration={500}>
              Our Team
            </Link>
          </li>
        </ul>
      </nav>

      <Element name="what-is-uridez" className="about-us-section">
        <h2>What is Uridez?</h2>
        <p>
          Welcome to our ride-sharing platform exclusively for university
          students! We provide a safer and more reliable transportation
          alternative by allowing only verified university students as both
          drivers and passengers. This creates a trusted community where you can
          feel secure.
        </p>
        <img src="path/to/your/image.jpg" alt="Uridez" />
      </Element>

      <Element name="our-mission" className="about-us-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a safe, reliable, and affordable
          transportation option for university students. We aim to foster a
          community of trust and convenience.
        </p>
        <img src="path/to/your/image.jpg" alt="Mission" />
      </Element>

      <Element name="team" className="about-us-section">
        <h2>Our Team</h2>
        <p>
          Meet the dedicated team behind Uridez. Our team is committed to
          providing the best service and ensuring the safety and satisfaction of
          our users.
        </p>
        <img src="path/to/your/image.jpg" alt="Team" />
      </Element>

      <button id="back-to-top" onClick={() => scroll.scrollToTop()}>
        Back to Top
      </button>
    </div>
  );
}
